import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import Component from '../index';
import { MORE_BUTTON_COLLAPSED, MORE_BUTTON_EXPANDED } from '../constants';

let initialProps = {};

beforeEach(() => {
  initialProps = {
    children: null,
    onClick: null,
    isLoading: false,
    type: null,
  };
});

describe('[Component] MoreButton', () => {
  test('Should render correctly even with empty props', () => {
    initialProps = {};
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('more-button-wrapper')).not.toBe(null);
    expect(
      //@ts-ignore
      queryByTestId('more-button-wrapper').firstChild.classList.contains(
        'Collapsed',
      ),
    ).toBe(true);
    expect(queryByTestId('more-button-loader-wrapper')).toBe(null);
  });

  test('Should render correctly', () => {
    initialProps = { children: <p>I am a child</p> };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('more-button-wrapper')).not.toBe(null);
    //@ts-ignore
    expect(queryByTestId('more-button-wrapper').firstChild.innerHtml).not.toBe(
      null,
    );
    expect(queryByTestId('more-button-loader-wrapper')).toBe(null);
  });

  test('Should render the component expanded if type is equal to more-button-expanded', () => {
    initialProps = { type: MORE_BUTTON_EXPANDED };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('more-button-wrapper')).not.toBe(null);
    expect(
      //@ts-ignore
      queryByTestId('more-button-wrapper').firstChild.classList.contains(
        'Expanded',
      ),
    ).toBe(true);
    expect(
      //@ts-ignore
      queryByTestId('more-button-wrapper').firstChild.classList.contains(
        'Collapsed',
      ),
    ).toBe(false);
  });

  test('Should render the component collapsed if type is equal to more-button-collapsed', () => {
    initialProps = { type: MORE_BUTTON_COLLAPSED };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(
      //@ts-ignore
      queryByTestId('more-button-wrapper').firstChild.classList.contains(
        'Expanded',
      ),
    ).toBe(false);
    expect(
      //@ts-ignore
      queryByTestId('more-button-wrapper').firstChild.classList.contains(
        'Collapsed',
      ),
    ).toBe(true);
  });

  test('Should render the loading component if isLoading is true', () => {
    initialProps = { isLoading: true };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('more-button-wrapper')).not.toBe(null);
    expect(queryByTestId('more-button-loader-wrapper')).not.toBe(null);
  });

  test('Should execute onClick function when the button is clicked', () => {
    const onClickMethod = jest.fn();
    initialProps = { onClick: onClickMethod };
    const { queryByTestId } = render(<Component {...initialProps} />);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'ChildNode | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(queryByTestId('more-button-wrapper').firstChild);
    expect(onClickMethod).toHaveBeenCalledTimes(1);
  });
});
