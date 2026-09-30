import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * The mark of one network, drawn rather than fetched.
 *
 * The same decision the WhatsApp button made and for the same reasons: an icon
 * font or a CDN sprite would be a third party on a page that has none, a
 * request that can fail, and a licence to keep track of. These are a few
 * shapes in the page, they inherit `currentColor`, and they cost nothing.
 *
 * They are deliberately plain — the shape each network is known by, at 16px,
 * where detail is invisible anyway. A reel is a frame with a play triangle in
 * it rather than the exact Reels mark: what the row has to say is "this one is
 * the video", and that reads at a glance where a faithful copy of a small
 * corporate glyph would not.
 */
@Component({
  selector: 'app-network-icon',
  templateUrl: './network-icon.component.html',
  styleUrl: './network-icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NetworkIconComponent {
  /** The network's id, as the api records it. */
  readonly network = input.required<string>();
}
