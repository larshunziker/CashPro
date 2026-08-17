import React from 'react';
import { render } from '@testing-library/react';
import classNames from 'classnames';
import { routeInitialState } from '../../../../beobachter/shared/reducers/route';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';
import CSSPictureComponent, { getCssClassNameFromString } from '../index';

const initialState = {
  route: {
    ...routeInitialState,
    clientUrl: 'https://develop.publication.ch',
  },
};

const Component = (props: any) => {
  return (
    <ReduxProvider initialState={initialState}>
      <CSSPictureComponent {...props} />
    </ReduxProvider>
  );
};

describe('[function] getCssClassNameFromString', () => {
  it('should match the hashed string ', () => {
    expect(getCssClassNameFromString('/tree.jpg')).toBe('css--1960944960');
  });

  it.each([
    { input: 'foo', expected: 'css-101574' },
    {
      input:
        '/highres.pngbanner_smallundefinedbanner_mediumundefinedundefinedbanner_large',
      expected: 'css-2039971230',
    },
    {
      input: '/test.png1',
      expected: 'css--1871685707',
    },
    {
      input: '/test.png2',
      expected: 'css--1871685706',
    },
    {
      input: '/test.png3',
      expected: 'css--1871685705',
    },
  ])('Should render unique hash (%d)', ({ input, expected }) => {
    expect(getCssClassNameFromString(input)).toBe(expected);
  });
});

describe('[Component] CSSPicture', () => {
  it('Should render style tag with correct CSS', () => {
    const { container } = render(
      <Component
        style_320="xsmall"
        style_480="small"
        style_540="medium"
        style_760="large"
        style_960="xlarge"
        style_1680="xxlarge"
        relativeOriginPath="/picture.jpg"
      >
        {/* @ts-ignore TODO: TS7031 ->  Binding element 'className' implicitly has an 'any' type. */}
        {({ className }) => {
          return <div className={classNames(className, 'style.Wrapper')}></div>;
        }}
      </Component>,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render style tag with correct CSS (less img styles)', () => {
    const { container } = render(
      <Component
        style_320="xsmall"
        style_960="xlarge"
        relativeOriginPath="/picture.jpg"
      >
        {/* @ts-ignore TODO: TS7031 ->  Binding element 'className' implicitly has an 'any' type. */}
        {({ className }) => {
          return <div className={classNames(className, 'style.Wrapper')}></div>;
        }}
      </Component>,
    );
    expect(container).toMatchSnapshot();
  });
});
