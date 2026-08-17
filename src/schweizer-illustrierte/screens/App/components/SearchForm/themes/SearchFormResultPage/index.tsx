/* istanbul ignore file */

import searchFormFactory from './../../../../../../../common/components/SearchForm/factory';
import Autocomplete from './../../../Autocomplete/themes/AutocompleteResultPage';
import Icon from './../../../Icon';
import styles from './styles.legacy.css';

const SearchFormResultPage = searchFormFactory({
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
    SubmitButtonActive: '',
    SubmitIcon: styles.SubmitIcon,
    ResetIcon: styles.ResetIcon,
  },
});

export default SearchFormResultPage;
