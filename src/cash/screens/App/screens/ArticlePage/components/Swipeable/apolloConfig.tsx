/* istanbul ignore file */
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/screen */
import { GET_PREV_NEXT_CHANNEL_ENTITIES } from './queries';

export const apolloConfig = {
  /* @ts-ignore TODO: TS7031 ->  Binding element 'location' implicitly has an 'any' type. */
  options: ({ location }) => {
    const pathname = location.pathname.slice(1, location.pathname.length);
    return {
      query: GET_PREV_NEXT_CHANNEL_ENTITIES,
      variables: {
        path: pathname,
        publication: 'CASH',
        limit: 1,
      },
      ssr: false,
    };
  },
};
