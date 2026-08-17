export type TeaserChannelFactoryOptionsStyles = {
  Wrapper: string;
  Image?: string;
  ShortTitle: string;
  Title?: string;
};

export type TeaserChannelFactoryOptions = {
  styles: TeaserChannelFactoryOptionsStyles;
  imageIdentifier: string;
  teaserImageStyles?: ImageStylesObject;
  disableWrapperClassName?: boolean;
  downloadPriority?: 'high' | 'default';
};

export type TeaserChannelProps = Channel;
