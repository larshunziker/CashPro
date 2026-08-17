import React from 'react';
import { render } from '@testing-library/react';
import { noop } from '../../../../../../shared/helpers/utils';
import Component from '../index';
import {
  ARROW_BUTTON_THEME_HOROSCOPE,
  ARROW_BUTTON_THEME_LIGHT,
  ARROW_BUTTON_THEME_SKIN,
} from '../constants';

let initialProps = {};

beforeEach(() => {
  initialProps = {
    children: null,
    addClass: '',
    theme: '',
    origin: '',
    extraSmall: false,
    small: false,
    large: false,
    disableHover: false,
    onClick: noop,
  };
});

describe('[Component] ArrowButton', () => {
  test('Should render correctly even if there are no props', () => {
    initialProps = {};
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('arrow-button-wrapper')).not.toBeNull();
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonLight'),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonSkin'),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonHoro'),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonSmall'),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains(
        'ButtonExtraSmall',
      ),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonLarge'),
    ).toBe(false);
  });

  test('Should render the light theme correctly when provided', () => {
    initialProps = { theme: ARROW_BUTTON_THEME_LIGHT };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonLight'),
    ).toBe(true);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonSkin'),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonHoro'),
    ).toBe(false);
  });

  test('Should render the skin theme correctly when provided', () => {
    initialProps = { theme: ARROW_BUTTON_THEME_SKIN };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonLight'),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonSkin'),
    ).toBe(true);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonHoro'),
    ).toBe(false);
  });

  test('Should render the horoskop theme correctly when provided', () => {
    initialProps = { theme: ARROW_BUTTON_THEME_HOROSCOPE };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonLight'),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonSkin'),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonHoro'),
    ).toBe(true);
  });

  test('Should render the button with extra small size when set', () => {
    initialProps = { extraSmall: true };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains(
        'ButtonExtraSmall',
      ),
    ).toBe(true);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonSmall'),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonLarge'),
    ).toBe(false);
  });

  test('Should render the button with small size when set', () => {
    initialProps = { small: true };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains(
        'ButtonExtraSmall',
      ),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonSmall'),
    ).toBe(true);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonLarge'),
    ).toBe(false);
  });

  test('Should render the button with large size when set', () => {
    initialProps = { large: true };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains(
        'ButtonExtraSmall',
      ),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonSmall'),
    ).toBe(false);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('ButtonLarge'),
    ).toBe(true);
  });

  test('Should render the button with hover disabled when set', () => {
    initialProps = { disableHover: true };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('arrow-button-wrapper').classList.contains('DisableHover'),
    ).toBe(true);
  });
});
