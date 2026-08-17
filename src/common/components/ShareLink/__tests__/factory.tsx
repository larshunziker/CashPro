import React from 'react';
import { cleanup, render } from '@testing-library/react';
import classNames from 'classnames';
import componentFactory from '../factory';
import Link from '../../Link';

/* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'addClass' implicitly has an 'any' type. */
const Icon = ({ type, addClass }) => (
  <i className={classNames('Icon', type, addClass)} />
);

/* @ts-ignore TODO: TS7031 ->  Binding element 'iconType' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'iconAddClass' implicitly has an 'any' type. */
const generateIconByProps = ({ iconType, iconAddClass }) => {
  if (!iconType || !iconAddClass) return null;
  return <Icon type={iconType} addClass={iconAddClass} />;
};

const getStylesByProps = () => ({
  SharePanelItem: 'SharePanelItem',
});

const componentFactoryOptions = {
  generateIconByProps,
  Link,
  styles: getStylesByProps,
};

const initialProps = {
  iconType: 'IconFacebookF',
  url: 'https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/test/mick-jagger-grosser-auftritt-fur-mister-nimmersatt%3Fwtmc%3Dsocialmedia.facebook.shared.web',
  addClass: 'SharePanelItem',
  iconAddClass: 'IconClass',
  targetType: '',
};
const Component = componentFactory(componentFactoryOptions);

jest.mock('Link');
afterEach(cleanup);

describe('[Common] ShareLink', () => {
  it('Should render correctly', () => {
    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );
    expect(queryByTestId('sharelink-wrapper')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should not return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should return nothing from factory if no iconType is given', () => {
    /* @ts-ignore TODO: TS2790 ->  The operand of a 'delete' operator must be optional. */
    delete initialProps.iconType;
    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );
    expect(queryByTestId('sharelink-wrapper')).toBeNull();
    expect(container.innerHTML).toBe('');
  });

  it('Should return nothing from factory if no url is given', () => {
    /* @ts-ignore TODO: TS2790 ->  The operand of a 'delete' operator must be optional. */
    delete initialProps.url;
    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );
    expect(queryByTestId('sharelink-wrapper')).toBeNull();
    expect(container.innerHTML).toBe('');
  });

  it('Should return nothing from factory if no iconAddClass is given', () => {
    /* @ts-ignore TODO: TS2790 ->  The operand of a 'delete' operator must be optional. */
    delete initialProps.iconAddClass;
    const { container, queryByTestId } = render(
      <Component {...initialProps} />,
    );
    expect(queryByTestId('sharelink-wrapper')).toBeNull();
    expect(container.innerHTML).toBe('');
  });
});
