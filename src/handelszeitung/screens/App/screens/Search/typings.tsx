import { WithRaschRouter } from '../../../../../shared/@types/gql';

export type SearchProps = Pick<WithRaschRouter, 'data'> &
  Pick<RouterProps, 'page'>;
