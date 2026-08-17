import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { windowInitialState } from '../../../../shared/reducers/window';
import mockData from './mockData.json';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../assets/styles/variablesDefault.legacy.css'. '/Users/bhs/code/wor */
import { BREAKPOINTS } from '../../../assets/styles/variablesDefault.legacy.css';
import {
  VideoStageComponent,
  VideoStageFactoryOptions,
  VideoStageProps,
  VideoStageState,
} from '../typings';

/**
 * TODO: optimize test within click handler on second item if necessary
 */
/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'VideoStageProps'. */
let initialProps: VideoStageProps = null;
// @ts-ignore
const initialState: VideoStageState = { window: windowInitialState };
let Component: VideoStageComponent = () => null;

/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const SmoothScroll = ({ children }) => (
  <div data-testid="smooth-scroll">{children}</div>
);
const Teaser = () => <div />;
/* @ts-ignore TODO: TS7031 ->  Binding element 'video' implicitly has an 'any' type. */
const VideoPlayer = ({ video }) => (
  <div data-testid="video-player">{video.id}</div>
);
/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'link' implicitly has an 'any' type. */
const Link = ({ children, link }) => <a href={link.path}>{children}</a>;
/* @ts-ignore TODO: TS7031 ->  Binding element 'credit' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'caption' implicitly has an 'any' type. */
const ImageCaption = ({ credit, caption }) => (
  <div>
    {credit} - {caption}
  </div>
);
const grid = {};

const componentFactoryOptions: VideoStageFactoryOptions = {
  grid,
  VideoPlayer,
  Link,
  Teaser,
  SmoothScroll,
  ImageCaption,
  teaserLayout: 'SAMPLE_TEASER_LAYOUT',
  viewportsToPerformAnchorScroll: BREAKPOINTS.lgBreakpointTo,
  isCaptionVisible: false,
  styles: {
    Wrapper: '.SampleWrapperClass',
    Items: '.SampleItemsClass',
    IsActive: '.SampleIsActiveClass',
    LeftBoxCols: '.SampleLeftBoxColsClass',
    RightBoxCols: '.SampleRightBoxColsClass',
    InnerWrapper: '.SampleInnerWrapperClass',
    HeadingWrapper: '.SampleHeadingWrapperClass',
    Heading: '.SampleHeadingClass',
    StageWrapper: '.SampleStageWrapperClass',
    ContentWrapper: '.SampleContentWrapperClass',
    Title: '.SampleTitleClass',
    ShortTitle: '.SampleShortTitleClass',
  },
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  // @ts-ignore
  initialProps = { videoStage: { ...mockData } };
});

describe('[Common] VideoStage', () => {
  it('Should not render factory', () => {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'VideoStageType'. */
    initialProps.videoStage = null;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing if ID is empty', () => {
    initialProps.videoStage.id = '';
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render no title', () => {
    delete initialProps.videoStage.title;
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render factory correctly', () => {
    const store = createStore((state) => state, initialState);
    const { container } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should display the second video after user interaction', () => {
    const store = createStore((state) => state, initialState);
    const { container, queryByTestId } = render(
      <Provider store={store}>
        <Component {...initialProps} />
      </Provider>,
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    queryByTestId('video-item-1').click();
    expect(container).toMatchSnapshot();
  });
});
