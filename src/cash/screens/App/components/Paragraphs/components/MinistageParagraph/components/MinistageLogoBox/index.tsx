/* istanbul ignore file */

import ministageLogoBoxfactory from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageLogoBox/factory';
import Teaser from '../../../../../Teaser';
import styles from './styles.legacy.css';
import { TeaserComponent } from '../../../../../../../../../common/components/Teaser/typings';

const MinistageLogoBox = ministageLogoBoxfactory({
  styles: {
    Title: styles.Title,
    SubTitle: styles.SubTitle,
    ItemWrapper: styles.ItemWrapper,
  },
  Teaser: Teaser as TeaserComponent,
});

export default MinistageLogoBox;
