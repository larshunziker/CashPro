import { AppNexusFactoryProps } from '../../../../../../../common/components/AppNexus/typings';
import { ParagraphProps } from '../../typings';

export type ParagraphsRendererProps = ParagraphProps &
  Pick<AppNexusFactoryProps, 'isAdSuppressed'> & {
    addClass?: string;
    style?: string;
    contentGcid?: string;
    articleKeywords?: KeywordConnection;
    articleTitle?: string;
    paragraphsForFree?: number | null;
    hasTwoColumns?: boolean;
  };
