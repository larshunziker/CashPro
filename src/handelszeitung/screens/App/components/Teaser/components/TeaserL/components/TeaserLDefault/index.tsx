import factory from '../../../TeaserML/components/TeaserMLDefault/factory';
import {
  STYLE_16X9_340,
  STYLE_16X9_360,
  STYLE_16X9_700,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_L_DEFAULT_IDENTIFIER } from '../../../../constants';
import styles from '../../styles.legacy.css';

const TeaserLDefault = factory({
  teaserImageStyles: {
    style_320: STYLE_16X9_340,
    style_960: STYLE_16X9_360,
    style_1680: STYLE_16X9_700,
  },
  teaserIdentifier: TEASER_L_DEFAULT_IDENTIFIER,
  styles: { MinimumHeight: styles.MinimumHeight },
});

export default TeaserLDefault;
