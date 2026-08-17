/**
 * @file   ParallaxImageParagraph test
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @author Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @date   2019-01-14
 */

import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import {
  VIEWPORT_LG,
  VIEWPORT_MD,
  VIEWPORT_SM,
  VIEWPORT_XL,
  VIEWPORT_XS,
  VIEWPORT_XXL,
} from '../../../../../../shared/actions/window';
import ReduxProvider from '../../../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const windowStateSelector = (state) => state.window;
let initialState = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

/* @ts-ignore TODO: TS7006 ->  Parameter 'fn' implicitly has an 'any' type. */
let Component = (fn) => fn;
let componentFactoryOptions = {};

beforeEach(() => {
  initialProps = JSON.parse(JSON.stringify(mockData));
  componentFactoryOptions = {
    grid: {},
    windowStateSelector,
    styles: {
      CreditsTitle: 'CreditsClassName',
      ImageDefault: 'ImageDefaultClassName',
      Parallax: 'ParallaxClassName',
    },
  };
  initialState = {
    window: {
      height: 886,
      scrollTop: 0,
      viewport: {
        label: 'viewport/xl',
        from: 960,
        to: 1599,
      },
      imageBreakpoint: {
        label: '540',
        from: 0,
        to: 540,
      },
      width: 1038,
    },
  };
  // @ts-ignore
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] ParallaxImageParagraph Factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Component parallaxImageParagraph={null} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  test.each([
    { viewportLabel: VIEWPORT_XS, imageBreakpointLabel: 0, isMobile: true },
    { viewportLabel: VIEWPORT_SM, imageBreakpointLabel: 480, isMobile: true },
    { viewportLabel: VIEWPORT_MD, imageBreakpointLabel: 540, isMobile: false },
    { viewportLabel: VIEWPORT_LG, imageBreakpointLabel: 760, isMobile: false },
    { viewportLabel: VIEWPORT_XL, imageBreakpointLabel: 960, isMobile: false },
    {
      viewportLabel: VIEWPORT_XXL,
      imageBreakpointLabel: 1680,
      isMobile: false,
    },
  ])(
    'Should render the paragraph with parallax effect for desktop and fallback for mobile viewports',
    (config) => {
      // @ts-ignores
      initialState.window.viewport.label = config.viewportLabel;
      // @ts-ignores
      initialState.window.imageBreakpoint.label = config.imageBreakpointLabel;
      const { container } = render(
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>,
      );

      expect(container).toMatchSnapshot();
    },
  );
});
