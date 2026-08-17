import { ContentTypeUnion } from '../../../../../shared/@types/gql';

export type BlogBProps = Partial<RouterProps> & {
  language: string;
  data: ApolloData & {
    routeByPath: {
      object: Partial<ContentTypeUnion & { subtypeValue: string }>;
    };
  };
};
