import { render } from '@testing-library/react';
import {
  DATE_FORMAT_FULL,
  DATE_FORMAT_MONTHNAME,
  DATE_FORMAT_MONTH_YEAR,
  DATE_FORMAT_SIMPLYBOOK,
  DATE_FORMAT_WITH_TIME_FULL,
  TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
  TIME_ELAPSED_FORMAT_LONG,
  TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
  TIME_ELAPSED_FORMAT_SHORT,
  TIME_ELAPSED_FORMAT_UP_TO_YEARS,
  formatDate,
  formatElapsedDate,
  getFormattedElapsedDate,
  isDateInRange,
} from '../dateTimeElapsed';

const initialProps = {
  publicationDate: '2018-10-01T08:00:00',
  changeDate: '2018-10-02T08:00:00',
};

beforeAll(() => {
  //Sun Oct 07 2018 08:00:00 GMT+0200 (Mitteleuropäische Sommerzeit) {}
  Date.now = jest.fn(() => 1538892000000);
  //Date.getTimeZoneOffset = jest.fn(() => 2);
});

afterAll(() => {
  Date.now = new Date();
});

beforeEach(() => {
  __SERVER__ = false;
});

describe('[SHARED] helpers - General getFormattedElapsedDate()', () => {
  it('Should render the changeDate as it is more than 12 hours ago', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: initialProps.changeDate,
      }),
    );
    expect(container.innerHTML).toBe('am 02.10.2018');
  });

  it('Should render an empty string as nothing was input', () => {
    const { container } = render(getFormattedElapsedDate({}));
    expect(container.innerHTML).toBe('');
  });

  it('Should render an empty string because there is no input but the prefix', () => {
    const { container } = render(getFormattedElapsedDate({ prefix: 'am  ' }));
    expect(container.innerHTML).toBe('');
  });

  it('Should render the createDate if there is no changeDate', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '',
      }),
    );
    expect(container.innerHTML).toBe('am 01.10.2018');
  });

  it('Should return nothing if empty dates were passed', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: '',
        changeDate: '',
      }),
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render the changeDate if publicatioDate is NULL', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: null,
        changeDate: '2018-10-04T06:00:00',
      }),
    );

    expect(container.innerHTML).toBe('am 04.10.2018');
  });

  it('SERVER: should return the date without calculating elapsed time', () => {
    __SERVER__ = true;
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '2018-10-04T06:00:00',
      }),
    );
    expect(container.innerHTML).toBe('am 04.10.2018');
  });

  it('SERVER: should return the changeDate if no publicationDate is given', () => {
    __SERVER__ = true;
    const { container } = render(
      getFormattedElapsedDate({
        createDate: '',
        changeDate: '2018-10-04T06:00:00',
      }),
    );
    expect(container.innerHTML).toBe('am 04.10.2018');
  });

  it('COMPACT FORMAT: Should render the minutes if the changeDate is within minutes', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '2018-10-07T07:55:00',
      }),
    );
    expect(container.innerHTML).toBe('vor 5 Minuten');
  });

  it('COMPACT FORMAT: Should render the minute (singular) if the changeDate is within a minute', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '2018-10-07T07:59:00',
      }),
    );
    expect(container.innerHTML).toBe('vor 1 Minute');
  });

  it('COMPACT FORMAT: Should render the hours if the changeDate is within hours', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '2018-10-06T20:55:00',
      }),
    );
    expect(container.innerHTML).toBe('vor 11 Stunden');
  });

  it('COMPACT FORMAT: Should render the hours if up to 23 hours', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '2018-10-06T08:55:00',
      }),
    );
    expect(container.innerHTML).toBe('vor 23 Stunden');
  });

  it('COMPACT FORMAT: Should render the hour (singular) if the changeDate is within an hour', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '2018-10-07T06:55:00',
      }),
    );
    expect(container.innerHTML).toBe('vor 1 Stunde');
  });

  it('FORMAT_LONG_WITH_TIME: Return createDate if changeDate is in future', () => {
    const createDate = '2022-09-27T06:00:00';
    const changeDate = '2148-09-27T07:00:00';
    const isChangeDateInRangeOfMaxHours = isDateInRange(changeDate, 11);

    const { container } = render(
      getFormattedElapsedDate({
        createDate,
        changeDate,
        maxHours: 11,
        showModificationDate: false,
        isChangeDateInRangeOfMaxHours,
        format: TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
        prefix: '',
      }),
    );

    expect(container.innerHTML).toBe('27.09.2022&nbsp;&nbsp;&nbsp;06:00');
  });

  it('FORMAT_LONG_WITH_TIME: Display `aktualisiert um hh:mm` if showModificationDate checkbox is set', () => {
    const createDate = '2022-09-27T07:00:00';
    const changeDate = '2022-09-27T08:00:00';
    const isChangeDateInRangeOfMaxHours = isDateInRange(changeDate, 11);

    const { container } = render(
      getFormattedElapsedDate({
        createDate,
        changeDate,
        isChangeDateInRangeOfMaxHours,
        maxHours: 11,
        showModificationDate: true,
        format: TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
        prefix: '',
      }),
    );

    expect(container.innerHTML).toBe('aktualisiert um 08:00');
  });

  it(`FORMAT_LONG_WITH_TIME: Display "dd.mm.yyyy hh:mm" format if hours of changeDate is bigger than maxHours
  but showModificationDate checkbox is enabled`, () => {
    const createDate = '2022-09-26T10:00:00';
    const changeDate = '2022-09-26T11:00:00';
    const isChangeDateInRangeOfMaxHours = isDateInRange(changeDate, 11);

    const { container } = render(
      getFormattedElapsedDate({
        createDate,
        changeDate,
        isChangeDateInRangeOfMaxHours,
        maxHours: 11,
        showModificationDate: true,
        format: TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
        prefix: '',
      }),
    );

    expect(container.innerHTML).toBe('26.09.2022&nbsp;&nbsp;&nbsp;11:00');
  });

  it(`FORMAT_LONG_WITH_TIME: Display "dd.mm.yyyy hh:mm" format if showModificationDate is enabled and
  hours of changeDate is smaller than maxHours
  but changeDate was on the day before`, () => {
    // explanation: There is a case when the showModificationDate checkbox is enabled and
    // the changeDate is in the range of maxHours but the changeDate was on the day before.
    // In this case we want to display the date with time format (dd.mm.yyyy hh:mm) because
    // it doesn't make sense to display "aktualisiert um 22:00" if the current time of the day is in example 08:00.

    const createDate = '2022-09-26T06:00:00';
    const changeDate = '2022-09-26T23:00:00';
    const isChangeDateInRangeOfMaxHours = isDateInRange(changeDate, 11);

    const { container } = render(
      getFormattedElapsedDate({
        createDate,
        changeDate,
        isChangeDateInRangeOfMaxHours,
        maxHours: 11,
        showModificationDate: true,
        format: TIME_ELAPSED_FORMAT_DATE_WITH_TIME,
        prefix: '',
      }),
    );

    expect(container.innerHTML).toBe('26.09.2022&nbsp;&nbsp;&nbsp;23:00');
  });

  it('FORMAT_LONG: Return only createDate if there is no changeDate', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: '2018-10-02T23:59:59',
        changeDate: '',
        format: TIME_ELAPSED_FORMAT_LONG,
        prefix: 'am   ',
      }),
    );

    expect(container.innerHTML).toBe('am 02.10.2018');
  });

  it('FORMAT_LONG: should return empty string if no date is input', () => {
    const { container } = render(
      getFormattedElapsedDate({
        format: TIME_ELAPSED_FORMAT_LONG,
        prefix: 'am   ',
      }),
    );

    expect(container.innerHTML).toBe('');
  });

  it('FORMAT_LONG: Return only createDate if changeDate >23h59m ago', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: initialProps.changeDate,
        format: TIME_ELAPSED_FORMAT_LONG,
        prefix: 'am   ',
      }),
    );

    expect(container.innerHTML).toBe('am 01.10.2018');
  });

  it('FORMAT_LONG: Should render minutes if dates are within minutes', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: '2018-10-07T07:55:00',
        changeDate: null,
        format: TIME_ELAPSED_FORMAT_LONG,
      }),
    );

    expect(container.innerHTML).toBe('vor 5 Minuten');
  });

  it('Should render only minutes if changeDate is within minutes and no publicationDate set (see bug HZ-520)', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: '',
        changeDate: '2018-10-07T07:55:00',
        prefix: 'am ',
      }),
    );

    expect(container.innerHTML).toBe('vor 5 Minuten');
  });

  it('FORMAT_LONG: Should render the publication date with minutes of the changeTime', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '2018-10-07T07:30:00',
        format: TIME_ELAPSED_FORMAT_LONG,
        showModificationDate: true,
      }),
    );

    expect(container.innerHTML).toBe('01.10.2018, aktualisiert vor 30 Minuten');
  });

  it('FORMAT_LONG: should return hours if hours<=23', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: '2018-10-06T20:00:00',
        format: TIME_ELAPSED_FORMAT_LONG,
      }),
    );

    expect(container.innerHTML).toBe('vor 12 Stunden');
  });

  it('FORMAT_LONG: should return createDate as elapsedTime is over the chosen maximum', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: '2018-10-06T20:00:00',
        format: TIME_ELAPSED_FORMAT_LONG,
        maxHours: 11,
      }),
    );

    expect(container.innerHTML).toBe('06.10.2018');
  });

  it('FORMAT_LONG: Should render the publication date as changeDate is at least an hour ago', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '2018-10-06T07:00:00',
        format: TIME_ELAPSED_FORMAT_LONG,
      }),
    );

    expect(container.innerHTML).toBe('01.10.2018');
  });

  it('FORMAT_LONG: Should return an empty string as invalid values are passed in', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: 'NaN',
        changeDate: 'NaN',
        format: TIME_ELAPSED_FORMAT_LONG,
      }),
    );

    expect(container.innerHTML).toBe('');
  });

  it('FORMAT_SHORT: should return date correctly', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: '2018-10-06T20:00:00',
        format: TIME_ELAPSED_FORMAT_SHORT,
      }),
    );

    expect(container.innerHTML).toBe('10.2018');
  });

  it('formatDate: should return date in DATE_FORMAT_MONTH_YEAR', () => {
    const { container } = render(
      formatDate('2018-10-06T20:00:00', DATE_FORMAT_MONTH_YEAR),
    );

    expect(container.innerHTML).toBe('10.2018');
  });

  it('formatDate: should return date in DATE_FORMAT_SIMPLYBOOK', () => {
    const { container } = render(
      formatDate('2018-10-06T20:00:00', DATE_FORMAT_SIMPLYBOOK),
    );

    expect(container.innerHTML).toBe('2018-10-06');
  });
});

it('formatDate: should return date in DATE_FORMAT_WITH_TIME_FULL', () => {
  const d1 = formatDate('2018-10-06T20:00:00', DATE_FORMAT_WITH_TIME_FULL);
  const d2 = formatDate('2018-01-16T02:59:59', DATE_FORMAT_WITH_TIME_FULL);
  const d3 = formatDate('2018-01-16T02:01:01', DATE_FORMAT_WITH_TIME_FULL);

  expect(d1).toBe('06.10.2018 - 20:00:00');
  expect(d2).toBe('16.01.2018 - 02:59:59');
  expect(d3).toBe('16.01.2018 - 02:01:01');
});

describe('Special cases for Schweizer Illustrierte', () => {
  it('FORMAT_MONTH: Should return only createDate with spelled out months if changeDate >11h59m ago', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: initialProps.changeDate,
        dateFormat: DATE_FORMAT_MONTHNAME,
        prefix: 'am   ',
      }),
    );

    expect(container.innerHTML).toBe('am 2. Oktober 2018');
  });

  it('FORMAT_MONTH: Should return elapsed hours if changeDate <23h59', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '2018-10-06T09:00:00',
        dateFormat: DATE_FORMAT_MONTHNAME,
        prefix: 'am   ',
      }),
    );

    expect(container.innerHTML).toBe('vor 23 Stunden');
  });

  it('FORMAT_UP_TO_YEARS: Should return the date if changeDate <23h59', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: '2016-10-05T08:00:00',
        changeDate: '2016-10-06T08:00:00',
        dateFormat: TIME_ELAPSED_FORMAT_UP_TO_YEARS,
        prefix: 'am   ',
      }),
    );

    expect(container.innerHTML).toBe('am 06.10.2016');
  });

  it('FORMAT_UP_TO_YEARS: Should return "vor 1 Jahr" if the createDate is between one and two years ago', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: '2017-03-18T07:00:00',
        format: TIME_ELAPSED_FORMAT_UP_TO_YEARS,
      }),
    );

    expect(container.innerHTML).toBe('vor 1 Jahr');
  });

  it('FORMAT_UP_TO_YEARS: Should return the createDate if it is more than two years ago', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: '2016-03-18T07:00:00',
        format: TIME_ELAPSED_FORMAT_UP_TO_YEARS,
      }),
    );

    expect(container.innerHTML).toBe('am 18.03.2016');
  });

  it('FORMAT_UP_TO_YEARS: Should return empty string if no Dates were passed in', () => {
    const { container } = render(
      getFormattedElapsedDate({
        dateFormat: TIME_ELAPSED_FORMAT_UP_TO_YEARS,
        prefix: 'am   ',
      }),
    );

    expect(container.innerHTML).toBe('');
  });
});

describe('Special cases for Handelszeitung', () => {
  it('FORMAT_FULL: Should render formatted date and time if full format is requested', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '2018-10-04T08:00:00',
        dateFormat: DATE_FORMAT_FULL,
        prefix: 'am',
      }),
    );

    expect(container.innerHTML).toBe('am 04.10.2018 - 08:00 Uhr');
  });

  it('FORMAT_FULL: Should render formatted date and time from createDate', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        dateFormat: DATE_FORMAT_FULL,
        prefix: 'am',
      }),
    );

    expect(container.innerHTML).toBe('am 01.10.2018 - 08:00 Uhr');
  });

  it('formatElapsedDate [HZ headless teaser]: Should render the elapsed hours', () => {
    const { container } = render(formatElapsedDate('2018-10-07T06:00:00'));

    expect(container.innerHTML).toBe('Publiziert vor 2 Stunden');
  });

  it('formatElapsedDate [HZ headless teaser]: Should render the elapsed hours lkknkj', () => {
    const { container } = render(formatElapsedDate('2018-10-06T21:00:00'));

    expect(container.innerHTML).toBe('Publiziert vor 11 Stunden');
  });

  it('formatElapsedDate [HZ headless teaser]: Should render the elapsed minutes', () => {
    const { container } = render(formatElapsedDate('2018-10-07T07:55:00'));

    expect(container.innerHTML).toBe('Publiziert vor 5 Minuten');
  });

  it('formatElapsedDate [HZ headless teaser]: Should render the date if it is >23h59', () => {
    const { container } = render(formatElapsedDate('2018-10-06T07:59:59'));

    expect(container.innerHTML).toBe('Publiziert am 06.10.2018');
  });

  it('formatElapsedDate [HZ headless teaser]: Should return empty string if input cannot be turned into a number', () => {
    const { container } = render(formatElapsedDate('Vorgestern'));

    expect(container.innerHTML).toBe('');
  });
});

describe('Special cases for French Sites', () => {
  it('FORMAT_MONTHNAME_FULL: Should return correct prefix for ILE', () => {
    const { container } = render(
      getFormattedElapsedDate({
        createDate: initialProps.publicationDate,
        changeDate: '2018-10-07T07:59:00',
        format: TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
        maxHours: 11,
        prefix: 'le',
        language: 'FR',
        postfix: ', modifié il y a',
      }),
    );

    expect(container.innerHTML).toBe(
      'le 1 octobre 2018 - 08:00, modifié il y a 1 minute',
    );
  });

  it('FORMAT_MONTHNAME_FULL: Should return correct prefix for Gault&Millau', () => {
    const { container } = render(
      getFormattedElapsedDate({
        changeDate: '2018-10-07T07:59:00',
        format: TIME_ELAPSED_FORMAT_MONTHNAME_FULL,
        language: 'FR',
      }),
    );
    expect(container.innerHTML).toBe('Publié il y a 1 minute');
  });
});
