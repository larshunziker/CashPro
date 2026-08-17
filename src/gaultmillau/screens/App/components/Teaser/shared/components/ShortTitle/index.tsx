import React, { FC, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { mapUrlToPopCityEnum } from '../../../../../../../shared/helpers/popRestaurantsUrlMap';
import { renderSponsoredOrShortTitle } from '../../../../../screens/Article/shared/helpers';
import settingsStateSelector from '../../../../../../../shared/selectors/settingsStateSelector';
import RestaurantRanking from '../../../../../screens/Organization/components/RestaurantRanking';
import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_JOURNALISTIC,
  ORGANIZATION_CONTENT_TYPE,
  RECIPE_CONTENT_TYPE,
  TEASER_CONTENT_TYPE,
} from '../../../../../../../../shared/constants/content';
import {
  ARTICLE_TYPE_BLOG_A,
  ARTICLE_TYPE_BLOG_B,
  ARTICLE_TYPE_BLOG_C,
  ARTICLE_TYPE_BLOG_D,
  ARTICLE_TYPE_BLOG_E,
  ARTICLE_TYPE_BLOG_F,
  ARTICLE_TYPE_BLOG_G,
  ARTICLE_TYPE_BLOG_GENERIC,
  ARTICLE_TYPE_BLOG_H,
  ARTICLE_TYPE_BLOG_I,
  ARTICLE_TYPE_BLOG_J,
  ARTICLE_TYPE_BLOG_K,
  ARTICLE_TYPE_BLOG_L,
  ARTICLE_TYPE_BLOG_M,
  ARTICLE_TYPE_BLOG_N,
  ARTICLE_TYPE_BLOG_O,
  ARTICLE_TYPE_BLOG_P,
  ARTICLE_TYPE_BLOG_Q,
  BLOG_DATA,
} from '../../../../../constants';
import { ORGANIZATION_TYPE_POP } from '../../../../../screens/PopRestaurants/constants';
import { TEASER_HERO_MAIN_IDENTIFIER } from '../../../constants';
import { getStyleByType } from '../../constants';
import defaultStyles from './styles.legacy.css';
// @ts-ignore
import popIcon from '../../../../../assets/graphics/gm_pop_ico_60.svg';
import { ShortTitleProps } from './typings';

type BlogShortTitleProps = {
  name: string;
  title: string;
  styleByType: string;
  children?: JSX.Element | string;
};

const BlogShortTitle = ({
  title,
  styleByType,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | Element'. */
  children = null,
}: BlogShortTitleProps) => (
  <div
    className={classNames(
      defaultStyles.ShortTitleWrapper,
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Defaul */
      defaultStyles[styleByType || 'Type'],
    )}
  >
    <span className={defaultStyles.Bold}>{title}</span>
    {children}
  </div>
);

const ShortTitle: FC<ShortTitleProps> = ({
  __typename,
  subtypeValue,
  title,
  preferredUri,
  shortTitle = '',
  authors,
  teaserType,
  organizationData,
  organizationType,
  restaurantType,
  cityList,
  sponsor,
  channel,
  styles,
  wrapperStyle = '',
  origin = '',
}) => {
  let jsx: JSX.Element;
  let wrapJsx = false;

  const language = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => settingsStateSelector(state).language,
  );

  const styleByType = getStyleByType({
    __typename,
    organizationType,
    teaserType,
    subtypeValue,
  });

  if (__typename === ARTICLE_CONTENT_TYPE) {
    const blog =
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`${string}_undefined` | `${string}_${string}`' can't b */
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ blog_a_de */
      BLOG_DATA[`${subtypeValue}_${language}`] || BLOG_DATA[subtypeValue] || {};
    const { title: blogTitle, postfix, url } = blog;

    switch (subtypeValue) {
      case ARTICLE_TYPE_BLOG_A:
      case ARTICLE_TYPE_BLOG_GENERIC:
        jsx = (
          <BlogShortTitle
            name={subtypeValue}
            title={blogTitle}
            styleByType={styleByType}
          >
            {/* @ts-ignore TODO: TS2322 ->  Type 'string | false' is not assignable to type 'string | Element | undefined'. */}
            {preferredUri !== `/${url}` && shortTitle && ` | ${shortTitle}`}
          </BlogShortTitle>
        );
        break;
      case ARTICLE_TYPE_BLOG_C:
        jsx = (
          <BlogShortTitle
            name={subtypeValue}
            title={blogTitle}
            styleByType={styleByType}
          >
            <>
              {Array.isArray(authors?.edges) &&
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                authors.edges.length > 0 &&
                /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                authors.edges[0].node?.name && (
                  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                  <span>{` | ${authors.edges[0].node.name}`}</span>
                )}
            </>
          </BlogShortTitle>
        );
        break;
      case ARTICLE_TYPE_BLOG_B:
      case ARTICLE_TYPE_BLOG_D:
      case ARTICLE_TYPE_BLOG_E:
      case ARTICLE_TYPE_BLOG_F:
        jsx = (
          <BlogShortTitle
            name={subtypeValue}
            title={blogTitle}
            styleByType={styleByType}
          />
        );
        break;
      case ARTICLE_TYPE_BLOG_G:
      case ARTICLE_TYPE_BLOG_H:
      case ARTICLE_TYPE_BLOG_I:
      case ARTICLE_TYPE_BLOG_J:
      case ARTICLE_TYPE_BLOG_K:
      case ARTICLE_TYPE_BLOG_L:
      case ARTICLE_TYPE_BLOG_M:
      case ARTICLE_TYPE_BLOG_N:
      case ARTICLE_TYPE_BLOG_O:
      case ARTICLE_TYPE_BLOG_P:
      case ARTICLE_TYPE_BLOG_Q:
        jsx = (
          <BlogShortTitle
            name={subtypeValue}
            title={blogTitle}
            styleByType={styleByType}
          >
            <>
              {` | `}
              {postfix}
            </>
          </BlogShortTitle>
        );
        break;
      case ARTICLE_TYPE_JOURNALISTIC:
      default:
        wrapJsx = true;
        /* @ts-ignore TODO: TS2322 ->  Type 'Element | null' is not assignable to type 'Element'. */
        jsx = renderSponsoredOrShortTitle(
          { sponsor, channel, title, shortTitle },
          '',
        );
    }
  } else if (__typename === RECIPE_CONTENT_TYPE) {
    jsx = (
      <div>
        {shortTitle || (
          <FormattedMessage
            id="app.teaser.helper.recipe"
            description="The default type title for a recipe"
            defaultMessage="Rezept"
          />
        )}
      </div>
    );

    wrapJsx = true;
  } else if (
    __typename === ORGANIZATION_CONTENT_TYPE &&
    // @ts-ignore TODO: Fix this
    organizationType !== ORGANIZATION_TYPE_POP &&
    organizationData
  ) {
    jsx = (
      <>
        <RestaurantRanking
          /* @ts-ignore TODO: TS2322 ->  Type 'boolean | null | undefined' is not assignable to type 'boolean'. */
          isProvisional={organizationData.isProvisional}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | null'. */
          points={organizationData.hasNoPoints ? null : organizationData.points}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | null'. */
          pointsChange={organizationData.pointsChange}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
          trendIsDisabled={organizationData.trendIsDisabled}
          addClass={styles.TeaserHatIcon}
          addHatIconClass={styles.HatIcon}
        />
        {organizationData.isNew && (
          <div className={defaultStyles.NewLabel}>
            <FormattedMessage
              id="restaurant.description.new.label"
              description="The default label for new restaurant"
              defaultMessage="neu"
            />
          </div>
        )}
      </>
    );
  } else if (
    __typename === ORGANIZATION_CONTENT_TYPE &&
    // @ts-ignore TODO: Fix this
    organizationType === ORGANIZATION_TYPE_POP
  ) {
    jsx = (
      <div
        className={classNames(
          defaultStyles.PopIconWrapper,
          styles.PopIconWrapper,
        )}
      >
        <img
          src={popIcon}
          className={classNames(defaultStyles.PopIcon, styles.PopIcon)}
          alt="Gault Millau POP!"
        />
        <div
          className={classNames(
            defaultStyles.ShortTitleWrapper,
            defaultStyles[styleByType || 'Type'],
          )}
        >
          {cityList && (
            <span>{mapUrlToPopCityEnum(cityList, language).label || ''}</span>
          )}
          {restaurantType && (
            <span>
              {cityList && ' | '}
              {restaurantType}
            </span>
          )}
        </div>
      </div>
    );
  } else if (__typename === TEASER_CONTENT_TYPE) {
    /* @ts-ignore TODO: TS2322 ->  Type 'Element | null' is not assignable to type 'Element'. */
    jsx = (shortTitle && <span>{shortTitle}</span>) || null;

    wrapJsx = true;
  }

  if (wrapJsx) {
    /* @ts-ignore TODO: TS2454 ->  Variable 'jsx' is used before being assigned. */
    jsx = <div className={defaultStyles[styleByType || 'Type']}>{jsx}</div>;
  }
  return (
    <div
      className={classNames(wrapperStyle, {
        [defaultStyles.Hero]: origin === TEASER_HERO_MAIN_IDENTIFIER,
        [defaultStyles.Default]: origin !== TEASER_HERO_MAIN_IDENTIFIER,
      })}
    >
      {/* @ts-ignore TODO: TS2454 ->  Variable 'jsx' is used before being assigned. */}
      {jsx}
    </div>
  );
};

export default memo<ShortTitleProps>(ShortTitle);
