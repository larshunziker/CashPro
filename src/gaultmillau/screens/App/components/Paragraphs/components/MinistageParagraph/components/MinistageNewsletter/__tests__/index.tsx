import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../index'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App/ */
import Component from '../index';
import MockedProvider from '../../../../../../../../../../shared/tests/components/MockedProvider';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
beforeEach(() => {
  initialProps = {
    ministageNewsletter: {
      type: '',
    },
  };
});

describe('[Paragraphs] MinistageParagraph - MinistageNewsletter', () => {
  it('Should render MinistageNewsletter correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageNewsletter.type = 'gesundheit';
    // @ts-ignore
    const { queryByTestId } = render(
      <MockedProvider>
        <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
          <ReduxProvider state={{}}>
            {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
            <Component {...initialProps} />
          </ReduxProvider>
        </IntlProvider>
      </MockedProvider>,
    );
    expect(queryByTestId('ministage-newsletter-signup')).not.toBeNull();
  });
  it('Should not render if there is no [props.ministageNewsletter]', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageNewsletter.type = 'gesundheit';
    // @ts-ignore
    const { queryByTestId } = render(
      <MockedProvider>
        <IntlProvider defaultLocale="de-CH" locale={'de'} key={'de'}>
          <ReduxProvider state={{}}>
            <Component />
          </ReduxProvider>
        </IntlProvider>
      </MockedProvider>,
    );
    expect(queryByTestId('ministage-newsletter-signup')).toBeNull();
  });
});
