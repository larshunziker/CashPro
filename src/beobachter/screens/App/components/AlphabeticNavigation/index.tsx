/* istanbul ignore file */

import React, { ReactElement } from 'react';
import classnames from 'classnames';
import alphabeticNavigationFactory from '../../../../../common/components/AlphabeticNavigation/factory';
import Icon from '../Icon';
import Alphabet from './components/Alphabet';
import AlphabetOverlay, {
  AlphabetOverlayProps,
} from './components/AlphabetOverlay';
import { ALPHABET_LAYOUT_MAIN } from '../../../../../common/components/AlphabeticNavigation/components/Alphabet/constants';
import { ALPHABETIC_NAVIGATION_THEME_RED } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  AlphabeticNavigationFactoryOptionsStyles,
  AlphabeticNavigationProps,
} from '../../../../../common/components/AlphabeticNavigation/typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.ThemeRed];

const getStylesByProps = ({
  theme = '',
}: AlphabeticNavigationProps): AlphabeticNavigationFactoryOptionsStyles => ({
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Alphab */
  AlphabetWrapper: classnames(styles.AlphabetWrapper, styles[theme]),
  AlphabetInnerWrapper: classnames(styles.AlphabetInnerWrapper, {
    [grid.Container]: theme === ALPHABETIC_NAVIGATION_THEME_RED,
  }),
  MobileToggleWrapper: styles.MobileToggleWrapper,
  MobileToggleInnerWrapper: styles.MobileToggleInnerWrapper,
  MobileToggle: styles.MobileToggle,
});

const getAlphabetComponentByProps = ({
  theme,
  lettersUrl,
  activeLetter,
}: AlphabeticNavigationProps): ReactElement => (
  <Alphabet
    layout={ALPHABET_LAYOUT_MAIN}
    activeLetter={activeLetter}
    url={lettersUrl}
    theme={theme}
  />
);

/* @ts-ignore TODO: TS7006 ->  Parameter '_' implicitly has an 'any' type. */
const getMobileToggleContent = (_, isNavigationOpen: boolean): ReactElement => (
  <>
    <Icon
      type={isNavigationOpen ? 'IconChevronUp' : 'IconChevronDown'}
      addClass={styles.Icon}
    />

    <span className={styles.ActiveChar}>A bis Z</span>
  </>
);

const getAlphabetOverlayByProps = (
  props: AlphabetOverlayProps,
): ReactElement => <AlphabetOverlay {...props} closeOnOutsideClick />;

const AlphabeticNavigation = alphabeticNavigationFactory({
  styles: getStylesByProps,
  Alphabet: getAlphabetComponentByProps,
  AlphabetOverlay: getAlphabetOverlayByProps,
  MobileToggleContent: getMobileToggleContent,
});

export default AlphabeticNavigation;
