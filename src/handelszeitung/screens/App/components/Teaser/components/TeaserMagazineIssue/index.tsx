import React, { ReactElement } from 'react';
import classNames from 'classnames';
import magazineIssueFactory from '../../../../../../../common/components/Teaser/components/MagazineIssue/factory';
import handleWysiwygLink from '../../../../../../../shared/helpers/handleWysiwygLink';
import withNavigate from '../../../../../../../shared/decorators/withNavigate';
import Button from '../../../ButtonWithLoading';
import { TRACKING_CLASS_PRINT_TEASER } from '../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import {
  TeaserMagazineIssueFactoryOptionsStyles,
  TeaserMagazineIssueProps,
} from '../../../../../../../common/components/Teaser/components/MagazineIssue/typings';

/* @ts-ignore TODO: TS7031 ->  Binding element 'link' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'navigate' implicitly has an 'any' type. */
const getLinkButtonByProps = ({ link, children, navigate }): ReactElement => (
  <div className={TRACKING_CLASS_PRINT_TEASER}>
    <Button
      mobileFullWidth
      onClick={() => handleWysiwygLink(link.path, navigate)}
    >
      {children}
    </Button>
  </div>
);

const getStyleByProps = (
  props: TeaserMagazineIssueProps,
): TeaserMagazineIssueFactoryOptionsStyles => {
  const isSpecialOffer = props.issue?.magazine?.isSpecialOffer || false;

  return {
    Wrapper: styles.Wrapper,
    ImageContentWrapper: styles.ImageContentWrapper,
    ImageWrapper: classNames(styles.ImageWrapper, {
      [styles.ImageWrapperSpecialOffer]: isSpecialOffer,
    }),
    Image: classNames(styles.Image, {
      [styles.ImageSpecialOffer]: isSpecialOffer,
    }),
    SpecialOfferWrapper: styles.SpecialOfferWrapper,
    SpecialOfferText: styles.SpecialOfferText,
    ContentWrapper: classNames(styles.ContentWrapper, {
      [styles.ContentWrapperSpecialOffer]: isSpecialOffer,
    }),
    IssuePublishedText: styles.IssuePublishedText,
    IssueLink: styles.IssueLink,
    MagazineText: styles.MagazineText,
    CTAWrapper: styles.CTAWrapper,
    CTAWrapperDesktop: styles.CTAWrapperDesktop,
    SkeletonButton: styles.SkeletonButton,
    SkeletonIssuePublished: styles.SkeletonIssuePublishedText,
    SkeletonTitle: styles.SkeletonTitle,
  };
};

const TeaserMagazineIssue = magazineIssueFactory({
  articleBoxFallbackText: 'Würden Sie gerne mehr solche Artikel lesen?',
  isOuterCTAWrapperShown: true,
  CTAButton: getLinkButtonByProps,
  styles: getStyleByProps,
});

export default withNavigate(TeaserMagazineIssue);
