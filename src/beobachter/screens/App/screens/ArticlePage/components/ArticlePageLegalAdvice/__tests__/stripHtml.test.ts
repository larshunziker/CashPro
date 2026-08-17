import { stripHtml } from '../stripHtml';

describe('stripHtml', () => {
  it('removes simple HTML tags', () => {
    expect(stripHtml('<b>Bold</b>')).toBe('Bold');
    expect(stripHtml('<i>Italic</i>')).toBe('Italic');
  });

  it('removes tags with punctuation after them', () => {
    expect(stripHtml('<b>,')).toBe(',');
    expect(stripHtml('<b>.')).toBe('.');
    expect(stripHtml('<b>:')).toBe(':');
    expect(stripHtml('<b>)')).toBe(')');
    expect(stripHtml('<b>?')).toBe('?');
  });

  it('removes tags inside text', () => {
    expect(stripHtml('Hello <b>world</b>!')).toBe('Hello world!');
    expect(stripHtml('A <span>test</span> string.')).toBe('A test string.');
  });

  it('handles empty string', () => {
    expect(stripHtml('')).toBe('');
  });

  it('returns string unchanged if no tags', () => {
    expect(stripHtml('No tags here.')).toBe('No tags here.');
  });

  it('removes malformed tags', () => {
    expect(stripHtml('<b>Bold')).toBe('Bold');
    expect(stripHtml('Text <b>')).toBe('Text ');
  });
  it('removes malformed tags', () => {
    expect(
      stripHtml(
        '<p><b>Frage: Im Sommer habe ich die Lehre beendet. Bis zum RS-Beginn am 1. November kann ich im Lehrbetrieb bleiben. Dann muss ich etwas Neues suchen. Muss mir der Chef während der RS Lohn zahlen?</b></p>',
      ),
    ).toBe(
      'Frage: Im Sommer habe ich die Lehre beendet. Bis zum RS-Beginn am 1. November kann ich im Lehrbetrieb bleiben. Dann muss ich etwas Neues suchen. Muss mir der Chef während der RS Lohn zahlen?',
    );
  });
});
