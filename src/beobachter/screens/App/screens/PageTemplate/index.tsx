/* istanbul ignore file */

import React from 'react';
import classNames from 'classnames';
import pageTemplateFactory from '../../../../../common/screens/PageTemplate/factory';
import LegalAdviceSearch from '../../components/LegalAdviceSearch';
import ArticleRecommendations from '../Article/components/ArticleRecommendations';
import ArticlePage from '../ArticlePage';
import ArticlePageAside from '../ArticlePage/components/ArticlePageAside';
import {
  FULL_PAGE_LAYOUT_TYPE,
  RIGHT_COLUMN_PAGE_LAYOUT_TYPE,
} from '../../../../../common/screens/PageTemplate/constants';
import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
  ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
} from '../../../../../shared/constants/content';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { PageTemplateFactoryOptionsStyles } from '../../../../../common/screens/PageTemplate/typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getStylesByLayoutType = (props): PageTemplateFactoryOptionsStyles => {
  const { pageLayoutType, hasChildren } = props;

  switch (pageLayoutType) {
    case FULL_PAGE_LAYOUT_TYPE:
      return {
        Wrapper: grid.ContainerFluid,
        MainContent: classNames(grid.ColXs24, styles.FullWidthColumn),
        AsideContent: '',
        TopContent: classNames(grid.ColXs24, styles.TopContent),
      };

    case RIGHT_COLUMN_PAGE_LAYOUT_TYPE:
      const mainGridConfig =
        (!!hasChildren &&
          classNames(grid.ColXs24, grid.ColMd15, grid.ColXl16)) ||
        grid.ColXs24;

      const asideGridConfig =
        (!!hasChildren &&
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
        MainContent: mainGridConfig,
        AsideContent: classNames(
          styles.AsideContent,
          asideGridConfig,
          grid.HideForPrint,
        ),
        TopContent: classNames(grid.ColXs24, styles.TopContent),
      };
    default:
      return {
        Wrapper: styles.Wrapper,
        MainContent: grid.ColXs24,
        AsideContent: classNames(styles.AsideContent, grid.ColXs24),
        TopContent: classNames(grid.ColXs24, styles.TopContent),
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
  const isWithRightColumn =
    props.pageLayoutType === RIGHT_COLUMN_PAGE_LAYOUT_TYPE;

  switch (routeByPathObject.__typename) {
    case ARTICLE_CONTENT_TYPE:
      const isLegalAdviceArticle = [
        ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
        ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
      ].includes(routeByPathObject.subtypeValue);

      return (
        <>
          <PageTemplateFactory
            {...props}
            /* @ts-ignore TODO: TS2322 ->  Type 'false | Element' is not assignable to type 'null | undefined'. */
            topContent={
              isLegalAdviceArticle && (
                <LegalAdviceSearch
                  addClass={styles.Search}
                  preserveScrollProgress={true}
                />
              )
            }
            /* @ts-ignore TODO: TS2322 ->  Type 'false | Element' is not assignable to type 'null | undefined'. */
            asideContent={
              isWithRightColumn && (
                <ArticlePageAside
                  props={routeByPathObject}
                  pageLayoutType={props.pageLayoutType}
                />
              )
            }
          >
            <ArticlePage
              article={routeByPathObject}
              location={props.location}
              pageLayoutType={props.pageLayoutType || FULL_PAGE_LAYOUT_TYPE}
            />
          </PageTemplateFactory>
          {isWithRightColumn && routeByPathObject?.canonicalUri && (
            <ArticleRecommendations
              article={routeByPathObject}
              pageLayoutType={FULL_PAGE_LAYOUT_TYPE}
            />
          )}
        </>
      );

    default:
      return (
        <PageTemplateFactory>
          <ArticlePage article={routeByPathObject} location={props.location} />
        </PageTemplateFactory>
      );
  }
};

export default PageTemplate;
