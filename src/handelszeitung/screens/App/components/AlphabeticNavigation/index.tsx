/* istanbul ignore file */

import React, { ReactElement } from 'react';
import alphabeticNavigationFactory from '../../../../../common/components/AlphabeticNavigation/factory';
import Alphabet from './components/Alphabet';
import AlphabetOverlay from './components/AlphabetOverlay';
import { ALPHABET_LAYOUT_MAIN } from '../../../../../common/components/AlphabeticNavigation/components/Alphabet/constants';
import styles from './styles.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import { AlphabeticNavigationProps as AlphabeticNavigationCommonProps } from '../../../../../common/components/AlphabeticNavigation/typings';
import { AlphabetOverlayProps } from '../../../../../common/components/AlphabeticNavigation/components/AlphabetOverlay/typings';

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
    AlphabetInnerWrapper: sections.Container,
    MobileToggleWrapper: styles.MobileToggleWrapper,
    MobileToggleInnerWrapper: styles.MobileToggleInnerWrapper,
    MobileToggle: styles.MobileToggle,
  },
  Alphabet: getAlphabetComponentByProps,
  AlphabetOverlay: getAlphabetOverlayByProps,
});

export default AlphabeticNavigation;
