import React, { useEffect } from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { formatPrice } from '../../../../../../../shared/helpers/utils';
import { getFallbackTitle } from '../../helpers';
import withHeaderProps from '../../../../../../shared/decorators/withHeaderProps';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
} from '../../../../../../shared/actions/header';
import { VIEWPORT_XS } from '../../../../../../shared/actions/window';
import Link from '../../../../../../../common/components/Link';
import EditButtons from '../../../../components/EditButtons';
import Helmet from '../../../../components/Helmet';
import Hero from '../../../../components/Hero';
import RelatedContent from '../../../../components/RelatedContent';
import TabsTwoCols from '../../../../components/TabsTwoCols';
import UtilityBar from '../../../../components/UtilityBar';
import UtilityOverlay from '../../../../components/UtilityBar/components/UtilityOverlay';
import OrganizationShare from '../../components/OrganizationShare';
import sponsorImageFactory, {
  SPONSOR_IMAGE_POSITION_INLINE,
} from '../../../../components/SponsorImage';
import { DEFAULT_LANGUAGE } from '../../../../components/Navigation/components/LanguageSwitch';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import {
  ANCHOR_SHORT_TITLE,
  ANCHOR_TITLE,
} from '../../../../../../../shared/constants/content';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../../../shared/constants/structuredData';
import {
  UTILITY_BAR_SHARE_LABEL,
  UTILITY_BAR_SHARE_LABEL_FR,
} from '../../../../../../../shared/constants/utilitybar';
import { GRID_LAYOUT_TEASER_3X2 } from '../../../../components/TeaserGrid/gridConfigs/constants';
import {
  UTILITYBAR_CONFIG,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../../../components/UtilityBar/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import popIcon from 'graphics/gm_pop_ico_86.svg';

const CATEGORY = 'Pop';

const organizationColStyle = classNames(
  grid.ColSm20,
  grid.ColOffsetSm2,
  grid.ColXl14,
  grid.ColOffsetXl5,
);

const msgs = defineMessages({
  hasTerraceOrGarden: {
    id: 'organization.pop.service.terraceOrGarden',
    description: 'The default label for service terrace or garden',
    defaultMessage: 'Terrasse/Garten',
  },
  hasParkingAvailable: {
    id: 'organization.pop.service.parking',
    description: 'The default label for service parking',
    defaultMessage: 'Parking',
  },
  hasWheelchairAccess: {
    id: 'organization.pop.service.wheelchairAccess',
    description: 'The default label for service wheelchair access',
    defaultMessage: 'Rollstuhlgängig',
  },
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'webSite' implicitly has an 'any' type. */
const getWebSite = (webSite) =>
  (webSite.substring(0, 4) === 'http' && webSite) || `http://${webSite}`;

/* @ts-ignore TODO: TS7006 ->  Parameter 'organization' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'intl' implicitly has an 'any' type. */
const generateServices = (organization, intl) => {
  const availableServices = Object.keys(msgs).filter(
    (key) => organization.organizationData[key],
  );
  if (availableServices.length > 0) {
    return (
      availableServices
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ hasTerraceOrGar */
        .map((key) => intl.formatMessage(msgs[key]))
        .join(', ')
    );
  }
  return null;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'city' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'language' implicitly has an 'any' type. */
const getCity = (city, language) => {
  switch (city) {
    case 'basel':
      return 'Basel';
    case 'bern':
      return 'Bern';
    case 'berne':
      return 'Berne';
    case 'fribourg':
      return 'Fribourg';
    case 'geneve':
      return 'Genève';
    case 'genf':
      return 'Genf';
    case 'gstaad':
      return 'Gstaad';
    case 'lausanne':
      return 'Lausanne';
    case 'luzern':
      return 'Luzern';
    case 'neuchatel':
      return 'Neuchâtel';
    case 'neuenburg':
      return 'Neuenburg';
    case 'stgallen':
      return 'St. Gallen';
    case 'stmoritz':
      return 'St. Moritz';
    case 'uebrigeschweiz':
      return 'Übrige Schweiz';
    case 'zermatt':
      return 'Zermatt';
    case 'zurich':
      return language === 'fr' ? 'Zurich' : 'Zürich';
    default:
      return '';
  }
};

const SponsorImage = sponsorImageFactory({
  position: SPONSOR_IMAGE_POSITION_INLINE,
});

const OrganizationPop = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'organization' implicitly has an 'any' type. */
  organization,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'intl' implicitly has an 'any' type. */
  intl,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'language' implicitly has an 'any' type. */
  language,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'setHeaderData' implicitly has an 'any' type. */
  setHeaderData,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'resetHeaderData' implicitly has an 'any' type. */
  resetHeaderData,
}) => {
  const { isSSR } = useSSRContext();
  const {
    gcid,
    subtypeValue = '',
    channel,
    commentStatus,
    preferredUri,
    socialMediaTitle,
    title,
    shortTitle,
    description,
    __typename,
  } = organization;
  useEffect(() => {
    setHeaderData({
      articleData: {
        gcid,
        title,
        shortTitle,
        lead: description,
        subtypeValue,
        channel,
        commentStatus,
        preferredUri,
        socialMediaTitle,
      },
      contentType: __typename,
    });
    return () => {
      resetHeaderData();
    };
  }, [
    __typename,
    gcid,
    channel,
    commentStatus,
    preferredUri,
    resetHeaderData,
    setHeaderData,
    socialMediaTitle,
    subtypeValue,
    title,
    shortTitle,
    description,
  ]);

  if (!organization || !organization.organizationData) {
    return null;
  }

  const metaLinksRestaurant = [
    {
      rel: 'alternate',
      hreflang: language === 'fr' ? 'de-CH' : 'fr-CH',
      content: null,
      href:
        language === 'fr'
          ? /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            global.locationOrigin + organization.preferredUri.substring(3)
          : /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
            global.locationOrigin + '/fr' + organization.preferredUri,
    },
  ];

  return (
    <div className={`organization-detail ${styles.Wrapper}`}>
      <Helmet
        title={
          organization.metaTitle ? `${CATEGORY} ${organization.metaTitle}` : ''
        }
        /* @ts-ignore TODO: TS2322 ->  Type '{ rel */
        meta={metaLinksRestaurant}
      />
      <EditButtons
        editContentUri={organization?.editContentUri}
        editRelationUri={organization?.editRelationUri}
        cloneContentUri={organization?.cloneContentUri}
      />
      {(organization?.heroImageBody &&
        Array.isArray(organization.heroImageBody) &&
        organization.heroImageBody.length > 0 && (
          <div className={styles.PopWrapper}>
            <div className={styles.HeroWrapper}>
              <Hero heroImageBody={organization.heroImageBody} />
            </div>
            <div className={styles.PopIconWrapper}>
              <Link path="/pop">
                <img
                  className={styles.PopIcon}
                  src={popIcon}
                  alt="Pop Restaurants"
                />
              </Link>
            </div>
          </div>
        )) ||
        ''}

      {
        <div className={sections.Section}>
          <div className={classNames(sections.Container, styles.Center)}>
            <div className={grid.Row}>
              <div className={organizationColStyle}>
                <div id={ANCHOR_SHORT_TITLE} className={styles.ShortTitle}>
                  {organization.cityList && (
                    <span>
                      <Link
                        path={`/pop/${organization.cityList}`}
                        className={styles.PopLink}
                        label={getCity(organization.cityList, language)}
                      />
                    </span>
                  )}
                  {organization.restaurantType && (
                    <span>
                      {organization.cityList && ' | '}
                      {organization.restaurantType}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      {
        <div className={sections.Section}>
          <div className={classNames(sections.Container, styles.Center)}>
            <div className={grid.Row}>
              <div className={organizationColStyle}>
                <div className={styles.RestaurantNameWrapper}>
                  <h1 id={ANCHOR_TITLE} className={styles.RestaurantName}>
                    {organization.title || ''}
                  </h1>
                </div>
                <div
                  className={styles.Description}
                  dangerouslySetInnerHTML={{ __html: organization.description }}
                />
              </div>
            </div>
          </div>
        </div>
      }

      <div className={styles.UtilityBarWrapper}>
        <UtilityBar enabledUtilities={UTILITYBAR_CONFIG}>
          {/* @ts-ignore TODO: TS7031 ->  Binding element 'isOverlayVisible' implicitly has an 'any' type. */}
          {/* @ts-ignore TODO: TS7031 ->  Binding element 'toggleOverlayVisible' implicitly has an 'any' type. */}
          {({ isOverlayVisible, toggleOverlayVisible }) => (
            <UtilityOverlay
              overlayTitle={
                language === DEFAULT_LANGUAGE
                  ? UTILITY_BAR_SHARE_LABEL
                  : UTILITY_BAR_SHARE_LABEL_FR
              }
              isOverlayVisible={isOverlayVisible}
              toggleOverlayVisible={toggleOverlayVisible}
              enabledUtilities={UTILITYBAR_OVERLAY_CONFIG}
            />
          )}
        </UtilityBar>
      </div>
      {
        /* restaurant's contact and description   */
        <div className={sections.Section}>
          <div className={sections.Container}>
            <div className={grid.Row}>
              <div className={organizationColStyle}>
                <TabsTwoCols
                  addClass={grid.HiddenSmUp}
                  tabs={createTabsContent(
                    organization,
                    intl,
                    VIEWPORT_XS,
                    language,
                    isSSR,
                  )}
                />
                <TabsTwoCols
                  addClass={grid.HiddenSmDown}
                  tabs={createTabsContent(
                    organization,
                    intl,
                    '',
                    language,
                    isSSR,
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      }

      <div className={sections.Section}>
        <div className={sections.Container}>
          <div className={grid.Row}>
            <div className={organizationColStyle}>
              <div className={styles.Divider} />
            </div>
          </div>
        </div>
      </div>

      <div className={sections.Section}>
        {organization?.recommendations?.edges?.length > 0 && (
          <RelatedContent
            teaserGridLayout={GRID_LAYOUT_TEASER_3X2}
            relatedContent={organization.recommendations}
            title={
              <FormattedMessage
                id="app.article.relatedStories"
                description="Heading above related stories teasers"
                defaultMessage="Related Stories"
              />
            }
          />
        )}
      </div>
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'organization' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'intl' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'language' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'isSSR' implicitly has an 'any' type. */
const createTabContact = (organization, intl, language, isSSR) => {
  if (!organization || !organization.organizationData) {
    return null;
  }

  const availableServices = generateServices(organization, intl);

  const closedPeriod =
    (language === DEFAULT_LANGUAGE &&
      organization.organizationData.closedDe &&
      organization.organizationData.closedDe) ||
    (language !== DEFAULT_LANGUAGE &&
      organization.organizationData.closedFr &&
      organization.organizationData.closedFr);

  return (
    <>
      {
        /* address */
        organization.address && (
          <div className={styles.ParagraphLeftTab}>
            <span className={styles.Bold}>
              <FormattedMessage
                id="restaurant.body.address"
                description="The default label for address"
                defaultMessage="Adresse"
              />
              :&nbsp;
            </span>
            <p>{organization.address}</p>
            <p>
              {organization.zipCode} {organization.city}
            </p>
          </div>
        )
      }

      {
        /* telephone */
        organization.phone && (
          <div className={styles.ParagraphLeftTab}>
            <span className={styles.Bold}>
              <FormattedMessage
                id="restaurant.body.telephone"
                description="The default label for telephone"
                defaultMessage="Telefon"
              />
              :&nbsp;
            </span>
            <Link
              path={`tel:${organization.phone}`}
              label={organization.phone}
              className={styles.Link}
            />
          </div>
        )
      }
      {
        /* e-mail */
        organization.email && (
          <div className={styles.ParagraphLeftTab}>
            <span className={styles.Bold}>
              <FormattedMessage
                id="restaurant.body.email"
                description="The default label for email"
                defaultMessage="E-Mail"
              />
              :{' '}
            </span>
            {!isSSR && (
              <Link
                onClick={() =>
                  (window.location.href = `mailto:${organization.email}`)
                }
                label={organization.email}
                className={styles.Link}
              />
            )}
          </div>
        )
      }
      {
        /* web site link */
        organization.website && (
          <div className={styles.ParagraphLeftTab}>
            <Link
              path={getWebSite(organization.website)}
              className={styles.Link}
              target="_blank"
            >
              <FormattedMessage
                id="restaurant.body.website"
                description="The default link label to restaurant web site"
                defaultMessage="Zur Restaurant-Website"
              />
            </Link>
          </div>
        )
      }

      <OrganizationShare {...organization} />

      {
        /* Owners */
        organization.organizationData.owners &&
          organization.organizationData.owners.name && (
            <div className={styles.ParagraphLeftTab}>
              <span className={styles.Bold}>
                <FormattedMessage
                  id="restaurant.body.owner"
                  description="The default label for owner"
                  defaultMessage="Gastgeber"
                />
                :&nbsp;
              </span>
              {organization.organizationData.owners.name}
            </div>
          )
      }

      {
        /* holiday */
        closedPeriod && (
          <div className={styles.ParagraphLeftTab}>
            <span className={styles.Bold}>
              <FormattedMessage
                id="restaurant.body.holiday"
                description="The default label for holiday"
                defaultMessage="Ruhetage"
              />
              :&nbsp;
            </span>
            {closedPeriod}
          </div>
        )
      }

      {
        /* prices */
        ((organization.organizationData.lunchPriceLow ||
          organization.organizationData.lunchPriceHigh ||
          organization.organizationData.dinerPriceLow ||
          organization.organizationData.dinerPriceHigh) && (
          <div className={styles.ParagraphLeftTab}>
            <span className={styles.Bold}>
              <FormattedMessage
                id="restaurant.body.price"
                description="The default label for price"
                defaultMessage="Preise"
              />
              {': '}
            </span>

            {
              /* prices lunch */
              ((organization.organizationData.lunchPriceLow ||
                organization.organizationData.lunchPriceHigh) && (
                <span className={styles.NoWrap}>
                  <FormattedMessage
                    id="restaurant.body.menu.lunch"
                    description="The default label for lunch"
                    defaultMessage="M"
                  />{' '}
                  {(organization.organizationData.lunchPriceLow &&
                    formatPrice(organization.organizationData.lunchPriceLow)) ||
                    ''}
                  {(organization.organizationData.lunchPriceLow &&
                    organization.organizationData.lunchPriceHigh &&
                    '/') ||
                    ''}
                  {(organization.organizationData.lunchPriceHigh &&
                    formatPrice(
                      organization.organizationData.lunchPriceHigh,
                    )) ||
                    ''}
                </span>
              )) ||
                ''
            }

            {
              /* prices divider */
              ((organization.organizationData.lunchPriceLow ||
                organization.organizationData.lunchPriceHigh) &&
                (organization.organizationData.dinerPriceLow ||
                  organization.organizationData.dinerPriceHigh) &&
                ' • ') ||
                ''
            }

            {
              /* prices diner */
              ((organization.organizationData.dinerPriceLow ||
                organization.organizationData.dinerPriceHigh) && (
                <span className={styles.NoWrap}>
                  <FormattedMessage
                    id="restaurant.body.menu.diner"
                    description="The default label for diner"
                    defaultMessage="D"
                  />{' '}
                  {(organization.organizationData.dinerPriceLow &&
                    formatPrice(organization.organizationData.dinerPriceLow)) ||
                    ''}
                  {organization.organizationData.dinerPriceLow && '/'}
                  {(organization.organizationData.dinerPriceHigh &&
                    formatPrice(
                      organization.organizationData.dinerPriceHigh,
                    )) ||
                    ''}
                </span>
              )) ||
                ''
            }
          </div>
        )) ||
          ''
      }

      {
        /* services */
        availableServices && (
          <div className={styles.ParagraphLeftTab}>
            <span className={styles.Bold}>
              <FormattedMessage
                id="restaurant.body.service"
                description="The default label for service"
                defaultMessage="Service"
              />
              :&nbsp;
            </span>
            <span>{availableServices}</span>
          </div>
        )
      }

      {organization?.sponsors?.items && (
        <div className={styles.ParagraphLeftTabLast}>
          {/* @ts-ignore TODO: TS7006 ->  Parameter 'sponsor' implicitly has an 'any' type. */}
          {organization.sponsors.items.map((sponsor) => (
            <Link
              path={sponsor.teaserImage.link?.path}
              className={styles.Link}
              key={`sponsor-${sponsor.id}`}
              target="_blank"
            >
              <SponsorImage sponsor={sponsor} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

const createTabsContent = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'organization' implicitly has an 'any' type. */
  organization,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'intl' implicitly has an 'any' type. */
  intl,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'viewportLabel' implicitly has an 'any' type. */
  viewportLabel,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'language' implicitly has an 'any' type. */
  language,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'isSSR' implicitly has an 'any' type. */
  isSSR,
) => {
  const tabs = [
    {
      index: 2,
      anchor: 'contact',
      title: (
        <FormattedMessage
          id="restaurant.body.tab.contact"
          description="The default label for contact tab"
          defaultMessage="Kontakt"
        />
      ),
      subtitle: '',
      contents: [
        {
          content: createTabContact(organization, intl, language, isSSR),
          addClass: '',
        },
      ],
      addClass: '',
    },
    {
      index: 1,
      anchor: 'text',
      title: (
        <FormattedMessage
          id="restaurant.body.tab.text"
          description="The default label for text tab"
          defaultMessage="Text"
        />
      ),
      subtitle: '',
      contents: [
        {
          content:
            language === 'fr' && organization.organizationData.reviewFr
              ? organization.organizationData.reviewFr
              : organization.organizationData.reviewDe || '',
          addClass: styles.OrganizationText,
        },
      ],
      addClass: styles.Right,
    },
  ];

  // revert order for mobile
  if (viewportLabel === VIEWPORT_XS) {
    return tabs.reverse();
  }

  return tabs;
};
const mapDispatchToProps = {
  setHeaderData,
  resetHeaderData,
};

export default compose<any, any>(
  withHeaderProps,
  connect(null, mapDispatchToProps),
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.organization,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getFallbackTitle: (mapProps) =>
      (!!mapProps && getFallbackTitle(mapProps.organization)) || '',
    rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
    hasBreadcrumbs: () => false,
  }),
)(OrganizationPop);
