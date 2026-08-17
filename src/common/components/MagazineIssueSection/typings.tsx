import { ComponentType } from 'react';
import { DocumentNode } from 'graphql';
import { TeaserMagazineIssueComponent } from '../Teaser/components/MagazineIssue/typings';

export type MagazineIssueSectionProps = {
  issueId: string;
};

export type MagazineIssueSectionFactoryOptionsStyles = {
  Wrapper: string;
  Row: string;
  Content: string;
};

export type MagazineIssueSectionFactoryOptionsStylesByProps<T> = (
  props: T,
) => MagazineIssueSectionFactoryOptionsStyles;

// eslint-disable-next-line
export type MagazineIssueSectionFactoryOptions<T> = {
  TeaserMagazineIssue: TeaserMagazineIssueComponent;
  GET_ISSUE: DocumentNode;
  publication: string;
  styles: MagazineIssueSectionFactoryOptionsStyles;
};

export type MagazineIssueSectionComponent =
  ComponentType<MagazineIssueSectionProps>;
