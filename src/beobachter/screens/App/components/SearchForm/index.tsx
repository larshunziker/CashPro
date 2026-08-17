/* istanbul ignore file */

import { connect } from 'react-redux';
import classNames from 'classnames';
import searchFormFactory from '../../../../../common/components/SearchForm/factory';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import { SEARCH } from '../../../../shared/actions/route';
import Icon from './../Icon';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { SearchFormFactoryProps } from '../../../../../common/components/SearchForm/typings';

const getSearchPathByProps = ({
  routePathname,
}: SearchFormFactoryProps): string => {
  const searchPathname = routePathname?.slice(1);
  return searchPathname?.includes('suche/')
    ? searchPathname.substr(0, searchPathname.lastIndexOf('/'))
    : 'suche/all';
};

const getStyleByProps = ({ vertical }: SearchFormFactoryProps) => {
  const isSearchPage = vertical === SEARCH;

  return {
    Wrapper: classNames(styles.Wrapper, {
      [grid.HiddenSmDown]: !isSearchPage,
    }),
    Input: classNames(styles.Input, {
      [styles.InputForSearchPage]: isSearchPage,
    }),
    InputIcon: classNames(styles.InputIcon, {
      [styles.InputIconForSearchPage]: isSearchPage,
    }),
    InputStylesInputFocused: styles.InputStylesInputFocused,
    InputWithIconWrapper: styles.InputWithIconWrapper,
    SubmitButton: classNames(styles.SubmitButton, {
      [grid.HiddenSmDown]: !isSearchPage,
    }),
    ButtonStylesInputHasFocus: styles.ButtonStylesInputHasFocus,
    SubmitButtonActive: '',
    SubmitIcon: styles.SubmitIcon,
    ResetIcon: classNames(styles.ResetIcon, {
      [styles.ResetIconForSearchPage]: isSearchPage,
    }),
  };
};

const SearchForm = searchFormFactory({
  Autocomplete: () => null,
  appSearchRoute: getSearchPathByProps,
  Icon,
  IconTypes: {
    closeIconType: 'IconXMark',
    submitIconType: 'IconArrowRight',
    inputIconType: 'IconMagnifyingGlass',
  },
  styles: getStyleByProps,
  isButtonShown: false,
  appPlaceholderMessage: 'Suchen',
  isBrowserAutoCompleteEnabled: false,
});

const mapStateToProps = (state: ReduxState) => ({
  vertical: locationStateSelector(state).vertical,
  routePathname:
    locationStateSelector(state).locationBeforeTransitions?.pathname,
});

export default connect(mapStateToProps)(SearchForm);
