/* istanbul ignore file */

import searchFormFactory from './../../../../../common/components/SearchForm/factory';
import Autocomplete from './../Autocomplete';
import Icon from './../Icon';
import styles from './styles.legacy.css';

const SearchForm = searchFormFactory({
  Autocomplete,
  Icon,
  IconTypes: {
    closeIconType: 'IconCloseButtonSimple',
    submitIconType: 'IconMagnifyingGlass',
  },
  styles: {
    Wrapper: styles.Wrapper,
    InputWrapper: styles.InputWrapper,
    Input: styles.Input,
    SubmitButton: styles.SubmitButton,
    ButtonStylesInputHasFocus: styles.ButtonStylesInputHasFocus,
    InputStylesInputFocused: styles.InputStylesInputFocused,
    SubmitButtonActive: '',
    SubmitIcon: styles.SubmitIcon,
    ResetIcon: styles.ResetIcon,
  },
});

export default SearchForm;
