/* istanbul ignore file */

import React, { ReactElement } from 'react';
import alphabeticNavigationFactory from '../../../../../common/components/AlphabeticNavigation/factory';
import Alphabet from './components/Alphabet';
import AlphabetOverlay from './components/AlphabetOverlay';
import { ALPHABET_LAYOUT_MAIN } from '../../../../../common/components/AlphabeticNavigation/components/Alphabet/constants';
import styles from './styles.legacy.css';
import { AlphabetOverlayProps } from '../../../../../common/components/AlphabeticNavigation/components/AlphabetOverlay/typings';
import { AlphabeticNavigationProps as AlphabeticNavigationCommonProps } from '../../../../../common/components/AlphabeticNavigation/typings';

type AlphabeticNavigationProps = AlphabeticNavigationCommonProps & {
  theme?: string;
};

const getAlphabetComponentByProps = ({
  lettersUrl,
  activeLetter,
}: AlphabeticNavigationProps): ReactElement => (
  <Alphabet
    layout={ALPHABET_LAYOUT_MAIN}
    activeLetter={activeLetter}
    url={lettersUrl}
  />
);

const getAlphabetOverlayByProps = (
  props: AlphabetOverlayProps,
): ReactElement => <AlphabetOverlay {...props} />;

const AlphabeticNavigation = alphabeticNavigationFactory({
  styles: {
    AlphabetWrapper: '',
    AlphabetOuterWrapper: styles.AlphabetOuterWrapper,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
    AlphabetInnerWrapper: null,
    MobileToggleWrapper: styles.MobileToggleWrapper,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    MobileToggleInnerWrapper: null,
    MobileToggle: styles.MobileToggle,
  },
  Alphabet: getAlphabetComponentByProps,
  AlphabetOverlay: getAlphabetOverlayByProps,
});

export default AlphabeticNavigation;
