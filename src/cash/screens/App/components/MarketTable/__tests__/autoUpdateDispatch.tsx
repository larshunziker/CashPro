import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import * as autoUpdateActions from '../../../../../shared/actions/autoUpdate';
import MarketTable from '../index';
// @ts-ignore - static fixture
import quoteData from './mockData.json';

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

let mockQueryResult: { data: any; loading: boolean } = {
  data: {},
  loading: true,
};

jest.mock('@apollo/client', () => ({
  __esModule: true,
  useQuery: jest.fn(() => ({ ...mockQueryResult })),
}));

jest.mock('../../../../../../common/components/Link');
jest.mock('../../Icon');

const renderMarketTable = () =>
  render(
    <ReduxProvider initialState={{}}>
      <MockedProvider>
        {/* @ts-ignore - exercise the fallback listingKeys path */}
        <MarketTable instrumentKeys={undefined} />
      </MockedProvider>
    </ReduxProvider>,
  );

describe('[Component] MarketTable - auto-update dispatch', () => {
  let setInstrumentKeysAnonymousSpy: jest.SpyInstance;

  beforeEach(() => {
    mockQueryResult = { data: {}, loading: true };
    mockDispatch.mockClear();
    setInstrumentKeysAnonymousSpy = jest.spyOn(
      autoUpdateActions,
      'setInstrumentKeysAnonymous',
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('does not dispatch instrument keys while the query is still loading', () => {
    renderMarketTable();

    expect(setInstrumentKeysAnonymousSpy).not.toHaveBeenCalled();
  });

  it('dispatches the instruments derived from the loaded quote list', () => {
    mockQueryResult = { data: quoteData, loading: false };

    renderMarketTable();

    expect(setInstrumentKeysAnonymousSpy).toHaveBeenCalledTimes(1);

    const dispatchedKeys = setInstrumentKeysAnonymousSpy.mock.calls[0][0];
    expect(Array.isArray(dispatchedKeys)).toBe(true);
    expect(dispatchedKeys).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ listingKey: '998089-4-1' }),
      ]),
    );
  });

  it('does not re-dispatch when re-rendered with the same quote data (memoized)', () => {
    mockQueryResult = { data: quoteData, loading: false };

    const { rerender } = renderMarketTable();
    expect(setInstrumentKeysAnonymousSpy).toHaveBeenCalledTimes(1);

    // Re-render with identical props and the same `data` reference. Before the
    // fix, the unmemoized listingKeys value dispatched on every render which,
    // together with the open/closed reclassification in AutoUpdateProvider,
    // caused a polling-request flood. React.memo + useMemo must keep it at one.
    rerender(
      <ReduxProvider initialState={{}}>
        <MockedProvider>
          {/* @ts-ignore - exercise the fallback listingKeys path */}
          <MarketTable instrumentKeys={undefined} />
        </MockedProvider>
      </ReduxProvider>,
    );

    expect(setInstrumentKeysAnonymousSpy).toHaveBeenCalledTimes(1);
  });
});
