export type ApiResponse<T> = {
  readonly success: boolean;
  readonly message?: string;
  readonly data?: T;
  readonly error?: Error;
};

/**
 * What the backend actually sent, out of the envelope it sends it in.
 *
 * **Every route there answers `{ success, message, data }`.** An interceptor
 * wraps whatever the controller returned and the controllers never see it, so
 * a caller that reads the body as the payload gets the envelope instead —
 * silently, because an envelope is a perfectly good object. That is what left
 * the kept shelf empty on the catalogue page while the bucket filled up, and
 * what threw "f is not iterable" out of a save that had already succeeded.
 *
 * A bare payload is passed through, so this keeps working if the envelope is
 * ever dropped, and a refusal carried inside a 200 is thrown rather than
 * quietly becoming `undefined`.
 */
export function inside<T>(answer: unknown): T {
  if (!answer || typeof answer !== 'object' || !('success' in answer)) return answer as T;
  const envelope = answer as ApiResponse<T>;
  if (!envelope.success) throw new Error(envelope.message || 'the backend refused it');
  return envelope.data as T;
}
