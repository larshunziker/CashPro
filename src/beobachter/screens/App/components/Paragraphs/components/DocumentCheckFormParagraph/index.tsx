import documentCheckFormParagraphFactory from './factory/DocumentCheckFormParagraph/factory';
import { displayErrorToast } from '../../../Toast';
import InputField from '../WebformParagraph/components/InputField';
import Button from '../../../ButtonWithLoading';
import FileField from '../WebformParagraph/components/FileField';
import LoginForm from '../../../LoginForm';
import { DEFAULT_PUBLICATION } from '../../../../constants';
import styles from './styles.legacy.css';

const DocumentCheckFormParagraph = documentCheckFormParagraphFactory({
  /* @ts-ignore TODO: TS2322 ->  Type '(message? */
  displayErrorToast,
  publication: DEFAULT_PUBLICATION,
  styles: {
    SubHeadline: styles.SubHeadline,
    Info: styles.Info,
    ButtonWrapper: styles.ButtonWrapper,
    InputWrapper: styles.InputWrapper,
    Step: styles.Step,
    ErrorLabel: styles.ErrorLabel,
    Disabled: styles.Disabled,
  },
  InputField,
  /* @ts-ignore TODO: TS2322 ->  Type 'NamedExoticComponent<ButtonProps>' is not assignable to type 'ButtonComponent'. */
  Button,
  FileField,
  LoginForm: LoginForm,
});

export default DocumentCheckFormParagraph;
