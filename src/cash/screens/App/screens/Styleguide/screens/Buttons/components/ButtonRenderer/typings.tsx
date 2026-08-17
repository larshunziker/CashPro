import { ButtonVariant } from '../../../../../../../../../common/components/ButtonWithLoading/typings';

export type Button = {
  buttonType: ButtonVariant;
  buttonVariants: Record<string, any>[];
};

export type ButtonRendererProps = {
  button: Button;
  highAttention: boolean;
};
