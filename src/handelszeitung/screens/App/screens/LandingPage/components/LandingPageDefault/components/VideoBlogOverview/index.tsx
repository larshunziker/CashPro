import React from 'react';
import { useQuery } from '@apollo/client';
import { log } from '../../../../../../../../../shared/helpers/utils';
import { getRestrictedClassName } from '../../../../../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../../../../../components/Teaser/shared/helpers';
import OverviewPageHeader from '../../../../../../components/OverviewPageHeader';
import Paragraphs from '../../../../../../components/Paragraphs';
import TeaserGrid from '../../../../../../components/TeaserGrid';
import StatusPage from '../../../../../StatusPage';
import Pager, {
  PAGER_TYPE_PAGE_LOADER,
} from '../../../../../../components/Pager';
import { VIDEO_CONTENT_TYPE } from '../../../../../../../../../shared/constants/content';
import { OVERVIEW_PAGE_HEADER_DEFAULT } from '../../../../../../components/OverviewPageHeader/constants';
import { GRID_LAYOUT_TEASER_3X4 } from '../../../../../../components/TeaserGrid/gridConfigs/constants';
import { DEFAULT_PUBLICATION } from '../../../../../../constants';
import {
  LANDING_PAGE_TYPE,
  LANDING_PAGE_VIDEO_BLOG_GRID_PAGE_SIZE,
  PAGER_ANCHOR_SCROLL_ID,
} from '../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
import { GET_VIDEO_BLOG_ENTITIES } from './queries';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  LandingPageQueryComponentProps,
  VideoBlogOverviewProps,
} from '../../../../typings';

const VideoBlogOverview = ({
  landingPage,
  location,
  page,
  enrichedPageBody,
}: VideoBlogOverviewProps) => {
  const gqlVariables = {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    path: location && location.pathname.substr(1),
    publication: DEFAULT_PUBLICATION,
    overviewPageSize: LANDING_PAGE_VIDEO_BLOG_GRID_PAGE_SIZE,
    overviewPageOffset: (page - 1) * LANDING_PAGE_VIDEO_BLOG_GRID_PAGE_SIZE,
    filter: [VIDEO_CONTENT_TYPE],
  };

  const {
    data: videoBlogEntities,
    loading,
    error,
  } = useQuery<LandingPageQueryComponentProps>(GET_VIDEO_BLOG_ENTITIES, {
    variables: gqlVariables,
  });

  if (loading) {
    return null;
  }

  if (
    !Array.isArray(
      videoBlogEntities?.environment?.routeByPath?.object?.channel?.entities
        ?.edges,
    ) ||
    !videoBlogEntities?.environment?.routeByPath?.object?.channel?.entities
      ?.edges.length
  ) {
    return <StatusPage />;
  }

  if (error) {
    __DEVELOPMENT__ && log('landing-page-query', error, 'red');
  }

  const {
    environment: {
      routeByPath: { object },
    },
  } = videoBlogEntities;

  return (
    <>
      <OverviewPageHeader
        component={OVERVIEW_PAGE_HEADER_DEFAULT}
        title={landingPage?.title || ''}
        lead={landingPage?.lead || ''}
      />
      <div className={getRestrictedClassName(landingPage.__typename)}>
        <Paragraphs
          pageBody={enrichedPageBody}
          colStyle={grid.ColXs24}
          origin={LANDING_PAGE_TYPE}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
          isAdSuppressed={landingPage?.channel?.suppressAds}
        />

        {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
        {object?.channel.entities && (
          <div id={PAGER_ANCHOR_SCROLL_ID}>
            <div className={styles.Wrapper}>
              <TeaserGrid
                layout={GRID_LAYOUT_TEASER_3X4}
                items={ensureTeaserInterface(
                  object?.channel?.entities.edges || null,
                )}
              />
            </div>
            <div>
              <Pager
                itemsCount={
                  (object?.channel && object?.channel.entities.count) || 0
                }
                itemsPerPage={LANDING_PAGE_VIDEO_BLOG_GRID_PAGE_SIZE}
                currentPage={page}
                component={PAGER_TYPE_PAGE_LOADER}
                anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VideoBlogOverview;
