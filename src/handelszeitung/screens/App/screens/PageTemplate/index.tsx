/* istanbul ignore file */

import React from 'react';
import classNames from 'classnames';
import pageTemplateFactory from '../../../../../common/screens/PageTemplate/factory';
import ArticlePage from '../ArticlePage';
import ArticlePageAside from '../ArticlePage/components/ArticlePageAside';
import {
  FULL_PAGE_LAYOUT_TYPE,
  RIGHT_COLUMN_PAGE_LAYOUT_TYPE,
} from '../../../../../common/screens/PageTemplate/constants';
import { ARTICLE_CONTENT_TYPE } from '../../../../../shared/constants/content';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { PageTemplateFactoryOptionsStyles } from '../../../../../common/screens/PageTemplate/typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getStylesByLayoutType = (props): PageTemplateFactoryOptionsStyles => {
  const { pageLayoutType, hasChildren, subtypeValue } = props;
  const isNews = subtypeValue === 'news';

  switch (pageLayoutType) {
    case FULL_PAGE_LAYOUT_TYPE:
      return {
        Wrapper: styles.Wrapper,
        MainContent: classNames(styles.MainContent, grid.ColXs24),
        AsideContent: '',
      };

    case RIGHT_COLUMN_PAGE_LAYOUT_TYPE:
      const mainGridConfig =
        (hasChildren &&
          isNews &&
          classNames(grid.ColXs24, grid.ColMd15, grid.ColXl16)) ||
        grid.ColXs24;

      const asideGridConfig =
        (hasChildren &&
          isNews &&
          classNames(
            grid.ColXs24,
            grid.ColMd8,
            grid.ColXl7,
            grid.ColOffsetMd1,
            grid.ColOffsetXl1,
          )) ||
        grid.ColXs24;

      return {
        Wrapper: styles.Wrapper,
        MainContent: classNames(styles.MainContent, mainGridConfig),
        AsideContent: classNames(styles.AsideContent, asideGridConfig),
      };
    default:
      return {
        Wrapper: styles.Wrapper,
        MainContent: classNames(styles.MainContent, grid.ColXs24),
        AsideContent: classNames(styles.AsideContent, grid.ColXs24),
      };
  }
};

const PageTemplateFactory = pageTemplateFactory({
  styles: getStylesByLayoutType,
});

const PageTemplate = ({ ...props }) => {
  const routeByPathObject =
    props?.data?.environment?.routeByPath?.object || null;

  if (!routeByPathObject) {
    return;
  }
  const isNews = ['news'].includes(routeByPathObject?.subtypeValue);

  switch (routeByPathObject.__typename) {
    case ARTICLE_CONTENT_TYPE:
      return (
        <PageTemplateFactory
          {...props}
          /* @ts-ignore TODO: TS2322 ->  Type 'Element' is not assignable to type 'null | undefined'. */
          asideContent={
            <ArticlePageAside
              props={routeByPathObject}
              pageLayoutType={props.pageLayoutType || FULL_PAGE_LAYOUT_TYPE}
            />
          }
        >
          <ArticlePage
            article={routeByPathObject}
            location={props.location}
            pageLayoutType={
              (isNews && props.pageLayoutType) || FULL_PAGE_LAYOUT_TYPE
            }
          />
        </PageTemplateFactory>
      );

    default:
      return (
        <PageTemplateFactory>
          <ArticlePage
            article={routeByPathObject}
            location={location}
            pageLayoutType={FULL_PAGE_LAYOUT_TYPE}
          />
        </PageTemplateFactory>
      );
  }
};

export default PageTemplate;
