import { RaschApolloConfig } from '../../../shared/decorators/withRaschRouterFactory';
import { ContentBoxComponent } from '../ContentBox/typings';

export type EditorialPicksProps = {
  contentBoxTitle: string;
  origin?: string;
  publication: string;
  additionalPublications?: Record<string, any>;
  overwriteTitleWithShortTitle?: boolean;
};

export type EditorialPicksFactoryOptionsStyles = Readonly<{
  Wrapper: string;
  Title: string;
}>;

export type EditorialPicksFactoryOptions = {
  styles: EditorialPicksFactoryOptionsStyles;
  ContentBox: ContentBoxComponent;
  apolloConfig: RaschApolloConfig;
  Skeleton: () => JSX.Element;
};
