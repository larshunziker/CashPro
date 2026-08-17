/* istanbul ignore file */

import bookmarksProfileFactory from '../../../../../common/screens/Account/components/BookmarksProfile/factory';
import parseTrackingData from '../../../../../shared/helpers/parseTrackingData';
import withAppNexus from '../../../../shared/decorators/withAppNexus';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import BookmarkList from '../../components/BookmarkList';
import Helmet from '../../components/Helmet';
import LoadingSpinner from '../../components/LoadingSpinner';
import LoginForm from './components/LoginForm';
import NoBookmarks from './components/NoBookmarks';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const BookmarksProfile = bookmarksProfileFactory({
  Helmet,
  styles: {
    BookmarksProfileWrapper: styles.BookmarksProfileWrapper,
    LoginWrapper: styles.LoginWrapper,
    Title: styles.Title,
  },
  grid: {
    ...grid,
    Container: '',
  },
  LoginForm,
  NoBookmarks,
  LoadingSpinner,
  BookmarkList,
  setLoading,
  setScreenReady,
});

export default withAppNexus({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  parseTrackingData: (props) =>
    parseTrackingData({
      ...props,
      articleType: 'LandingPage',
    }),
})(BookmarksProfile);
