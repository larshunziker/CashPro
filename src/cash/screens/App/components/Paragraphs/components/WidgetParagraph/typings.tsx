import { EsiRendererProps } from '../../../../../../../common/components/EsiRenderer/typings';

export type WidgetParagraphProps = Maybe<
  Pick<EsiRendererProps, 'clientOnly'>
> & {
  origin?: string;
  widgetParagraph: WidgetParagraphType;
};

export type WidgetParagraphType = WidgetParagraph &
  Maybe<Pick<EsiRendererProps, 'clientOnly'>> &
  Maybe<Pick<Widget, 'sponsor' | 'preferredUri'>>;
