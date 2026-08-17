import React from 'react';
import { render } from '@testing-library/react';
import { initialState as windowInitialState } from '../../../../../../../shared/reducers/window';
import { VIEWPORT_XL } from '../../../../../../../shared/actions/window';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../index'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App/ */
import Component from '../index';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

jest.mock('../../../../../../../../common/components/Link');
jest.mock('../../../../../../../../common/components/Picture');

beforeEach(() => {
  initialState = {
    window: windowInitialState,
  };
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] Paragraph - ListicleItemParagraph', () => {
  it('Should render first item on mobile viewport correctly', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render odd items on mobile viewport correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.listicleIndex = 1;
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render even items on mobile viewport correctly (that are not first)', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.listicleIndex = 2;
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render first item on desktop viewport correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.window.viewport.label = VIEWPORT_XL;
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render odd items on desktop viewport correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.window.viewport.label = VIEWPORT_XL;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.listicleIndex = 1;
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render even items on desktop viewport correctly (that are not first)', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.window.viewport.label = VIEWPORT_XL;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.listicleIndex = 2;
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render every third item on desktop viewport correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.window.viewport.label = VIEWPORT_XL;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.listicleIndex = 3;
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
