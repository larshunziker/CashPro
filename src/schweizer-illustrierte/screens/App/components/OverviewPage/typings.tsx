import { TeaserLayout } from '../TeaserGrid/gridConfigs';

export type OverviewPageProps = Pick<RouterProps, 'location' | 'page'> & {
  routeObject: Channel;
  gridConfig?: TeaserLayout;
  termSettings?: TermSettings | null;
  pageSize?: number;
  paragraphType?: string;
  paragraphIndex?: number;
};
