// sonar-disable

import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import { useMutation } from '@apollo/client';
import webformFactory from '../../../../../../../common/components/Paragraphs/components/WebformParagraph/factory';
import {
  DEVICE_TYPE_ANDROID,
  DEVICE_TYPE_IOS_MOBILE_TABLET,
  getMobileOperatingSystem,
} from '../../../../../../../shared/helpers/utils';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import locationStateSelector from '../../../../../../shared/selectors/locationStateSelector';
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
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './mutations'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/comp */
import { SAVE_WEBFORM } from './mutations';
import { useStableNavigate } from '../../../../../../../shared/hooks/useStableNavigateContext';
import { GOOGLE_RECAPTCHA_KEY } from '../../../../constants';
import styles from './styles.legacy.css';
import { WebformProps } from '../../../../../../../common/components/Paragraphs/components/WebformParagraph/typings';

const NavigateButton = ({ path = '/', label = 'Zur Startseite' }) => {
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

  const mapTokens = (field: Record<string, any>) => {
    const { deviceId, isHybridApp } = props;

    if (isHybridApp) {
      if (field.fieldName === 'device_id') {
        return deviceId;
      }

      if (field.fieldName === 'device_type') {
        const operatingSystem = getMobileOperatingSystem();

        const deviceType =
          (isHybridApp &&
            ((operatingSystem === DEVICE_TYPE_ANDROID && DEVICE_TYPE_ANDROID) ||
              (operatingSystem === DEVICE_TYPE_IOS_MOBILE_TABLET &&
                'Apple iOS'))) ||
          '';

        return deviceType;
      }

      if (field.fieldName === 'additional_device_info') {
        return window.navigator.userAgent;
      }
    }

    return field.value || field.default_value;
  };

  return (
    <WebformComponent
      {...props}
      mutate={saveWebform}
      mapTokensCustom={mapTokens}
    />
  );
};

const mapStateToProps = (state: ReduxState) => ({
  deviceId: authStateSelector(state)?.deviceId || '',
  isHybridApp: locationStateSelector(state)?.isHybridApp || false,
});

export default connect(mapStateToProps)(WebformParagraph);
