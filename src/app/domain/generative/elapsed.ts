/**
 * How long something has been running, said the way a person says it.
 *
 * Seconds were the only unit, which was fine while the atelier cut layers in
 * four. An edit is a hundred seconds a pass and a clip is twenty minutes, so a
 * run read `1247s` and the reader had to divide. Over an hour it was simply
 * unreadable.
 *
 * Pure, and in the domain, because a duration is arithmetic and the only way
 * to be sure about the boundaries — 59 to 60, 3599 to 3600 — is to test them
 * rather than to look at a page and nod.
 */
export function elapsed(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0s';

  const whole = Math.round(seconds);
  if (whole < 60) return `${whole}s`;

  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor((whole % 3600) / 60);
  const rest = whole % 60;

  // Under an hour, the seconds still matter: it is the difference between a
  // run that is nearly done and one that has another third to go.
  if (!hours) return rest ? `${minutes}m ${pad(rest)}s` : `${minutes}m`;

  // Over an hour they do not. Nobody waiting on a two-hour clip cares about
  // the odd seven seconds, and the number only gets longer.
  return minutes ? `${hours}h ${pad(minutes)}m` : `${hours}h`;
}

const pad = (value: number): string => String(value).padStart(2, '0');
