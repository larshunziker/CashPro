import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { VIEWPORT_XL, VIEWPORT_XS } from '../../../../shared/actions/window';
import { ScrollToTopFactoryOptions } from '../typings';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;

const componentFactoryOptions: ScrollToTopFactoryOptions = {
  icon: <div>icon</div>,
  anchorTagScrollToTop: 'toTop',
  pixelsScrolledToFadeInComponentDefault: 200,
  styles: {
    ButtonWrapper: 'ButtonWrapperClassName',
    ScrollToTopFadeIn: 'ScrollToTopFadeInClassName',
    ScrollToTopFadeOut: 'ScrollToTopFadeOutClassName',
    ButtonToTop: 'ButtonToTopClassName',
  },
};

const initialState = {
  scroll: 0,
  window: {
    viewport: {
      label: VIEWPORT_XL,
    },
  },
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
});

describe('[Common] ScrollTop', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly desktop', () => {
    const store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly mobile', () => {
    initialState.window.viewport.label = VIEWPORT_XS;
    const store = createStore((state) => state, initialState);

    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
