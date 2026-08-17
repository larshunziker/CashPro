/**
 * @file   ToastContent tests
 */

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import toastContentFactory from '../factory';

/* @ts-ignore TODO: TS7031 ->  Binding element 'onClick' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'className' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
const Link = ({ onClick, className, label }) => (
  <button
    data-testid="toastcontent-button"
    className={className}
    onClick={(event) => onClick(event)}
  >
    {label}
  </button>
);

const componentFactoryOptions = {
  Link,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'addClass' implicitly has an 'any' type. */
  Icon: ({ type, addClass }) => <span className={addClass}>{type}</span>,
  toastIcon: () => 'ToastIcon',
  styles: {
    Wrapper: '.WrapperClass',
    ContentWrapper: '.ButtonClass',
    Content: '.ContentClass',
    Link: '.LinkClass',
    CloseButton: '.CloseButtonClass',
    CloseIcon: '.CloseIconClass',
    ToastIcon: '.ToastIconClass',
  },
};

let initialProps: any = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'ToastContent' implicitly has type 'any' in some locations where its type cannot be determined. */
let ToastContent = null;

beforeEach(() => {
  ToastContent = toastContentFactory(componentFactoryOptions);
  initialProps = {
    content:
      'Sie haben das Limit von 100 abonnierten Themen erreicht. Bitte löschen Sie Themen bevor Sie neue abonnieren. ',
    link: {
      text: 'Zur Merkliste',
      path: 'profile/alerts',
    },
    type: 'ERROR',
    closeToast: jest.fn(),
    toastOptions: { toastId: 'test-toast-id' },
  };
});

describe('[Component] ToastContent', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'ToastContent' implicitly has an 'any' type. */
    expect(ToastContent).not.toBeNull();
  });

  it('Should render toastcontent correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'ToastContent' implicitly has an 'any' type. */
    const { container } = render(<ToastContent {...initialProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render nothing if there is no content', () => {
    initialProps.content = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'ToastContent' implicitly has an 'any' type. */
    const { container } = render(<ToastContent {...initialProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should not render link if there is no link data', () => {
    initialProps.link = {};
    /* @ts-ignore TODO: TS7005 ->  Variable 'ToastContent' implicitly has an 'any' type. */
    const { container } = render(<ToastContent {...initialProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should not render link if there is no link path and no link onclick ', () => {
    initialProps.link.path = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'ToastContent' implicitly has an 'any' type. */
    const { container } = render(<ToastContent {...initialProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should not render link if there is no link text', () => {
    initialProps.link.text = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'ToastContent' implicitly has an 'any' type. */
    const { container } = render(<ToastContent {...initialProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render link if there is no link text but a onClick function', () => {
    initialProps.link.path = '';
    initialProps.link.onClick = () => null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'ToastContent' implicitly has an 'any' type. */
    const { container } = render(<ToastContent {...initialProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should call close function when close icon is pressed', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'ToastContent' implicitly has an 'any' type. */
    const { queryByTestId } = render(<ToastContent {...initialProps} />);

    const closeButton = queryByTestId('toast-content-close-button');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(closeButton);

    expect(initialProps.closeToast).toHaveBeenCalledTimes(1);
  });

  it('Should not render toastIcon if no icon string given', () => {
    componentFactoryOptions.toastIcon = () => '';
    ToastContent = toastContentFactory(componentFactoryOptions);

    const { container } = render(<ToastContent {...initialProps} />);
    expect(container).toMatchSnapshot();
  });
});
