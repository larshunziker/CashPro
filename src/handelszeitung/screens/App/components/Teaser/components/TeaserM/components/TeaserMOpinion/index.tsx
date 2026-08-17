import factory from '../../../TeaserML/components/TeaserMLOpinion/factory';
import { TEASER_M_OPINION_IDENTIFIER } from '../../../../constants';
import styles from '../../styles.legacy.css';

const TeaserMOpinion = factory({
  teaserIdentifier: TEASER_M_OPINION_IDENTIFIER,
  styles: { MinimumHeight: styles.MinimumHeight },
});

export default TeaserMOpinion;
