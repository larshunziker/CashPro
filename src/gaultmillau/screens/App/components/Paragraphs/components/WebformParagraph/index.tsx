import React, { ComponentType } from 'react';
import { FormattedMessage } from 'react-intl';
import { useMutation } from '@apollo/client';
import webformFactory from '../../../../../../../common/components/Paragraphs/components/WebformParagraph/factory';
import Link from '../../../../../../../common/components/Link';
import Error from '../../../Error';
import Icon from '../../../Icon';
import LoadingSpinner from '../../../LoadingSpinner';
import LoginForm from '../../../LoginForm';
import BirthdayField from '../../../Paragraphs/components/WebformParagraph/components/BirthdayField';
import InputField from '../../../Paragraphs/components/WebformParagraph/components/InputField';
import MultiField from '../../../Paragraphs/components/WebformParagraph/components/MultiField';
import SelectField from '../../../Paragraphs/components/WebformParagraph/components/SelectField';
import SubmitButton from '../../../Paragraphs/components/WebformParagraph/components/SubmitButton';
import AddressFieldsWrapper from './components/AddressFieldsWrapper';
import FileField from './components/FileField';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './mutations'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/A */
import { SAVE_WEBFORM } from './mutations';
import { GOOGLE_RECAPTCHA_KEY } from '../../../../constants';
import styles from './styles.legacy.css';
import { WebformProps } from '../../../../../../../common/components/Paragraphs/components/WebformParagraph/typings';

const getIsUserLoggedIn = (): boolean => {
  return Auth0.isAuthenticated();
};

const WebformComponent = webformFactory({
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
    errorIconType: 'IconTriangleExclamation',
    successIconType: 'IconCircleCheckSolid',
  },
  errorCallToAction: (
    <Link
      className={styles.ArrowButton}
      path="/kontakt"
      label="zum Kontaktformular"
    />
  ),
  defaultSuccessTitle: (
    <FormattedMessage
      id="app.webformParagraph.defaultSuccessTitle"
      description="The default defaultSuccessTitle of the webformParagraph"
      defaultMessage="Herzlichen Dank"
    />
  ),
  defaultErrorMessage: (
    <FormattedMessage
      id="app.webformParagraph.errorMessage"
      description="The default defaultErrorMessage of the webformParagraph"
      defaultMessage="Entschuldigen Sie bitte. Aus technischen Gründen, konnte das Formular nicht versendet werden. Versuchen Sie es später nochmal oder nehmen Sie mit uns Kontakt auf."
    />
  ),
  defaultSuccessMessage: (
    <FormattedMessage
      id="app.webformParagraph.successMessage"
      description="The default defaultSuccessMessage of the webformParagraph"
      defaultMessage="Das Formular wurde erfolgreich versendet."
    />
  ),
  restrictionFormLoginMessage: (
    <FormattedMessage
      id="app.webformParagraph.restrictionFormLoginMessage"
      description="The default restrictionFormLoginMessage of the webformParagraph"
      defaultMessage="Bitte melden Sie sich an, um dieses Formular auszufüllen."
    />
  ),
  restrictionFormSetUsernameMessage: (
    <FormattedMessage
      id="app.webformParagraph.restrictionFormSetUsernameMessage"
      description="The default restrictionFormSetUsernameMessage of the webformParagraph"
      defaultMessage="Um dieses Formular ausfüllen zu können, müssen Sie einen Benutzernamen hinterlegen."
    />
  ),
  appCaptchaMessage: (
    <FormattedMessage
      id="app.webformParagraph.appCaptchaMessage"
      description="The default appCaptchaMessage of the webformParagraph"
      defaultMessage="Bitte bestätigen Sie zuerst das Captcha."
    />
  ),
  appErrorPanelHeaderMesssage: (
    <FormattedMessage
      id="app.webformParagraph.appErrorPanelHeaderMesssage"
      description="The default appErrorPanelHeaderMesssage of the webformParagraph"
      defaultMessage="Bitte versuchen Sie es nochmals"
    />
  ),
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
