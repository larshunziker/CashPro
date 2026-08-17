import React, { ComponentType, ReactElement, memo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import magazineIssueFactory from '../../../../../../../common/components/Teaser/components/MagazineIssue/factory';
import { getArrowThemeByChannel } from '../../shared/helpers';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../../../common/components/Link';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import ArrowButton from '../../../ArrowButton';
import { TRACKING_CLASS_PRINT_TEASER } from '../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import {
  TeaserMagazineIssueFactoryOptionsStyles,
  TeaserMagazineIssueProps,
} from '../../../../../../../common/components/Teaser/components/MagazineIssue/typings';
import { ActiveMainChannel } from '../../../../../../shared/types';

type TeaserMagazineIssuePropsInner = TeaserMagazineIssueProps & {
  activeMainChannel: ActiveMainChannel;
};

export const getLinkButtonByProps = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'link' implicitly has an 'any' type. */
  link,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  children,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'props' implicitly has an 'any' type. */
  props,
}): ReactElement => {
  const theme = getArrowThemeByChannel(props?.activeMainChannel) || '';

  return (
    <TestFragment data-testid="TeaserMagazineIssue-LinkButton-Wrapper">
      <Link {...link} className={TRACKING_CLASS_PRINT_TEASER}>
        <ArrowButton theme={theme} large>
          {children}
        </ArrowButton>
      </Link>
    </TestFragment>
  );
};

export const getStyleByProps = (
  props: TeaserMagazineIssuePropsInner,
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
    SkeletonButton: styles.SkeletonButton,
    SkeletonIssuePublished: styles.SkeletonIssuePublishedText,
    SkeletonTitle: styles.SkeletonTitle,
  };
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state)
    .activeMainChannel as ActiveMainChannel,
});

const TeaserMagazineIssue = magazineIssueFactory({
  articleBoxFallbackText: 'Würdest du gerne mehr solche Artikel lesen?',
  CTAButton: getLinkButtonByProps,
  styles: getStyleByProps,
}) as ComponentType<TeaserMagazineIssuePropsInner>;

export default connect(mapStateToProps)(memo(TeaserMagazineIssue));
