import React from 'react';
import relatedContentFactory, {
  RelatedContentPropsInner,
} from '../../../../../common/components/RelatedContent/factory';
import { ensureTeaserInterface } from '../Teaser/shared/helpers';
import Pager from '../Pager';
import TeaserGrid from '../TeaserGrid';
import { TeaserLayout } from '../TeaserGrid/gridConfigs';
import { GRID_LAYOUT_TEASER_3X2 } from '../TeaserGrid/gridConfigs/constants';
import styles from './styles.legacy.css';

type RelatedContentProps = RelatedContentPropsInner & {
  teaserGridLayout: TeaserLayout;
};

const getTeaserGridByProps = ({
  teaserGridLayout = GRID_LAYOUT_TEASER_3X2,
  relatedContent,
}: RelatedContentProps) => {
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

const RelatedContent = relatedContentFactory({
  teaserGrid: getTeaserGridByProps,
  Pager,
  styles: {
    OuterWrapper: '',
    Wrapper: styles.Wrapper,
    TitleWrapper: '',
    Container: styles.Container,
    Title: styles.Title,
    TeaserListSpacing: '',
  },
});

export default RelatedContent;
