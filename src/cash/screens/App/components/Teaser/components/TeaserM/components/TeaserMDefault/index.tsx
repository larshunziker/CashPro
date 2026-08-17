import factory from '../../../TeaserML/components/TeaserMLDefault/factory';
import {
  STYLE_16X9_440,
  STYLE_16X9_560,
  STYLE_3X2_280,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_M_DEFAULT_IDENTIFIER } from '../../../../constants';

const TeaserMDefault = factory({
  teaserImageStyles: {
    style_320: STYLE_16X9_560,
    style_760: STYLE_3X2_280,
    style_1680: STYLE_16X9_440,
  },
  teaserIdentifier: TEASER_M_DEFAULT_IDENTIFIER,
  styles: {
    MinimumHeight: '',
  },
});

export default TeaserMDefault;
