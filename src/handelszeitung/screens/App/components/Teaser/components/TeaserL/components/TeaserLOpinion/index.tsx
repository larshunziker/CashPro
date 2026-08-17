/* istanbul ignore file */

import teaserMLOpinionFactory from '../../../TeaserML/components/TeaserMLOpinion/factory';
import { TEASER_L_OPINION_IDENTIFIER } from '../../../../constants';
import styles from './styles.legacy.css';

const TeaserMLOpinion = teaserMLOpinionFactory({
  teaserIdentifier: TEASER_L_OPINION_IDENTIFIER,
  styles: { MinimumHeight: styles.MinimumHeightOpinion },
});

export default TeaserMLOpinion;
