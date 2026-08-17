import { ContentTypeUnion } from '../../../../../shared/@types/gql';
import { RasRouterProps } from '../../components/Router/typings';

export type FullquotePageProps = RasRouterProps & {
  data: ApolloData & {
    getFullquotePage?: FullquotePage;
    environment?: Partial<Environment> & {
      routeByPathSubPage?: Partial<Route> & {
        object: Partial<ContentTypeUnion & { subtypeValue: string }>;
      };
    };
  };
  uri: string;
  type: string;
  market: string;
  currency: string;
  valorName: string;
  loading: boolean;
  isHybridApp: boolean;
  pageType:
    | 'fullquoteDefault'
    | 'fullquoteDerivateSimulator'
    | 'fullquoteDerivativeBNP'
    | 'fullquoteAlerts';
  location: any;
};

export type Item = {
  __typename: string;
  clientOnly?: boolean;
  link: {
    __typename: string;
    path: string;
  };
};
