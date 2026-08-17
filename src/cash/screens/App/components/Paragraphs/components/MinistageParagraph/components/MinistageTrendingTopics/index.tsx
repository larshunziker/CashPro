/* istanbul ignore file */

import ministageTrendingTopicsfactory from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageTrendingTopics/factory';
import styles from './styles.legacy.css';

const MinistageTeaser = ministageTrendingTopicsfactory({
  styles: {
    Wrapper: '',
    ContentWrapper: '',
    Title: styles.Title,
    ActivePath: styles.ActivePath,
    Keyword: styles.Keyword,
  },
  labelPrefix: '',
  titleFallback: '',
});

export default MinistageTeaser;
