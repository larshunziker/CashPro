import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { render } from '@testing-library/react';
import SSRContextProvider from '../../../../../../../../common/components/SSRContext';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
const initialState = {
  window: {
    viewport: {
      label: 'viewport/xl',
    },
  },
};

beforeEach(() => {
  initialProps = mockData;
});

describe('[Component] SectionParagraph', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <HelmetProvider>
        <ReduxProvider initialState={initialState}>
          <SSRContextProvider>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </SSRContextProvider>
        </ReduxProvider>
      </HelmetProvider>,
    );
    expect(queryByTestId('explaining-article-section')).toMatchSnapshot();
    expect(queryByTestId('explaining-article-section')).not.toBeNull();
  });

  it('Should render nothing if no paragraphs given', () => {
    initialProps = null;
    const { queryByTestId } = render(
      <HelmetProvider>
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'IntrinsicAttributes & { origin */}
          <Component {...initialProps} />
        </ReduxProvider>
      </HelmetProvider>,
    );
    expect(queryByTestId('explaining-article-section')).toMatchSnapshot();
    expect(queryByTestId('explaining-article-section')).toBeNull();
  });
});
