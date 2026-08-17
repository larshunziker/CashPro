import { ContentTypeUnion } from '../../../../../shared/@types/gql';
import { RasRouterProps } from '../../components/Router/typings';

export type QuoteListPageProps = RasRouterProps & {
  data: ApolloData & {
    environment?: Partial<Environment> & {
      quoteListSubPage?: Partial<Route> & {
        object: Partial<ContentTypeUnion & { subtypeValue: string }>;
      };
    };
  };
  widgetParams: string;
};
