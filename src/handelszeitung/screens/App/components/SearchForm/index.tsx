/* istanbul ignore file */

import classNames from 'classnames';
import searchFormFactory from './../../../../../common/components/SearchForm/factory';
import Icon from './../Icon';
import Autocomplete from './components/Autocomplete';
import { SEARCH_FORM_THEME_MENU, SEARCH_FORM_THEME_WHITE } from './constants';
import styles from './styles.legacy.css';
import {
  SearchFormFactoryOptionsStyles,
  SearchFormFactoryProps,
} from './../../../../../common/components/SearchForm/typings';

const getStylesByProps = ({
  theme,
}: SearchFormFactoryProps): SearchFormFactoryOptionsStyles => ({
  Wrapper: classNames(styles.Wrapper, {
    [styles.WrapperWhite]: theme === SEARCH_FORM_THEME_WHITE,
    [styles.NavigationWrapper]: theme === SEARCH_FORM_THEME_MENU,
  }),
  InputWrapper: styles.SearchInputWrapper,
  Input: styles.SearchInput,
  SubmitButton: styles.SearchButton,
  SubmitButtonActive: styles.SearchButtonActive,
  SubmitIcon: styles.ActionIcon,
  ResetIcon: styles.ResetIcon,
});

export default searchFormFactory({
  Autocomplete,
  Icon,
  IconTypes: {
    closeIconType: 'IconXMark',
    submitIconType: 'IconMagnifyingGlass',
  },
  styles: getStylesByProps,
});
