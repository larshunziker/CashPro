import React, { ComponentType } from 'react';
import { useMutation } from '@apollo/client';
import webformFactory from '../../../../../../../common/components/Paragraphs/components/WebformParagraph/factory';
import Link from '../../../../../../../common/components/Link';
import ArrowButton from '../../../ArrowButton';
import Error from '../../../Error';
import Icon from '../../../Icon';
import LoadingSpinner from '../../../LoadingSpinner';
import LoginForm from '../../../LoginForm';
import BirthdayField from '../../../Paragraphs/components/WebformParagraph/components/BirthdayField';
import InputField from '../../../Paragraphs/components/WebformParagraph/components/InputField';
import MultiField from '../../../Paragraphs/components/WebformParagraph/components/MultiField';
import SelectField from '../../../Paragraphs/components/WebformParagraph/components/SelectField';
import SubmitButton from '../../../Paragraphs/components/WebformParagraph/components/SubmitButton';
import UserProfileData from '../../../Paragraphs/components/WebformParagraph/components/UserProfileData';
import AddressFieldsWrapper from './components/AddressFieldWrapper';
import FileField from './components/FileField';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './mutations'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustriert */
import { SAVE_WEBFORM } from './mutations';
import { GOOGLE_RECAPTCHA_KEY } from '../../../../constants';
import styles from './styles.legacy.css';
import { WebformProps } from '../../../../../../../common/components/Paragraphs/components/WebformParagraph/typings';

const getIsUserLoggedIn: Function = (): boolean => {
  return Auth0.isAuthenticated();
};

const WebformComponent = webformFactory({
  UserProfileData,
  SubmitButton,
  ErrorMessage: Error,
  Icon,
  InputField,
  BirthdayField,
  MultiField,
  SelectField,
  FileField,
  AddressFieldsWrapper,
  IconTypes: {
    errorIconType: 'IconWarning',
    successIconType: 'IconCircleCheckSolid',
  },
  errorCallToAction: (
    <ArrowButton large addClass={styles.ArrowButtonWrapper}>
      <Link
        className={styles.ArrowButton}
        path="/kontakt"
        label="zum Kontaktformular"
      />
    </ArrowButton>
  ),
  defaultErrorMessage: `Entschuldigen Sie bitte. Aus technischen Gründen, konnte das Formular nicht versendet werden. Versuchen Sie es später nochmal oder nehmen Sie mit uns Kontakt auf.`,
  defaultSuccessMessage: 'Das Formular wurde erfolgreich versendet.',
  restrictionFormLoginMessage:
    'Bitte melde Dich an, um dieses Formular auszufüllen.',
  restrictionFormSetUsernameMessage:
    'Um dieses Formular ausfüllen zu können, musst du einen Benutzernamen hinterlegen.',
  RestrictionForm: LoginForm,
  reCaptchaKey: GOOGLE_RECAPTCHA_KEY,
  LoadingSpinner,
  getIsUserLoggedIn,
  withErrorIcon: true,
  styles: {
    SubTitle: '',
    ToggleFormAppear: '',
    ToggleFormAppearActive: '',
    ToggleFormLeave: '',
    ToggleFormLeaveActive: '',
    Description: styles.Description,
    Required: '',
    ButtonWrapper: styles.ButtonWrapper,
    Loading: '',
    ToggleErrorAppear: '',
    ToggleErrorAppearActive: '',
    ToggleErrorLeave: '',
    ToggleErrorLeaveActive: '',
    ErrorIcon: styles.ErrorIcon,
    ErrorPanelWrapper: styles.ErrorPanelWrapper,
    ErrorPanelHeader: styles.ErrorPanelHeader,
    ErrorPanelContent: styles.ErrorPanelContent,
    SuccessIcon: styles.SuccessIcon,
    SuccessWrapper: styles.SuccessWrapper,
    SuccessContent: styles.SuccessContent,
    SuccessTitle: styles.SuccessTitle,
    SuccessMessage: styles.SuccessMessage,
    RestrictionFormWrapper: styles.RestrictionFormWrapper,
    ClosedContainer: styles.ClosedContainer,
    ClosedMessage: styles.ClosedMessage,
    ClosedIcon: styles.ClosedIcon,
    RichTextWrapper: styles.RichTextWrapper,
  },
});

const WebformParagraph: ComponentType<Omit<WebformProps, 'mutate'>> = (
  props,
) => {
  const [saveWebform] = useMutation(SAVE_WEBFORM);

  return <WebformComponent {...props} mutate={saveWebform} />;
};

export default WebformParagraph;
