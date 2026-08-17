import { ReactElement, Ref } from 'react';
import { IconComponent } from '../../../../../Icon/typings';

export type SelectFieldProps = FieldComponentProps & {
  label?: JSX.Element | string;
  hidePlaceholderFromOptions?: string;
  withErrorIcon?: boolean;
  canFilter?: boolean;
  innerRef?: Ref<any>;
  isOpen?: boolean;
  handleChange?: (value: string) => void;
};

export type SelectFieldFactoryOptions = {
  Icon: IconComponent;
  appErrorMessage?: ReactElement | string;
  optionNotFoundMessage?: ReactElement | string;
  IconTypes?: {
    arrowUpIconType: string;
    arrowDownIconType: string;
    errorIconType?: string;
    magnifyingGlassIcon?: string;
  };
  styles: {
    SelectFieldDesktopWrapper?: string;
    SelectField: string;
    SelectFieldMobile: string;
    SelectFieldIcon: string;
    MobileIcon?: string;
    OptionItemsWrapper: string;
    OptionItem: string;
    HasError?: string;
    ErrorIcon?: string;
    ErrorIconMobile?: string;
    Label?: string;
    LabelAbove?: string;
    MobileLabel?: string;
    MobileLabelAbove?: string;
    SelectedValue?: string;
    OptionsFilter?: string;
    OptionsFilterIcon?: string;
    OptionsEmpty?: string;
  };
  commonStyles: {
    Wrapper: string;
    FieldWithHelperTextWrapper: string;
    HasError: string;
    ErrorMessage: string;
    HelperText: string;
    Disabled?: string;
  };
};
