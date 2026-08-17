import { ComponentType, ReactElement } from 'react';

export type TeaserMagazineIssueProps = {
  issue: Issue;
  isLoading: boolean;
};

export type TeaserMagazineIssueFactoryOptionsStyles = {
  Wrapper: string;
  ImageContentWrapper: string;
  ImageWrapper: string;
  Image: string;
  SpecialOfferWrapper: string;
  SpecialOfferText: string;
  ContentWrapper: string;
  IssuePublishedText: string;
  IssueLink: string;
  MagazineText: string;
  CTAWrapper?: string;
  CTAWrapperDesktop?: string;
  SkeletonButton: string;
  SkeletonTitle: string;
  SkeletonIssuePublished: string;
};

export type TeaserMagazineIssueFactoryOptionsStylesByProps<T> = (
  props: T,
) => TeaserMagazineIssueFactoryOptionsStyles;

export type TeaserMagazineIssueFactoryOptions<T> = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  CTAButton: (props) => ReactElement;
  articleBoxFallbackText: string;
  isOuterCTAWrapperShown?: boolean;
  styles:
    | TeaserMagazineIssueFactoryOptionsStyles
    | TeaserMagazineIssueFactoryOptionsStylesByProps<T>;
};

export type TeaserMagazineIssueComponent =
  ComponentType<TeaserMagazineIssueProps>;
