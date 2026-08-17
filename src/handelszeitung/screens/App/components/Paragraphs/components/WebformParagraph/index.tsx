/**
 * @file   Webform component
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @author Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @date   2018-11-26 11:25:09
 */

// sonar-disable

import React, { ComponentType } from 'react';
import { useMutation } from '@apollo/client';
import webformFactory from '../../../../../../../common/components/Paragraphs/components/WebformParagraph/factory';
import Button from '../../../ButtonWithLoading';
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
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './mutations'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screen */
import { SAVE_WEBFORM } from './mutations';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import { GOOGLE_RECAPTCHA_KEY } from '../../../../constants';
import styles from './styles.legacy.css';
import { WebformProps } from '../../../../../../../common/components/Paragraphs/components/WebformParagraph/typings';

const NavigateButton = ({ path = '/', label = 'Zurück zur Startseite' }) => {
  const navigate = useStableNavigate();
  return (
    <Button onClick={() => navigate(path)} clickEffect={false}>
      {label}
    </Button>
  );
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
  successCallToAction: <NavigateButton />,
  errorCallToAction: (
    <NavigateButton path="/kontakt" label="zum Kontaktformular" />
  ),
  RestrictionForm: LoginForm,
  LoadingSpinner,
  defaultErrorMessage: `Entschuldigen Sie bitte. Beim Absenden des Formulars ist ein Fehler aufgetreten - bitte versuchen Sie es später noch einmal oder nehmen Sie mit uns Kontakt auf.`,
  defaultSuccessTitle: 'Die Nachricht wurde erfolgreich versendet!',
  defaultSuccessMessage:
    'Vielen Dank. Wir werden uns schnellstmöglich mit Ihnen in Verbindung setzen.',
  reCaptchaKey: GOOGLE_RECAPTCHA_KEY,
  IconTypes: {
    errorIconType: 'IconCircleInfo',
  },
  withErrorIcon: true,
  styles: {
    SubTitle: styles.SubTitle,
    ToggleFormAppear: styles.ToggleFormAppear,
    ToggleFormAppearActive: styles.ToggleFormAppearActive,
    ToggleFormLeave: styles.ToggleFormLeave,
    ToggleFormLeaveActive: styles.ToggleFormLeaveActive,
    Description: styles.Description,
    Required: styles.Required,
    ButtonWrapper: styles.ButtonWrapper,
    Loading: styles.Loading,
    ToggleErrorAppear: styles.ToggleErrorAppear,
    ToggleErrorAppearActive: styles.ToggleErrorAppearActive,
    ToggleErrorLeave: styles.ToggleErrorLeave,
    ToggleErrorLeaveActive: styles.ToggleErrorLeaveActive,
    ErrorIcon: '',
    ErrorPanelWrapper: styles.ErrorPanelWrapper,
    ErrorPanelHeader: styles.ErrorPanelHeader,
    ErrorPanelContent: '',
    RecaptchaWrapper: styles.RecaptchaWrapper,
    SuccessIcon: '',
    SuccessWrapper: styles.SuccessWrapper,
    SuccessContent: '',
    SuccessTitle: styles.SuccessTitle,
    SuccessMessage: styles.SuccessMessage,
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
