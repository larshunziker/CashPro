import { IconComponent } from '../../../../../common/components/Icon/typings';

export type ArticleAttachmentProps = {
  attachment?: AttachmentProps;
  attachmentBoxTitle?: string;
};

export type AttachmentProps = {
  mimeType?: string;
  filename?: string;
  source?: string;
};

export type ArticleAttachmentFactoryStyles = {
  Wrapper?: string;
  AttachmentHeading?: string;
  AttachmentElement?: string;
  AttachmentIcon?: string;
  AttachmentText?: string;
};

export type ArticleFactoryOptions = {
  attachment?: string;
  attachmentBoxTitle?: string;
  styles: ArticleAttachmentFactoryStyles;
  Icon: IconComponent;
};
