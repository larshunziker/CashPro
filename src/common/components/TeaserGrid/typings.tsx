import { ComponentType, ReactElement } from 'react';
import { GlobalTeaserLayout } from './gridConfigs';
import { ContentBoxProps } from '../ContentBox/typings';

export type EnrichedGridConfig = Partial<GridConfigItem> & {
  type: string;
  items?: GridConfigItem[] | null;
  adConfig?: AdConfig[];
};

type AdConfig = {
  slot?: string;
  isMultiPlacement?: boolean;
  deviceType?: 'mobile' | 'tabletDesktop';
};

export type GridConfigItem = {
  downloadPriority?: 'high' | 'default';
  type: string;
  teaserType: string;
  data: TeasableInterfaceGraphListItem &
    TypeUnion &
    PianoTemplateParagraph &
    EmbedParagraph &
    InputFormParagraph & {
      items?: TeaserableInterfaceEdge | ContentBox;
      subtypeValue?: string;
      contentSourceValue: string;
      contentReference: ContentBox;
    };
};

export type TeaserGridProps<Layout = ''> = {
  items: TeaserInterface[] | TeasableInterfaceGraphList[];
  layout: Layout | GlobalTeaserLayout;
  origin?: string;
  isNumbered?: boolean;
  isSplittedPageLayout?: boolean;
};

export type TeaserGridFactory<Props = {}, Layout = {}> = (
  options: TeaserGridFactoryOptions<Layout>,
) => TeaserGridComponent<Props>;

export type TeaserGridComponent<Layout = {}> = ComponentType<
  TeaserGridProps<keyof Layout>
>;

type GridConfigLayout<T> = GlobalTeaserLayout | keyof T;
type GridConfig<T> = Record<
  GridConfigLayout<T>,
  { config: Record<string, any>; styles: Record<string, string> }
>;

export type TeaserGridFactoryOptions<Layout = ''> = {
  Teaser: ComponentType<
    TeaserInterface & {
      component: string;
      node?: TeaserInterface;
      origin?: string;
      itemIndex?: number;
      isNumbered?: boolean;
    }
  >;
  ContentBox?: ComponentType<ContentBoxProps>;
  ErrorMessage: ComponentType<{ msg: string }>;
  getGridItem: (item: EnrichedGridConfig, origin: string) => ReactElement;
  cssGridConfig: GridConfig<Layout>;
  appValidDataTypes?: string[];
};

export type GridItemProps<Layout = {}> = {
  item: EnrichedGridConfig;
  layout: keyof Layout | GlobalTeaserLayout;
  index: number;
  origin?: string;
  isNumbered?: boolean;
};
