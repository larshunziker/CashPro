import React from 'react';
import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import { log } from '../../../../../../../../../shared/helpers/utils';
import { getRestrictedClassName } from '../../../../../../../../../shared/helpers/withHelmet';
import { ensureTeaserInterface } from '../../../../../../components/Teaser/shared/helpers';
import Paragraphs from '../../../../../../components/Paragraphs';
import TeaserGrid from '../../../../../../components/TeaserGrid';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../../../../../../App/components/Pager';
import StatusPage from '../../../../../StatusPage';
import { VIDEO_CONTENT_TYPE } from '../../../../../../../../../shared/constants/content';
import { GRID_LAYOUT_TEASER_1X18 } from '../../../../../../components/TeaserGrid/gridConfigs/constants';
import { DEFAULT_PUBLICATION } from '../../../../../../constants';
import {
  LANDING_PAGE_TYPE,
  LANDING_PAGE_VIDEO_BLOG_GRID_PAGE_SIZE,
  PAGER_ANCHOR_SCROLL_ID,
} from '../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/App/ */
import { GET_VIDEO_BLOG_ENTITIES } from './queries';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  LandingPageQueryComponentProps,
  VideoBlogOverviewProps,
} from '../../../../typings';

const VideoBlogOverview = ({
  landingPage,
  enrichedLandingPageBody,
  isAdSuppressed,
  page,
  location,
}: VideoBlogOverviewProps) => {
  const variables = {
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    path: location && location.pathname.substr(1) + '?isVideoBlogChannel',
    publication: DEFAULT_PUBLICATION,
    overviewPageSize: LANDING_PAGE_VIDEO_BLOG_GRID_PAGE_SIZE,
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    overviewPageOffset: (page - 1) * LANDING_PAGE_VIDEO_BLOG_GRID_PAGE_SIZE,
    filter: [VIDEO_CONTENT_TYPE],
  };

  const {
    data: videoBlogEntities,
    loading,
    error,
  } = useQuery<LandingPageQueryComponentProps>(GET_VIDEO_BLOG_ENTITIES, {
    variables,
  });

  if (loading) {
    return null;
  }

  if (error) {
    __DEVELOPMENT__ && log('landing-page-query', error, 'red');
  }

  const object = videoBlogEntities?.environment?.routeByPath
    ?.object as LandingPage;

  if (!Array.isArray(object?.channel?.entities?.edges)) {
    return <StatusPage />;
  }

  return (
    <>
      <div className={getRestrictedClassName(landingPage.__typename)}>
        <Paragraphs
          pageBody={enrichedLandingPageBody}
          colStyle={grid.ColXs24}
          origin={LANDING_PAGE_TYPE}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
          isAdSuppressed={isAdSuppressed || landingPage?.channel?.suppressAds}
        />

        <div id={PAGER_ANCHOR_SCROLL_ID}>
          <div className={classNames(grid.Container, styles.Wrapper)}>
            <div className={grid.Row}>
              <div
                className={classNames(
                  grid.ColXs24,
                  grid.ColOffsetMd5,
                  grid.ColMd14,
                  grid.ColOffsetXl4,
                  grid.ColXl16,
                )}
              >
                <TeaserGrid
                  layout={GRID_LAYOUT_TEASER_1X18}
                  items={ensureTeaserInterface(
                    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                    (object?.channel && object?.channel.entities.edges) || null,
                  )}
                />
              </div>
            </div>
          </div>

          <div className={grid.Container}>
            <Pager
              itemsCount={
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                (object?.channel && object?.channel.entities.count) || 0
              }
              itemsPerPage={LANDING_PAGE_VIDEO_BLOG_GRID_PAGE_SIZE}
              currentPage={page}
              component={PAGER_TYPE_PAGE_LOADER}
              anchorScrollId={PAGER_ANCHOR_SCROLL_ID}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoBlogOverview;
