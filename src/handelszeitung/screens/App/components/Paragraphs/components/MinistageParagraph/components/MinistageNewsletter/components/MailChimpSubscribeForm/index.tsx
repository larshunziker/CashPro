/* istanbul ignore file */

import classNames from 'classnames';
import mailchimpSubscribeFormFactory from '../../../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/components/MailchimpSubscribeForm/factory';
import { getStyleByType } from '../shared/helpers';
import Button from '../../../../../../../ButtonWithLoading';
import InputField from '../../../../../../../InputField';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './mutations'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screen */
import { MAILCHIMP_LIST_REQUEST } from './mutations';
import grid from '../../../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  MailchimpSubscribeFormFactoryOptionsStyles,
  MailchimpSubscribeFormProps,
} from '../../../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/components/MailchimpSubscribeForm/typings';

const getStyleByProps = ({
  ministageNewsletter,
}: MailchimpSubscribeFormProps): MailchimpSubscribeFormFactoryOptionsStyles => {
  const style = getStyleByType(ministageNewsletter);

  return {
    Form: styles.Form,
    Row: grid.Row,
    InputWrapper: classNames(
      styles.InputWrapper,
      grid.ColSm16,
      grid.ColMd17,
      grid.ColXl18,
    ),
    EmailWrapper: classNames(styles.EmailWrapper, {
      [styles.IsHandelzeitungNewsletter]: style,
    }),
    SuccessWrapper: classNames(
      styles.SuccessWrapper,
      grid.ColMd17,
      grid.ColXl18,
    ),
    SuccessTick: styles.SuccessTick,
    SuccessSubmission: styles.SuccessSubmission,
    ButtonWrapper: styles.ButtonWrapper,
  };
};

const MailchimpSubscribeForm = mailchimpSubscribeFormFactory({
  /* @ts-ignore TODO: TS2322 ->  Type 'NamedExoticComponent<FormFieldPropsInner>' is not assignable to type '(props */
  InputField,
  /* @ts-ignore TODO: TS2322 ->  Type 'NamedExoticComponent<ButtonProps>' is not assignable to type '(props */
  Button,
  mutationQuery: MAILCHIMP_LIST_REQUEST,
  styles: getStyleByProps,
});

export default MailchimpSubscribeForm;
