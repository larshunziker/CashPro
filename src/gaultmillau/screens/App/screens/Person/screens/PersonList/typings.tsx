import { WithRaschRouter } from '../../../../../../../shared/@types/gql';

export type PersonListProps = {
  data: Pick<WithRaschRouter, 'data'> & {
    environment: {
      personByChar: PersonConnection;
    };
  };
  language: string;
  char: string;
  loading: boolean;
};
