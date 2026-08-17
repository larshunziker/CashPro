import { WithRaschRouter } from '../../../../../shared/@types/gql';

export type RasRouterProps = Partial<RouterProps> &
  Pick<WithRaschRouter, 'data' | 'loading' | 'error'> & {
    isHybridApp: boolean;
  };
