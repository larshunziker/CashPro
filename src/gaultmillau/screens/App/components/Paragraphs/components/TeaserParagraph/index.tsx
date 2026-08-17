import React from 'react';
import {
  createTabsContent,
  getParagraphFilterFunction,
  recipeColStyle,
  recipeParagraphColStyle,
} from '../../../../screens/Recipe/shared/helpers';
import { ensureTeaserInterfaceItem } from '../../../Teaser/shared/helpers';
import Paragraphs from '../../../Paragraphs';
import TabsTwoCols from '../../../TabsTwoCols';
import Teaser from '../../../Teaser';
import ProductTeaser, {
  PRODUCT_TYPE_BOOK,
  PRODUCT_TYPE_DEFAULT,
} from '../../../Teaser/components/ProductTeaser';
import {
  PRODUCT_STYLE_DEFAULT,
  PRODUCT_STYLE_FULL_WIDTH_IMAGE_LEFT,
} from '../../../Teaser/components/ProductTeaser/components/ProductTeaserDefault';
import {
  ARTICLE_CONTENT_TYPE,
  PRODUCT_CONTENT_TYPE,
  RECIPE_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  INFOBOX_PARAGRAPH,
  MULTI_COLUMNS_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import {
  TEASER_LAYOUT_INLINE_RECIPE,
  TEASER_LAYOUT_ML,
} from '../../../../../../../shared/constants/teaser';
import { FILTER_TYPE_JUST_BOOK_TEASERS } from '../../../../screens/Recipe/constants';
import { TeaserParagraphProps } from './typings';

export const INLINE_TEASER_PARAGRAPH = ARTICLE_CONTENT_TYPE;
export const PRODUCT_TEASER_PARAGRAPH = PRODUCT_CONTENT_TYPE;

const TeaserParagraph = ({
  teaserParagraph,
  hasNext = false,
  colStyle,
  origin,
}: TeaserParagraphProps) => {
  const teaser = teaserParagraph?.teasers?.edges?.[0]?.node;

  if (!teaser) {
    return null;
  }

  // @ts-ignore
  const teaserType = teaser?.__typename || null;
  const teaserStyle = teaserParagraph?.style || PRODUCT_STYLE_DEFAULT;

  let productType = PRODUCT_TYPE_DEFAULT;

  if (
    teaserType === PRODUCT_TEASER_PARAGRAPH &&
    teaserStyle !== PRODUCT_STYLE_FULL_WIDTH_IMAGE_LEFT
  ) {
    productType = PRODUCT_TYPE_BOOK;
  } else if (teaserType === INLINE_TEASER_PARAGRAPH) {
    return (
      <Teaser
        component={TEASER_LAYOUT_ML}
        {...ensureTeaserInterfaceItem(teaser)}
      />
    );
  }

  if (origin === MULTI_COLUMNS_PARAGRAPH) {
    productType = PRODUCT_TYPE_DEFAULT;
  }

  if (
    origin === INFOBOX_PARAGRAPH ||
    (teaserType === RECIPE_CONTENT_TYPE && !teaserParagraph.detailView)
  ) {
    return (
      <Teaser
        component={TEASER_LAYOUT_INLINE_RECIPE}
        {...ensureTeaserInterfaceItem(teaser)}
      />
    );
  }

  if (teaserType === RECIPE_CONTENT_TYPE && teaserParagraph.detailView) {
    return (
      <div
        className={recipeColStyle}
        data-testid="teaser-paragraph-recipe-detail-view"
      >
        <TabsTwoCols tabs={createTabsContent(teaser)} />
        <Paragraphs
          // @ts-ignore
          pageBody={teaser?.instructions || {}}
          /* @ts-ignore TODO: TS2322 ->  Type '((paragraphs */
          applyDataFilter={getParagraphFilterFunction(
            FILTER_TYPE_JUST_BOOK_TEASERS,
          )}
          hasContainer={false}
          colStyle={recipeParagraphColStyle}
          origin={RECIPE_CONTENT_TYPE}
        />
      </div>
    );
  }

  return (
    <ProductTeaser
      colStyle={colStyle}
      component={productType}
      teaserParagraph={teaserParagraph}
      hasNext={hasNext}
      type={teaserStyle}
    />
  );
};

export default TeaserParagraph;
