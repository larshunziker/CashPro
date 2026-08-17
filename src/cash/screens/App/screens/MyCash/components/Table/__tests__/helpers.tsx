import {
  calculatePercentagePerformance,
  getGroupedInstruments,
  getTotals,
  groupByType,
} from '../components/helpers';
import { OTHER_ASSETS_TITLE } from '../constants';

describe('[Performance calculation helper]', () => {
  test('Basic performance calculations 1', () => {
    expect(calculatePercentagePerformance(100, 80)).toBe('25.00');
  });
  test('Basic performance calculations 2', () => {
    expect(calculatePercentagePerformance(80, 100)).toBe('-20.00');
  });
  test('Basic performance calculations 3', () => {
    expect(calculatePercentagePerformance(0, 100)).toBe('-100.00');
  });
  test('Basic performance calculations 4', () => {
    expect(calculatePercentagePerformance(100, 1)).toBe('9900.00');
  });
  test('Short sell performance calculations 1', () => {
    expect(calculatePercentagePerformance(-90, -100)).toBe('10.00');
  });
  test('Short sell performance calculations 2', () => {
    expect(calculatePercentagePerformance(-110, -100)).toBe('-10.00');
  });
  test('Short sell performance calculations 3', () => {
    expect(calculatePercentagePerformance(-3469, -7000)).toBe('50.44');
  });
  test('Short sell performance calculations 4', () => {
    expect(calculatePercentagePerformance(3479, -7000)).toBe('149.70');
  });
  test('Short sell performance calculations 5', () => {
    expect(calculatePercentagePerformance(-3479, 7000)).toBe('-149.70');
  });
});

describe('[MyCash Table] helpers', () => {
  test.each([
    {
      input: { title: '', instruments: [] },
      expected: {
        accountPercent: '',
        accountPlusMinus: '',
        actualPrice: '0',
        fees: '',
        identifier: 'totals-row-identifier',
        name: '',
        mName: '',
        paidPrice: '',
        partInPercent: '',
      },
    },
    {
      input: { title: 'Total', instruments: null },
      expected: {
        accountPercent: '',
        accountPlusMinus: '',
        actualPrice: '0',
        fees: '',
        identifier: 'totals-row-identifier',
        mName: 'Total',
        name: 'Total',
        paidPrice: '',
        partInPercent: '',
      },
    },
    {
      input: {
        title: 'Total',
        instruments: [
          {
            fees: 0,
            paidPrice: 8,
            actualPrice: 10,
            accountPercent: NaN,
            accountPlusMinus: '',
            partInPercent: 10.44,
          },
        ],
      },
      expected: {
        accountPercent: '',
        accountPlusMinus: '',
        actualPrice: '10',
        fees: '',
        identifier: 'totals-row-identifier',
        name: 'Total',
        mName: 'Total',
        paidPrice: '8',
        partInPercent: '10.44',
      },
    },
    {
      input: {
        title: 'Total',
        instruments: [
          {
            fees: 2,
            paidPrice: 50.55,
            actualPrice: 60,
            accountPercent: 2,
            accountPlusMinus: 3.5,
            partInPercent: 9.24,
          },
        ],
      },
      expected: {
        accountPercent: '2.00',
        accountPlusMinus: 3.5,
        actualPrice: '60',
        fees: '2',
        identifier: 'totals-row-identifier',
        name: 'Total',
        mName: 'Total',
        paidPrice: '50.55',
        partInPercent: '9.24',
      },
    },
    {
      input: {
        title: 'Total',
        instruments: [
          {
            fees: 2,
            paidPrice: 50.55,
            actualPrice: 60,
            accountPercent: 2,
            accountPlusMinus: 3.5,
            partInPercent: 1.11,
          },
          {
            fees: 3,
            paidPrice: 25,
            actualPrice: 20,
            accountPercent: 12.12,
            accountPlusMinus: 4.12,
            partInPercent: 2.22,
          },
        ],
      },
      expected: {
        accountPercent: '5.89',
        accountPlusMinus: '4.450000000000003',
        fullquoteUri: '',
        actualPrice: '80',
        fees: '5',
        identifier: 'totals-row-identifier',
        name: 'Total',
        mName: 'Total',
        paidPrice: '75.55',
        partInPercent: '3.33',
      },
    },
  ])('Should match getTotals snapshot %#', ({ input, expected }) => {
    const totals = getTotals({
      title: input.title,
      // @ts-ignore
      instruments: input.instruments,
    });
    expect(totals).toEqual(expected);
  });

  test.each([
    {
      input: { groupType: 'market', instruments: [] },
      expected: [],
    },
    {
      input: {
        groupType: 'market',
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '0',
          },
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: 'fsdfsdf-537-333',
            mName: 'UBS',
            quantity: '5',
            mCur: 'CHF',
            market: 'SWX',
            fees: '0',
          },
          {
            id: 'sf3a=',
            type: 'ETF',
            otherAsset: false,
            instrumentKey: 'sdfw-537-333',
            mName: 'SP500 ETF',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'kjhgk=',
            type: 'DER',
            otherAsset: false,
            instrumentKey: 'ghjkf-537-333',
            mName: 'BMW',
            quantity: '5',
            mCur: 'EUR',
            market: 'XMLI',
            fees: '432',
          },
        ],
      },
      expected: ['UTC', 'Other Assets', 'SWX', 'XMLI'],
    },
    {
      input: {
        groupType: 'paper-values',
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '0',
          },
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: 'fsdfsdf-537-333',
            mName: 'UBS',
            quantity: '5',
            mCur: 'CHF',
            market: 'SWX',
            fees: '0',
          },
          {
            id: 'sf3a=',
            type: 'ETF',
            otherAsset: false,
            instrumentKey: 'sdfw-537-333',
            mName: 'SP500 ETF',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'kjhgk=',
            type: 'DER',
            otherAsset: false,
            instrumentKey: 'ghjkf-537-333',
            mName: 'BMW',
            quantity: '5',
            mCur: 'EUR',
            market: 'XMLI',
            fees: '432',
          },
        ],
      },
      expected: ['EQU', 'COM', 'ETF', 'DER'],
    },
    {
      input: {
        groupType: 'currency',
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '0',
          },
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: 'fsdfsdf-537-333',
            mName: 'UBS',
            quantity: '5',
            mCur: 'CHF',
            market: 'SWX',
            fees: '0',
          },
          {
            id: 'sf3a=',
            type: 'ETF',
            otherAsset: false,
            instrumentKey: 'sdfw-537-333',
            mName: 'SP500 ETF',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'kjhgk=',
            type: 'DER',
            otherAsset: false,
            instrumentKey: 'ghjkf-537-333',
            mName: 'BMW',
            quantity: '5',
            mCur: 'EUR',
            market: 'XMLI',
            fees: '432',
          },
        ],
      },
      expected: ['USD', 'CHF', 'EUR'],
    },
  ])('Should match groupByType snapshot %#', ({ input, expected }) => {
    const totals = groupByType(input.instruments, input.groupType, {
      market: 'market',
      currency: 'mCur',
      'paper-values': 'type',
    });
    expect(totals).toEqual(expected);
  });

  it('should return correct group', () => {
    const instruments = [
      {
        id: 'hrtksfg=',
        type: 'EQU',
        otherAsset: false,
        instrumentKey: '11448018-537-333',
        mName: 'Tesla Rg',
        quantity: '5',
        mCur: 'USD',
        currency: 'USD',
        market: 'UTC',
        fees: '0',
      },
      {
        id: 'fdsfsdfdsf=',
        type: 'COM',
        otherAsset: true,
        instrumentKey: 'asdf-537-333',
        mName: 'Weinkeller',
        quantity: '5',
        mCur: null,
        currency: 'USD',
        market: null,
        fees: '0',
      },
      {
        id: 'hrtksfg=',
        type: 'EQU',
        otherAsset: false,
        instrumentKey: 'fsdfsdf-537-333',
        mName: 'UBS',
        quantity: '5',
        mCur: 'CHF',
        currency: 'CHF',
        market: 'SWX',
        fees: '0',
      },
    ];
    const totals = groupByType(instruments, 'currency');
    expect(totals).toEqual(['USD', 'CHF']);
  });

  test.each([
    {
      input: { groupType: 'market', instruments: [] },
      expected: [],
    },
    {
      input: {
        groupType: 'market',
        group: OTHER_ASSETS_TITLE,
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '0',
          },
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: 'fsdfsdf-537-333',
            mName: 'UBS',
            quantity: '5',
            mCur: 'CHF',
            market: 'SWX',
            fees: '0',
          },
          {
            id: 'sf3a=',
            type: 'ETF',
            otherAsset: false,
            instrumentKey: 'sdfw-537-333',
            mName: 'SP500 ETF',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'kjhgk=',
            type: 'DER',
            otherAsset: false,
            instrumentKey: 'ghjkf-537-333',
            mName: 'BMW',
            quantity: '5',
            mCur: 'EUR',
            market: 'XMLI',
            fees: '432',
          },
        ],
      },
      expected: [
        {
          mCur: 'USD',
          fees: '0',
          id: 'fdsfsdfdsf=',
          instrumentKey: 'asdf-537-333',
          market: null,
          mName: 'Weinkeller',
          otherAsset: true,
          quantity: '5',
          type: 'COM',
        },
      ],
    },
    {
      input: {
        groupType: 'paper-values',
        group: 'EQU',
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '0',
          },
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: 'fsdfsdf-537-333',
            mName: 'UBS',
            quantity: '5',
            mCur: 'CHF',
            market: 'SWX',
            fees: '0',
          },
          {
            id: 'sf3a=',
            type: 'ETF',
            otherAsset: false,
            instrumentKey: 'sdfw-537-333',
            mName: 'SP500 ETF',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'kjhgk=',
            type: 'DER',
            otherAsset: false,
            instrumentKey: 'ghjkf-537-333',
            mName: 'BMW',
            quantity: '5',
            mCur: 'EUR',
            market: 'XMLI',
            fees: '432',
          },
        ],
      },
      expected: [
        {
          mCur: 'USD',
          fees: '0',
          id: 'hrtksfg=',
          instrumentKey: '11448018-537-333',
          market: 'UTC',
          mName: 'Tesla Rg',
          otherAsset: false,
          quantity: '5',
          type: 'EQU',
        },
        {
          mCur: 'CHF',
          fees: '0',
          id: 'hrtksfg=',
          instrumentKey: 'fsdfsdf-537-333',
          market: 'SWX',
          mName: 'UBS',
          otherAsset: false,
          quantity: '5',
          type: 'EQU',
        },
      ],
    },
    {
      input: {
        groupType: 'currency',
        group: 'CHF',
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '0',
          },
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: 'fsdfsdf-537-333',
            mName: 'UBS',
            quantity: '5',
            mCur: 'CHF',
            market: 'SWX',
            fees: '0',
          },
          {
            id: 'sf3a=',
            type: 'ETF',
            otherAsset: false,
            instrumentKey: 'sdfw-537-333',
            mName: 'SP500 ETF',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '0',
          },
          {
            id: 'kjhgk=',
            type: 'DER',
            otherAsset: false,
            instrumentKey: 'ghjkf-537-333',
            mName: 'BMW',
            quantity: '5',
            mCur: 'EUR',
            market: 'XMLI',
            fees: '432',
          },
        ],
      },
      expected: [
        {
          mCur: 'CHF',
          fees: '0',
          id: 'hrtksfg=',
          instrumentKey: 'fsdfsdf-537-333',
          market: 'SWX',
          mName: 'UBS',
          otherAsset: false,
          quantity: '5',
          type: 'EQU',
        },
      ],
    },
  ])(
    'Should match getGroupedInstruments snapshot %#',
    ({ input, expected }) => {
      const totals = getGroupedInstruments(
        input.instruments,
        input.groupType,
        // @ts-ignore
        input.group,
        {
          market: 'market',
          currency: 'mCur',
          'paper-values': 'type',
        },
      );
      expect(totals).toEqual(expected);
    },
  );

  test.each([
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: null,
            paidPrice: null,
            actualPrice: null,
          },
        ],
      },
      // null
      expectedTotals: {
        fees: '',
        paidPrice: '',
        actualPrice: '0',
      },
    },
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: undefined,
            paidPrice: undefined,
            actualPrice: undefined,
          },
        ],
      },
      // undefined
      expectedTotals: {
        fees: '',
        paidPrice: '',
        actualPrice: '0',
      },
    },
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '20',
            paidPrice: '20',
            actualPrice: '20',
          },
        ],
      },
      expectedTotals: {
        fees: '20',
        paidPrice: '20',
        actualPrice: '20',
      },
    },
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '1000.5',
            paidPrice: '1000.5',
            actualPrice: '1000.5',
          },
        ],
      },
      // '1005.5' + '105.5' => 1111.00 (calc numbers > 1000)
      expectedTotals: {
        fees: '1000.5',
        paidPrice: '1000.5',
        actualPrice: '1000.5',
      },
    },
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            lval: '200',
          },
        ],
      },
      // make sure lval doesn't get added to totals
      expectedTotals: {
        fees: '',
        paidPrice: '',
        actualPrice: '0',
      },
    },
  ])('Calc Totals with a single instrument', ({ input, expectedTotals }) => {
    const totals = getTotals(input);

    for (const key of Object.keys(expectedTotals)) {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ExtendedInstrumen */
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ fees */
      expect(totals[key]).toEqual(expectedTotals[key]);
    }
  });

  test.each([
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: null,
            paidPrice: null,
            actualPrice: null,
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: null,
            paidPrice: null,
            actualPrice: null,
          },
        ],
      },
      // null + null
      expectedTotals: {
        fees: '',
        paidPrice: '',
        actualPrice: '0',
      },
    },
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: undefined,
            paidPrice: undefined,
            actualPrice: undefined,
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: undefined,
            paidPrice: undefined,
            actualPrice: undefined,
          },
        ],
      },
      // undefined + undefined
      expectedTotals: {
        fees: '',
        paidPrice: '',
        actualPrice: '0',
      },
    },
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: null,
            paidPrice: null,
            actualPrice: null,
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '20',
            paidPrice: '20',
            actualPrice: '20',
          },
        ],
      },
      // null + '20'
      expectedTotals: {
        fees: '20',
        paidPrice: '20',
        actualPrice: '20',
      },
    },
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: undefined,
            paidPrice: undefined,
            actualPrice: undefined,
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '20',
            paidPrice: '20',
            actualPrice: '20',
          },
        ],
      },
      // undefined + '20'
      expectedTotals: {
        fees: '20',
        paidPrice: '20',
        actualPrice: '20',
      },
    },
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '20',
            paidPrice: '20',
            actualPrice: '20',
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '5',
            paidPrice: '5',
            actualPrice: '5',
          },
        ],
      },
      // '5' + '20' => '25' (calc simple numbers)
      expectedTotals: {
        fees: '25',
        paidPrice: '25',
        actualPrice: '25',
      },
    },
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            fees: '1005.5',
            paidPrice: '1005.5',
            actualPrice: '1005.5',
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            fees: '105.5',
            paidPrice: '105.5',
            actualPrice: '105.5',
          },
        ],
      },
      // '1005.5' + '105.5' => 1111.00 (calc numbers > 1000)
      expectedTotals: {
        fees: '1111',
        paidPrice: '1111',
        actualPrice: '1111',
      },
    },
    {
      input: {
        title: 'test',
        instruments: [
          {
            id: 'hrtksfg=',
            type: 'EQU',
            otherAsset: false,
            instrumentKey: '11448018-537-333',
            mName: 'Tesla Rg',
            quantity: '5',
            mCur: 'USD',
            market: 'UTC',
            lval: '200',
          },
          {
            id: 'fdsfsdfdsf=',
            type: 'COM',
            otherAsset: true,
            instrumentKey: 'asdf-537-333',
            mName: 'Weinkeller',
            quantity: '5',
            mCur: 'USD',
            market: null,
            lval: '100',
          },
        ],
      },
      // make sure lval doesn't get added to totals
      expectedTotals: {
        fees: '',
        paidPrice: '',
        actualPrice: '0',
      },
    },
  ])('Calc Totals with multiple instruments', ({ input, expectedTotals }) => {
    const totals = getTotals(input);

    for (const key of Object.keys(expectedTotals)) {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ExtendedInstrumen */
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ fees */
      expect(totals[key]).toEqual(expectedTotals[key]);
    }
  });
});
