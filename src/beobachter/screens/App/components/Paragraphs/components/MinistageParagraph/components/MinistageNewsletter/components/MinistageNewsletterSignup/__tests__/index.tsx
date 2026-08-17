import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

let initialProps: any = {};

beforeEach(() => {
  initialProps = {
    ...JSON.parse(JSON.stringify(mockData)),
  };
});
/* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
const mutateMockFn = (data) => {
  // eslint-disable-next-line
  return new Promise(function (resolve, reject) {
    // do a thing, possibly async, then…
    return resolve(data);
  });
};

describe('[Component] MinistageNewsletterSignup', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <ReduxProvider>
        <Component
          ministageNewsletter={initialProps.ministage}
          mutate={mutateMockFn} //
        />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
