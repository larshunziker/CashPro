import React, { ReactElement } from 'react';
import classNames from 'classnames';
import specialStageFactory from '../../../../../../../../../common/components/Teaser/components/SpecialStage/factory';
import Link from '../../../../../../../../../common/components/Link';
import Picture from '../../../../../../../../../common/components/Picture';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import ArrowButton from '../../../../../ArrowButton';
import Img from '../../../../../Img';
import Logo, { TEASER_SPECIAL_L } from '../../../../../Logo';
import {
  STYLE_16X9_1130,
  STYLE_16X9_800,
  STYLE_16X9_890,
  STYLE_3X2_440,
  STYLE_SCALEW_280,
} from '../../../../../../../../../shared/constants/images';
import {
  PUBLICATION_SI,
  PUBLICATION_SY,
} from '../../../../../../../../../shared/constants/publications';
import { TEASER_IMAGE_IDENTIFIER } from '../../../../../Teaser/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { SpecialStageFactoryProps } from '../../../../../../../../../common/components/Teaser/components/SpecialStage/typings';
import { PublicationType } from '../../../../../Logo/typings';

export type SpecialStageFactoryPropsInner = SpecialStageFactoryProps;

const SpecialLStage = ({
  teaserStage,
  paragraphType,
  paragraphIndex,
}: SpecialStageFactoryPropsInner) => {
  const channel = teaserStage?.termReference as Channel;

  const logoChoice: PublicationType =
    (channel?.logoChoice === 'SI' && PUBLICATION_SI) || PUBLICATION_SY;

  const publicationLogo: ReactElement = (
    <div className={styles.PublicationLogo}>
      <Logo publication={logoChoice} origin={TEASER_SPECIAL_L} />
    </div>
  );

  const mainSponsorImage: ReactElement = (
    <>
      {channel?.sponsor?.teaserImage?.image?.file?.relativeOriginPath && (
        <Link
          className={styles.MainSponsorLink}
          nofollow
          path={channel?.sponsor?.teaserImage?.link?.path || ''}
          rel="sponsored"
        >
          <Picture
            relativeOrigin={
              channel?.sponsor?.teaserImage?.image?.file?.relativeOriginPath
            }
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointX={
              channel?.sponsor?.teaserImage?.image?.file?.focalPointX
            }
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
            focalPointY={
              channel?.sponsor?.teaserImage?.image?.file?.focalPointY
            }
            style_320={STYLE_SCALEW_280}
            alt={channel?.sponsor?.teaserImage?.image?.file?.alt || ''}
            className={styles.MainSponsorImage}
          />
        </Link>
      )}
    </>
  );

  const imagePath =
    channel?.landingPage?.teaserImage?.image?.file?.relativeOriginPath || '';
  const focalPointX =
    channel?.landingPage?.teaserImage?.image?.file?.focalPointX || null;
  const focalPointY =
    channel?.landingPage?.teaserImage?.image?.file?.focalPointY || null;
  const imageAlt = channel?.landingPage?.teaserImage?.image?.file?.alt || '';

  return specialStageFactory({
    teaserStage,
    Img,
    button: (
      <div className={styles.AllStoriesButtonWrapper}>
        <ArrowButton large>Alle Stories</ArrowButton>
      </div>
    ),
    publicationLogo,
    backgroundImage: (
      <Picture
        relativeOrigin={imagePath}
        /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
        focalPointX={focalPointX}
        /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
        focalPointY={focalPointY}
        alt={imageAlt}
        className={classNames(TEASER_IMAGE_IDENTIFIER, styles.ImageWrapper)}
        disableWrapperClassName
        style_320={STYLE_3X2_440}
        style_480={STYLE_3X2_440}
        style_540={STYLE_3X2_440}
        style_760={STYLE_16X9_800}
        style_960={STYLE_16X9_890}
        style_1680={STYLE_16X9_1130}
      />
    ),
    mainSponsorImage,
    styles: {
      SpecialLWrapper: styles.SpecialLWrapper,
      ImageWrapper: classNames(styles.ImageWrapper, styles.ImageWrapperIE),
      InnerWrapper: classNames(grid.Row, styles.InnerWrapper),
      ColumnLeft: classNames(grid.ColSm13, grid.ColOffsetSm1),
      ColumnRight: grid.ColSm9,
      PublicationLogo: styles.PublicationLogo,
      LandingPageLink: classNames(
        styles.LandingPageLink,
        'ArrowButtonHoverArea',
      ),
      Spacing: styles.Spacing,
      SpecialImage: styles.SpecialImage,
      ShortTitle: styles.ShortTitle,
      Title: styles.Title,
      ReferenceArticleWrapper: styles.ReferenceArticleWrapper,
      ReferenceArticleLink: styles.ReferenceArticleLink,
      ReferenceArticleShortTitle: styles.ReferenceArticleShortTitle,
      ReferenceArticleTitle: styles.ReferenceArticleTitle,
      MainSponsorLink: styles.MainSponsorLink,
      MainSponsorImage: styles.MainSponsorImage,
      PartnersWrapper: styles.PartnersWrapper,
      PartnersRow: grid.Row,
      PartnersColumn: classNames(grid.ColSm22, grid.ColOffsetSm1),
      PartnerItem: styles.PartnerItem,
    },
    paragraphType,
    /* @ts-ignore TODO: TS2322 ->  Type 'number | undefined' is not assignable to type 'number'. */
    paragraphIndex,
  });
};

const SpecialLStageWrapper = (
  props: SpecialStageFactoryPropsInner,
): ReactElement => {
  const channel = props?.teaserStage?.termReference as Channel;

  if (
    !props?.teaserStage ||
    Object.keys(props.teaserStage).length === 0 ||
    !channel?.landingPage ||
    !channel.landingPage.title ||
    !channel.landingPage.preferredUri ||
    !channel.landingPage.teaserImage
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }
  return (
    <TestFragment data-testid="special-stage-stage-wrapper">
      <div className={grid.Container}>
        <SpecialLStage {...props} />
      </div>
    </TestFragment>
  );
};

export default SpecialLStageWrapper;
