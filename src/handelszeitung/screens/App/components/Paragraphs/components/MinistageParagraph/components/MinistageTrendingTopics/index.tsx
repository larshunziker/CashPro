/* istanbul ignore file */

import classNames from 'classnames';
import ministageTrendingTopicsfactory from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageTrendingTopics/factory';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  MinistageTrendingTopicsFactoryOptionsStyles,
  MinistageTrendingTopicsProps,
} from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageTrendingTopics/typings';

const getStyleByProps = ({
  isSplittedPageLayout,
}: MinistageTrendingTopicsProps): MinistageTrendingTopicsFactoryOptionsStyles => {
  return {
    Wrapper: classNames(styles.Wrapper, {
      [styles.IsSplittedPageLayout]: isSplittedPageLayout,
    }),
    ContentWrapper: classNames({ [grid.Container]: !isSplittedPageLayout }),
    Title: styles.Title,
    Keyword: styles.Keyword,
  };
};

export default ministageTrendingTopicsfactory({
  styles: getStyleByProps,
});
