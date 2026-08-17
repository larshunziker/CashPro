import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import { STYLE_1X1_280 } from '../../../../../../../shared/constants/images';
import { TEASER_LEAD_LENGTH } from '../../constants';
import styles from './styles.legacy.css';

const TeaserPerson = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_1X1_280,
  },
  leadOptions: {
    truncateCount: TEASER_LEAD_LENGTH,
    suffixText: '',
  },
  styles: {
    Wrapper: styles.Wrapper,
    Image: styles.PersonImage,
    Title: styles.PersonName,
    Lead: styles.PersonFunction,
    SkeletonTitle: classNames(styles.PersonFunction, styles.SkeletonTitle),
    SkeletonShortTitle: classNames(
      styles.PersonName,
      styles.SkeletonShortTitle,
    ),
    SkeletonContentWrapper: styles.SkeletonContentWrapper,
    SkeletonWrapper: styles.SkeletonWrapper,
  },
});

export default TeaserPerson;
