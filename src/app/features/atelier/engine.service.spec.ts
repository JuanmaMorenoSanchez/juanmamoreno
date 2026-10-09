import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AtelierEngineService } from './engine.service';

/**
 * Talking to a program on his own machine.
 *
 * Two things here are not ordinary HTTP and are the reason this is `fetch` and
 * not `HttpClient`: every request has to be annotated for Chrome's local
 * network permission, and a failure to connect is a normal state of the page
 * rather than an error to throw.
 */
describe('AtelierEngineService', () => {
  let service: AtelierEngineService;

  beforeEach(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    service = TestBed.inject(AtelierEngineService);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const answering = (body: unknown, ok = true) => {
    const fetched = vi.fn().mockResolvedValue({
      ok,
      status: ok ? 200 : 500,
      json: () => Promise.resolve(body),
      text: () => Promise.resolve(typeof body === 'string' ? body : ''),
    });
    vi.stubGlobal('fetch', fetched);
    return fetched;
  };

  it('knows nothing before it has asked', () => {
    expect(service.health()).toBeNull();
    expect(service.unreachable()).toBe(false);
  });

  it('reads how much of the card is free', async () => {
    answering({ device: 'cuda', resident: null, vram_free_mib: 7096, vram_total_mib: 8187 });

    await service.check();

    expect(service.unreachable()).toBe(false);
    expect(service.health()).toEqual({
      device: 'cuda',
      resident: null,
      vramFreeMib: 7096,
      vramTotalMib: 8187,
    });
  });

  it('declares the loopback address space, which is not the same as local', async () => {
    // Chrome has gated a page reaching 127.0.0.1 since Chromium 142. It counts
    // three address spaces, and `local` is a LAN address like 192.168.1.5 —
    // declaring that for a loopback address is refused outright rather than
    // treated as near enough: "had a target IP address space of `local` yet the
    // resource is in address space `loopback`". Which is how this was found.
    const fetched = answering({
      device: 'cpu',
      resident: null,
      vram_free_mib: null,
      vram_total_mib: null,
    });

    await service.check();

    const init = fetched.mock.calls[0][1] as { targetAddressSpace?: string };
    expect(init.targetAddressSpace).toBe('loopback');
  });

  it('treats not being able to reach it as a state, not an error', async () => {
    // The engine is a process he starts by hand, so the page is often open
    // before it is running. Throwing here would make the ordinary case look
    // like a fault.
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));

    await expect(service.check()).resolves.toBeUndefined();

    expect(service.unreachable()).toBe(true);
    expect(service.health()).toBeNull();
  });

  it('counts a bad answer as unreachable too', async () => {
    answering('', false);

    await service.check();

    expect(service.unreachable()).toBe(true);
  });

  it('recovers once the engine is started', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await service.check();
    expect(service.unreachable()).toBe(true);

    answering({ device: 'cuda', resident: null, vram_free_mib: 7000, vram_total_mib: 8187 });
    await service.check();

    expect(service.unreachable()).toBe(false);
  });

  it('sends the labels one per line and renames the awkward field', async () => {
    const fetched = answering({
      batch: 'abc',
      seconds: 3,
      layers: [],
      background: null,
      not_found: ['a cathedral'],
    });

    const result = await service.cut(new Blob([new Uint8Array([1])]), ['a girl', 'a shirt'], true);

    const body = fetched.mock.calls[0][1].body as FormData;
    expect(body.get('labels')).toBe('a girl\na shirt');
    expect(body.get('fill_behind')).toBe('true');
    expect(result.notFound).toEqual(['a cathedral']);
  });

  it('throws with what the engine said, so the page can repeat it', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        text: () => Promise.resolve('name at least one thing to cut'),
      })
    );

    await expect(service.cut(new Blob(), [], false)).rejects.toThrow(
      'name at least one thing to cut'
    );
  });
});
