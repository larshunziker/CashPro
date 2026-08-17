import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Icon from '../../../Icon';
import LoadingSpinner from '../../../LoadingSpinner';
import { CHART_COMPARISION_HASH } from '../../../../../../shared/constants/chartOverlay';
import styles from './styles.legacy.css';
import { AutoSuggestSearchFormProps } from './typings';

const AutoSuggestSearchForm = ({
  formSubmit,
  handleUpdateQuery,
  searchQuery,
  showLoader,
  placeholder,
  isDisabled = false,
  showErrorMessage = false,
  appInputAriaLabel,
  addClass = '',
  errorMessage = '',
  hasInputFocus,
  setHasInputFocus,
  inputRef,
}: AutoSuggestSearchFormProps): ReactElement => {
  return (
    <>
      <div>
        <form
          action={`${location.pathname}${CHART_COMPARISION_HASH}`}
          autoComplete="off"
          onSubmit={formSubmit}
          className={styles.Wrapper}
        >
          <div className={styles.InputWrapper}>
            <div
              className={classNames(styles.InputWithIconWrapper, {
                [styles.InputStylesInputFocused || '']:
                  hasInputFocus || !!searchQuery,
              })}
            >
              <Icon
                type={'IconMagnifyingGlass'}
                addClass={classNames(styles.InputIcon, {
                  [addClass]: !!addClass,
                })}
                /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                onClick={() => inputRef.current.focus()}
              />
              <input
                name="autosuggest-search-input"
                type="search"
                disabled={isDisabled}
                aria-label={appInputAriaLabel}
                placeholder={placeholder}
                className={classNames('autosuggest-input', styles.Input, {
                  [styles.InputStylesInputFocused || '']:
                    hasInputFocus || !!searchQuery,
                  [styles.Disabled]: isDisabled,
                })}
                ref={inputRef}
                value={searchQuery}
                onChange={handleUpdateQuery}
                onFocus={() => setHasInputFocus(true)}
                onBlur={() => setHasInputFocus(false)}
              />
              {showLoader && (
                <div className={styles.ResetIcon}>
                  <LoadingSpinner height={20} />
                </div>
              )}
              {showErrorMessage && (
                <span className={styles.Error}>{errorMessage}</span>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AutoSuggestSearchForm;
