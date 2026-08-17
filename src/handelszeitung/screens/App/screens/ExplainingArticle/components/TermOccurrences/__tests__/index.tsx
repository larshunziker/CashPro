import React from 'react';
import { cleanup, waitFor } from '@testing-library/react';
import { windowInitialState } from '../../../../../../../../shared/reducers/window';
import { VIEWPORT_MD } from '../../../../../../../../shared/actions/window';
import Component from '../index';
import { render } from '../../../../../../../shared/customRenderer';
import MockedProvider from '../../../../../../../../shared/tests/components/MockedProvider';
import { apolloConfig } from '../apolloConfig';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialState = {
    window: windowInitialState,
  };
  initialProps = {
    term: 'Test term',
  };
});

afterEach(cleanup);

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterAll(() => {
  //@ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'customMockData' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const mockTermOccurrences = (customMockData, props) => (
  <MockedProvider
    mocks={[
      {
        request: {
          ...apolloConfig.options({
            location: {},
            params: { term: 'Test term' },
          }),
        },
        result: customMockData,
      },
    ]}
  >
    <Component {...props} data={customMockData} />
  </MockedProvider>
);

describe('[Component] Term Occurrences component', () => {
  it('Should render teaserlist correctly if all dependencies are given', async () => {
    const customMockData = JSON.parse(JSON.stringify(mockData));
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      mockTermOccurrences(customMockData, initialProps),
    );
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.window.viewport.label = VIEWPORT_MD;

    await waitFor(() => {
      expect(
        queryByTestId('term-occurrences-teaserlist-wrapper'),
      ).not.toBeNull();
    });
  });

  it('Should render nothing if there is no data', async () => {
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      mockTermOccurrences({}, initialProps),
    );

    await waitFor(() => {
      expect(container.innerHTML).toBe('');
      expect(queryByTestId('term-occurrences-teaserlist-wrapper')).toBeNull();
      expect(queryByTestId('term-occurrences-header-wrapper')).toBeNull();
    });
  });

  it('Should render nothing if there are no articles', async () => {
    const myMockData = JSON.parse(JSON.stringify(mockData));
    myMockData.data.environment.globalSearch.edges = null;
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      mockTermOccurrences(myMockData, JSON.parse(JSON.stringify(initialProps))),
    );

    await waitFor(() => {
      expect(container.innerHTML).toBe('');
      expect(queryByTestId('term-occurrences-teaserlist-wrapper')).toBeNull();
      expect(queryByTestId('term-occurrences-header-wrapper')).toBeNull();
    });
  });

  it('Should render header correctly if all dependencies are given', async () => {
    const customMockData = JSON.parse(JSON.stringify(mockData));
    const { queryByTestId } = render(
      mockTermOccurrences(
        customMockData,
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
        JSON.parse(JSON.stringify(initialProps)),
      ),
    );

    await waitFor(() => {
      expect(queryByTestId('term-occurrences-header-wrapper')).not.toBeNull();
      expect(
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        queryByTestId('term-occurrences-header-title').innerHTML,
      ).toContain('Artikel mit dem Begriff');
    });
  });

  it('Should not render header correctly if term is not given', async () => {
    const customMockData = JSON.parse(JSON.stringify(mockData));
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const initialPropsCopy = JSON.parse(JSON.stringify(initialProps));
    initialPropsCopy.term = '';
    const { queryByTestId } = render(
      mockTermOccurrences(customMockData, initialPropsCopy),
    );
    await waitFor(() => {
      expect(queryByTestId('term-occurrences-header-wrapper')).toBeNull();
      expect(queryByTestId('term-occurrences-header')).toBeNull();
    });
  });
});
