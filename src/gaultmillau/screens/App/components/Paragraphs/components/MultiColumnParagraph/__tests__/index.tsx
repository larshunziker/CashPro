import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../../MultiColumnParagraph';
import mockData from './mockData.json';

jest.mock('../../ParagraphsRenderer');

const initialState = {};

describe('[Component] MultiColumnParagraph', () => {
  it.each([
    { multiColumn: null },
    { multiColumn: {} },
    { multiColumn: [] },
    { multiColumn: '' },
    JSON.parse(JSON.stringify(mockData)),
  ])('Should match snapshot $#', (testCase) => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <IntlProvider locale="de-CH">
          <Component {...testCase} />
        </IntlProvider>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should match render two columns correctly', () => {
    const initialProps = JSON.parse(JSON.stringify(mockData));
    initialProps.multiColumn.style = 'two_column';

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <IntlProvider locale="de-CH">
          <Component {...initialProps} />
        </IntlProvider>
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
