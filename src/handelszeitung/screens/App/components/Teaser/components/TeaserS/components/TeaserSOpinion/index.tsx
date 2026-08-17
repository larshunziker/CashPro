import React, { ReactElement } from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { getAllAuthors } from '../../../../../../../../../shared/helpers/authors';
import { getTitleBadgeByProps } from '../../../../shared/helpers';
import Picture from '../../../../../../../../../common/components/Picture';
import { STYLE_1X1_140 } from '../../../../../../../../../shared/constants/images';
import { LOGO_ABO_BADGE_SSSSM } from '../../../../../Logo/constants';
import {
  TEASER_LEAD_LENGTH,
  TEASER_LEAD_SUFFIX_TEXT,
  TEASER_S_OPINION_IDENTIFIER,
} from '../../../../constants';
import styles from './styles.legacy.css';
import {
  GetElementByProps,
  TeaserFactoryProps,
} from '../../../../../../../../../common/components/Teaser/typings';

type TeaserSOpinionPropsInner = TeaserFactoryProps &
  TeaserInterface & {
    authors?: Array<AuthorEdge>;
  };

export const getInnerContentByProps: GetElementByProps<
  TeaserSOpinionPropsInner
> = ({ authors }: TeaserSOpinionPropsInner): ReactElement => {
  const hasAuthors =
    authors?.edges &&
    Array.isArray(authors.edges) &&
    authors?.edges?.length > 0;

  if (!hasAuthors) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const imagePath =
    authors.edges[0]?.node?.imageParagraph?.image?.file?.relativeOriginPath ||
    null;
  const focalPointX =
    authors.edges[0]?.node?.imageParagraph?.image?.file?.focalPointX || null;
  const focalPointY =
    authors.edges[0]?.node?.imageParagraph?.image?.file?.focalPointY || null;

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
              focalPointX={focalPointX}
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

const TeaserSOpinion = teaserFactory({
  innerContent: getInnerContentByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus, contentBoxType, publicationDate, } */
  titleBadge: getTitleBadgeByProps(LOGO_ABO_BADGE_SSSSM),
  leadOptions: {
    truncateCount: TEASER_LEAD_LENGTH,
    append: TEASER_LEAD_SUFFIX_TEXT,
  },
  styles: {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(TEASER_S_OPINION_IDENTIFIER, styles.Wrapper),
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
    Lead: styles.Lead,
    ShortTitle: styles.ShortTitle,
  },
});

export default TeaserSOpinion;
