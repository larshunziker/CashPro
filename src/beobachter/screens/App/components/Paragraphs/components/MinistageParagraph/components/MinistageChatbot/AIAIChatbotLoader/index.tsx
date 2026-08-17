import React, { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../../../../../../shared/helpers/tealium';
import authStateSelector from '../../../../../../../../../../shared/selectors/authStateSelector';
import Icon from '../../../../../../Icon';
import { useAiaibotChatbot } from './useAiaibotChatbot';
import RobotIcon from './assets/user_robot.svg';
import {
  AIAICHAT_TRIGGER_ID_MEMBER,
  AIAICHAT_TRIGGER_ID_REGISTERED,
  AIAICHAT_TRIGGER_ID_UNREGISTERED,
} from '../../../../../../../constants';
import styles from './styles.legacy.css';

const AIAIChatbotLoader = ({
  placeholder,
  buttonText,
  sampleQuestions,
}: {
  placeholder?: string | null;
  buttonText?: string | null;
  sampleQuestions: string[];
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [hasInputFocus, setHasInputFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const isChatbotAllowed = useSelector(
    (state: Record<string, any>) => authStateSelector(state).isChatbotAllowed,
  );

  const isAuthenticated = useSelector(
    (state: Record<string, any>) => authStateSelector(state).isAuthenticated,
  );

  let triggerId: string;

  if (isChatbotAllowed) {
    triggerId = AIAICHAT_TRIGGER_ID_MEMBER ?? '';
  } else if (isAuthenticated) {
    triggerId = AIAICHAT_TRIGGER_ID_REGISTERED ?? '';
  } else {
    triggerId = AIAICHAT_TRIGGER_ID_UNREGISTERED ?? '';
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const { triggerChatbot, isFirstMessageSent } = useAiaibotChatbot(triggerId);

  const handleSearchSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    await triggerChatbot(inputValue);
  };

  const handleButtonClick = useCallback(
    async (value: string) => {
      setInputValue(value);
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'softwall_variant_chatbot_predefined_question_click',
          question: value,
        },
      });
      await triggerChatbot(value);
    },
    [triggerChatbot],
  );

  const renderButton = useCallback(
    (value: string) => (
      <button
        key={value}
        className={styles.ButtonWithValue}
        onClick={() => handleButtonClick(value)}
      >
        <img src={RobotIcon} alt="" aria-hidden="true" />
        {value}
      </button>
    ),
    [handleButtonClick],
  );

  return (
    <>
      {sampleQuestions?.length > 0 && (
        <div className={styles.ButtonsContainer}>
          {sampleQuestions?.map(renderButton)}
        </div>
      )}
      <form ref={formRef} onSubmit={handleSearchSubmit}>
        <div className={styles.FormWrapper}>
          {/* eslint-disable-next-line*/}
          <div
            className={classNames(styles.InputWrapper, {
              [styles.InputFocused]: hasInputFocus,
              [styles.InputWrapperDisabled]: !isFirstMessageSent,
            })}
            onClick={() => inputRef.current?.focus()}
          >
            <img
              src={RobotIcon}
              alt=""
              aria-hidden="true"
              className={styles.RobotIcon}
            />
            <input
              ref={inputRef}
              name="q"
              id="chatBot"
              type="search"
              aria-label="Chatbot Rechtsberatung"
              placeholder={placeholder || 'Stellen Sie Ihre Rechtsfrage!'}
              className={styles.Input}
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => setHasInputFocus(true)}
              onBlur={() => setHasInputFocus(false)}
            />
            <div aria-live="polite" className={styles.Container}>
              {inputValue && (
                <div className={classNames(styles.IconClear)}>
                  <input
                    type="reset"
                    className={styles.IconClearInput}
                    data-testid="rechtsratgeber-search-reset-button"
                    onClick={() => {
                      setInputValue('');
                    }}
                    tabIndex={0}
                    aria-label="Rechtsratgeber suche zurücksetzen"
                    value={''}
                  />
                  <Icon type="IconXMark" />
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={styles.SearchButton}
            aria-label={buttonText || 'Jetzt chatten'}
          >
            <svg
              className={styles.IconSearch}
              viewBox="0 0 512 512"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M70.513 294.395l182.104-19.473a18.526 18.526 0 0016.45-16.45c1.089-10.174-6.277-19.303-16.45-20.391L69.77 218.529 46.175 47.062c-1.394-10.135 5.692-19.483 15.828-20.878a18.525 18.525 0 0111.48 2.135l383.962 212c8.957 4.945 12.208 16.215 7.263 25.172a18.526 18.526 0 01-7.263 7.263L73.62 484.677c-8.957 4.946-20.227 1.694-25.172-7.263a18.525 18.525 0 01-2.126-11.542z"
                fillRule="evenodd"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
};
export default AIAIChatbotLoader;
