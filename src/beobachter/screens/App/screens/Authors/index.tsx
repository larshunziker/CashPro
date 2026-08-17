import { compose } from 'recompose';
import classNames from 'classnames';
import { WithHelmetProps } from '../../../../../shared/decorators/@types/withHelmetFactory';
import withHelmet from '../../../../shared/decorators/withHelmet';
import TeaserAuthor from '../../components/Teaser/components/TeaserAuthor';
import StatusPage from '../StatusPage';
import authorsFactory from '../../../../../common/screens/Authors/factory';
import Breadcrumbs from '../../components/Breadcrumbs';
import { ROOT_SCHEMA_TYPE_ORGANIZATION } from '../../../../../shared/constants/structuredData';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { AuthorsPageProps } from './typings';

type AuthorsPagePropsInner = AuthorsPageProps &
  WithHelmetProps & {
    data: ApolloData & {
      environment: QueryRoot & {
        routeByPath: Route;
        authors: AuthorConnection;
      };
    };
  };

export function authorsBreadcrumbsData(data: any): any {
  data.breadcrumbsData = { label: 'Unsere Redaktion' };
}

const AuthorsPage = authorsFactory({
  styles: {
    AuthorsPage: '',
    HeaderWrapper: styles.HeaderWrapper,
    ShortTitle: styles.ShortTitle,
    Title: styles.Title,
    Lead: styles.Lead,
    AuthorsWrapper: styles.AuthorsWrapper,
    AuthorWrapper: classNames(grid.ColXs24, grid.ColMd16, grid.ColXl16),
    Divider: styles.Divider,
  },
  Breadcrumbs,
  StatusPage,
  TeaserAuthor,
});

export default compose<AuthorsPageProps, AuthorsPageProps>(
  withHelmet({
    getNode: (mapProps: AuthorsPagePropsInner) =>
      mapProps.data?.environment?.routeByPath?.object || null,
    rootSchemaType: ROOT_SCHEMA_TYPE_ORGANIZATION,
  }),
  // @ts-ignore
)(AuthorsPage);
