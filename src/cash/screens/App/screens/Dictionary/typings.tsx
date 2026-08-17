import { WithRaschRouter } from '../../../../../shared/@types/gql';

export type DictionaryProps = Pick<WithRaschRouter, 'data' | 'loading'> & {
  error: any;
  char?: string;
  category?: string;
};
