import { compose } from 'redux';
import topicFactory from '../../../../../common/screens/Topic/factory';
import { ensureTeaserInterface } from '../Teaser/shared/helpers';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import TeaserGrid from '../TeaserGrid';
import Pager, { PAGER_TYPE_PAGE_LOADER } from '../../components/Pager';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './constants.js'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustri */
import { PAGE_SIZE } from './constants.js';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import { GRID_LAYOUT_TEASER_KEYWORD } from '../TeaserGrid/gridConfigs/constants';
import styles from './styles.legacy.css';

const TopicPage = topicFactory({
  gridConfig: GRID_LAYOUT_TEASER_KEYWORD,
  ensureTeaserInterface,
  Breadcrumbs,
  TeaserGrid,
  Pager: Pager,
  pagerType: PAGER_TYPE_PAGE_LOADER,
  styles,
});

export default compose<any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.topic,
    getImage: (mapProps) => mapProps.topic?.heroImageBody?.[0]?.image?.file,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodesCount: (mapProps): number => mapProps.topic?.entities?.count || 0,
    pageSize: PAGE_SIZE,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) => mapProps.topic?.entities?.edges,
  }),
)(TopicPage);
