import { AppNexusFactoryProps } from '../../../../../../../common/components/AppNexus/typings';
import { ParagraphsProps } from '../../typings';

export type ParagraphsRendererProps = ParagraphsProps &
  Pick<AppNexusFactoryProps, 'isAdSuppressed'> & {
    activeChannel?: string;
    style?: string;
    contentGcid?: string;
    articleKeywords?: KeywordConnection;
    paragraphsForFree?: number | null;
    showMobileAdOnSecondPosition?: boolean;
    landingPagePullOut?: boolean; // to toggle grid pullout on cash landing pages
    hasTwoColumns?: boolean;
    isMarketingPageReducedHeader?: boolean;
  };
