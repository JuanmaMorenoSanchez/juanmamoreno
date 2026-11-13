/**
 * The storage Akita's `persistState` is given, which has to speak its language.
 *
 * **Akita only serialises for the real thing.** Inside `persistState` the write
 * is `storage.setItem(key, isLocalStorage(storage) ? serialize(state) : state)`
 * — a custom storage is handed the state object itself and is expected to
 * serialise it. This wrapper passed it straight to `window.localStorage`, which
 * stringifies whatever it is given, so **every visitor's cache was the fifteen
 * characters `[object Object]`**. On the next visit Akita read it back, decided
 * it was not an object, and parsed it:
 *
 *     Uncaught SyntaxError: "[object Object]" is not valid JSON
 *
 * on every page of the site, with the whole catalogue re-fetched every visit
 * because nothing had ever really been cached. The wrapper was added so a
 * browser that refuses storage would not fill the console with errors, and it
 * filled the console with a different one.
 *
 * So: a string goes in, and a string that cannot be the state is treated as no
 * state at all — which is what recovers the browsers that already hold the
 * broken value, without waiting for anybody to clear their site data.
 *
 * The try/catch each of these keeps is the original reason it exists. Akita
 * calls `setItem` bare inside a store subscription, and this is the one write
 * in the app that carries the whole catalogue — around 430 kB on every update.
 * On iOS Safari with "Block All Cookies", or in any browser that has filled its
 * quota, that throws. Swallowed here, such a reader simply fetches the
 * catalogue again next visit, which is what a cache that cannot be written
 * should do.
 */
export const storageThatMayBeRefused = {
  getItem: (key: string): string | null => {
    try {
      const stored = window.localStorage.getItem(key);
      // A store's state serialises to an object, so anything that does not
      // begin with `{` is not state — it is the `[object Object]` this used to
      // write, or something else's. Checked by its first character rather than
      // by parsing it twice: this string is the size of the catalogue.
      return stored?.trimStart().startsWith('{') ? stored : null;
    } catch {
      return null;
    }
  },

  setItem: (key: string, value: unknown): void => {
    try {
      window.localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    } catch {
      // Not cached. The catalogue is fetched again on the next visit.
    }
  },

  clear: (): void => {
    try {
      window.localStorage.clear();
    } catch {
      // Nothing was stored, so there is nothing to clear.
    }
  },
};
