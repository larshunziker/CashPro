/* istanbul ignore file */

import { compose } from 'redux';
import authorsFactory from '../../../../../common/screens/Authors/factory';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import TeaserAuthor from '../../components/Teaser/components/TeaserAuthor';
import StatusPage from '../StatusPage';
import { ROOT_SCHEMA_TYPE_ORGANIZATION } from '../../../../../shared/constants/structuredData';
import styles from './styles.legacy.css';

const AuthorsScreen = authorsFactory({
  styles: {
    AuthorsPage: styles.AuthorsPage,
    HeaderWrapper: styles.HeaderWrapper,
    ShortTitle: styles.ShortTitle,
    Title: styles.Title,
    Lead: styles.Lead,
    AuthorsWrapper: styles.AuthorsWrapper,
    Divider: styles.Divider,
  },
  Breadcrumbs,
  StatusPage,
  TeaserAuthor,
});

export default compose<any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    rootSchemaType: ROOT_SCHEMA_TYPE_ORGANIZATION,
  }),
)(AuthorsScreen);
