import React, { ReactElement } from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../../../common/components/Teaser/factory';
import { getAllAuthors } from '../../../../../../../../../shared/helpers/authors';
import Picture from '../../../../../../../../../common/components/Picture';
import { STYLE_1X1_140 } from '../../../../../../../../../shared/constants/images';
import { TEASER_SM_OPINION_IDENTIFIER } from '../../../../constants';
import styles from './styles.legacy.css';
import {
  GetElementByProps,
  TeaserFactoryProps,
} from '../../../../../../../../../common/components/Teaser/typings';

type TeaserSMOpinionPropsInner = TeaserFactoryProps &
  TeaserInterface & {
    authors?: Array<AuthorEdge> | null;
  };

export const getInnerContentByProps: GetElementByProps<
  TeaserSMOpinionPropsInner
> = ({ authors }: TeaserSMOpinionPropsInner): ReactElement => {
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
              Von {getAllAuthors({ authors: authors.edges, isBold: false })}
            </div>
          </div>
        </div>
      )) ||
        null}
    </>
  );
};

const TeaserSMOpinion = teaserFactory({
  isShortTitleHidden: false,
  innerContent: getInnerContentByProps,
  styles: {
    OuterWrapper: styles.OuterWrapper,
    Wrapper: classNames(TEASER_SM_OPINION_IDENTIFIER, styles.Wrapper),
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
    ShortTitle: styles.ShortTitle,
  },
});

export default TeaserSMOpinion;
