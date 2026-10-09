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

  it('draws nothing for a node of a kind the engine does not have', () => {
    // A saved graph can outlive the engine that could run it.
    const { host } = build([EDIT], aNode('vanished'));

    expect(host.querySelectorAll('.node')).toHaveLength(0);
  });
});
