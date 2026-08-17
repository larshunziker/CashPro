import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import { ensureTeaserInterface } from '../../components/Teaser/shared/helpers';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Link from '../../../../../common/components/Link';
import EditButtons from '../../components/EditButtons';
import SocialIcon from '../../components/SocialIcon';
import TeaserGrid from '../../components/TeaserGrid';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
import { WithRaschRouter } from '../../../../../shared/@types/gql';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { SOCIAL_ICON } from '../../components/SocialIcon/constants';
import { GRID_LAYOUT_HERO_MIXED } from '../../components/TeaserGrid/gridConfigs/constants';
import { PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { VideosProps } from './typings';

const defaultTitle = 'Videos';

const getOptions = () => ({
  classNameGradient: styles.Gradient,
  classNameGradientInner: styles.GradientInner,
  id: styles.Gradient,
});

type VideosPropsInner = VideosProps &
  Pick<WithRaschRouter, 'data'> & {
    data: {
      environment: {
        routeByPath: Route & {
          object: Video;
        };
      };
    };
  };

const Videos = ({ data, page }: VideosPropsInner) => {
  if (
    !data ||
    typeof data !== 'object' ||
    !data?.environment?.routeByPath ||
    !data?.environment?.routeByPath.object ||
    !data?.environment?.globalSearch
  ) {
    return null;
  }

  const videoPage = data.environment?.routeByPath.object;

  return (
    <div className={`videos-overview ${styles.Wrapper}`}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={videoPage?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={videoPage?.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={videoPage?.cloneContentUri}
      />
      <div className={sections.Container}>
        <div className={grid.Row}>
          <div className={classNames(grid.ColXs24, styles.Header)}>
            <div className={styles.HeaderTitle}>
              {videoPage.title || defaultTitle}
            </div>
          </div>
          <div
            className={classNames(
              grid.ColSm20,
              grid.ColMd16,
              grid.ColOffsetSm2,
              grid.ColOffsetMd4,
            )}
          >
            <span className={styles.Lead}>{videoPage.lead}</span>
          </div>
          <div className={grid.ColXs24}>
            <div className={styles.DividerThick} />
            <div className={styles.SocialsWrapper}>
              <span className={styles.FollowUs}>Follow us on</span>
              <Link
                path="https://www.youtube.com/channel/UCe0fhq9hRLoXCfvMDNFnC-Q"
                className={styles.SocialLink}
              >
                <SocialIcon type={SOCIAL_ICON.YOUTUBE} {...getOptions()} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {data?.environment?.globalSearch.edges &&
        data?.environment?.globalSearch.edges.length > 0 && (
          <>
            <TeaserGrid
              items={ensureTeaserInterface(
                data?.environment?.globalSearch.edges,
              )}
              layout={GRID_LAYOUT_HERO_MIXED}
            />
            <div className={sections.Container}>
              <Pager
                itemsCount={data?.environment?.globalSearch?.count || 0}
                itemsPerPage={PAGE_SIZE}
                currentPage={page}
                component={PAGER_TYPE_PAGE_LOADER}
              />
            </div>
          </>
        )}
    </div>
  );
};

export default compose<any, any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps.data?.environment?.globalSearch?.count || 0,
    pageSize: PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps.data?.environment?.globalSearch?.edges,
    hasBreadcrumbs: () => false,
  }),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'Videos',
      }),
  }),
)(Videos);
