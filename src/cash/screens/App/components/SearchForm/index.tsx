/* istanbul ignore file */
import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import searchFormFactory from '../../../../../common/components/SearchForm/factory';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import Icon from './../Icon';
import Autocomplete from './components/Autocomplete';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { AutocompleteFactoryProps } from '../../../../../common/components/SearchForm/components/Autocomplete/typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getStyleByProps = (props) => {
  return {
    Wrapper: styles.Wrapper,
    InputIcon: classNames(grid.HiddenSmDown, styles.InputIcon),
    InputWrapper: styles.InputWrapper,
    Input: styles.Input,
    InputStylesInputFocused: styles.InputStylesInputFocused,
    InputWithIconWrapper: styles.InputWithIconWrapper,
    SubmitButton: classNames(
      {
        [styles.IsHybridApp]: props.isHybridApp,
      },
      styles.SubmitButton,
    ),
    ButtonStylesInputHasFocus: styles.ButtonStylesInputHasFocus,
    SubmitButtonActive: '',
    SubmitIcon: styles.SubmitIcon,
    ResetIcon: classNames(styles.ResetIcon, {
      [styles.IsHybridApp]: props.isHybridApp,
    }),
  };
};
/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  isHybridApp: locationStateSelector(state).isHybridApp,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getBrowserAutocompleteEnabledByProps = (props) => !props.isHybridApp;

const ConnectedAutoComplete = connect(mapStateToProps)((
  props: AutocompleteFactoryProps,
) => {
  return props.isHybridApp ? <Autocomplete {...props} /> : null;
});

const SearchForm = searchFormFactory({
  Autocomplete: ConnectedAutoComplete,
  appSearchRoute: 'suche/alle',
  Icon,
  IconTypes: {
    closeIconType: 'IconXMark',
    submitIconType: 'IconArrowRight',
    inputIconType: 'IconMagnifyingGlass',
  },
  styles: getStyleByProps,
  isButtonShown: true,
  appPlaceholderMessage: `Suchen`,
  isBrowserAutoCompleteEnabled: getBrowserAutocompleteEnabledByProps,
});

export default connect(mapStateToProps)(SearchForm);
