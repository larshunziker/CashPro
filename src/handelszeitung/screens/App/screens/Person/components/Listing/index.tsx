import React from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../../components/Icon';
import {
  RANKING_TYPE_DIGITAL_SHAPERS,
  RANKING_TYPE_RICHEST,
  RANKING_TYPE_TOP_BANKER,
  RANKING_TYPE_WHO_IS_WHO,
  RANKING_TYPE_YOUNG_RICHEST,
  RANKING_TYPE_YOUNG_RICHEST_ENTREPRENEUR,
  RANKING_TYPE_YOUNG_RICHEST_INHERITANCE,
  RANKING_TYPE_YOUNG_RICHEST_STARS,
} from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ListingProps } from '../Listing/typings';

type ListingPropsInner = ListingProps & {
  renderRankings: (props: ListingProps) => React.ReactElement;
};

type RankingListItemProps = {
  preferredUri: string;
  year: string;
  highlight?: string;
  title?: string;
  rankingValue?: string;
};

type ListingHeaderComponentProps = {
  labels: string[];
};

export const getTitle = (rankingType: string) => {
  switch (rankingType) {
    case RANKING_TYPE_RICHEST:
      return 'Die 300 Reichsten';
    case RANKING_TYPE_TOP_BANKER:
      return 'Die 100 Top Banker';
    case RANKING_TYPE_WHO_IS_WHO:
      return 'Who is who';
    case RANKING_TYPE_DIGITAL_SHAPERS:
      return 'Digital Shapers';
    case RANKING_TYPE_YOUNG_RICHEST:
      return 'Die jungen Reichsten';
    case RANKING_TYPE_YOUNG_RICHEST_STARS:
      return 'Die jungen Reichsten - Stars';
    case RANKING_TYPE_YOUNG_RICHEST_INHERITANCE:
      return 'Die jungen Reichsten - Erben';
    case RANKING_TYPE_YOUNG_RICHEST_ENTREPRENEUR:
      return 'Die jungen Reichsten - Unternehmer';
    default:
      return 'Liste';
  }
};

const Listing = ({
  listing,
  renderRankings,
  rankingType,
  addClass = '',
}: ListingPropsInner) => (
  <div
    className={classNames(styles.Wrapper, {
      [addClass]: !!addClass,
    })}
  >
    <div className={styles.ListHeader}>
      <h2 className={classNames(grid.Container, styles.ListTitle)}>
        {getTitle(rankingType)}
      </h2>
    </div>
    <div className={styles.FakeHeader} />
    <div className={classNames(grid.Container, styles.RankingList)}>
      <ListingHeader rankingType={rankingType} />
      <div className={styles.RankingListBody}>
        {listing.map(renderRankings)}
      </div>
    </div>
  </div>
);

/* @ts-ignore TODO: TS7031 ->  Binding element 'rankingType' implicitly has an 'any' type. */
const ListingHeader = ({ rankingType }) => {
  switch (rankingType) {
    case RANKING_TYPE_RICHEST:
      return <ListingHeaderComponent labels={['Jahr', 'Platz', 'Vermögen']} />;
    case RANKING_TYPE_TOP_BANKER:
      return <ListingHeaderComponent labels={['Jahr', 'Platz', 'Rolle']} />;
    case RANKING_TYPE_WHO_IS_WHO:
      return <ListingHeaderComponent labels={['Jahr', 'Branche', 'Rolle']} />;
    case RANKING_TYPE_YOUNG_RICHEST:
    case RANKING_TYPE_YOUNG_RICHEST_INHERITANCE:
    case RANKING_TYPE_YOUNG_RICHEST_ENTREPRENEUR:
    case RANKING_TYPE_YOUNG_RICHEST_STARS:
      return <ListingHeaderComponent labels={['Jahr', 'Vermögen']} />;
    default:
    case RANKING_TYPE_DIGITAL_SHAPERS:
      return <ListingHeaderComponent labels={['Jahr', 'Kategorie']} />;
  }
};

const ListingHeaderComponent = ({ labels }: ListingHeaderComponentProps) => {
  return (
    <div className={styles.ListRowHead}>
      {labels.map((labelItem) => (
        <div
          key={`rankinglist-header-column-${labelItem}`}
          className={styles.ListItemHeadItem}
        >
          {labelItem}
        </div>
      ))}
      <div
        key={`rankinglist-header-column-icon-placeholders`}
        className={styles.ListItemHeadItem}
      />
    </div>
  );
};

const doRenderRankings = (
  rankingType: string,
  { node }: Record<string, any>,
) => {
  switch (rankingType) {
    default:
    case RANKING_TYPE_RICHEST:
      return (
        <RankingListItem
          preferredUri={node.ranking.preferredUri}
          year={node.ranking.year}
          highlight={node.rankingPosition}
          rankingValue={node.rankingValue}
        />
      );
    case RANKING_TYPE_TOP_BANKER:
      return (
        <RankingListItem
          preferredUri={node.ranking.preferredUri}
          year={node.ranking.year}
          highlight={node.rankingPosition}
          title={node.ranking.title}
        />
      );
    case RANKING_TYPE_WHO_IS_WHO:
      return (
        <RankingListItem
          preferredUri={node.ranking.preferredUri}
          year={node.ranking.year}
          title={node.ranking.title}
          rankingValue={node.rankingValue}
        />
      );
    case RANKING_TYPE_DIGITAL_SHAPERS:
      return (
        <RankingListItem
          preferredUri={node.ranking.preferredUri}
          year={node.ranking.year}
          title={node.ranking.title}
        />
      );
    case RANKING_TYPE_YOUNG_RICHEST:
    case RANKING_TYPE_YOUNG_RICHEST_INHERITANCE:
    case RANKING_TYPE_YOUNG_RICHEST_ENTREPRENEUR:
    case RANKING_TYPE_YOUNG_RICHEST_STARS:
      return (
        <RankingListItem
          preferredUri={node.ranking.preferredUri}
          year={node.ranking.year}
          rankingValue={node.rankingValue}
        />
      );
  }
};

const RankingListItem = ({
  preferredUri,
  year,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
  highlight = null,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
  title = null,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
  rankingValue = null,
}: RankingListItemProps) => (
  <Link
    key={`ranking-entry-${preferredUri}`}
    className={styles.ListRow}
    path={preferredUri}
  >
    <>
      <div className={styles.ListItem}>{year}</div>
      {highlight && (
        <div className={classNames(styles.ListItem, styles.ListItemHighlight)}>
          {highlight}
        </div>
      )}
      {title && (
        <div className={classNames(styles.ListItem, styles.MinWidth)}>
          {title}
        </div>
      )}
      {rankingValue && <div className={styles.ListItem}>{rankingValue}</div>}
      <div className={classNames(styles.ListItem, styles.ListItemIcon)}>
        <Icon addClass={styles.LinkIcon} type="IconArrowRight" />
      </div>
    </>
  </Link>
);

const withRenderRankings = withHandlers({
  renderRankings:
    ({ rankingType }: ListingPropsInner) =>
    (ranking: Record<string, any>) =>
      doRenderRankings(rankingType, ranking),
});

const ListingWrapper = compose<any, any>(withRenderRankings)(Listing);

export default ListingWrapper;
