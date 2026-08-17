/**
 * @file   Tooltip tests
 */

import React, { ReactElement } from 'react';
import { fireEvent, render } from '@testing-library/react';
import tooltipFactory from '../factory';
import {
  TooltipComponent,
  TooltipFactoryOptions,
  TooltipFactoryOptionsStyles,
  TooltipFactoryProps,
} from '../typings';

const Link = ({ onClick, className, label, children }: any): ReactElement => (
  <button
    data-testid="tooltip-button"
    className={className}
    onClick={(event) => onClick(event)}
  >
    {children || label}
  </button>
);

type TooltipPropsInner = TooltipFactoryOptions<any>;

const styles: TooltipFactoryOptionsStyles = {
  Wrapper: 'WrapperClass',
  Button: 'ButtonClass',
  ButtonOpen: 'ButtonOpenClass',
  ButtonText: 'ButtonTextClass',
  ButtonTextOpen: 'ButtonTextClassOpen',
  ButtonTextClosed: 'ButtonTextClosed',
  TooltipWrapper: 'TooltipWrapperClass',
  Tooltip: 'TooltipClass',
  Content: 'ContentClass',
  Link: 'LinkClass',
};

const componentFactoryOptions: TooltipPropsInner = {
  Link,
  styles,
};

let initialProps: TooltipFactoryProps;
/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TooltipComponent'. */
let Component: TooltipComponent = null;

beforeEach(() => {
  Component = tooltipFactory(componentFactoryOptions);
  initialProps = {
    content: 'Guider ist die digitale Rechtsberatung des Beobachters.',
    link: {
      path: '/beratung/guider-noch-bessere-beratung-fur-beobachter-abonnenten',
      text: 'Mehr erfahren ...',
    },
  };
});

describe('[Component] Tooltip', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render tooltip button correctly', () => {
    const { container } = render(
      <Component {...initialProps}>
        <span>Shorttitle</span>
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render tooltip on clicking the button', () => {
    const { container, queryByTestId } = render(
      <Component {...initialProps}>
        <span>Shorttitle</span>
      </Component>,
    );

    const tooltipButtton = queryByTestId('tooltip-button');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(tooltipButtton);

    expect(container).toMatchSnapshot();
  });

  it('Should not render component if there is no content', () => {
    initialProps.content = '';
    const { container } = render(
      <Component {...initialProps}>
        <span>Shorttitle</span>
      </Component>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should not render link if there is no link text', () => {
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    initialProps.link.text = '';

    const { container, queryByTestId } = render(
      <Component {...initialProps}>
        <span>Shorttitle</span>
      </Component>,
    );

    const tooltipButtton = queryByTestId('tooltip-button');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(tooltipButtton);

    expect(container).toMatchSnapshot();
  });

  it('Should not render link if there is no link path', () => {
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    initialProps.link.path = '';

    const { container, queryByTestId } = render(
      <Component {...initialProps}>
        <span>Shorttitle</span>
      </Component>,
    );

    const tooltipButtton = queryByTestId('tooltip-button');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(tooltipButtton);

    expect(container).toMatchSnapshot();
  });
});
