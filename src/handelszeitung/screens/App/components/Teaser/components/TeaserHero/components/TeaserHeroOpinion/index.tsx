import React, { ReactElement } from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { getAllAuthors } from '../../../../../../../../../shared/helpers/authors';
import { getTitleBadgeByProps } from '../../../../shared/helpers';
import Picture from '../../../../../../../../../common/components/Picture';
import {
  STYLE_16X9_560,
  STYLE_16X9_700,
  STYLE_1X1_140,
  STYLE_1X1_410,
} from '../../../../../../../../../shared/constants/images';
import { LOGO_ABO_BADGE_SSSSM } from '../../../../../../components/Logo/constants';
import {
  TEASER_HERO_OPINION_IDENTIFIER,
  TEASER_LEAD_LENGTH,
  TEASER_LEAD_SUFFIX_TEXT,
} from '../../../../constants';
import styles from './styles.legacy.css';
import {
  GetElementByProps,
  TeaserFactoryProps,
} from '../../../../../../../../../common/components/Teaser/typings';

type TeaserHeroOpinionPropsInner = TeaserFactoryProps &
  TeaserInterface & {
    authors?: Array<AuthorEdge> | null;
  };

export const getInnerContentByProps: GetElementByProps<
  TeaserHeroOpinionPropsInner
> = ({ authors }: TeaserHeroOpinionPropsInner): ReactElement => {
  const hasAuthors: boolean =
    authors?.edges &&
    Array.isArray(authors.edges) &&
    authors?.edges?.length > 0;

  if (!hasAuthors) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const imagePath: string | null =
    authors.edges[0]?.node?.imageParagraph?.image?.file?.relativeOriginPath ||
    null;
  const focalPointX: number | null =
    authors.edges[0]?.node?.imageParagraph?.image?.file?.focalPointX ?? null;
  const focalPointY: number | null =
    authors.edges[0]?.node?.imageParagraph?.image?.file?.focalPointY ?? null;

  return (
    <>
      {(imagePath && (
        <div className={styles.AuthorWrapper}>
          <div className={styles.AuthorContent}>
            <Picture
              alt={authors?.edges[0].node?.name}
              style_320={STYLE_1X1_140}
              className={styles.AuthorAvatar}
              relativeOrigin={imagePath}
              /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
              focalPointX={focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
              focalPointY={focalPointY}
            />
            <div className={styles.Authors}>
              {getAllAuthors({ authors: authors.edges, isBold: true })}
            </div>
          </div>
        </div>
      )) ||
        null}
    </>
  );
};

const TeaserHeroOpinion = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_16X9_560,
    style_760: STYLE_1X1_410,
    style_1680: STYLE_16X9_700,
  },
  innerContent: getInnerContentByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus, contentBoxType, publicationDate, } */
  titleBadge: getTitleBadgeByProps(LOGO_ABO_BADGE_SSSSM),
  leadOptions: {
    truncateCount: TEASER_LEAD_LENGTH,
    append: TEASER_LEAD_SUFFIX_TEXT,
  },
  styles: {
    Wrapper: classNames(TEASER_HERO_OPINION_IDENTIFIER, styles.Wrapper),
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
    Lead: styles.Lead,
    Image: styles.Image,
    ImageWrapper: styles.ImageWrapper,
    ShortTitle: styles.ShortTitle,
  },
});

export default TeaserHeroOpinion;
