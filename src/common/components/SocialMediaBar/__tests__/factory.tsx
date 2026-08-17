import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import type { SocialMediaBarIconProps } from '../typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'fn' implicitly has an 'any' type. */
let Component = (fn) => fn;
let componentFactoryOptions;
const styles = {
  Wrapper: '.Wrapper',
  LinkItem: '.LinkItem',
};

const socialMediaItems: Array<SocialMediaBarIconProps> = [
  {
    type: 'Facebook',
    link: '',
  },
];

beforeEach(() => {
  componentFactoryOptions = {
    socialMediaItems: [],
    SocialMediaBarIcon: () => <div data-testid="social-media-factory-link" />,
    styles: styles,
  };
  Component = componentFactory(componentFactoryOptions);
});

describe('[Common] Social Media factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render nothing if there are no socialMediaItems', () => {
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    componentFactoryOptions = {
      socialMediaItems: socialMediaItems,
      SocialMediaBarIcon: () => <div data-testid="social-media-factory-link" />,
      styles: styles,
    };
    Component = componentFactory(componentFactoryOptions);
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
