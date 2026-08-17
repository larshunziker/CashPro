/* istanbul ignore file */

import classNames from 'classnames';
import inputFieldFactory from '../../../../../../../../../common/components/Paragraphs/components/WebformParagraph/components/InputField/factory';
import Icon from '../../../../../Icon';
import commonStyles from '../../../../components/WebformParagraph/shared/styles.legacy.css';
import styles from './styles.legacy.css';

const InputField = inputFieldFactory({
  TextareaDefaultMinRows: 3,
  Icon,
  IconTypes: {
    errorIconType: 'IconCircleExclamation',
    checkmarkIconType: 'IconTickmark',
  },
  styles: {
    HasError: styles.HasError,
    Label: styles.Label,
    LabelAbove: styles.LabelAbove,
    LabelInside: styles.LabelInside,
    TextareaLabel: styles.TextareaLabel,
    Row: styles.Row,
    LabelsColumns: styles.LabelsColumns,
    ActiveCheckbox: styles.ActiveCheckbox,
    InputDateWrapper: styles.InputDateWrapper,
    InputDateTransparentText: styles.InputDateTransparentText,
    CheckmarkIcon: styles.CheckmarkIcon,
  },
  commonStyles: {
    Wrapper: commonStyles.Wrapper,
    FieldWithHelperTextWrapper: commonStyles.FieldWithHelperTextWrapper,
    HasError: commonStyles.HasError,
    Textarea: commonStyles.Textarea,
    OptionWrapper: commonStyles.OptionWrapper,
    Option: commonStyles.Option,
    Input: commonStyles.Input,
    Labels: commonStyles.Labels,
    Required: commonStyles.Required,
    Description: commonStyles.Description,
    ErrorMessage: classNames(commonStyles.ErrorMessage, styles.ErrorMessage),
    ErrorIcon: commonStyles.ErrorIcon,
    HelperText: classNames(commonStyles.HelperText, styles.HelperText),
    ReplacedHelperText: commonStyles.ReplacedHelperText,
    HelperCheckboxText: styles.HelperCheckboxText,
    Disabled: commonStyles.Disabled,
  },
});

export default InputField;
