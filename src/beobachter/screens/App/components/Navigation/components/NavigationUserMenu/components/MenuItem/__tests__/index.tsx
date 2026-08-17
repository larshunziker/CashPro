import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import { MenuItemProps } from '../typings';

let initialProps: MenuItemProps = {
  name: 'E-Paper',
  link: 'https://test.ch/',
  iconType: 'IconNewspaper',
  trackingClass: 'link-usercockpit-epaper',
  onClick: () => null,
};

jest.mock('Link');
beforeEach(() => {
  initialProps = {
    name: 'E-Paper',
    link: 'https://test.ch/',
    iconType: 'IconNewspaper',
    trackingClass: 'link-usercockpit-epaper',
    onClick: () => null,
  };
});

describe('[Component] MenuItem Default', () => {
  it('Should render correctly', () => {
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should not render Icon', () => {
    initialProps.iconType = '';
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });
});
