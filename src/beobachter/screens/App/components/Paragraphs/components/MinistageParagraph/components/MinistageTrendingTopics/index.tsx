/* istanbul ignore file */
import classNames from 'classnames';
import ministageTrendingTopicsfactory from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageTrendingTopics/factory';
import { isInsideColumn } from '../../../../../../../../shared/helpers/isInsideColumn';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { MinistageTrendingTopicsProps } from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageTrendingTopics/typings';

export default ministageTrendingTopicsfactory({
  styles: ({ origin }: MinistageTrendingTopicsProps) => ({
    Wrapper: styles.Wrapper,
    ContentWrapper: classNames(grid.Container, {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      [styles.ContentWrapperInGuideArticle]: isInsideColumn(origin),
    }),
    Title: styles.Title,
    Keyword: styles.Keyword,
    KeywordWrapper: styles.KeywordWrapper,
  }),
});
