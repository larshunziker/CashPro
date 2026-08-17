import { AppNexusFactoryProps } from '../../../../../../../common/components/AppNexus/typings';
import { ParagraphsProps } from '../../typings';

export type ParagraphsRendererProps = ParagraphsProps &
  Pick<AppNexusFactoryProps, 'isAdSuppressed'> & {
    activeChannel?: string;
    style?: string;
    contentGcid?: string;
    articleKeywords?: KeywordConnection;
    publication?: string;
    paragraphsForFree?: number | null;
    showMobileAdOnSecondPosition?: boolean;
    hasTwoColumns?: boolean;
    pageLayoutType?: string;
    isMarketingPageReducedHeader?: boolean;
  };
