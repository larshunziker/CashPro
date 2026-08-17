import React from 'react';
import TestFragment from '../../../shared/tests/components/TestFragment';
import PageHeader from './components/PageHeader';
import { PAGE_SIZE } from './constants';
import grid from '../../assets/styles/grid.legacy.css';
import { TopicContentProps, TopicFactoryOptions, TopicProps } from './typings';

const topicTypeMap: Map<string, string> = new Map([
  ['person', 'person'],
  ['event', 'keyword'],
  ['keyword', 'keyword'],
]);

const topicFactory = ({
  Pager,
  TeaserGrid,
  gridConfig,
  ensureTeaserInterface,
  Breadcrumbs,
  pagerType,
  styles,
}: TopicFactoryOptions) => {
  const TopicDetailPage = ({ topic, page }: TopicProps) => {
    if (!topic) {
      return null;
    }

    const breadcrumbItems: Omit<ActiveMenuTrailItemConnection, 'pageInfo'> = {
      count: 1,
      totalCount: 1,
      edges: [
        {
          node: {
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
            id: topic?.id,
            label: topic?.title,
            link: null,
            __typename: 'ActiveMenuTrailItem',
          },
          __typename: 'ActiveMenuTrailItemEdge',
        },
      ],
      __typename: 'ActiveMenuTrailItemConnection',
    };

    const activeMenuTrail: ActiveMenuTrailItemConnection =
      (topic?.activeMenuTrail && {
        ...JSON.parse(JSON.stringify(topic.activeMenuTrail)),
      }) ||
      breadcrumbItems;

    const topicType =
      // @ts-ignore
      (topic.heroImageBody?.[0]?.image && topicTypeMap.get(topic.type)) ||
      'default';

    return (
      <TestFragment data-testid="topic-page-wrapper">
        {topic.preferredUri && Breadcrumbs && (
          <TestFragment data-testid="topics-breadcrumbs-wrapper">
            {/* @ts-ignore TODO: TS2322 ->  Type 'ActiveMenuTrailItemConnection' is not assignable to type 'BreadcrumbsItems'. */}
            <Breadcrumbs pageUrl={topic.preferredUri} items={activeMenuTrail} />
          </TestFragment>
        )}
        {
          <TestFragment data-testid="topic-page-grid">
            <PageHeader
              title={topic?.title || ''}
              lead={topic?.description}
              // @ts-ignore
              headerImage={topic.heroImageBody?.[0]?.image}
              component={`topic-page-header/${topicType}`}
              styles={styles}
            />
            <TopicContent
              page={page}
              topic={topic}
              TeaserGrid={TeaserGrid}
              gridConfig={gridConfig}
              ensureTeaserInterface={ensureTeaserInterface}
              Pager={Pager}
              pagerType={pagerType}
            />
          </TestFragment>
        }
      </TestFragment>
    );
  };
  return TopicDetailPage;
};

const TopicContent = ({
  page,
  topic,
  TeaserGrid,
  gridConfig,
  ensureTeaserInterface,
  Pager,
  pagerType,
}: TopicContentProps) => {
  if (!topic || Object.keys(topic).length === 0) {
    return null;
  }

  const gridItems = topic?.entities?.edges;

  if (!gridItems) {
    return null;
  }
  return (
    <>
      <TeaserGrid
        layout={gridConfig}
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<NodeInterface> | undefined' is not assignable to parameter of type 'TeaserInterface'. */
        items={gridItems.map((item) => ensureTeaserInterface(item.node))}
      />
      <div className={grid.Container}>
        <Pager
          component={pagerType}
          /* @ts-ignore TODO: TS2322 ->  Type 'number | undefined' is not assignable to type 'number'. */
          currentPage={page}
          itemsCount={topic?.entities?.count || 0}
          itemsPerPage={PAGE_SIZE}
        />
      </div>
    </>
  );
};

export default topicFactory;
