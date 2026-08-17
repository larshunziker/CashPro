import { WithRaschRouter } from '../../../shared/@types/gql';
import { TeaserAuthorFactoryProps } from '../../components/Teaser/components/Author/typings';
import { StatusPageComponent } from '../StatusPage/typings';

export type AuthorsPageProps = WithRaschRouter & {
  component: string;
};

export type AuthorsPageFactoryStyles = {
  AuthorsPage: string;
  HeaderWrapper: string;
  ShortTitle: string;
  Title: string;
  Lead: string;
  AuthorsWrapper: string;
  AuthorWrapper?: string;
  Divider: string;
};

export type AuthorsPageFactoryOptions = {
  styles: AuthorsPageFactoryStyles;
  Breadcrumbs: (props: any) => JSX.Element;
  StatusPage: StatusPageComponent;
  TeaserAuthor: React.ComponentType<TeaserAuthorFactoryProps>;
};
