/**
 * @file    Atelier Caminada
 */
import React, { ComponentType } from 'react';
import { FormattedMessage } from 'react-intl';
import compose from 'recompose/compose';
import classNames from 'classnames';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import {
  ensureTeaserInterface,
  ensureTeaserInterfaceItem,
} from '../../components/Teaser/shared/helpers';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../shared/decorators/withHelmet';
import CSSPicture from '../../../../../common/components/CSSPicture';
import BlogLead from '../../components/BlogLead';
import EditButtons from '../../components/EditButtons';
import Teaser from '../../components/Teaser';
import TeaserGrid from '../../components/TeaserGrid';
import {
  PAGER_TYPE_PAGE_LOADER,
  default as Pager,
} from '../../components/Pager';
import { getPianoLayout } from '../../../../shared/helpers/pianoLayouts';
import { STYLE_TEASER_1_1 } from '../../../../../shared/constants/images';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_ML } from '../../components/../../../../shared/constants/teaser';
import { PAGE_SIZE } from './constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { BlogBProps } from './typings';

const getFallbackTitle = () => (
  <FormattedMessage
    id="app.header.titleBlogB"
    description="Atelier caminada static teaser title"
    defaultMessage="Atelier Caminada"
  />
);

type BlogBPropsInner = BlogBProps & {
  data: {
    environment: {
      routeByPath: {
        object: LandingPage;
      };
      globalSearch: {
        count: number;
        edges: [{ node: Article }];
      };
    };
  };
};

const BlogB: ComponentType<BlogBPropsInner> = ({ data, page }) => {
  if (
    !data ||
    typeof data !== 'object' ||
    !data?.environment?.routeByPath ||
    !data?.environment?.routeByPath.object
  ) {
    return null;
  }

  const blogPage = data?.environment?.routeByPath.object;
  const listItemsExcludingHeroItem =
    data?.environment?.globalSearch?.edges?.slice(1);

  return (
    <div className={`atelier-caminada-overview ${styles.Wrapper}`}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={blogPage?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={blogPage?.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={blogPage?.cloneContentUri}
      />

      <div className={sections.Container}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <div className={styles.Header}>
              <h1 className={styles.HeaderTitle}>
                {blogPage.title || getFallbackTitle()}
              </h1>
              <div className={styles.LeadBoxWrapper}>
                <div
                  className={classNames(
                    styles.LeadTitleWrapper,
                    grid.HiddenLgDown,
                  )}
                >
                  <span className={styles.LeadTitle}>
                    {blogPage?.teaserImage?.image?.file?.alt || ''}
                  </span>
                </div>
                <div className={styles.LeadImageWrapper}>
                  {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                  {blogPage.teaserImage?.image?.file.relativeOriginPath && (
                    <CSSPicture
                      relativeOriginPath={
                        blogPage.teaserImage.image.file.relativeOriginPath
                      }
                      style_320={STYLE_TEASER_1_1}
                    >
                      {({ className }) => (
                        <span
                          className={classNames(styles.LeadImage, className)}
                        />
                      )}
                    </CSSPicture>
                  )}
                </div>
                <div
                  className={classNames(
                    styles.LeadTitleWrapper,
                    grid.HiddenLgUp,
                  )}
                >
                  <span className={styles.LeadTitle}>
                    {blogPage?.teaserImage?.image?.file?.alt || ''}
                  </span>
                </div>
                <div className={styles.LeadWrapper}>
                  {blogPage?.teaserImage?.caption && (
                    <span
                      className={styles.Lead}
                      dangerouslySetInnerHTML={{
                        __html: blogPage.teaserImage.caption,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {data?.environment?.globalSearch?.edges && (
        <div className={sections.Container}>
          <div className={grid.Row}>
            <div className={grid.ColXs24}>
              <div className={styles.TeaserWrapper}>
                <div className={grid.HiddenSmUp}>
                  <Teaser
                    {...ensureTeaserInterfaceItem(
                      data?.environment?.globalSearch.edges[0].node,
                    )}
                    component={TEASER_LAYOUT_ML}
                    downloadPriority="high"
                  />
                </div>
                <div className={grid.HiddenSmDown}>
                  <BlogLead
                    node={data?.environment?.globalSearch.edges[0].node}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {listItemsExcludingHeroItem?.length > 0 && (
        <>
          <TeaserGrid
            items={ensureTeaserInterface(listItemsExcludingHeroItem)}
            layout={getPianoLayout(
              data?.environment?.globalSearch?.edges?.length,
            )}
          />
          <div className={grid.Container}>
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
      mapProps?.data?.environment?.routeByPath?.object || null,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps) =>
      mapProps?.data?.environment?.globalSearch?.count || 0,
    pageSize: PAGE_SIZE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getFallbackTitle: (mapProps) => (!!mapProps && getFallbackTitle()) || '',
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
        articleType: 'LandingPage',
      }),
  }),
)(BlogB);
