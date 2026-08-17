/* istanbul ignore file */

import classNames from 'classnames';
import birthdayFieldFactory from '../../../../../../../../../common/components/Paragraphs/components/WebformParagraph/components/BirthdayField/factory';
import Icon from '../../../../../Icon';
import commonStyles from '../../shared/styles.legacy.css';
import styles from './styles.legacy.css';

const BirthdayField = birthdayFieldFactory({
  Icon,
  IconTypes: {
    errorIconType: 'IconCircleExclamation',
  },
  styles: {
    HasError: styles.HasError,
    Label: styles.Label,
    LabelAbove: styles.LabelAbove,
    LabelInside: styles.LabelInside,
  },
  commonStyles: {
    Wrapper: commonStyles.Wrapper,
    FieldWithHelperTextWrapper: commonStyles.FieldWithHelperTextWrapper,
    HasError: commonStyles.HasError,
    Input: commonStyles.Input,
    Labels: commonStyles.Labels,
    Required: commonStyles.Required,
    ErrorMessage: classNames(commonStyles.ErrorMessage, styles.ErrorMessage),
    ErrorIcon: commonStyles.ErrorIcon,
    HelperText: classNames(commonStyles.HelperText, styles.HelperText),
    Disabled: commonStyles.Disabled,
  },
});
export default BirthdayField;
