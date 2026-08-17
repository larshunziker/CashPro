import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7031 ->  Binding element 'videoStage' implicitly has an 'any' type. */
const VideoStage = ({ videoStage }) => (
  <div className="MockedVideoStage">{videoStage.id}</div>
);

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;

const componentFactoryOptions = {
  VideoStage,
  styles: {
    Wrapper: 'WrapperClassName',
    InnerWrapper: 'InnerWrapperTitleClassName',
  },
};

beforeEach(() => {
  // @ts-ignore
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] TeaserStageParagraph', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should not render if ministageParagraph is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });
});
