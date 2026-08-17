import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import windowStateSelector from '../../../../../../shared/selectors/windowStateSelector';
import detectParentDimensionsMemoizedFactory from '../../../../../../shared/decorators/detectParentDimensionsMemoizedFactory';
import { windowInitialState } from '../../../../../../shared/reducers/window';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
let componentFactoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  componentFactoryOptions = {
    autoplay: true,
    Slider: () => <div>Slider</div>,
    Teaser: () => <div>Teaser</div>,
    teaserLayout: 'Teaserlayout',
    trackingClassNAParagraph: 'TrackingClass',
    trackingClass: 'TrackingClass',
    /* @ts-ignore TODO: TS7006 ->  Parameter 'teaser' implicitly has an 'any' type. */
    ensureTeaserInterface: (teaser) => teaser,
    detectParentDimensionsMemoized: detectParentDimensionsMemoizedFactory({
      windowStateSelector,
    }),
    detectParentDimensionsCacheKey: 'cachekey',
    getAspectRatio: () => '16X9',
    opacityInactive: 1,
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ autoplay */
    getGridConfig: () => null,
    tealiumTrackEvent: () => null,
    styles: {
      SliderWrapper: 'SliderWrapperClassName',
      NavBtns: 'NavBtnsClassName',
      TeaserWrapper: 'TeaserWrapper',
    },
  };
  initialState = {
    window: windowInitialState,
  };
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Common] Paragraphs - NativeAdvertisingCarouselParagraph', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    const store = createStore((state) => state, initialState);
    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(
      queryByTestId('nativeadvertising-carousel-paragraph-wrapper'),
    ).not.toBeNull();
  });
});
