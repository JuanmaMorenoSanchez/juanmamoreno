import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

/** One thing the archive holds, as `scripts/backup/backup.mjs` records it. */
export interface BackupPart {
  /** Its path inside the archive, which is also its identity. */
  what: string;
  kind: 'firestore' | 'chain' | 'bucket';
  name: string;
  bytes?: number;
  takenAt: string;
  /** Absent for a bucket, which is a directory and has no single hash. */
  sha256?: string;
  documents?: number;
  tokens?: number;
  expected?: number;
  complete?: boolean;
}

export interface Manifest {
  version: number;
  takenAt?: string;
  parts: BackupPart[];
  skipped: { what: string; why: string }[];
}

/** A part, with what the page worked out about it. */
export interface Checked extends BackupPart {
  /** `quiet` is as it should be, `late` is older than its kind should ever be. */
  state: 'quiet' | 'late';
  /** Whether the bytes on disk still hash to what the manifest recorded. */
  verified?: boolean;
}

/**
 * How old each kind of thing is allowed to get before the page says so.
 *
 * Not one number, because these do not change at one speed. The collections
 * take fifteen seconds to copy and move every day, so a week is already too
 * long — eight days, the same figure the backend's activity page uses for the
 * managed Firestore backup, so the two pages never disagree about what late
 * means. The chain is swept in two minutes but only changes when a painting is
 * certified. The buckets are nine gigabytes and an hour, and the paintings in
 * them do not change at all once they are in: nagging about them weekly would
 * train him to ignore the whole page, which is the only way a board like this
 * really fails.
 */
const LATE_AFTER_DAYS: Record<BackupPart['kind'], number> = {
  firestore: 8,
  chain: 30,
  bucket: 90,
};

/** The `showDirectoryPicker` the dom lib does not declare. See `pick()`. */
type PickerWindow = Window & {
  showDirectoryPicker?: (options?: {
    mode?: 'read' | 'readwrite';
  }) => Promise<FileSystemDirectoryHandle>;
};

/**
 * What is on his own disk, and whether it is still good.
 *
 * The site's data lives in two places with very different promises. The
 * certificates are on Ethereum carrying their own metadata and the web-sized
 * copies are on Arweave: those outlive any bill and any company. Everything
 * else — the essays, the career, what is sold, what has been posted, the record
 * of each painting, and the eight gigabytes the nights have cut — exists in one
 * Google project behind one account. `scripts/backup/backup.mjs` copies all of
 * it to a folder beside the repositories. This is the page that says whether it
 * did, and when, and whether the bytes are still the bytes.
 *
 * **It reads the folder, it does not hold it.** The archive is ten gigabytes on
 * a laptop and no page can be given that; so he points the browser at the
 * folder once per visit and it reads the manifest out of it, through the file
 * system access api. Nothing is uploaded, nothing is cached, and the handle is
 * not kept — which also means this page works on his machine and is simply
 * empty anywhere else, exactly like the atelier.
 *
 * **Nothing here restores anything, deliberately.** A restore is run from the
 * command line, and the page's job is to hand over the exact command with the
 * folder already in it. Two reasons, and neither is squeamishness: putting nine
 * gigabytes back is `gcloud storage rsync` and never a browser, and a button
 * that overwrites a Firestore collection would be the most dangerous thing on
 * the site, reachable with the same seven-day signature the kill switch exists
 * to revoke. The thing used twice in a lifetime should be the thing that is
 * typed.
 */
@Component({
  selector: 'app-backups',
  standalone: true,
  imports: [DatePipe, MatIconModule],
  templateUrl: './backups.component.html',
  styleUrl: './backups.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackupsComponent {
  /** The folder's name, which is all the page ever shows of where it is. */
  protected readonly folder = signal('');
  protected readonly manifest = signal<Manifest | undefined>(undefined);
  protected readonly reading = signal(false);
  protected readonly problem = signal('');

  /** Hashes computed so far, by part. Absent means not checked rather than bad. */
  private readonly hashes = signal<Record<string, boolean>>({});

  /**
   * Whether this browser can read a local folder at all.
   *
   * Chrome and Edge can; Safari and Firefox have not shipped it. Asked at the
   * click rather than at construction because this page is prerendered like
   * every other, and there is no `window` in the build.
   */
  protected canPick(): boolean {
    return typeof window !== 'undefined' && 'showDirectoryPicker' in window;
  }

  protected readonly parts = computed<Checked[]>(() => {
    const held = this.manifest();
    if (!held) return [];
    const verified = this.hashes();
    return held.parts
      .map((part) => ({
        ...part,
        state: this.howLate(part),
        verified: verified[part.what],
      }))
      .sort((a, b) => a.what.localeCompare(b.what));
  });

  protected readonly skipped = computed(() => this.manifest()?.skipped ?? []);

  /** What is wrong, which is the answer the page exists to give. */
  protected readonly wrong = computed(() =>
    this.parts().filter((part) => part.state === 'late' || part.verified === false)
  );

  protected readonly firestoreParts = computed(() => this.byKind('firestore'));
  protected readonly chainParts = computed(() => this.byKind('chain'));
  protected readonly bucketParts = computed(() => this.byKind('bucket'));

  private byKind(kind: BackupPart['kind']): Checked[] {
    return this.parts().filter((part) => part.kind === kind);
  }

  protected readonly totalBytes = computed(() =>
    this.parts().reduce((sum, part) => sum + (part.bytes ?? 0), 0)
  );

  /**
   * The folder, chosen by him, read once.
   *
   * `showDirectoryPicker` is not in the dom lib, so the window is narrowed to a
   * type that has it rather than reaching for `@types/wicg-file-system-access`:
   * one declaration against one dependency is not a close call. Read-only mode,
   * because this page has no business writing into the archive.
   */
  protected async pick(): Promise<void> {
    const picker = (window as PickerWindow).showDirectoryPicker;
    if (!picker) {
      this.problem.set('This browser cannot read a local folder. Chrome or Edge can.');
      return;
    }

    let handle: FileSystemDirectoryHandle;
    try {
      handle = await picker({ mode: 'read' });
    } catch {
      // Closing the picker is not a fault and must not leave an error behind.
      return;
    }

    this.reading.set(true);
    this.problem.set('');
    this.folder.set(handle.name);
    this.manifest.set(undefined);
    this.hashes.set({});

    try {
      const text = await (
        await handle.getFileHandle('manifest.json')
      )
        .getFile()
        .then((f) => f.text());
      const said = JSON.parse(text) as Manifest;
      if (said?.version !== 1 || !Array.isArray(said.parts)) {
        throw new Error('not a manifest this page knows');
      }
      this.manifest.set({ ...said, skipped: said.skipped ?? [] });
      await this.verify(handle, said.parts);
    } catch {
      this.problem.set(
        `No backup manifest in "${handle.name}". Run the copy below, then choose the folder it wrote to.`
      );
    } finally {
      this.reading.set(false);
    }
  }

  /**
   * Whether each file still hashes to what the manifest recorded.
   *
   * The whole point of writing a hash down is that somebody checks it, and this
   * is the only program that ever will. Files only: a bucket part is a directory
   * of up to nine gigabytes and has no single hash, so its row shows what the
   * bucket held when it was copied and claims nothing more.
   *
   * A file that cannot be read is left unchecked rather than marked bad — the
   * difference between "this is wrong" and "I could not tell" is the whole
   * value of the column.
   */
  private async verify(handle: FileSystemDirectoryHandle, parts: BackupPart[]): Promise<void> {
    const found: Record<string, boolean> = {};
    for (const part of parts) {
      if (!part.sha256) continue;
      try {
        const segments = part.what.split('/');
        let at = handle;
        for (const segment of segments.slice(0, -1)) at = await at.getDirectoryHandle(segment);
        const file = await (await at.getFileHandle(segments.at(-1) as string)).getFile();
        const digest = await crypto.subtle.digest('SHA-256', await file.arrayBuffer());
        found[part.what] =
          [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('') ===
          part.sha256;
      } catch {
        // Left out of the record: unchecked, not failed.
      }
    }
    this.hashes.set(found);
  }

  private howLate(part: BackupPart): 'quiet' | 'late' {
    const days = (Date.now() - Date.parse(part.takenAt)) / 86_400_000;
    return Number.isNaN(days) || days > LATE_AFTER_DAYS[part.kind] ? 'late' : 'quiet';
  }

  protected ago(at: string | undefined): string {
    if (!at) return 'never';
    const hours = (Date.now() - Date.parse(at)) / 3_600_000;
    if (Number.isNaN(hours)) return 'unknown';
    if (hours < 1) return 'just now';
    if (hours < 24) return `${Math.round(hours)}h ago`;
    const days = Math.round(hours / 24);
    return days === 1 ? 'yesterday' : `${days} days ago`;
  }

  protected size(bytes: number | undefined): string {
    if (!bytes) return '';
    if (bytes < 1e6) return `${Math.round(bytes / 1e3)} kB`;
    if (bytes < 1e9) return `${(bytes / 1e6).toFixed(1)} MB`;
    return `${(bytes / 1e9).toFixed(2)} GB`;
  }

  /** How many things a row is about — documents, or tokens, or nothing. */
  protected count(part: Checked): string {
    if (part.documents !== undefined) return `${part.documents} documents`;
    if (part.tokens !== undefined) {
      // A short sweep and a complete one look identical without the contract's
      // own number beside them, so both are shown whenever they disagree.
      return part.complete === false
        ? `${part.tokens} of ${part.expected} tokens`
        : `${part.tokens} tokens`;
    }
    return '';
  }

  /** The command that refreshes one kind, with nothing left to work out. */
  protected refreshCommand(kind: BackupPart['kind'] | 'everything'): string {
    const only = kind === 'everything' ? '' : ` --only ${kind}`;
    return `node scripts/backup/backup.mjs${only}`;
  }

  /**
   * The command that puts one part back, printed and never run.
   *
   * Without `--yes`, which is how `restore.mjs` is built: pasted as it stands
   * it says what it would write and stops. Adding the word is a second,
   * deliberate act, and it is his to make.
   */
  protected restoreCommand(part: Checked): string {
    if (part.kind === 'chain') return '';
    const kind = part.kind === 'bucket' ? 'bucket' : 'firestore';
    return `node scripts/backup/restore.mjs ${kind} ${part.name}`;
  }
}
