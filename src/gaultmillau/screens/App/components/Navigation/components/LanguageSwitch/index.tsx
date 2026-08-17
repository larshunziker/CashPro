import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import classNames from 'classnames';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/languageFlowFactory'. '/Users/bhs/ */
import { doChooseLanguage } from '../../../../../../../shared/decorators/languageFlowFactory';
import styles from './styles.legacy.css';

type LanguageSwitchPropsInner = {
  handleLanguageGerman: (event: React.MouseEvent) => void;
  handleLanguageFrench: (event: React.MouseEvent) => void;
  renderLanguage: (language: string) => JSX.Element;
  language: string;
  settingsState: SettingsState;
};

type LanguagesProps = {
  props: LanguageSwitchPropsInner;
  lang: string;
};

export const DEFAULT_LANGUAGE = 'de';
const availableLanguages = [DEFAULT_LANGUAGE, 'fr'];

const LanguageSwitch = ({ renderLanguage }: LanguageSwitchPropsInner) => (
  <div className={styles.LanguageSwitch}>
    {availableLanguages.map(renderLanguage)}
  </div>
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  language: settingsStateSelector(state).language,
});

const Languages = ({ props, lang }: LanguagesProps) => (
  <a
    href={`/${(lang !== DEFAULT_LANGUAGE && lang) || ''}`}
    onClick={(event) =>
      lang === DEFAULT_LANGUAGE
        ? props.handleLanguageGerman(event)
        : props.handleLanguageFrench(event)
    }
    className={classNames(styles.Button, {
      [styles.Active]: props.language === lang,
    })}
  >
    {lang.substr(0, 2)}
  </a>
);

const doHandleLanguage = (
  props: LanguageSwitchPropsInner,
  event: Event,
  language: string,
) => {
  event.preventDefault();

  if (props.language !== language) {
    doChooseLanguage(props, language, { defaultLanguage: DEFAULT_LANGUAGE });
  }
};

const extendWithHandleLanguage = withHandlers({
  handleLanguageGerman: (props: LanguageSwitchPropsInner) => (event: Event) =>
    doHandleLanguage(props, event, 'de'),
  handleLanguageFrench: (props: LanguageSwitchPropsInner) => (event: Event) =>
    doHandleLanguage(props, event, 'fr'),
});

const extendWithRenderLanguages = withHandlers({
  renderLanguage: (props: LanguageSwitchPropsInner) => (lang: string) => (
    <Languages key={`language-switch-item-${lang}`} props={props} lang={lang} />
  ),
});

export default compose<any, any>(
  connect(mapStateToProps),
  extendWithHandleLanguage,
  extendWithRenderLanguages,
)(LanguageSwitch);
