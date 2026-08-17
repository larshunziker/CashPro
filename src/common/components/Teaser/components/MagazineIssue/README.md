# Teaser Magazine Issue Factory

The Teaser Magazine Issue renders an Issue Teaser.

## Usage

Teaser Magazine Issue factory call inside of the **APP**:

```jsx
import React, { ReactElement } from 'react';
import classNames from 'classnames';
import magazineIssueFactory from '../../../../../../../common/components/Teaser/components/MagazineIssue/factory';
import Link from '../../../../../../../common/components/LinkLegacy';
import { TRACKING_CLASS_PRINT_TEASER } from '../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import {
  TeaserMagazineIssueFactoryOptionsStyles,
  TeaserMagazineIssueProps,
} from '../../../../../../../common/components/Teaser/components/MagazineIssue/typings';

const getLinkButtonByProps = ({ link, children }): ReactElement => (
  <Link
    className={classNames(styles.Button, TRACKING_CLASS_PRINT_TEASER)}
    link={link}
  >
    {children}
  </Link>
);

const getStyleByProps = (
  props: TeaserMagazineIssueProps,
): TeaserMagazineIssueFactoryOptionsStyles => {
  const isSpecialOffer = props.issue?.magazine?.isSpecialOffer || false;

  return {
    Wrapper: styles.Wrapper,
    ImageContentWrapper: styles.ImageContentWrapper,
    ImageWrapper: styles.ImageWrapper
    Image: styles.Image,
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
  CTAButton: getLinkButtonByProps,
  styles: getStyleByProps,
});

export default TeaserMagazineIssue;
```

Teaser Magazine Issue Component usage:

```html
<TeaserMagazineIssue issue="{issue}" isLoading="{loading}" />
```
