import React from 'react';
import classNames from 'classnames';
import {
  RankingListParagraphFactoryOptions,
  RankingListParagraphProps,
} from './typings';

export type RankingListParagraphPropsInner = RankingListParagraphProps;

export default ({
  gridLayout,
  ensureTeaserInterface,
  TeaserGrid,
  trackingClass,
  styles,
}: RankingListParagraphFactoryOptions) => {
  const RankingListParagraph = (props: RankingListParagraphPropsInner) => {
    const { rankingList }: RankingListParagraphPropsInner = props;

    if (
      !rankingList?.rankings?.edges ||
      !Array.isArray(rankingList.rankings.edges) ||
      rankingList.rankings.edges.length < 1
    ) {
      return null;
    }

    return (
      <div className={classNames(trackingClass, styles.Wrapper)}>
        <TeaserGrid
          items={ensureTeaserInterface(rankingList.rankings.edges)}
          layout={gridLayout}
        />
      </div>
    );
  };

  return RankingListParagraph;
};
