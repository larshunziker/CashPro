/* istanbul ignore file */
import classNames from 'classnames';
import multiFieldFactory from '../../../../../../../../../common/components/Paragraphs/components/WebformParagraph/components/MultiField/factory';
import Icon from '../../../../../Icon';
import commonStyles from '../../shared/styles.legacy.css';
import styles from './styles.legacy.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.LabelShakingEffectAnimation];

const MultiField = multiFieldFactory({
  Icon,
  IconTypes: {
    errorIconType: 'IconCircleExclamation',
    checkmarkIconType: 'IconCheck',
  },
  styles: {
    Wrapper: styles.Wrapper,
    FieldWithHelperTextWrapper: styles.FieldWithHelperTextWrapper,
    OptionWrapper: styles.OptionWrapper,
    Row: styles.Row,
    OptionsColumns: styles.OptionsColumns,
    ActiveCheckbox: styles.ActiveCheckbox,
    LabelsColumns: styles.LabelsColumns,
    Description: styles.Description,
    HasError: styles.HasError,
    Required: styles.Required,
    ErrorIcon: styles.ErrorIcon,
    CheckmarkIcon: styles.CheckmarkIcon,
  },
  commonStyles: {
    Option: commonStyles.Option,
    Labels: commonStyles.Labels,
    Required: commonStyles.Required,
    Description: commonStyles.Description,
    HasError: commonStyles.HasError,
    ErrorMessage: commonStyles.ErrorMessage,
    HelperText: commonStyles.HelperText,
    Disabled: classNames(commonStyles.Disabled, styles.Disabled),
  },
});

export default MultiField;
