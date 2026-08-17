import React from 'react';
import classNames from 'classnames';
import asideFactory from '../../../../../../../common/screens/PageTemplate/components/Aside/factory';
import AppNexus from '../../../../components/AppNexus';
import ContentBox from '../../../../components/ContentBox';
import EditorialPicks from '../../../../components/EditorialPicks';
import ArticleRecommendations from '../../../../components/Recommendations/components/ArticleRecommendations';
import { MHPA_2 } from '../../../../../../../shared/constants/adZone';
import {
  PIANO_CONTAINER_ARTICLE_ASIDE_1,
  PIANO_CONTAINER_ARTICLE_ASIDE_2,
} from '../../../../../../../shared/constants/piano';
import {
  PUBLICATION_GROUP_BIL,
  PUBLICATION_GROUP_HZ,
  PUBLICATION_GROUP_HZB,
  PUBLICATION_GROUP_SV,
} from '../../../../../../../shared/constants/publications';
import { RECOMMENDATION_TYPE } from '../../../../../../../shared/constants/recommendations';
import { MR_1 } from '../../../../components/AppNexus/constants';
import { PARTNER_CONTENT_TITLE } from '../../../../components/Paragraphs/components/ParagraphsRenderer/constants';
import { ARTICLE_ASIDE_ORIGIN } from './constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const termReferenceByEnv = {
  develop: {
    __typename: 'Channel',
    id: 'dGF4b25vbXlfdGVybTo3NTcz',
    tid: '7573',
    title: 'Newsticker',
    link: '/news-ticker',
  },
  stage: {
    __typename: 'Channel',
    id: 'dGF4b25vbXlfdGVybToxMzM5MDM=',
    tid: '133903',
    title: 'Newsticker',
    link: '/newsticker',
  },
  master: {
    __typename: 'Channel',
    id: 'dGF4b25vbXlfdGVybToxMzM5MDM=',
    tid: '133903',
    title: 'Newsticker',
    link: '/newsticker',
  },
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'pageLayoutType' implicitly has an 'any' type. */
export const getContentByProps = ({ props, pageLayoutType }) => {
  return [
    <div key="article-aside-element-1" className={styles.Recommendations}>
      <ArticleRecommendations
        contentGcid={props?.gcid}
        articleKeywords={props?.keywords}
        publication={'HZ'}
        articleColStyle={grid.ColXs24}
        title={PARTNER_CONTENT_TITLE}
        origin={props?.subtypeValue}
        type={RECOMMENDATION_TYPE.NATONLY}
        pageLayoutType={pageLayoutType}
      />
    </div>,
    <div key="article-aside-element-2">
      <div
        className={classNames(
          'ad-wrapper',
          styles.ItemWrapperBorder,
          styles.Ad,
          `ad-wrapper-tabletDesktop`,
        )}
      >
        <AppNexus slot={MR_1} isMultiPlacement deviceType="tabletDesktop" />
      </div>
      <div
        className={classNames(
          'ad-wrapper',
          styles.ItemWrapperBorder,
          styles.Ad,
          `ad-wrapper-mobile`,
        )}
      >
        <AppNexus slot={MHPA_2} isMultiPlacement deviceType="mobile" />
      </div>
    </div>,
    <div key="article-aside-element-3">
      <div
        id={`${PIANO_CONTAINER_ARTICLE_ASIDE_1}-${props?.publication}`}
        className={styles.PianoIntegrationWrapper}
      />
    </div>,
    <div key="article-aside-element-4">
      <div
        id={`${PIANO_CONTAINER_ARTICLE_ASIDE_2}-${props?.publication}`}
        className={styles.PianoIntegrationWrapper}
      />
    </div>,
    <div key="article-aside-element-5">
      <EditorialPicks
        contentBoxTitle={'Die Redaktion empfiehlt'}
        origin={ARTICLE_ASIDE_ORIGIN}
        publication={PUBLICATION_GROUP_HZ}
        additionalPublications={[
          PUBLICATION_GROUP_BIL,
          PUBLICATION_GROUP_SV,
          PUBLICATION_GROUP_HZB,
        ]}
      />
    </div>,
    <div key="article-aside-element-6">
      <div className={classNames(styles.MostReadBoxWrapper, styles.Sticky)}>
        <ContentBox
          component="tabs"
          node={{
            __typename: 'ContentBox',
            id: 'bm9kZTo1MDM0Mg==',
            title: 'News',
            hideTitle: true,
            contentSourceValue: 'tabs',
            linkLabel: null,
            body: [
              {
                // @ts-ignore
                __typename: 'TabParagraph',
                id: 'cGFyYWdyYXBoOnRhYjoyMTYwOTI6Mjk2NjM3',
                title: 'Meistgelesen',
                style: 'numbered_list',
                sortBy: 'most_read',
                linkLabel: null,
                mode: 'automatic',
                termReference: null,
                items: {
                  __typename: 'NodeInterfaceConnection',
                  edges: [],
                },
              },
              {
                // @ts-ignore
                __typename: 'TabParagraph',
                id: 'cGFyYWdyYXBoOnRhYjoyMTYwOTI6Mjk2NjM3',
                title: 'Newsticker',
                style: 'default',
                sortBy: 'newest',
                linkLabel: null,
                mode: 'automatic',
                /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
                termReference: termReferenceByEnv[process.env.__DOT_ENV__],
                items: {
                  __typename: 'NodeInterfaceConnection',
                  edges: [],
                },
              },
            ],
            termReference: null,
            useNativeAdvertising: false,
            items: {
              __typename: 'NodeInterfaceConnection',
              edges: [],
            },
          }}
        />
      </div>
    </div>,
  ];
};

const ArticlePageAside = asideFactory({
  content: getContentByProps,
  styles: {
    Sticky: styles.Sticky,
    Wrapper: styles.Wrapper,
  },
});

export default ArticlePageAside;
