import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';
import asideFactory from '../../../../../../../common/screens/PageTemplate/components/Aside/factory';
import scrollStateSelector from '../../../../../../../shared/selectors/scrollStateSelector';
import AppNexus from '../../../../components/AppNexus';
import AsideMostRead from '../../../../components/AsideMostRead';
import CustomRecommendations from '../../../../components/Recommendations/components/CustomRecommendations';
import { MHPA_2, MR_1 } from '../../../../../../../shared/constants/adZone';
import {
  ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
  ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
} from '../../../../../../../shared/constants/content';
import {
  PIANO_CONTAINER_ARTICLE_ASIDE,
  PIANO_CONTAINER_ARTICLE_ASIDE_2,
  PIANO_CONTAINER_ARTICLE_ASIDE_3,
  PIANO_PLACEHOLDER_ASIDE,
} from '../../../../../../../shared/constants/piano';
import { RECOMMENDATION_TYPE } from '../../../../../../../shared/constants/recommendations';
import { DEFAULT_PUBLICATION } from '../../../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { AsideProps } from '../../../../../../../common/screens/PageTemplate/components/Aside/typings';

export const GetContentByProps = ({
  props,
  pageLayoutType,
}: AsideProps<Article>) => {
  const isPianoOnly = [
    ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
    ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */
  ].includes(props?.subtypeValue);

  if (isPianoOnly) {
    return [
      <div
        key="article-aside-element-1"
        className={styles.PianoArticleAsideElement}
      >
        <div
          className={classNames(
            PIANO_CONTAINER_ARTICLE_ASIDE,
            styles.PianoIntegrationWrapper,
            PIANO_PLACEHOLDER_ASIDE,
          )}
        />
      </div>,
      <div
        key="article-aside-element-2"
        className={styles.PianoArticleAsideElement}
      >
        <div
          className={classNames(
            PIANO_CONTAINER_ARTICLE_ASIDE_2,
            styles.PianoIntegrationWrapper,
            PIANO_PLACEHOLDER_ASIDE,
          )}
        />
      </div>,
      <div
        key="article-aside-element-3"
        className={styles.PianoArticleAsideElement}
      >
        <div
          className={classNames(
            PIANO_CONTAINER_ARTICLE_ASIDE_3,
            styles.PianoIntegrationWrapper,
            PIANO_PLACEHOLDER_ASIDE,
          )}
        />
      </div>,
    ];
  }

  return [
    <div key="article-aside-element-1" className={grid.HiddenMdDown}>
      <CustomRecommendations
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        contentGcid={props?.gcid}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<KeywordConnection> | undefined' is not assignable to type 'KeywordConnection'. */
        articleKeywords={props?.keywords}
        publication={DEFAULT_PUBLICATION}
        articleColStyle={grid.ColXs24}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        origin={props?.subtypeValue}
        ignoreTeaserImpressions
        type={RECOMMENDATION_TYPE.NATONLY}
        pageLayoutType={pageLayoutType}
        isInRightColumn
      />
    </div>,
    <div key="article-aside-element-2">
      <div
        className={classNames(
          'ad-wrapper',
          styles.Ad,
          `ad-wrapper-tabletDesktop`,
        )}
      >
        <AppNexus slot={MR_1} isMultiPlacement deviceType="tabletDesktop" />
      </div>
      <div className={classNames('ad-wrapper', styles.Ad, `ad-wrapper-mobile`)}>
        <AppNexus slot={MHPA_2} isMultiPlacement deviceType="mobile" />
      </div>
    </div>,
    <div key="article-aside-element-3">
      <div
        className={classNames(
          PIANO_CONTAINER_ARTICLE_ASIDE,
          styles.PianoIntegrationWrapper,
          PIANO_PLACEHOLDER_ASIDE,
        )}
      />
    </div>,
    <div key="article-aside-element-4">
      <div
        className={classNames(
          PIANO_CONTAINER_ARTICLE_ASIDE_2,
          styles.PianoIntegrationWrapper,
          PIANO_PLACEHOLDER_ASIDE,
        )}
      />
    </div>,
    <div key="article-aside-element-5">
      <div
        className={classNames(
          PIANO_CONTAINER_ARTICLE_ASIDE_3,
          styles.PianoIntegrationWrapper,
          PIANO_PLACEHOLDER_ASIDE,
        )}
      />
    </div>,
    <div key="article-aside-element-6">
      <div className={styles.MostReadBoxWrapper}>
        <AsideMostRead />
      </div>
    </div>,
  ];
};

const ArticlePageAside = asideFactory({
  content: GetContentByProps,
  styles: {
    Sticky: styles.Sticky,
    Wrapper: styles.Wrapper,
    StickyOnScroll: styles.StickyOnScroll,
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  scrollDirection: scrollStateSelector(state).direction,
});

const withStoreConnection = connect(mapStateToProps);

export default compose<any>(withStoreConnection)(ArticlePageAside);
