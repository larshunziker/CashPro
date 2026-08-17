import { AlertList } from '../../../../../common/components/AlertList/typings';
import { TeaserProps } from '../../components/Teaser/typings';

export type ArticlePageProps = Pick<RouterProps, 'location'> & {
  article: (Article | NativeAdvertising) &
    TeaserProps & {
      subtypeValue?: string;
      keywords: {
        edges: AlertList;
      };
    };
  locationPathname: string;
  screenReady: boolean;
  resetHeaderData: () => void;
  setHeaderData: (props: HeaderState) => void;
  hasSubscriptions: boolean;
  isCrawler: boolean;
  vertical: string;
  pageLayoutType: string;
  hasLegalAdviceAccess?: boolean;
  legalAdviceSubscriptions?: string[];
  subscriptionsEndDates?: string[];
};
