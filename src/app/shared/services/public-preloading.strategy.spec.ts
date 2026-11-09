import { Route } from '@angular/router';
import { of } from 'rxjs';
import { PublicPreloading } from './public-preloading.strategy';

describe('PublicPreloading', () => {
  const strategy = new PublicPreloading();
  const load = () => of('loaded');

  const whatHappens = (route: Route): string | null => {
    let got: string | null = null;
    strategy.preload(route, load).subscribe((value) => (got = value as string));
    return got;
  };

  it('fetches a page a reader can reach', () => {
    expect(whatHappens({ path: 'artworks', data: { description: 'x' } })).toBe('loaded');
  });

  /** A route with no data at all is a public one until it says otherwise. */
  it('fetches a page that says nothing about itself', () => {
    expect(whatHappens({ path: 'cv' })).toBe('loaded');
  });

  // The whole point: the studio's code never reaches a reader's phone.
  it('leaves a page that is not for the public alone', () => {
    expect(whatHappens({ path: 'atelier', data: { noindex: true } })).toBe(null);
  });
});
