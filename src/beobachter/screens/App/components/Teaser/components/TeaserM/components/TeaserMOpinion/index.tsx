import React from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { getAllAuthors } from '../../../../../../../../../shared/helpers/authors';
import { getShortTitleElementByProps } from '../../../../../Teaser/shared/helpers';
import Img from '../../../../../Img';
import AuthorsImages from '../../../AuthorsImages';
import { RESTRICTION_STATUS_PAID } from '../../../../../../../../../shared/constants/content';
import { TEASER_M_OPINION_IDENTIFIER } from '../../../../constants';
import styles from './styles.legacy.css';
import beobachterPlus from '../../../../../../assets/graphics/beobachterplus.svg';
import { TeaserProps } from '../../../../typings';

const getInnerContentByProps = ({ authors }: TeaserProps) => {
  const hasAuthors =
    authors?.edges &&
    Array.isArray(authors.edges) &&
    authors?.edges?.length > 0;

  if (!hasAuthors) {
    return null;
  }

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const hasMoreThanTwoAuthors = authors?.edges?.length > 2;

  const authorsWithImages =
    hasAuthors && !hasMoreThanTwoAuthors
      ? /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        authors.edges
          .filter(
            (author) =>
              /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
              !!author.node?.imageParagraph?.image?.file?.relativeOriginPath,
          )
          .slice(0, 2)
      : [];

  return (
    <div className={styles.AuthorWrapper}>
      <div className={styles.AuthorsImageWrapper}>
        <AuthorsImages
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AuthorEdge>[]' is not assignable to type 'AuthorEdge[]'. */
          authors={authorsWithImages}
          authorAvatarStyle={styles.AuthorAvatar}
        ></AuthorsImages>
      </div>
      <div className={styles.AuthorContent}>
        <div className={styles.Authors}>
          {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Maybe<AuthorEdge>[]> | undefined' is not assignable to type 'AuthorEdge[]'. */}
          {getAllAuthors({ authors: authors.edges, isBold: true })}
        </div>
      </div>
    </div>
  );
};

const getTitleBadgeByProps = ({ restrictionStatus }: TeaserProps) =>
  restrictionStatus === RESTRICTION_STATUS_PAID ? (
    <Img
      addClass={styles.BeoPlusLogo}
      alt="Beobachter Plus"
      url={beobachterPlus}
      width={26}
      height={13}
      ignoreLandscapeClass
    />
  ) : null;

const TeaserMOpinion = teaserFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '({ authors } */
  innerContent: getInnerContentByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus } */
  titleBadge: getTitleBadgeByProps,
  leadOptions: {
    suffixText: '',
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ shortTitle, link, ...props } */
  shortTitleElement: getShortTitleElementByProps(styles.ShortTitle),
  styles: {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(styles.Wrapper, TEASER_M_OPINION_IDENTIFIER),
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
    Lead: styles.Lead,
  },
});

export default TeaserMOpinion;
