import { ContentTypeUnion } from '../../../../../shared/@types/gql';

export type HotTenProps = Partial<RouterProps> & {
  data: ApolloData & {
    routeByPath: {
      object: Partial<ContentTypeUnion & { subtypeValue: string }>;
    };
  };
};
