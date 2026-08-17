import { WithRaschRouter } from '../../../../../shared/@types/gql';

export type PageScreenProps = Pick<WithRaschRouter, 'location'> & {
  pageScreen: Partial<Page> & Partial<NativeAdvertising>;
};
