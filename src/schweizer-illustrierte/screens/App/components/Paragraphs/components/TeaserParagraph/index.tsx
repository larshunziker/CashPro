import React, { ReactElement } from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Teaser from '../../../Teaser';
import {
  PRODUCT_CONTENT_TYPE,
  TEASER_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import { TEASER_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import {
  TEASER_LAYOUT_PRODUCT,
  TEASER_LAYOUT_SUBSCRIPTION_L,
} from '../../../../../../../shared/constants/teaser';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_TEASER_PARAGRAPH,
  TRACKING_TEASER_PARAGRAPH_INDEX,
  TRACKING_TEASER_PARAGRAPH_TYPE,
  TRACKING_TEASER_POSITION,
} from '../../../../../../../shared/constants/tracking';
import { LANDING_PAGE_TYPE } from '../../../../screens/LandingPage/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import { TeaserParagraphProps } from './typings';

export type TeaserParagraphPropsInner = TeaserParagraphProps;

/* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
const splitByProductType = ({ node }) =>
  node.__typename === PRODUCT_CONTENT_TYPE;
/* @ts-ignore TODO: TS7031 ->  Binding element 'node' implicitly has an 'any' type. */
const splitByTeaserType = ({ node }) => node.__typename === TEASER_CONTENT_TYPE;

const doRenderTeaser = (
  { node }: TeaserableInterfaceEdge,
  index: number,
  teaserList: Array<TeaserableInterfaceEdge>,
  paragraphIndex: number,
): ReactElement => (
  <div
    className={classNames(grid.ColSm12, {
      [grid.ColOffsetSm6]:
        Array.isArray(teaserList) &&
        teaserList.length > 0 &&
        index + 1 === teaserList.length &&
        index % 2 === 0,
    })}
    key={`teaser-product-item-${index}`}
    data-testid="teaserparagraph-item"
  >
    <Teaser
      component={TEASER_LAYOUT_PRODUCT}
      {...(node as TeaserInterface)}
      trackingData={[
        {
          type: TRACKING_TEASER_PARAGRAPH_TYPE,
          value: TEASER_PARAGRAPH,
        },
        {
          type: TRACKING_TEASER_PARAGRAPH_INDEX,
          value: `${paragraphIndex + 1}`,
        },
        {
          type: TRACKING_TEASER_POSITION,
          value: `${index + 1}`,
        },
      ]}
    />
  </div>
);

const doRenderStage = (
  { node }: TeaserableInterfaceEdge,
  index: number,
  paragraphIndex: number,
): ReactElement => (
  <TestFragment
    key={`teaser-teaser-item-${index}`}
    data-testid="teaserparagraph-item"
  >
    <Teaser
      component={TEASER_LAYOUT_SUBSCRIPTION_L}
      {...(node as TeaserInterface)}
      trackingData={[
        {
          type: TRACKING_TEASER_PARAGRAPH_TYPE,
          value: TEASER_PARAGRAPH,
        },
        {
          type: TRACKING_TEASER_PARAGRAPH_INDEX,
          value: `${paragraphIndex + 1}`,
        },
        {
          type: TRACKING_TEASER_POSITION,
          value: `${index + 1}`,
        },
      ]}
    />
  </TestFragment>
);

const TeaserParagraph = ({
  teaserParagraph,
  origin,
  paragraphIndex,
}: TeaserParagraphPropsInner): ReactElement => {
  if (
    !teaserParagraph?.teasers?.edges ||
    !Array.isArray(teaserParagraph.teasers.edges) ||
    teaserParagraph.teasers.edges.length === 0
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<TeaserableInterfaceEdge>[]' is not assignable to type 'TeaserableInterfaceEdge[]'. */
  const teasers: Array<TeaserableInterfaceEdge> =
    teaserParagraph.teasers.edges.filter(splitByTeaserType);
  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<TeaserableInterfaceEdge>[]' is not assignable to type 'TeaserableInterfaceEdge[]'. */
  const products: Array<TeaserableInterfaceEdge> =
    teaserParagraph.teasers.edges.filter(splitByProductType);

  return (
    <>
      {teasers.length > 0 && (
        <div
          className={classNames(
            TRACKING_CLASS_PARAGRAPH,
            TRACKING_CLASS_TEASER_PARAGRAPH,
            {
              [grid.Container]: origin === LANDING_PAGE_TYPE,
            },
          )}
        >
          {teasers.map(
            (entry: TeaserableInterfaceEdge, index: number): ReactElement =>
              doRenderStage(entry, index, paragraphIndex),
          )}
        </div>
      )}

      {products.length > 0 && (
        <div
          className={classNames(
            grid.ColSm16,
            grid.ColOffsetSm4,
            grid.ColXl22,
            grid.ColOffsetXl1,
          )}
          data-testid="teaserparagraph-container"
        >
          <div className={grid.Row}>
            {products.map(
              (
                entry: TeaserableInterfaceEdge,
                index: number,
                teaserList: Array<TeaserableInterfaceEdge>,
              ): ReactElement =>
                doRenderTeaser(entry, index, teaserList, paragraphIndex),
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TeaserParagraph;
