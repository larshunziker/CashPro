import React, { ComponentType } from 'react';
import classNames from 'classnames';
import teaserFactory, {
  TeaserFactoryProps,
} from '../../../../../../../../../common/components/Teaser/factory';
import { getAllAuthors } from '../../../../../../../../../shared/helpers/authors';
import { isInsideColumn } from '../../../../../../../../shared/helpers/isInsideColumn';
import { getShortTitleElementByProps } from '../../../../shared/helpers';
import Error from '../../../../../Error';
import Img from '../../../../../Img';
import AuthorsImages from '../../../AuthorsImages';
import TeaserM from '../../../TeaserM';
import { RESTRICTION_STATUS_PAID } from '../../../../../../../../../shared/constants/content';
import {
  STYLE_16X9_800,
  STYLE_1X1_140,
  STYLE_1X1_250,
  STYLE_3X2_440,
} from '../../../../../../../../../shared/constants/images';
import { TEASER_HERO_OPINION_IDENTIFIER } from '../../../../constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import beobachterPlus from 'graphics/beobachterplus.svg';
import { TeaserProps } from '../../../../typings';

type TeaserHeroOpinionPropsInner = TeaserProps;

const getInnerContentByProps = ({ authors }: TeaserHeroOpinionPropsInner) => {
  /* @ts-ignore TODO: TS2322 ->  Type 'boolean | null | undefined' is not assignable to type 'boolean'. */
  const hasAuthors: boolean =
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
      ? /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
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
      <div className={styles.AuthorContent}>
        <div className={styles.AuthorsImageWrapper}>
          <AuthorsImages
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AuthorEdge>[]' is not assignable to type 'AuthorEdge[]'. */
            authors={authorsWithImages}
            authorAvatarStyle={styles.AuthorAvatar}
          ></AuthorsImages>
        </div>
        <div className={styles.Authors}>
          {/* @ts-ignore TODO: TS2322 ->  Type 'Maybe<Maybe<AuthorEdge>[]> | undefined' is not assignable to type 'AuthorEdge[]'. */}
          {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
          {getAllAuthors({ authors: authors.edges, isBold: true })}
        </div>
      </div>
    </div>
  );
};

const getTitleBadgeByProps = ({ restrictionStatus }: TeaserFactoryProps) =>
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

/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
const getStylesByProps = ({ origin }) => ({
  Wrapper: classNames(TEASER_HERO_OPINION_IDENTIFIER, styles.Wrapper),
  ContentWrapper: styles.ContentWrapper,
  Title: styles.Title,
  Lead: styles.Lead,
  Image: styles.Image,
  ImageWrapper: classNames(styles.ImageWrapper, {
    [styles.GuideImageWrapper]: isInsideColumn(origin),
  }),
});

const TeaserHeroOpinion = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_1X1_140,
    style_760: STYLE_1X1_250,
    style_960: STYLE_3X2_440,
    style_1680: STYLE_16X9_800,
  },
  disableWrapperClassName: true,
  /* @ts-ignore TODO: TS2322 ->  Type '({ authors } */
  innerContent: getInnerContentByProps,
  /* @ts-ignore TODO: TS2322 ->  Type '({ restrictionStatus } */
  titleBadge: getTitleBadgeByProps,
  leadOptions: {
    suffixText: '',
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ shortTitle, link, ...props } */
  shortTitleElement: getShortTitleElementByProps(styles.ShortTitle),
  styles: getStylesByProps,
});

const TeaserHeroOpinionWrapper: ComponentType<TeaserProps> = (
  props: TeaserHeroOpinionPropsInner,
) => (
  <>
    <div className={grid.HiddenSmUp}>
      {__DEVELOPMENT__ ? (
        <Error msg={`TeaserHeroOpinion is not available on viewport/xs`} />
      ) : (
        <TeaserM {...props} />
      )}
    </div>

    <div className={grid.HiddenSmDown}>
      <TeaserHeroOpinion {...props} />
    </div>
  </>
);

export default TeaserHeroOpinionWrapper;
