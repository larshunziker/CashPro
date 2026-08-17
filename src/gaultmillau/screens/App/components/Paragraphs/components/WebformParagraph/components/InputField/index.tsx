/**
 * @file   InputField
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2018-11-22 15:14:49
 */

/* istanbul ignore file */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import inputFieldFactory from '../../../../../../../../../common/components/Paragraphs/components/WebformParagraph/components/InputField/factory';
import Icon from '../../../../../Icon';
import commonStyles from '../../shared/styles.legacy.css';
import styles from './styles.legacy.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.LabelAboveShakingEffectAnimation];

export default inputFieldFactory({
  TextareaDefaultMinRows: 3,
  appErrorMessage: (
    <FormattedMessage
      id="app.webformParagraph.inputField.appErrorMessage"
      description="The default appErrorMessage of the InputField in webformParagraph"
      defaultMessage="Bitte ausfüllen oder korrigieren"
    />
  ),
  minDateErrorMessage: (
    <FormattedMessage
      id="app.webformParagraph.inputField.minDateErrorMessage"
      description="The default minDateErrorMessage of the InputField in webformParagraph"
      defaultMessage="Wählen Sie bitte ein späteres Datum"
    />
  ),
  maxDateErrorMessage: (
    <FormattedMessage
      id="app.webformParagraph.inputField.maxDateErrorMessage"
      description="The default maxDateErrorMessage of the InputField in webformParagraph"
      defaultMessage="Wählen Sie bitte ein früheres Datum"
    />
  ),
  Icon,
  IconTypes: {
    errorIconType: 'IconTriangleExclamation',
    checkmarkIconType: 'IconCheck',
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
