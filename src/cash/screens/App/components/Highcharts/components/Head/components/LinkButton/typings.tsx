import { ReactNode } from 'react';
import {
  ButtonSize,
  ButtonVariant,
} from '../../../../../../../../../common/components/ButtonWithLoading/typings';

export type LinkButtonProps = {
  label: string;
  size: ButtonSize;
  variant: ButtonVariant;
  highAttention?: boolean;
  children?: ReactNode;
  url: string;
  internal?: boolean;
};
