import { WithRaschRouter } from '../../../../../shared/@types/gql';

export type HoroscopeDetailProps = RouterProps &
  Pick<WithRaschRouter, 'loading'>;
