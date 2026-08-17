import { WithRaschRouter } from '../../../../../shared/@types/gql';

export type TradingIdeasProps = Pick<
  WithRaschRouter,
  'data' | 'loading' | 'location'
> & {
  error: any;
};
