import React from 'react';
import classNames from 'classnames';
import RelatedContentFactory, {
  RelatedContentPropsInner,
} from '../../../../../common/components/RelatedContent/factory';
import { ensureTeaserInterface } from '../Teaser/shared/helpers';
import Pager from '../Pager';
import TeaserGrid from '../TeaserGrid';
import { TeaserLayout } from '../TeaserGrid/gridConfigs';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

type RelatedContentProps = RelatedContentPropsInner & {
  teaserGridLayout: TeaserLayout;
};

export const getTeaserGridByProps = ({
  teaserGridLayout,
  relatedContent,
}: RelatedContentProps) => {
  if (!teaserGridLayout) {
    return null;
  }

  if (!Array.isArray(relatedContent?.edges) || !relatedContent?.edges.length) {
    return null;
  }

  return (
    <TeaserGrid
      layout={teaserGridLayout}
      items={ensureTeaserInterface(relatedContent.edges)}
    />
  );
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'isSplittedPageLayout' implicitly has an 'any' type. */
export const getStylesByProps = ({ isSplittedPageLayout }) => {
  return {
    OuterWrapper: classNames(styles.OuterWrapper, {
      [grid.Container]: !isSplittedPageLayout,
    }),
    Wrapper: styles.Wrapper,
    TitleWrapper: styles.TitleWrapper,
    Title: styles.Title,
    TeaserListSpacing: styles.TeaserListSpacing,
    Container: '',
  };
};

export default RelatedContentFactory({
  teaserGrid: getTeaserGridByProps,
  Pager,
  styles: getStylesByProps,
});
