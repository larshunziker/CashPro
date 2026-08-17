import { ParagraphsProps } from '../../typings';
import { AppNexusFactoryProps } from '../../../../../../../common/components/AppNexus/typings';
export type ParagraphsRendererProps = ParagraphsProps &
  Pick<AppNexusFactoryProps, 'isAdSuppressed'> & {
    addClass?: string;
    addHeaderClass?: string;
    style?: string;
    contentGcid?: string;
    articleKeywords?: KeywordConnection;
    articleTitle?: string;
    paragraphsForFree?: number | null;
    hasTwoColumns?: boolean;
    isMarketingPageReducedHeader?: boolean;
    pageLayoutType?: string;
  };
