import React from 'react';
import relatedContentFactory, {
  RelatedContentPropsInner,
} from '../../../../../common/components/RelatedContent/factory';
import { ensureTeaserInterface } from '../Teaser/shared/helpers';
import Pager from '../Pager';
import TeaserGrid from '../TeaserGrid';
import { TeaserLayout } from '../TeaserGrid/gridConfigs';
import styles from './styles.legacy.css';
import { RelatedContentFactoryOptionsStyles } from '../../../../../common/components/RelatedContent/typings';

type RelatedContentProps = RelatedContentPropsInner & {
  teaserGridLayout: TeaserLayout;
  isSplittedPageLayout?: boolean;
};

const getStylesByProps = ({
  ...props
}: RelatedContentProps): RelatedContentFactoryOptionsStyles => {
  return {
    OuterWrapper: '',
    Wrapper: styles.Wrapper,
    TitleWrapper: styles.TitleWrapper,
    Title: styles.Title,
    TeaserListSpacing: (props.gridOptionType && styles.TeaserListSpacing) || '',
    Container: (!props.titleHasContainer && styles.Container) || '',
  };
};

const getTeaserGridByProps = ({
  teaserGridLayout,
  relatedContent,
  isSplittedPageLayout,
}: RelatedContentProps) => {
  if (!Array.isArray(relatedContent?.edges) || !relatedContent?.edges.length) {
    return null;
  }

  return (
    <TeaserGrid
      layout={teaserGridLayout}
      items={ensureTeaserInterface(relatedContent.edges)}
      isSplittedPageLayout={isSplittedPageLayout}
    />
  );
};

const RelatedContent = relatedContentFactory({
  teaserGrid: getTeaserGridByProps,
  Pager,
  styles: getStylesByProps,
});

export default RelatedContent;
