import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import Link from '../../../../../../common/components/Link';
import Paragraphs from '../../../components/Paragraphs/components/ParagraphsRenderer';
import { PRODUCT_TEASER_PARAGRAPH } from '../../../components/Paragraphs/components/TeaserParagraph';
import { RECIPE_CONTENT_TYPE } from '../../../../../../shared/constants/content';
import {
  INPUT_FORM_PARAGRAPH,
  TEASER_PARAGRAPH,
} from '../../../../../../shared/constants/paragraphs';
import {
  FILTER_TYPE_JUST_BOOK_TEASERS,
  FILTER_TYPE_WITHOUT_BOOK_TEASERS,
} from '../constants';
import grid from '../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

export const recipeColLeadStyle = classNames(
  grid.ColXs22,
  grid.ColSm20,
  grid.ColMd18,
  grid.ColOffsetXs1,
  grid.ColOffsetSm2,
  grid.ColOffsetMd3,
);

export const recipeParagraphColStyle = grid.ColXs24;

export const recipeColStyle = classNames(
  grid.ColSm20,
  grid.ColOffsetSm2,
  grid.ColXl14,
  grid.ColOffsetXl5,
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'filterType' implicitly has an 'any' type. */
export const getParagraphFilterFunction = (filterType) => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'filter' implicitly has type 'any' in some locations where its type cannot be determined. */
  let filter;

  switch (filterType) {
    case FILTER_TYPE_JUST_BOOK_TEASERS: {
      filter = (
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        item, // bug in flow denies correct typing here!
      ) =>
        item.type === TEASER_PARAGRAPH &&
        item.teaser &&
        item.teaser.type === PRODUCT_TEASER_PARAGRAPH;
      break;
    }

    case FILTER_TYPE_WITHOUT_BOOK_TEASERS: {
      filter = (
        /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
        item, // bug in flow denies correct typing here!
      ) =>
        item.type !== TEASER_PARAGRAPH ||
        (item.teaser &&
          item.teaser.type &&
          item.teaser.type !== PRODUCT_TEASER_PARAGRAPH);
      break;
    }

    default: {
      return null;
    }
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'paragraphs' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7005 ->  Variable 'filter' implicitly has an 'any' type. */
  return (paragraphs) => paragraphs.filter(filter);
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'webSite' implicitly has an 'any' type. */
const getWebSite = (webSite) =>
  (webSite.substring(0, 4) === 'http' && webSite) || `http://${webSite}`;

/* @ts-ignore TODO: TS7006 ->  Parameter 'recipe' implicitly has an 'any' type. */
export const renderAddress = (recipe) => {
  if (!recipe.organization) {
    return null;
  }

  return (
    <>
      <div>
        {recipe.organization.organizationData &&
          recipe.organization.organizationData.restaurantName && (
            <strong>
              {recipe.organization.organizationData.restaurantName}
            </strong>
          )}
      </div>
      <div>
        {recipe.organization.organizationData &&
          recipe.organization.organizationData.secondaryName && (
            <p>{recipe.organization.organizationData.secondaryName}</p>
          )}
      </div>
      <div>
        {<p>{recipe.organization.address || ''}</p>}
        {recipe.organization.zipCode && recipe.organization.city && (
          <p>
            {recipe.organization.zipCode}
            &nbsp;
            {recipe.organization.city}
          </p>
        )}
        {recipe.organization.phone && <p>{recipe.organization.phone}</p>}
        {recipe.organization.website && (
          <p>
            <Link
              className={styles.Link}
              path={getWebSite(recipe.organization.website)}
              label={recipe.organization.website}
            />
          </p>
        )}
      </div>
    </>
  );
};

export const createTabsContent = (recipe: Recipe) => {
  const tabs = [
    {
      index: 1,
      anchor: 'ingredients',
      title: (
        <FormattedMessage
          id="recipe.body.tab.ingredients"
          description="The default label for ingredients tab"
          defaultMessage="Zutaten"
        />
      ),
      subtitle: (
        <FormattedMessage
          id="recipe.body.tab.ingredients"
          description="The default label for ingredients tab"
          defaultMessage="Zutaten"
        />
      ),
      contents: [
        {
          content: recipe.ingredients,
          addClass: styles.IngredientTitle,
        },
        {
          content: renderAddress(recipe),
          addClass: styles.AddressText,
        },
      ],
      addClass: '',
    },
    {
      index: 2,
      anchor: 'instructions',
      title: (
        <FormattedMessage
          id="recipe.body.tab.instructions"
          description="The default label for instructions tab"
          defaultMessage="Zubereitung"
        />
      ),
      subtitle: (
        <FormattedMessage
          id="recipe.body.tab.instructions"
          description="The default label for instructions tab"
          defaultMessage="Zubereitung"
        />
      ),
      contents: [
        {
          content: recipe.instructions && (
            <Paragraphs
              pageBody={recipe.instructions.filter(
                // @ts-ignore
                ({ __typename }) => __typename !== INPUT_FORM_PARAGRAPH,
              )}
              /* @ts-ignore TODO: TS2322 ->  Type '((paragraphs */
              applyDataFilter={getParagraphFilterFunction(
                FILTER_TYPE_WITHOUT_BOOK_TEASERS,
              )}
              origin={RECIPE_CONTENT_TYPE}
              hasContainer={false}
              colStyle={recipeParagraphColStyle}
            />
          ),
          addClass: '',
        },
      ],
      addClass: '',
    },
  ];
  return tabs;
};
