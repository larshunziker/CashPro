/* istanbul ignore file */

import ministageTrendingTopicsfactory from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageTrendingTopics/factory';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const MinistageTrendingTopics = ministageTrendingTopicsfactory({
  styles: {
    Wrapper: styles.Wrapper,
    ContentWrapper: grid.Container,
    Title: styles.Title,
    KeywordWrapper: styles.KeywordWrapper,
    Keyword: styles.Keyword,
  },
});

export default MinistageTrendingTopics;
