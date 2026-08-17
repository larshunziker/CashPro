import { WIDGET_JOB_SEARCH } from './constants';
import { WidgetParagraphProps } from '../Paragraphs/components/WidgetParagraph/typings';

export type WidgetsProps = Partial<WidgetParagraphProps> & {
  component: typeof WIDGET_JOB_SEARCH;
};
