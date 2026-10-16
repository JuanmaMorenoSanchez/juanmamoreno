import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { NodeCanvasComponent } from './node-canvas.component';
import type { NodeTypeDef } from './engine.service';

const EDIT: NodeTypeDef = {
  key: 'edit',
  label: 'Edit',
  category: 'paint',
  summary: 'change part of a painting by asking',
  help: 'Changes part of a painting by asking in words.\n\nMinutes, not seconds.',
  inputs: [
    { name: 'image', kind: 'image', optional: false },
    { name: 'mask', kind: 'mask', optional: true },
  ],
  outputs: [{ name: 'image', kind: 'image', optional: false }],
  params: [
    {
      name: 'instruction',
      kind: 'text',
      default: 'make it red',
      label: 'What to change',
      choices: [],
      minimum: null,
      maximum: null,
      step: null,
      help: 'An instruction rather than a description.',
    },
  ],
};

/**
 * The canvas knows the name of no node.
 *
 * Everything it draws — the boxes, their ports, their controls and the
 * explanation behind the ? — comes from the catalogue the engine publishes. So
 * what is worth testing is that it really does render whatever it is handed,
 * including a node invented for this test, and that it survives an engine that
 * sends less than it expects.
 */
describe('NodeCanvasComponent', () => {
  const build = (catalogue: NodeTypeDef[], nodes: unknown[] = [], edges: unknown[] = []) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [NodeCanvasComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(NodeCanvasComponent);
    fixture.componentRef.setInput('catalogue', catalogue);
    fixture.componentRef.setInput('nodes', nodes);
    fixture.componentRef.setInput('edges', edges);
    fixture.detectChanges();
    return { fixture, host: fixture.nativeElement as HTMLElement };
  };

  const aNode = (type = 'edit') => [{ id: 'n1', type, x: 10, y: 20, params: {} }];

  it('draws a palette from whatever the engine sent, including a node it has never heard of', () => {
    const { host } = build([{ ...EDIT, key: 'invented', label: 'Invented Later' }]);

    expect(host.textContent).toContain('Invented Later');
  });

  it('puts a question mark beside the name of every box', () => {
    const { host } = build([EDIT], aNode());

    expect(host.querySelectorAll('.help-mark')).toHaveLength(1);
  });

  it('opens the explanation when the question mark is hovered', () => {
    const { fixture, host } = build([EDIT], aNode());
    expect(host.querySelector('.help-panel')).toBeNull();

    host.querySelector('.help-dot')?.dispatchEvent(new PointerEvent('pointerenter'));
    fixture.detectChanges();

    expect(host.querySelector('.help-panel')?.textContent).toContain('asking in words');
  });

  it('closes it again when the pointer leaves, unless it was pinned', () => {
    const { fixture, host } = build([EDIT], aNode());
    const dot = host.querySelector('.help-dot') as Element;

    dot.dispatchEvent(new PointerEvent('pointerenter'));
    fixture.detectChanges();
    dot.dispatchEvent(new PointerEvent('pointerleave'));
    fixture.detectChanges();

    expect(host.querySelector('.help-panel')).toBeNull();
  });

  it('keeps it open once pressed, because a long explanation cannot be read while holding still', () => {
    const { fixture, host } = build([EDIT], aNode());
    const dot = host.querySelector('.help-dot') as Element;

    dot.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();
    dot.dispatchEvent(new PointerEvent('pointerleave'));
    fixture.detectChanges();

    expect(host.querySelector('.help-panel')).not.toBeNull();
  });

  it('says what each control does, not only that it exists', () => {
    const { fixture, host } = build([EDIT], aNode());
    host.querySelector('.help-dot')?.dispatchEvent(new PointerEvent('pointerenter'));
    fixture.detectChanges();
    const panel = host.querySelector('.help-panel')?.textContent ?? '';

    expect(panel).toContain('What you can adjust');
    expect(panel).toContain('An instruction rather than a description');
  });

  it('names the ports, and says which may be left alone', () => {
    const { fixture, host } = build([EDIT], aNode());
    host.querySelector('.help-dot')?.dispatchEvent(new PointerEvent('pointerenter'));
    fixture.detectChanges();
    const panel = host.querySelector('.help-panel')?.textContent ?? '';

    expect(panel).toContain('mask (optional)');
  });

  it('survives an engine older than itself, which sends no explanation at all', () => {
    // The page reads its whole vocabulary from the engine, so it can meet one
    // that predates a field. This happened: the first attempt crashed the
    // canvas against an engine started before the help text existed.
    const older = { ...EDIT } as Partial<NodeTypeDef>;
    delete older.help;
    const { fixture, host } = build([older as NodeTypeDef], aNode());

    host.querySelector('.help-dot')?.dispatchEvent(new PointerEvent('pointerenter'));
    fixture.detectChanges();

    expect(host.querySelector('.help-panel')?.textContent).toContain('did not send an explanation');
  });

  /**
   * A sentence gets a box, and a number outside its sensible band gets a line
   * of red under it.
   *
   * Both come from the engine: the kind of control, and the words saying what
   * twelve steps does. This page knows neither, and an engine older than the
   * advice says nothing rather than having this page guess for it.
   */
  describe('the controls a setting gets', () => {
    const steps = (over: Partial<NodeTypeDef['params'][0]> = {}) => ({
      name: 'steps',
      kind: 'number' as const,
      default: 20,
      label: 'Steps',
      choices: [],
      minimum: 4,
      maximum: 50,
      step: 1,
      help: 'How many passes.',
      advice: {
        below: 12,
        above: 35,
        low: 'Below about ten passes it tends to come apart.',
        high: 'Each pass costs about a hundred seconds here.',
      },
      ...over,
    });
    const withSteps = (params: NodeTypeDef['params']): NodeTypeDef => ({ ...EDIT, params });
    const node = (params: Record<string, unknown>) => [
      { id: 'n1', type: 'edit', x: 0, y: 0, params },
    ];

    it('gives free text a box, because an instruction is a sentence', () => {
      const { host } = build([EDIT], node({ instruction: 'make the jumper deep red' }));

      const box = host.querySelector('textarea');
      expect(box).not.toBeNull();
      expect(box?.value).toBe('make the jumper deep red');
      expect(host.querySelector("input[type='text']")).toBeNull();
    });

    it('says nothing while a number is inside its band', () => {
      const { host } = build([withSteps([steps()])], node({ steps: 20 }));

      expect(host.querySelector('[data-testid="caution-n1-steps"]')).toBeNull();
    });

    it('warns in the words the engine sent, when a number is too low', () => {
      const { host } = build([withSteps([steps()])], node({ steps: 6 }));

      expect(host.querySelector('[data-testid="caution-n1-steps"]')?.textContent).toContain(
        'tends to come apart'
      );
    });

    it('warns when a number is too high', () => {
      const { host } = build([withSteps([steps()])], node({ steps: 48 }));

      expect(host.querySelector('[data-testid="caution-n1-steps"]')?.textContent).toContain(
        'hundred seconds'
      );
    });

    it('is quiet on an engine that sends no advice at all', () => {
      // Which is every engine older than the field.
      const { host } = build([withSteps([steps({ advice: undefined })])], node({ steps: 50 }));

      expect(host.querySelector('[data-testid="caution-n1-steps"]')).toBeNull();
    });

    it('never warns about a value it was not given', () => {
      const { host } = build([withSteps([steps()])], node({}));

      expect(host.querySelector('[data-testid="caution-n1-steps"]')).toBeNull();
    });

    it('makes the box taller when a warning is showing, so rows do not overlap', () => {
      // Every row was twenty pixels while every control was one line. A box
      // three lines tall and a line of red underneath are not.
      const tight = build([withSteps([steps()])], node({ steps: 20 }));
      const tall = build([withSteps([steps()])], node({ steps: 6 }));

      const height = (host: HTMLElement) =>
        Number(host.querySelector('.node rect')?.getAttribute('height') ?? 0);

      expect(height(tall.host)).toBeGreaterThan(height(tight.host));
    });
  });

  it('draws nothing for a node of a kind the engine does not have', () => {
    // A saved graph can outlive the engine that could run it.
    const { host } = build([EDIT], aNode('vanished'));

    expect(host.querySelectorAll('.node')).toHaveLength(0);
  });

  /**
   * A setting with a list of values, drawn as a list.
   *
   * The engine says what the values are, exactly as it says what the nodes
   * and the ports are, so a third style added there is a third option here
   * with nothing released. The alternative was a text field, which takes a
   * typo and fails eighteen minutes later with the card already warm.
   */
  describe('a setting with a fixed set of values', () => {
    const STYLED: NodeTypeDef = {
      ...EDIT,
      key: 'my-style',
      label: 'My style',
      params: [
        {
          name: 'style',
          kind: 'choice',
          default: 'oil',
          label: 'Which hand',
          choices: ['oil', 'watercolour'],
          minimum: null,
          maximum: null,
          step: null,
          help: 'Each is a different set of his paintings.',
        },
      ],
    };

    it('offers exactly what the engine listed, in that order', () => {
      const { host } = build([STYLED], [{ id: 'n1', type: 'my-style', x: 0, y: 0, params: {} }]);
      const options = [...host.querySelectorAll('option')].map((o) => o.textContent?.trim());

      expect(host.querySelector('select')).not.toBeNull();
      expect(options).toEqual(['oil', 'watercolour']);
    });

    it('shows the one the node is set to, not the first in the list', () => {
      const { host } = build(
        [STYLED],
        [{ id: 'n1', type: 'my-style', x: 0, y: 0, params: { style: 'watercolour' } }]
      );
      const chosen = [...host.querySelectorAll('option')].find(
        (o) => (o as HTMLOptionElement).selected
      );

      expect(chosen?.textContent?.trim()).toBe('watercolour');
    });

    it('reports the choice as a change to the graph', () => {
      const { fixture, host } = build(
        [STYLED],
        [{ id: 'n1', type: 'my-style', x: 0, y: 0, params: { style: 'oil' } }]
      );
      let sent: unknown = null;
      fixture.componentInstance.changed.subscribe((value: unknown) => (sent = value));

      const select = host.querySelector('select') as HTMLSelectElement;
      select.value = 'watercolour';
      select.dispatchEvent(new Event('change'));

      expect(sent).not.toBeNull();
    });
  });
});
