import React, { useEffect } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { connect, useSelector } from 'react-redux';

import { compose } from 'recompose';
import classNames from 'classnames';
import { enrichArticleBodyWithADs } from '../../../../../shared/helpers/ads';
import { getRestrictedClassName } from '../../../../../shared/helpers/withHelmet';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import withHelmet from '../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../shared/actions/header';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import AlphabeticNavigation from '../../components/AlphabeticNavigation';
import AppNexus from '../../components/AppNexus';
import Breadcrumbs from '../../components/Breadcrumbs';
import EditButtons from '../../components/EditButtons';
import ParagraphsRenderer from '../../components/Paragraphs/components/ParagraphsRenderer';
import RelatedContent from '../../components/RelatedContent';
import UtilityBar from '../../components/UtilityBar';
import UtilityOverlay from '../../components/UtilityBar/components/UtilityOverlay';
import TermOccurrences from './components/TermOccurrences';
import { TOP_AD_1 } from '../../../../../shared/constants/adZone';
import {
  ANCHOR_TITLE,
  FINANCE_DICTIONARY_TYPE,
} from '../../../../../shared/constants/content';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_TEASER_3X2 } from '../../components/TeaserGrid/gridConfigs/constants';
import {
  UTILITYBAR_CONFIG,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../components/UtilityBar/constants';
import { ROUTE_DICTIONARY_LIST } from '../../constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { ExplainingArticleProps } from './typings';

type ExplainingArticlePropsInner = ExplainingArticleProps & {
  setHeaderData: (props: HeaderState) => void;
  resetHeaderData: () => void;
  viewportLabel: ViewportLabel;
};

export const ExplainingArticle = ({
  article,
  setHeaderData,
  resetHeaderData,
}: ExplainingArticlePropsInner) => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  useEffect(() => {
    setHeaderData({
      articleData: {
        id: article?.id,
        gcid: article?.gcid,
        title: article?.title,
        shortTitle: article?.shortTitle,
        lead: '',
        channel: article?.channel,
        preferredUri: article?.preferredUri,
        commentStatus: '',
        subtypeValue: '',
        socialMediaTitle: '',
        createDate: article?.createDate,
      },
      contentType: article?.__typename,
    });
    return () => {
      resetHeaderData();
    };
  }, [article, resetHeaderData, setHeaderData]);

  if (!article || !article.id) {
    return null;
  }

  const activeLetter =
    (article.title &&
      typeof article.title.charAt === 'function' &&
      article.title.charAt(0)) ||
    '';

  const explainingArticleBody =
    ((article?.sections?.length || 0) > 1 && article.sections) ||
    article?.sections?.[0]?.body;

  const enrichedArticleBody = enrichArticleBodyWithADs({
    pageBody: explainingArticleBody,
  });

  return (
    <div
      className={styles.PageWrapper}
      data-testid="explaining-article-wrapper"
    >
      <div className={grid.Row}>
        <div className={grid.ColXs24}>
          <EditButtons
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
            editContentUri={article.editContentUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            editRelationUri={article.editRelationUri}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            cloneContentUri={article.cloneContentUri}
          />
        </div>
        <div className={classNames(grid.ColXs24, styles.Print)}>
          <div className="explaining-article-detail">
            {(!isHybridApp && (
              <div className={grid.Row}>
                <div className={grid.ColXs24}>
                  <div data-testid="explaining-article-breadcrumbs">
                    <Breadcrumbs
                      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                      pageUrl={article.preferredUri}
                      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ActiveMenuTrailItemConnection> | undefined' is not assignable to type 'BreadcrumbsItems | undefined'. */
                      items={article.activeMenuTrail}
                    />
                  </div>
                </div>
              </div>
            )) ||
              null}
            <AlphabeticNavigation
              lettersUrl={`/${ROUTE_DICTIONARY_LIST}`}
              enableOverlay={true}
              activeLetter={activeLetter}
            />

            {(article.category || article.title) && (
              <div
                data-testid="explaining-article-header-wrapper"
                className={styles.HeaderWrapper}
              >
                <div className={grid.Row}>
                  <div className={grid.ColXs24}>
                    {article.category && (
                      <div className={styles.Category}>{article.category}</div>
                    )}
                    {article.title && (
                      <div className={styles.TitleWrapper}>
                        <h1 id={ANCHOR_TITLE} className={styles.Title}>
                          {article.title}
                        </h1>
                      </div>
                    )}

                    {(!isHybridApp && (
                      <BodyClassName className={styles.ArticleBody}>
                        <div
                          className={classNames(
                            'utility-bar-wrapper',
                            styles.UtilityBarWrapper,
                          )}
                        >
                          <UtilityBar enabledUtilities={UTILITYBAR_CONFIG}>
                            {({
                              isOverlayVisible,
                              toggleOverlayVisible,
                              visibleId,
                            }) => (
                              <UtilityOverlay
                                visibleId={visibleId}
                                overlayTitle="Artikel teilen"
                                isOverlayVisible={isOverlayVisible}
                                toggleOverlayVisible={toggleOverlayVisible}
                                enabledUtilities={UTILITYBAR_OVERLAY_CONFIG}
                              />
                            )}
                          </UtilityBar>
                        </div>
                      </BodyClassName>
                    )) ||
                      null}
                  </div>
                </div>
              </div>
            )}
          </div>
          {!article?.channel?.suppressAds && (
            <div className={'ad-wrapper ad-wrapper-mobile'}>
              <AppNexus slot={TOP_AD_1} deviceType="mobile" />
            </div>
          )}
          <div className={getRestrictedClassName(article.__typename)}>
            <ParagraphsRenderer
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
              contentGcid={article.gcid}
              showCap={false}
              colStyle={classNames(grid.ColMd18, grid.ColXl17)}
              pageBody={enrichedArticleBody}
              origin={FINANCE_DICTIONARY_TYPE}
              activeChannel={article?.channel?.title || ''}
              hasContainer={false}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
              isAdSuppressed={article?.channel?.suppressAds}
            />
          </div>

          <div className={sections.Section}>
            {article?.relatedArticles?.edges?.length > 0 && (
              <TestFragment data-testid="explaining-article-related-content">
                <RelatedContent
                  teaserGridLayout={GRID_LAYOUT_TEASER_3X2}
                  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Function | undefined'. */
                  teaserGridOptions={null}
                  gridOptionType={'dotted'}
                  itemCount={article.relatedArticles.count}
                  title={`Thematisch passende Begriffe`}
                  relatedContent={article.relatedArticles}
                />
              </TestFragment>
            )}
            {article.title && (
              <TestFragment data-testid="explaining-article-term-occurrences">
                <TermOccurrences term={article.title} />
              </TestFragment>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

const ExplainingArticleWrapper = compose<any, any>(
  connect(null, mapDispatchToProps),
  withHelmet({
    getNode: (mapProps: ExplainingArticlePropsInner) => mapProps?.article,
    getFallbackTitle: (mapProps: ExplainingArticlePropsInner) =>
      `${
        mapProps?.article?.title || ''
      } - Börsenbegriffe leicht erklärt | Cash.ch`,
    getFallbackDescription: (mapProps: ExplainingArticlePropsInner) =>
      `${mapProps?.article?.title || ''} – Was bedeutet ${
        mapProps?.article?.title || ''
      }? Das Börsenlexikon liefert Ihnen alle wichtigen Begriffe zur Börse. Cash, die grösste Schweizer Finanzplattform.`,
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
  }),
)(ExplainingArticle);

export default ExplainingArticleWrapper;
