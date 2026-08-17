import React, { memo, useEffect } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import BodyClassName from 'react-body-classname';
import { connect } from 'react-redux';

import { compose } from 'recompose';
import classNames from 'classnames';
import { enrichArticleBodyWithADs } from '../../../../../../../shared/helpers/ads';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../../../shared/actions/header';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import AlphabeticNavigation from '../../../../components/AlphabeticNavigation';
import AppNexus from '../../../../components/AppNexus';
import AuthorDateBlock from '../../../../components/AuthorDateBlock';
import EditButtons from '../../../../components/EditButtons';
import ParagraphsRenderer from '../../../../components/Paragraphs/components/ParagraphsRenderer';
import UtilityBar from '../../../../components/UtilityBar';
import UtilityOverlay from '../../../../components/UtilityBar/components/UtilityOverlay';
import ArticleAlerts from '../../../Article/components/ArticleAlerts';
import RelatedArticlesSection from '../../../Article/components/RelatedArticlesSection';
import { MMR_1 } from '../../../../../../../shared/constants/adZone';
import {
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  ANCHOR_TITLE,
} from '../../../../../../../shared/constants/content';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../../../shared/constants/structuredData';
import {
  UTILITYBAR_CONFIG_EXPLAINING_ARTICLE,
  UTILITYBAR_OVERLAY_CONFIG_EXPLAINING_ARTICLE,
} from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { ExplainingArticleProps } from './typings';

export type ExplainingArticlePropsInner = ExplainingArticleProps & {
  setHeaderData: (props: HeaderState) => void;
  resetHeaderData: () => void;
};

const legalUrl = `/rechtslexikon/list`;

/* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
export const explainingBreadcrumbsData = (data) => {
  const article = data?.environment?.routeByPath.object;

  const activeLetter =
    (article?.title &&
      typeof article.title.charAt === 'function' &&
      article.title.charAt(0)) ||
    '';

  if ((article?.activeMenuTrail?.edges?.length || 0) <= 1)
    return article?.activeMenuTrail || null;

  // create copy of the activeMenuTrail object to avoid mutations
  const activeMenuTrailCopy = JSON.parse(
    JSON.stringify(article.activeMenuTrail),
  );

  activeMenuTrailCopy.edges[0].node.link = `${legalUrl}/${activeLetter}`;

  data.breadcrumbsData = {
    activeMenuTrail: {
      edges: [
        {
          node: activeMenuTrailCopy.edges[0].node,
        },
        {
          node: {
            link: `${legalUrl}/${activeLetter}`,
            label: activeLetter.toUpperCase(),
          },
        },
      ],
    },
    title: article?.title || '',
  };
};

const ExplainingArticle = ({
  article,
  setHeaderData,
  resetHeaderData,
}: ExplainingArticlePropsInner) => {
  useEffect(() => {
    const activeMenuTrailEdges = article?.activeMenuTrail?.edges || [];
    const activeChannel =
      (activeMenuTrailEdges &&
        Array.isArray(activeMenuTrailEdges) &&
        activeMenuTrailEdges.length > 0 &&
        activeMenuTrailEdges[activeMenuTrailEdges.length - 1]) ||
      null;

    let headerData = {};
    if (article) {
      const {
        id,
        gcid,
        nid,
        channel,
        preferredUri,
        socialMediaTitle,
        shortTitle,
        title,
        createDate,
      } = article;
      headerData = {
        articleData: {
          id,
          gcid,
          nid,
          title,
          shortTitle,
          lead: '',
          subtypeValue: '',
          channel,
          commentStatus: '',
          preferredUri,
          socialMediaTitle,
          createDate,
        },
        contentType: EXPLAINING_ARTICLE_CONTENT_TYPE,
      };
    } else {
      headerData = {
        articleData: null,
        title: activeChannel?.node?.label || '',
      };
    }
    setHeaderData(headerData);

    return () => {
      resetHeaderData();
    };
  }, [setHeaderData, article, resetHeaderData]);

  const lettersUrl = legalUrl;

  const activeLetter =
    (article?.title &&
      typeof article.title.charAt === 'function' &&
      article.title.charAt(0)) ||
    '';

  if (!article || !article.id || Object.keys(article).length === 1) {
    return null;
  }

  const enrichedArticleBody = enrichArticleBodyWithADs({
    pageBody: article.sections,
  });
  const colStyle = classNames(grid.ColSm24, grid.ColOffsetMd4, grid.ColMd16);

  return (
    <>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={article.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={article.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={article.cloneContentUri}
      />
      <AlphabeticNavigation
        enableOverlay={true}
        lettersUrl={lettersUrl}
        activeLetter={activeLetter}
      />
      <section
        className={`explaining-article-detail ${styles.Wrapper}`}
        data-testid="onmeda-article"
      >
        <header className={grid.Container}>
          <div className={grid.Row}>
            <div className={grid.ColXs24}>
              <div className={styles.Header}>
                <div className={styles.ShortTitle}>
                  {article.category || 'Rechtslexikon'}
                </div>
                <h2 id={ANCHOR_TITLE} className={styles.Title}>
                  {article.title}
                </h2>
                {article.synonyms && (
                  <div
                    className={styles.SubTitle}
                    data-testid="onmeda-article-subtitle"
                  >
                    ({article.synonyms})
                  </div>
                )}

                <AuthorDateBlock
                  /* @ts-ignore TODO: TS2322 ->  Type 'ExplainingArticle' is not assignable to type '{ authors? */
                  article={article}
                  isAlwaysLeftAligned={false}
                  hasContainer={true}
                  addClass={styles.AuthorDateBlock}
                />
              </div>
            </div>
          </div>
        </header>
        {!article?.channel?.suppressAds && (
          <div
            className={classNames(
              'ad-wrapper ad-wrapper-mobile',
              sections.SectionGrayLightest,
            )}
          >
            <div className={styles.AdWrapper}>
              <AppNexus slot={MMR_1} deviceType="mobile" />
            </div>
          </div>
        )}
        <div className={grid.Container}>
          <div className={grid.Row}>
            {!__TESTING__ && (
              <div className={colStyle}>
                <div
                  className={classNames(
                    'utility-bar-wrapper',
                    styles.UtilityBarWrapper,
                    grid.HideForPrint,
                  )}
                >
                  <BodyClassName className={styles.ArticleBody}>
                    <UtilityBar
                      enabledUtilities={UTILITYBAR_CONFIG_EXPLAINING_ARTICLE}
                      shouldUseSwipeable
                    >
                      {({ isOverlayVisible, toggleOverlayVisible }) => (
                        <div className={styles.UtilityOverlayWrapper}>
                          <UtilityOverlay
                            overlayTitle="Artikel teilen"
                            isOverlayVisible={isOverlayVisible}
                            toggleOverlayVisible={toggleOverlayVisible}
                            enabledUtilities={
                              UTILITYBAR_OVERLAY_CONFIG_EXPLAINING_ARTICLE
                            }
                          />
                        </div>
                      )}
                    </UtilityBar>
                  </BodyClassName>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className={getRestrictedClassName(article.__typename)}>
          <TestFragment data-testid="onmeda-article-section-body">
            <ParagraphsRenderer
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
              contentGcid={article.gcid}
              colStyle={colStyle}
              hasContainer={false}
              pageBody={enrichedArticleBody}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
              articleTitle={article.title}
              origin={EXPLAINING_ARTICLE_CONTENT_TYPE}
            />
          </TestFragment>
        </div>

        {(article?.keywords?.edges &&
          Array.isArray(article?.keywords?.edges) &&
          article.keywords.edges.length > 0 && (
            <div
              className={classNames(
                grid.Container,
                styles.ArticleAlertsWrapper,
                grid.HideForPrint,
              )}
              data-testid="onmedaArticle-alerts-wrapper"
            >
              <ArticleAlerts
                key={`onmedaArticle-alerts-${article.id}`}
                items={article.keywords.edges}
              />
            </div>
          )) ||
          null}

        {((article.relatedArticles || article.channel) && (
          <TestFragment data-testid="onmeda-article-related-articles">
            <RelatedArticlesSection
              article={{
                canonicalUri: article.canonicalUri,
                channel: article.channel,
                keywords: article.keywords,
                preferredUri: article.preferredUri,
                relatedArticles: article.relatedArticles,
                gcid: article.gcid,
              }}
            />
          </TestFragment>
        )) ||
          null}
      </section>
    </>
  );
};

const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

export default compose<any, any>(
  connect(null, mapDispatchToProps),
  withHelmet({
    getNode: (mapProps: ExplainingArticlePropsInner) =>
      mapProps?.article || null,
    getFallbackTitle: (mapProps: ExplainingArticlePropsInner) =>
      `${
        mapProps?.article?.title || ''
      } - Das Schweizer Recht erklärt | Beobachter`,
    getFallbackDescription: (mapProps: ExplainingArticlePropsInner) =>
      `${mapProps?.article?.title || ''} – Was bedeutet ${
        mapProps?.article?.title || ''
      }? Das Rechtslexikon liefert Ihnen alle wichtigen Begriffe zum Schweizer Rechtswesen. Beobachter, die Schweizer Konsumenten- & Beratungszeitschrift.`,
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
  }),
)(memo(ExplainingArticle));
