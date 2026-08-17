import { ComponentType, SyntheticEvent } from 'react';
import { IconComponent } from 'src/common/components/Icon/typings';

export type CommentReplyLinkProps = {
  isFormVisible: boolean;
  name: string;
  onReplyButtonClick: (event: SyntheticEvent) => void;
};

export type CommentReplyLinkFactoryOptions = {
  Icon: IconComponent;
  styles: CommentReplyLinkFactoryOptionsStyles;
};

export type CommentReplyLinkFactoryOptionsStyles = {
  Icon: string;
  IconChevronUp: string;
  IconChevronUpActive: string;
  Reply: string;
};

export type CommentReplyLinkComponent = ComponentType<CommentReplyLinkProps>;
