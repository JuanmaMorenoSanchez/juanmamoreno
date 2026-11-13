import { storageThatMayBeRefused } from './persisted-storage';

/**
 * The storage Akita writes the catalogue through.
 *
 * It wrote the string `[object Object]` into every visitor's browser for as
 * long as it existed, because `persistState` serialises only for the real
 * `localStorage` and hands a custom storage the state object itself. The next
 * visit read those fifteen characters back and parsed them.
 */
describe('storageThatMayBeRefused', () => {
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => {
          // The real one stringifies whatever it is given, which is the whole
          // of what went wrong: an object becomes `[object Object]`.
          store[key] = String(value);
        },
        clear: () => {
          store = {};
        },
      },
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it('serialises the state it is handed, because Akita does not', () => {
    storageThatMayBeRefused.setItem('AkitaStores', { session: { artPieces: [{ tokenId: '5' }] } });

    expect(store['AkitaStores']).toBe('{"session":{"artPieces":[{"tokenId":"5"}]}}');
    expect(store['AkitaStores']).not.toBe('[object Object]');
  });

  it('reads back exactly what it wrote, for Akita to parse', () => {
    const state = { session: { artPieces: [], lastArtPiecesUpdate: '2026-11-13' } };

    storageThatMayBeRefused.setItem('AkitaStores', state);

    expect(JSON.parse(storageThatMayBeRefused.getItem('AkitaStores') as string)).toEqual(state);
  });

  it('leaves a string alone', () => {
    storageThatMayBeRefused.setItem('AkitaStores', '{"session":{}}');

    expect(store['AkitaStores']).toBe('{"session":{}}');
  });

  /**
   * The recovery. Every browser that has visited the site holds the broken
   * value, and without this they would go on throwing on it until somebody
   * cleared their site data.
   */
  it('treats the value it used to write as no state at all', () => {
    store['AkitaStores'] = '[object Object]';

    expect(storageThatMayBeRefused.getItem('AkitaStores')).toBeNull();
  });

  it('treats anything that cannot be a state as no state at all', () => {
    for (const rubbish of ['', 'undefined', 'null', '[1,2]', 'not json at all']) {
      store['AkitaStores'] = rubbish;
      expect(storageThatMayBeRefused.getItem('AkitaStores')).toBeNull();
    }
  });

  it('allows the whitespace a serialiser may leave in front', () => {
    store['AkitaStores'] = '  {"session":{}}';

    expect(storageThatMayBeRefused.getItem('AkitaStores')).toBe('  {"session":{}}');
  });

  /** The reason the wrapper exists: a browser that refuses storage outright. */
  it('says nothing when the browser refuses it', () => {
    vi.stubGlobal('window', {
      localStorage: {
        getItem: () => {
          throw new Error('Block All Cookies');
        },
        setItem: () => {
          throw new Error('QuotaExceededError');
        },
        clear: () => {
          throw new Error('nope');
        },
      },
    });

    expect(storageThatMayBeRefused.getItem('AkitaStores')).toBeNull();
    expect(() => storageThatMayBeRefused.setItem('AkitaStores', { a: 1 })).not.toThrow();
    expect(() => storageThatMayBeRefused.clear()).not.toThrow();
  });
});
