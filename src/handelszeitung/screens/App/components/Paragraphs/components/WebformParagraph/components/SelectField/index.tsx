/**
 * @file   SelectField
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2018-11-22 16:27:55
 */

/* istanbul ignore file */

import classNames from 'classnames';
import selectFieldFactory from '../../../../../../../../../common/components/Paragraphs/components/WebformParagraph/components/SelectField/factory';
import Icon from '../../../../../Icon';
import commonStyles from '../../shared/styles.legacy.css';
import styles from './styles.legacy.css';

export default selectFieldFactory({
  Icon,
  IconTypes: {
    arrowUpIconType: 'IconChevronUp',
    arrowDownIconType: 'IconChevronDown',
    errorIconType: 'IconCircleExclamation',
    magnifyingGlassIcon: 'IconMagnifyingGlass',
  },
  styles: {
    SelectFieldDesktopWrapper: styles.SelectFieldDesktopWrapper,
    OptionItem: styles.OptionItem,
    SelectField: styles.SelectField,
    SelectFieldIcon: styles.SelectFieldIcon,
    SelectFieldMobile: styles.SelectFieldMobile,
    OptionItemsWrapper: styles.OptionItemsWrapper,
    MobileIcon: styles.MobileIcon,
    HasError: styles.HasError,
    Label: styles.Label,
    LabelAbove: styles.LabelAbove,
    SelectedValue: styles.SelectedValue,
    MobileLabel: styles.MobileLabel,
    MobileLabelAbove: styles.MobileLabelAbove,
    ErrorIcon: styles.ErrorIcon,
    OptionsFilter: styles.OptionsFilter,
    OptionsFilterIcon: styles.OptionsFilterIcon,
    OptionsEmpty: styles.OptionsEmpty,
  },
  commonStyles: {
    Wrapper: commonStyles.Wrapper,
    FieldWithHelperTextWrapper: commonStyles.FieldWithHelperTextWrapper,
    HasError: commonStyles.HasError,
    ErrorMessage: classNames(commonStyles.ErrorMessage, styles.ErrorMessage),
    HelperText: classNames(commonStyles.HelperText, styles.HelperText),
    Disabled: classNames(commonStyles.Disabled, styles.Disabled),
  },
});
