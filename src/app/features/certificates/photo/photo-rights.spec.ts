import { DEFAULT_ARTIST, PhotoRights, defaultNotice } from './photo-rights';

/** What gets written into the file once the photograph is corrected. */
describe('PhotoRights', () => {
  beforeEach(() => localStorage.clear());

  it('is filled in before anybody types, since the answer never changes', () => {
    const panel = new PhotoRights();

    expect(panel.artist()).toBe(DEFAULT_ARTIST);
    expect(panel.notice()).toBe(defaultNotice());
    expect(panel.webStatement()).toContain('juanmamoreno.com/terms');
  });

  it('says this year, not the year it was written', () => {
    expect(defaultNotice()).toContain(String(new Date().getFullYear()));
  });

  it('writes nothing at all without a name to attribute it to', () => {
    const panel = new PhotoRights();

    panel.setArtist('   ');

    expect(panel.rights()).toBeNull();
    expect(panel.noticePreview()).toBe('');
  });

  it('lets a field be emptied and keeps it empty', () => {
    // Absent and empty are different: treating them alike meant a field filled
    // itself in again on the next visit.
    new PhotoRights().setNotice('');

    expect(new PhotoRights().notice()).toBe('');
  });

  it('remembers what was typed', () => {
    new PhotoRights().setArtist('Someone Else');

    expect(new PhotoRights().artist()).toBe('Someone Else');
  });
});
