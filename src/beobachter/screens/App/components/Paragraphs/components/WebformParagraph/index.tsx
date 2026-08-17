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
import classNames from 'classnames';
import webformFactory from '../../../../../../../common/components/Paragraphs/components/WebformParagraph/factory';
import { isInLongFormArticleBody } from '../../../../../../shared/helpers/isInLongFormArticleBody';
import Link from '../../../../../../../common/components/Link';
import MultiField from '../../..//Paragraphs/components/WebformParagraph/components/MultiField';
import SelectField from '../../..//Paragraphs/components/WebformParagraph/components/SelectField';
import ButtonWithLoading from '../../../ButtonWithLoading';
import Error from '../../../Error';
import Icon from '../../../Icon';
import LoadingSpinner from '../../../LoadingSpinner';
import LoginForm from '../../../LoginForm';
import InputField from '../../../Paragraphs/components/WebformParagraph/components/InputField';
import SubmitButton from '../../../Paragraphs/components/WebformParagraph/components/SubmitButton';
import AddressFieldsWrapper from './components/AddressFieldsWrapper';
import BirthdayField from './components/BirthdayField';
import FileField from './components/FileField';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './mutations'. '/Users/bhs/code/work/rasch-stack/src/beobachter/screens/Ap */
import { SAVE_WEBFORM } from './mutations';
import { INFO_BOX_TYPE } from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import { ARTICLE_TYPE_RATGEBER } from '../../../../../../../shared/constants/content';
import { GOOGLE_RECAPTCHA_KEY } from '../../../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { WebformProps } from '../../../../../../../common/components/Paragraphs/components/WebformParagraph/typings';

const SUCCESS_TITLE = 'Die Nachricht wurde erfolgreich versendet!';
const SUCCESS_MESSAGE =
  'Vielen Dank. Wir werden uns schnellstmöglich mit Ihnen in Verbindung setzen.';
const ERROR_MESSAGE =
  'Entschuldigen Sie bitte. Beim Absenden des Formulars ist ein Fehler aufgetreten - bitte versuchen Sie es später noch einmal oder nehmen Sie mit uns Kontakt auf.';

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
  successCallToAction: (
    <Link path="/">
      <ButtonWithLoading>Zur Startseite</ButtonWithLoading>
    </Link>
  ),
  errorCallToAction: (
    <Link path="/kontakt">
      <ButtonWithLoading>zum Kontaktformular</ButtonWithLoading>
    </Link>
  ),
  defaultErrorMessage: ERROR_MESSAGE,
  defaultSuccessTitle: SUCCESS_TITLE,
  defaultSuccessMessage: SUCCESS_MESSAGE,
  RestrictionForm: LoginForm,
  reCaptchaKey: GOOGLE_RECAPTCHA_KEY,
  LoadingSpinner,
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
  const isInRatgeberAktuel = ARTICLE_TYPE_RATGEBER === props.origin;
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInLongFormArticle = isInLongFormArticleBody(props.origin);
  const isInInfobox = INFO_BOX_TYPE === props.origin;
  const { headerText } = props;

  return (
    <div
      className={classNames({
        [classNames([
          grid.ColOffsetSm3,
          grid.ColSm18,
          grid.ColOffsetMd2,
          grid.ColMd20,
          grid.ColOffsetXl5,
          grid.ColXl14,
        ])]: isInRatgeberAktuel,
        [classNames([grid.ColSm24, grid.ColMd24, grid.ColXl24])]:
          !isInRatgeberAktuel && !isInLongFormArticle && !isInInfobox,
        [classNames([
          grid.ColOffsetSm3,
          grid.ColSm18,
          grid.ColOffsetMd6,
          grid.ColMd12,
        ])]: isInLongFormArticle,
      })}
    >
      {isInInfobox && headerText && (
        <h2 className={styles.Title}>{headerText}</h2>
      )}
      <WebformComponent {...props} mutate={saveWebform} />
    </div>
  );
};

export default WebformParagraph;
