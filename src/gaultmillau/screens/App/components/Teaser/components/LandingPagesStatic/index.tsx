import React from 'react';
import { IntlFormatters, defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import withHandlers from 'recompose/withHandlers';
import classNames from 'classnames';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../../../common/components/Link';
import Img from '../../../Img';
import { DEFAULT_LANGUAGE } from '../../../Navigation/components/LanguageSwitch';
import { ORGANIZATION_CONTENT_TYPE } from '../../../../../../../shared/constants/content';
import {
  BLOG_DATA,
  URL_DE_RESTAURANTS,
  URL_FR_RESTAURANTS,
} from '../../../../../App/constants';
import { getStyleByType } from '../../shared/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import defaultTeaserStyles from '../../shared/defaultStyles.legacy.css';
import styles from './styles.legacy.css';
// @ts-ignore
import caminadaDesktop from '../../../../assets/graphics/essentials/caminada-desktop.jpg';
// @ts-ignore
import caminadaDesktopFr from '../../../../assets/graphics/essentials/leStudioDesChefs.jpeg';
// @ts-ignore
import restaurantsDesktop from '../../../../assets/graphics/essentials/restaurants-desktop.jpg';
// @ts-ignore
import zuriIsstDesktopFr from '../../../../assets/graphics/essentials/zuri-isst-desktop-fr.jpg';
// @ts-ignore
import zuriIsstDesktop from '../../../../assets/graphics/essentials/zuri-isst-desktop.jpg';

type LandingPagesStaticPropsInner = {
  renderItems: any;
  language: string;
  intl: IntlFormatters;
};
export const landingPageMsgs = defineMessages({
  titleBlogA: {
    id: 'app.teaser.landingPageStatic.titleBlogA',
    description: 'Züri isst static title',
    defaultMessage: 'Züri isst',
  },
  leadBlogA: {
    id: 'app.teaser.landingPageStatic.leadBlogA',
    description: 'Züri ist static lead text',
    defaultMessage: 'Trendscout Pascal Grob bloggt und schlemmt in Zürich',
  },
  titleBlogB: {
    id: 'app.teaser.landingPageStatic.titleBlogB',
    description: 'Atelier Caminada static title',
    defaultMessage: 'Atelier Caminada',
  },
  leadBlogB: {
    id: 'app.teaser.landingPageStatic.leadBlogB',
    description: 'Atelier caminada static teaser lead',
    defaultMessage:
      'Exklusiv: Jede Woche ein Video-Rezept vom Kultkoch Andreas Caminada!',
  },
  titleRestaurants: {
    id: 'app.teaser.landingPageStatic.titleRestaurants',
    description: 'Die 880 besten Restaurants static teaser title',
    defaultMessage: 'Die 880 Besten! Die neuen Tests',
  },
  leadRestaurants: {
    id: 'app.teaser.landingPageStatic.leadRestaurants',
    description: 'Die 880 besten Restaurants static teaser lead',
    defaultMessage:
      "Restaurants in Ihrer Region? Hier geht's zu den neuen Reports der Tester.",
  },
  titleSection: {
    id: 'app.teaser.landingPageStatic.titleSection',
    description: 'Gault Millau section title',
    defaultMessage: 'GaultMillau: The Essentials',
  },
});

const landingPagesData = (language = DEFAULT_LANGUAGE) => ({
  edges: [
    {
      node: {
        id: 1,
        subtypeValue: 'blog_b',
        lead: landingPageMsgs.leadBlogB,
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ blog_a_de */
        preferredUri: `/${BLOG_DATA['blog_b_' + language].url}`,
        shortTitle: landingPageMsgs.titleBlogB,
        teaserImage: {
          alt: landingPageMsgs.titleBlogB,
          caption: null,
          image: {
            height: 558,
            source: language === 'fr' ? caminadaDesktopFr : caminadaDesktop,
            width: 558,
          },
        },
        title: landingPageMsgs.titleBlogB,
        __typename: 'Article',
      },
    },
    {
      node: {
        id: 2,
        lead: landingPageMsgs.leadRestaurants,
        preferredUri: `/${
          language === 'fr' ? URL_FR_RESTAURANTS : URL_DE_RESTAURANTS
        }`,
        shortTitle: landingPageMsgs.titleRestaurants,
        teaserImage: {
          alt: landingPageMsgs.titleRestaurants,
          caption: null,
          image: {
            height: 558,
            source: restaurantsDesktop,
            width: 558,
          },
        },
        title: landingPageMsgs.titleRestaurants,
        __typename: 'Organization',
      },
    },
    {
      node: {
        id: 3,
        subtypeValue: 'blog_a',
        lead: landingPageMsgs.leadBlogA,
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ blog_a_de */
        preferredUri: `/${BLOG_DATA['blog_a_' + language].url}`,
        shortTitle: landingPageMsgs.titleBlogA,
        teaserImage: {
          alt: landingPageMsgs.titleBlogA,
          caption: null,
          image: {
            height: 558,
            source: language === 'fr' ? zuriIsstDesktopFr : zuriIsstDesktop,
            width: 558,
          },
        },
        title: landingPageMsgs.titleBlogA,
        __typename: 'Article',
      },
    },
  ],
});

/* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'intl' implicitly has an 'any' type. */
const doRenderItems = ({ node }, intl) => {
  if (!node) {
    return null;
  }
  return (
    <li
      key={`landingpage-static-${node.id}`}
      className={classNames(styles.TeaserOne, grid.ColSm8)}
    >
      <Link path={node.preferredUri || ''} className={'landing-pages-static'}>
        {node.teaserImage &&
          node.teaserImage.image &&
          node.teaserImage.image.source && (
            <div className={styles.ImageWrapper}>
              <div className={styles.ImageOuterWrapper}>
                <Img
                  addClass={styles.Image}
                  url={node.teaserImage.image.source}
                  alt={
                    (node.teaserImage.alt &&
                      intl.formatMessage(node.teaserImage.alt)) ||
                    ''
                  }
                  cropped
                />
              </div>
              <div
                className={classNames(
                  styles.ContentWrapper,
                  defaultTeaserStyles[`${getStyleByType(node)}Border`],
                  {
                    [styles.Organization]:
                      node.type === ORGANIZATION_CONTENT_TYPE,
                  },
                )}
              >
                <div className={styles.Inner}>
                  {node.shortTitle && (
                    <h3 className={styles.Title}>
                      {intl.formatMessage(node.shortTitle)}
                    </h3>
                  )}
                  {node.lead && (
                    <p className={styles.Description}>
                      {intl.formatMessage(node.lead)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
      </Link>
    </li>
  );
};

const LandingPagesStatic = ({
  renderItems,
  intl,
  language = DEFAULT_LANGUAGE,
}: LandingPagesStaticPropsInner) => {
  return (
    <div data-testid="landing-page-static-wrapper">
      <h1 className={styles.EssentialTitle}>
        {intl.formatMessage(landingPageMsgs.titleSection)}
      </h1>

      <ul className={styles.Listing}>
        {landingPagesData(language).edges.map(renderItems)}
      </ul>
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  language: settingsStateSelector(state).language,
});

const extendWithHandlers = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
  renderItems: (props: LandingPagesStaticPropsInner) => (item) =>
    doRenderItems(item, props.intl),
});

const updatePolicy = shouldUpdate<any>(
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'nextProps' implicitly has an 'any' type. */
  (props, nextProps) => props.language !== nextProps.language,
);

export default compose<any, any>(
  connect(mapStateToProps),
  injectIntl,
  extendWithHandlers,
  updatePolicy,
)(LandingPagesStatic);
