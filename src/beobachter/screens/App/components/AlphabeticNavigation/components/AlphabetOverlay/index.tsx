/* istanbul ignore file */

import React, { ReactElement } from 'react';
import classNames from 'classnames';
import alphabetOverlayFactory from '../../../../../../../common/components/AlphabeticNavigation/components/AlphabetOverlay/factory';
import Icon from '../../../Icon';
import Alphabet from '../Alphabet';
import { ALPHABET_LAYOUT_MOBILE } from '../../../../../../../common/components/AlphabeticNavigation/components/Alphabet/constants';
import styles from './styles.legacy.css';
import {
  AlphabetOverlayFactoryOptionsStyles,
  AlphabetOverlayProps as AlphabetOverlayCommonProps,
} from '../../../../../../../common/components/AlphabeticNavigation/components/AlphabetOverlay/typings';

export type AlphabetOverlayProps = AlphabetOverlayCommonProps & {
  theme?: string;
};

const getStylesByProps = ({
  theme = '',
}: AlphabetOverlayProps): AlphabetOverlayFactoryOptionsStyles => ({
  MobileCloseIconWrapper: styles.MobileCloseIconWrapper,
  MobileMenu: styles.MobileMenu,
  MobileMenuInner: styles.MobileMenuInner,
  MobileMenuOpen: styles.MobileMenuOpen,
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Wrappe */
  Wrapper: classNames(styles.Wrapper, styles[theme]),
});

const getAlphabetComponentByProps = ({
  activeLetter,
  lettersUrl,
  theme = '',
}: AlphabetOverlayProps): ReactElement => (
  <Alphabet
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    activeLetter={activeLetter}
    layout={ALPHABET_LAYOUT_MOBILE}
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    url={lettersUrl}
    theme={theme}
  />
);

const AlphabetOverlay = alphabetOverlayFactory({
  Alphabet: getAlphabetComponentByProps,
  CloseIcon: <Icon type="IconXMark" />,
  styles: getStylesByProps,
});

export default AlphabetOverlay;
