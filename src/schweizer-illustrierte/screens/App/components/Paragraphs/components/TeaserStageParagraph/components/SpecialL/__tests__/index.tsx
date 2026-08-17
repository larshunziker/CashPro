import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    teaserStage: JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] SpecialL', () => {
  it('Should render nothing', () => {
    initialProps = {};
    const { container } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS2739 ->  Type '{}' is missing the following properties from type 'SpecialStageFactoryProps' */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  test.each(['title', 'preferredUri'])(
    'Should render nothing if %s is empty',
    (field) => {
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.teaserStage.termReference.landingPage[field] = '';
      const { container } = render(
        <ReduxProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>,
      );
      expect(container.innerHTML).toBe('');
    },
  );

  it('Should render nothing if teaserImage is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.teaserStage.termReference.landingPage.teaserImage = null;
    const { container } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render specialStage wrapper on all viewports', () => {
    const { queryByTestId } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('special-stage-stage-wrapper')).not.toBeNull();
  });

  it('Should render nothing if the teaserStage has no keys', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.teaserStage = {};
    const { container } = render(
      <ReduxProvider>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });
});
