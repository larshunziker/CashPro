import React from 'react';
import { cleanup, render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';
import { VideoParagraphFactoryOptions } from '../typings';

const Video = () => <div />;
let initialProps: any = {};
// @ts-ignores
let componentFactoryOptions: VideoParagraphFactoryOptions = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

const styles = {
  Wrapper: 'Wrapper',
  VideoTitle: 'VideoTitle',
};

beforeEach(() => {
  componentFactoryOptions = {
    styles,
    Video,
  };
  initialProps = JSON.parse(JSON.stringify(mockData));
  Component = componentFactory(componentFactoryOptions);
});

afterEach(cleanup);

describe('[Common] video paragraph factory', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  test('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);

    expect(container).not.toBeNull();
  });

  test('Should render nothing', () => {
    initialProps.video = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  test('Should render video with image caption component, setting shouldHideCaption to false', () => {
    Component = componentFactory({
      ...componentFactoryOptions,
      ImageCaption: () => <div />,
      shouldHideCaption: () => false,
    });
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('video-caption-wrapper')).not.toBeNull();
    expect(queryByTestId('video-info-wrapper')).toBeNull();
  });

  test('Should render video without image caption component, setting shouldHideCaption to true', () => {
    Component = componentFactory({
      ...componentFactoryOptions,
      ImageCaption: () => <div />,
      shouldHideCaption: () => true,
    });
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('video-caption-wrapper')).toBeNull();
    expect(queryByTestId('video-info-wrapper')).toBeNull();
  });

  test('Should render video without any image caption ', () => {
    initialProps.video.credit = null;
    initialProps.video.caption = null;
    initialProps.video.image.credit = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('video-info-wrapper')).toBeNull();
    expect(queryByTestId('video-caption-wrapper')).toBeNull();
  });

  test('Should render video without title ', () => {
    Component = componentFactory({
      ...componentFactoryOptions,
      hasTitle: false,
    });
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('video-title-wrapper')).toBeNull();
  });

  test('Should render first paragaph', () => {
    initialProps.isFirst = true;
    Component = componentFactory(componentFactoryOptions);
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('video-title')).toBeNull();
    expect(queryByTestId('video-caption-wrapper')).toBeNull();
    expect(queryByTestId('video-credit')).toBeNull();
  });
});
