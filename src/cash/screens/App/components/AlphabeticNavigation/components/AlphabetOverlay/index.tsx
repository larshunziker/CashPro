/* istanbul ignore file */

import React, { ReactElement } from 'react';
import alphabetOverlayFactory from '../../../../../../../common/components/AlphabeticNavigation/components/AlphabetOverlay/factory';
import Icon from '../../../Icon';
import Alphabet from '../Alphabet';
import { ALPHABET_LAYOUT_MOBILE } from '../../../../../../../common/components/AlphabeticNavigation/components/Alphabet/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { AlphabetOverlayProps as AlphabetOverlayCommonProps } from '../../../../../../../common/components/AlphabeticNavigation/components/AlphabetOverlay/typings';

type AlphabetOverlayProps = AlphabetOverlayCommonProps & {
  theme?: string;
};

const getAlphabetComponentByProps = ({
  activeLetter,
  lettersUrl,
}: AlphabetOverlayProps): ReactElement => (
  <Alphabet
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    activeLetter={activeLetter}
    layout={ALPHABET_LAYOUT_MOBILE}
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    url={lettersUrl}
  />
);

const AlphabetOverlay = alphabetOverlayFactory({
  Alphabet: getAlphabetComponentByProps,
  CloseIcon: <Icon type="IconXMark" />,
  styles: {
    Wrapper: '',
    GridColumns: grid.ColXs24,
    GridRow: grid.Row,
    MobileCloseIconWrapper: styles.MobileCloseIconWrapper,
    MobileMenu: styles.MobileMenu,
    MobileMenuInner: styles.MobileMenuInner,
    MobileMenuOpen: styles.MobileMenuOpen,
  },
});

export default AlphabetOverlay;
