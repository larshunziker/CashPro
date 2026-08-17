import React from 'react';
import { render } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SSRContextProvider from '../../../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import { routeInitialState } from '../../../../../../../shared/reducers/route';
import Component from '../index';
import mockData from './mockData.json';

jest.mock('Highcharts');
jest.mock('MarketTable');
jest.mock('EditorialPicks');
jest.mock('EsiRenderer');

const UBS_ESI_SRC =
  'https://cdn.fi-box.stage.service.cash.ch/services/esi-widgets/integrations/news_artikel_produkt_matching/UBS/1234-255-1';

const buildRouteState = (overrides = {}) => ({
  route: {
    ...routeInitialState,
    ...overrides,
  },
});

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = mockData;
});

const renderComponent = (initialState = {}) =>
  render(
    <ReduxProvider initialState={initialState}>
      <SSRContextProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <MockedProvider>
          {/*@ts-ignore*/}
          <Component {...initialProps} />
        </MockedProvider>
        ,
      </SSRContextProvider>
    </ReduxProvider>,
  );

describe('[Component] ArticlePageAside', () => {
  it('Should render correctly', async () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  describe('UBS in-article product matching integration', () => {
    it('should not render the UBS widget on web (isHybridApp = false)', () => {
      const { queryByTestId } = renderComponent(
        buildRouteState({ isHybridApp: false }),
      );

      expect(queryByTestId('mocked-esirenderer')).not.toBeInTheDocument();
    });

    it('should render the UBS widget inside the Cash hybrid app (isHybridApp = true)', () => {
      const { getByTestId } = renderComponent(
        buildRouteState({ isHybridApp: true }),
      );

      const esiWidget = getByTestId('mocked-esirenderer');

      expect(esiWidget).toBeInTheDocument();
      expect(esiWidget).toHaveAttribute('esisrc', UBS_ESI_SRC);
      expect(esiWidget).toHaveAttribute('publication', 'cash');
    });

    it('should not render the UBS widget when the article has no valor, even in the hybrid app', () => {
      initialProps = {
        ...mockData,
        article: {
          ...mockData.article,
          valors: { __typename: 'ValorConnection', edges: [] },
        },
      };

      const { queryByTestId } = renderComponent(
        buildRouteState({ isHybridApp: true }),
      );

      expect(queryByTestId('mocked-esirenderer')).not.toBeInTheDocument();
    });
  });
});
