import React from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../../../common/components/Teaser/factory';
import { getAllAuthors } from '../../../../../../../../../shared/helpers/authors';
import { getTitleBadgeByProps } from '../../../../shared/helpers';
import Picture from '../../../../../../../../../common/components/Picture';
import { STYLE_1X1_140 } from '../../../../../../../../../shared/constants/images';
import { LOGO_ABO_BADGE_SSSSM } from '../../../../../Logo/constants';
import {
  TEASER_LEAD_LENGTH,
  TEASER_LEAD_SUFFIX_TEXT,
} from '../../../../constants';
import defaultStyles from './styles.legacy.css';
import { TeaserMLOpinionFactoryOptions } from './typings';

export const getInnerContentByProps = ({ authors }: TeaserFactoryProps) => {
  const hasAuthors =
    authors?.edges &&
    Array.isArray(authors.edges) &&
    authors?.edges?.length > 0;

  if (!hasAuthors) {
    return null;
  }

  const imagePath =
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    authors.edges[0]?.node?.imageParagraph?.image?.file?.relativeOriginPath ||
    null;
  const focalPointX =
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    authors.edges[0]?.node?.imageParagraph?.image?.file?.focalPointX ?? null;
  const focalPointY =
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    authors.edges[0]?.node?.imageParagraph?.image?.file?.focalPointY ?? null;

  return (
    <>
      {(imagePath && (
        <div className={defaultStyles.AuthorWrapper}>
          <div className={defaultStyles.AuthorContent}>
            <Picture
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
              alt={authors?.edges[0].node?.name}
              style_320={STYLE_1X1_140}
              className={defaultStyles.AuthorAvatar}
              relativeOrigin={imagePath}
              /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
              focalPointX={focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
              focalPointY={focalPointY}
            />
            <div className={defaultStyles.Authors}>
              {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Maybe<AuthorEdge>[]> | undefined' is not assignable to type 'AuthorEdge[]'. */}
              {getAllAuthors({ authors: authors.edges, isBold: true })}
            </div>
          </div>
        </div>
      )) ||
        null}
    </>
  );
};

const teaserMLOpinionFactory = ({
  teaserIdentifier,
  styles,
}: TeaserMLOpinionFactoryOptions) => {
  const TeaserMLOpinion = teaserFactory({
    /* @ts-ignore TODO: TS2322 ->  Type '({ authors } */
    innerContent: getInnerContentByProps,
    /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus, contentBoxType, publicationDate, } */
    titleBadge: getTitleBadgeByProps(LOGO_ABO_BADGE_SSSSM),
    leadOptions: {
      truncateCount: TEASER_LEAD_LENGTH,
      append: TEASER_LEAD_SUFFIX_TEXT,
    },
    styles: {
      OuterWrapper: defaultStyles.OuterWrapper,
      Wrapper: classNames(teaserIdentifier, defaultStyles.Wrapper, {
        [styles.MinimumHeight]: !!styles,
      }),
      ContentWrapper: defaultStyles.ContentWrapper,
      Title: defaultStyles.Title,
      Lead: defaultStyles.Lead,
      ShortTitle: defaultStyles.ShortTitle,
    },
  });

  return TeaserMLOpinion;
};

export default teaserMLOpinionFactory;
