import { AlertList } from '../../../../../../../common/components/AlertList/typings';
import { TeaserProps } from '../../../../components/Teaser/typings';

export type ArticlePageLegalAdviceProps = Pick<RouterProps, 'location'> & {
  article: Article &
    TeaserProps & {
      subtypeValue?: string;
      keywords: {
        edges: AlertList;
      };
    };
  resetHeaderData: () => void;
  setHeaderData: (props: HeaderState) => void;
  isCrawler: boolean;
  shouldHideContent: boolean;
  viewportLabel?: string;
  noHeader?: boolean;
  pageLayoutType?: string;
};
