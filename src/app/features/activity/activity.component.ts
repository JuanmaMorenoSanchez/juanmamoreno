import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { Activity, ActivityApiService, CronRun, Heartbeat } from './activity.service';

/**
 * Latest activity: whether the machine did its job.
 *
 * Everything this site does on a cron it does by itself, and until now it had no
 * way of saying so. Four separate things have broken quietly here — a bucket
 * name that vanished and turned the reel renderer off, a cron run killed by
 * its memory limit with no process left to report it, a reverse image search
 * billing 186 calls a build, and a version that stopped moving. The common
 * thread is not bad luck. It is that nothing was watching.
 *
 * So this page is dates, counts, and a way through to whatever each one is
 * about. It changes nothing and spends nothing; its whole job is to be looked
 * at.
 */
@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [DatePipe, RouterLink, MatIconModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityComponent {
  private api = inject(ActivityApiService);
  private auth = inject(AdminAuthService);
  private destroyRef = inject(DestroyRef);

  /** Undefined until asked, and if it never answers. */
  readonly activity = signal<Activity | undefined>(undefined);
  readonly asking = signal(true);
  readonly problem = signal('');

  readonly beats = computed(() => this.activity()?.beats ?? []);
  readonly runs = computed(() => this.activity()?.runs ?? []);
  readonly spend = computed(() => this.activity()?.spend);

  /** Anything not quiet, which is what the page is for. */
  readonly wrong = computed(() => this.beats().filter((beat) => beat.state !== 'quiet'));

  constructor() {
    this.load();
  }

  load(): void {
    const token = this.auth.bearerToken();
    if (!token) {
      this.asking.set(false);
      return;
    }

    this.asking.set(true);
    this.problem.set('');
    this.api
      .latest(token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((activity) => {
        this.asking.set(false);
        if (!activity) {
          // The one answer that must not look like "everything is quiet".
          this.problem.set(
            'The api did not answer, so nothing here is known — which is not the ' +
              'same as nothing being wrong.'
          );
          return;
        }
        this.activity.set(activity);
      });
  }

  /** How long ago, in words, because a date needs counting and this does not. */
  ago(at: string | null): string {
    if (!at) return 'never';

    const minutes = Math.floor((Date.now() - new Date(at).getTime()) / 60_000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 48) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  /** Whether a run came back at all, which is different from whether it worked. */
  cameBack(run: CronRun): boolean {
    return Boolean(run.finishedAt);
  }

  /** The jobs of one run that failed, named. */
  broke(run: CronRun): string[] {
    return (run.jobs ?? []).filter((job) => !job.ok).map((job) => job.name);
  }

  trackBeat(_index: number, beat: Heartbeat): string {
    return beat.what;
  }
}
