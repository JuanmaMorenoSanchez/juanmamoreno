import { SOLDCERTIFICATES } from './artwork.constants';

describe('SOLDCERTIFICATES', () => {
  it('contains no duplicate token ids', () => {
    const duplicates = SOLDCERTIFICATES.filter((id, i) => SOLDCERTIFICATES.indexOf(id) !== i);
    expect(duplicates).toEqual([]);
  });

  it('contains only numeric token id strings', () => {
    const nonNumeric = SOLDCERTIFICATES.filter((id) => !/^[0-9]+$/.test(id));
    expect(nonNumeric).toEqual([]);
  });
});
