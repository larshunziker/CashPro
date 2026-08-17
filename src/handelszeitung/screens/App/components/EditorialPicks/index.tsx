/* istanbul ignore file */

import editorialPicksFactory from '../../../../../common/components/EditorialPicks/factory';
import ContentBox from '../ContentBox';
import Skeleton from './components/Skeleton';
import { apolloConfig } from './apolloConfig';
import styles from './styles.legacy.css';

const EditorialPicks = editorialPicksFactory({
  styles: {
    Wrapper: styles.Wrapper,
    Title: styles.Title,
  },
  ContentBox,
  apolloConfig,
  Skeleton,
});

export default EditorialPicks;
