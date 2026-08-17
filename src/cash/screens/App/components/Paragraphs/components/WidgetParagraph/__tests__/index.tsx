import React from 'react';
import { Store } from 'redux';
import { cleanup, render } from '@testing-library/react';
import SSRContextProvider from '../../../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import { configureStore } from '../../../../../../../shared/configureStore';
import mockData from './mockData.json';

jest.mock('../../../../MarketTable');

const store: Store = configureStore({});
let widgetParagraph: any = {};

beforeEach(() => {
  widgetParagraph = {
    ...JSON.parse(JSON.stringify(mockData)),
  };
});

afterEach(cleanup);

describe('[Component] WidgetParagraph/EsiComponent', () => {
  it('Should not render if widgetParagraph is empty', () => {
    const { container } = render(
      <ReduxProvider store={store}>
        <SSRContextProvider>
          <Component widgetParagraph={{}} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should not render if link path is empty', () => {
    widgetParagraph.link.path = '';
    const { container } = render(
      <ReduxProvider store={store}>
        <SSRContextProvider>
          <Component widgetParagraph={widgetParagraph} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render widget', () => {
    const { container } = render(
      <ReduxProvider store={store}>
        <SSRContextProvider>
          <Component widgetParagraph={widgetParagraph} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(container.innerHTML).toContain(
      'integrations/passende_produkte/cs/30071145',
    );
  });

  it('Should render chart', () => {
    widgetParagraph.link.path = '/charts-json/';
    const { container } = render(
      <ReduxProvider store={store}>
        <SSRContextProvider>
          <Component widgetParagraph={widgetParagraph} />
        </SSRContextProvider>
      </ReduxProvider>,
    );
    expect(container.innerHTML).toContain('Wrapper Charts');
  });

  /*
  TODO: Update to react router
  it('Should render chart', () => {
    widgetParagraph.subtypeValue = WIDGET_TYPE_CHART;
    const { container } = render(
      <LocationProvider history={history}>
        <ReduxProvider store={store}>
          <Component widgetParagraph={widgetParagraph} />
        </ReduxProvider>
      </LocationProvider>,
    );
    expect(container.innerHTML).toContain('Wrapper Charts');
  });

  it('Should render trendradar', () => {
    widgetParagraph.subtypeValue = WIDGET_TYPE_TRENDRADAR;
    const { container } = render(
      <LocationProvider history={history}>
        <ReduxProvider store={store}>
          <Component widgetParagraph={widgetParagraph} />
        </ReduxProvider>
      </LocationProvider>,
    );
    expect(container.innerHTML).toContain('Wrapper Charts');
  });
  */
});
