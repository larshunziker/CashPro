/* istanbul ignore file */

import styleguideColorsFactory from '../../../../../../../common/screens/Styleguide/components/Colors/factory';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import StatusPage from '../../../StatusPage';
import styles from './styles.legacy.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [
  styles.black,
  styles.white,
  styles.transparent,
  styles.black50,
  styles.primaryA,
  styles.primaryB,
  styles.secondaryA,
  styles.secondaryB,
  styles.positive,
  styles.blackA,
  styles.blackB,
  styles.greyA,
  styles.greyB,
  styles.greyC,
  styles.greyD,
  styles.greyE,
  styles.errorA,
  styles.errorB,
  styles.decoA,
  styles.decoB,
  styles.decoC,
];

const colors: Record<string, any>[] = [
  { name: 'black', rgba: 'rgba(0, 0, 0, 1)' },
  { name: 'black50', rgba: 'rgba(0, 0, 0, .5)' },
  { name: 'white', rgba: 'rgba(255, 255, 255, 1)' },
  { name: 'transparent', rgba: 'transparent' },
  { name: 'primaryA', rgba: 'rgba(177, 16, 41, 1)' },
  { name: 'primaryB', rgba: 'rgba(122, 0, 0, 1)' },
  { name: 'secondaryA', rgba: 'rgba(16, 123, 142, 1)' },
  { name: 'secondaryB', rgba: 'rgba(0, 79, 97, 1)' },
  { name: 'positive', rgba: 'rgba(54, 133, 63, 1)' },
  { name: 'blackA', rgba: 'rgba(0, 0, 0, 1)' },
  { name: 'blackB', rgba: 'rgba(41, 46, 50, 1)' },
  { name: 'greyA', rgba: 'rgba(106, 110, 113, 1)' },
  { name: 'greyB', rgba: 'rgba(160, 163, 166, 1)' },
  { name: 'greyC', rgba: 'rgba(216, 216, 216, 1)' },
  { name: 'greyD', rgba: 'rgba(239, 239, 239, 1)' },
  { name: 'greyE', rgba: 'rgba(245, 245, 245, 1)' },
  { name: 'errorA', rgba: 'rgba(197, 25, 66, 1)' },
  { name: 'errorB', rgba: 'rgba(236, 182, 195, 1)' },
  { name: 'decoA', rgba: 'rgba(176, 213, 220, 1)' },
  { name: 'decoB', rgba: 'rgba(223, 238, 241, 1)' },
  { name: 'decoC', rgba: 'rgba(185, 212, 188, 1)' },
];

const StyleguideColors = styleguideColorsFactory({
  StatusPage,
  styles: {
    ...styles,
    Title: styles.Title,
    ColorPreviewWrapper: styles.ColorPreviewWrapper,
    ColorItem: styles.ColorItem,
    DescriptionWrapper: styles.DescriptionWrapper,
  },
  colors,
  setLoading,
  setScreenReady,
});

export default StyleguideColors;
