import React, {
  ChangeEvent,
  Component,
  ComponentType,
  RefObject,
  createRef,
} from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { getMobileOperatingSystem, noop } from '../../../shared/helpers/utils';
import { doHandleSearchSuggestionsClickTracking } from './../../../shared/helpers/tracking';
import { checkIfIsValidUrl } from './../../../shared/helpers/urlValidation';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './../../../shared/tests/helpers'. '/Users/bhs/code/work/rasch-stack/src/s */
import { testLog } from './../../../shared/tests/helpers';
import withNavigate, {
  WithNavigateProps,
} from '../../../shared/decorators/withNavigate';
import type {
  IconTypes,
  SearchFormFactoryOptions,
  SearchFormFactoryOptionsStyles,
  SearchFormFactoryProps,
} from './typings';

type SearchFormFactoryPropsInner = SearchFormFactoryProps & WithNavigateProps;

type SearchFormFactoryState = {
  searchQuery: string;
  showAutocomplete: boolean;
  hasInputFocus: boolean;
};

const defaultStyles: SearchFormFactoryOptionsStyles = {
  Wrapper: '',
  InputWrapper: '',
  Input: '',
  SubmitButton: '',
  SubmitButtonActive: '',
  SubmitIcon: '',
  ResetIcon: '',
};

const defaultIconTypes: IconTypes = {
  closeIconType: '',
  submitIconType: '',
  startIconType: '',
  inputIconType: '',
};

const searchFormFactory: (
  factoryOptions: SearchFormFactoryOptions,
) => ComponentType<SearchFormFactoryProps> = ({
  Autocomplete,
  Icon,
  IconTypes: appIconTypes,
  styles: appStyles,
  appPlaceholderMessage = 'Suche',
  appInputAriaLabel = 'Eingabe Suchbegriff',
  appResetButtonAriaLabel = 'Suche zurücksetzen',
  appSearchButtonAriaLabel = 'suchen',
  appSearchRoute = 'suche',
  isButtonShown = true,
  isBrowserAutoCompleteEnabled = false,
}) => {
  class SearchForm extends Component<
    SearchFormFactoryPropsInner,
    SearchFormFactoryState
  > {
    inputRef: RefObject<HTMLInputElement>;

    constructor(props: SearchFormFactoryPropsInner) {
      super(props);
      this.closeAndTrackAutocompleteSuggestion =
        this.closeAndTrackAutocompleteSuggestion.bind(this);
      this.handleResetQuery = this.handleResetQuery.bind(this);
      this.state = {
        searchQuery: '',
        showAutocomplete: false,
        hasInputFocus: false,
      };

      this.inputRef = createRef();
    }

    componentDidMount() {
      const { focusOnMount, focusOnMountDelay = 0, initialQuery } = this.props;

      const isMobileDevice = getMobileOperatingSystem();
      // The isMobileDevice check was necessary because there is an issue
      // on mobile devices (ios) that the focus was not set on the inputField correctly
      // when using the setTimeout function.
      if (focusOnMount) {
        if (!isMobileDevice) {
          setTimeout(() => {
            this.inputRef?.current?.focus();
          }, focusOnMountDelay);
        } else {
          this.inputRef?.current?.focus();
        }
      }

      if (initialQuery) {
        this.setState({
          searchQuery: checkIfIsValidUrl(initialQuery)
            ? decodeURIComponent(initialQuery).toLowerCase()
            : '',
        });
      }
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    closeAndTrackAutocompleteSuggestion(event) {
      doHandleSearchSuggestionsClickTracking(this.state.searchQuery);
      this.setState({ showAutocomplete: false });

      if (
        this.props.menuCloseHandler &&
        typeof this.props.menuCloseHandler === 'function'
      ) {
        this.props.menuCloseHandler(event);
      }
    }

    handleUpdateSearchQuery({ target }: ChangeEvent<HTMLInputElement>) {
      this.setState({ searchQuery: target.value, showAutocomplete: true });
    }

    handleResetQuery() {
      this.setState({ searchQuery: '', showAutocomplete: false });
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      this.inputRef.current.focus();
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    handleSubmit(event) {
      event.preventDefault();
      const { minQueryLength = 2, router } = this.props;
      const { searchQuery } = this.state;

      const searchRoute =
        (typeof appSearchRoute === 'function' && appSearchRoute(this.props)) ||
        (typeof appSearchRoute === 'object' && appSearchRoute) ||
        appSearchRoute;

      if (
        searchQuery.trim() !== '' ||
        searchQuery.trim().length >= minQueryLength
      ) {
        this.setState({ showAutocomplete: false });
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        this.inputRef.current.blur();

        testLog('search query submitted');

        const encodedQuery = encodeURIComponent(
          searchQuery.toLowerCase().trim(),
        );
        if (
          this.props.menuCloseHandler &&
          typeof this.props.menuCloseHandler === 'function'
        ) {
          this.props.menuCloseHandler(event);
        }

        if (router && typeof router === 'object') {
          router.push(`/${searchRoute}/${encodedQuery}`); // TODO: remove this as soon as Reach Router is implemented on all publications
        } else {
          this.props.navigate(`/${searchRoute}/${encodedQuery}`);
        }

        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        this.inputRef.current.blur();
      }
    }

    render() {
      const {
        placeholder = appPlaceholderMessage,
        minQueryLength = 2,
        theme,
        onStartIconClick = noop,
      } = this.props;
      const { searchQuery, showAutocomplete, hasInputFocus } = this.state;

      const styles =
        (typeof appStyles === 'function' && appStyles(this.props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      const IconTypes =
        (typeof appIconTypes === 'function' && appIconTypes(this.props)) ||
        (typeof appIconTypes === 'object' && appIconTypes) ||
        defaultIconTypes;

      const searchRoute =
        (typeof appSearchRoute === 'function' && appSearchRoute(this.props)) ||
        (typeof appSearchRoute === 'object' && appSearchRoute) ||
        appSearchRoute;

      const isFocused = hasInputFocus || !!searchQuery;

      return (
        <form
          action={`/${searchRoute}`}
          autoComplete={isBrowserAutoCompleteEnabled ? 'on' : 'off'}
          onSubmit={this.handleSubmit.bind(this)}
          className={styles.Wrapper}
        >
          <div
            className={classNames(styles.InputWrapper, {
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [styles?.InputWrapperStylesInputFocused]: isFocused,
            })}
          >
            {IconTypes?.startIconType && (
              <button
                type="button"
                className={styles.StartButton}
                onClick={onStartIconClick}
              >
                <Icon
                  type={IconTypes.startIconType}
                  addClass={styles.StartIcon}
                />
              </button>
            )}

            {IconTypes?.inputIconType ? (
              <div
                className={classNames({
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [styles?.InputWithIconWrapper]: IconTypes?.inputIconType,
                  /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                  [styles?.InputStylesInputFocused]: isFocused,
                })}
              >
                <Icon
                  type={IconTypes.inputIconType}
                  addClass={styles.InputIcon}
                  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                  onClick={() => this.inputRef.current.focus()}
                />

                <input
                  name="search"
                  type="search"
                  aria-label={appInputAriaLabel}
                  placeholder={placeholder}
                  className={classNames('search-bar', styles.Input, {
                    /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                    [styles?.InputStylesInputFocused]: isFocused,
                  })}
                  ref={this.inputRef}
                  value={searchQuery}
                  onChange={this.handleUpdateSearchQuery.bind(this)}
                  onFocus={() => this.setState({ hasInputFocus: true })}
                  onBlur={() => this.setState({ hasInputFocus: false })}
                />
              </div>
            ) : (
              <input
                name="search"
                type="search"
                aria-label={appInputAriaLabel}
                placeholder={placeholder}
                className={classNames('search-bar', styles.Input, {
                  [styles.InputStylesInputFocused || '']: isFocused,
                })}
                ref={this.inputRef}
                value={searchQuery}
                onChange={this.handleUpdateSearchQuery.bind(this)}
                onFocus={() => this.setState({ hasInputFocus: true })}
                onBlur={() => this.setState({ hasInputFocus: false })}
              />
            )}
            {isButtonShown && (
              <button
                data-testid="searchform-factory-submit-button"
                type="submit"
                aria-label={appSearchButtonAriaLabel}
                className={classNames(styles.SubmitButton, {
                  [styles.SubmitButtonActive]: searchQuery !== '',
                  [styles.ButtonStylesInputHasFocus || '']: isFocused,
                })}
              >
                {IconTypes && (
                  <Icon
                    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                    type={IconTypes.submitIconType}
                    addClass={styles.SubmitIcon}
                  />
                )}
              </button>
            )}

            {searchQuery !== '' && IconTypes && (
              <div
                data-testid="searchform-factory-reset-button"
                onClick={() => {
                  this.handleResetQuery();
                }}
                onKeyUp={() => {
                  this.handleResetQuery();
                }}
                tabIndex={0}
                role="button"
                aria-label={`${appResetButtonAriaLabel || ''}`}
              >
                <Icon
                  /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                  type={IconTypes.closeIconType}
                  addClass={styles.ResetIcon}
                />
              </div>
            )}
          </div>
          {showAutocomplete && (
            <Autocomplete
              queryString={searchQuery}
              menuCloseHandler={(event) => {
                this.closeAndTrackAutocompleteSuggestion(event);
              }}
              minQueryLength={minQueryLength}
              theme={theme}
            />
          )}
        </form>
      );
    }

    shouldComponentUpdate(
      nextProps: SearchFormFactoryPropsInner,
      nextState: SearchFormFactoryState,
    ) {
      if (this.props.initialQuery !== nextProps.initialQuery) {
        this.setState({
          searchQuery: checkIfIsValidUrl(nextProps.initialQuery || '')
            ? decodeURIComponent(nextProps.initialQuery || '').toLowerCase()
            : '',
        });
      }

      return (
        this.props.initialQuery !== nextProps.initialQuery ||
        this.state.searchQuery !== nextState.searchQuery ||
        this.state.hasInputFocus !== nextState.hasInputFocus ||
        this.state.showAutocomplete !== nextState.showAutocomplete
      );
    }
  }

  return compose<any, any>(withNavigate)(SearchForm);
};

export default searchFormFactory;
