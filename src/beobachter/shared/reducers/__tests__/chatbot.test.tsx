import {
  setAiaibotInitialized,
  SET_AIAIBOT_INITIALIZED,
} from '../../actions/chatbot';
import chatbotReducer, { chatbotInitialState } from '../chatbot';

describe('[reducer] chatbot', () => {
  it('returns the initial state for unknown actions', () => {
    expect(
      chatbotReducer(chatbotInitialState, {
        // @ts-ignore
        type: 'chatbot/unknown-action',
      }),
    ).toEqual(chatbotInitialState);
  });

  it('sets isAiaibotInitialized to true', () => {
    expect(
      chatbotReducer(chatbotInitialState, {
        type: SET_AIAIBOT_INITIALIZED,
        initialized: true,
      }),
    ).toEqual({
      isAiaibotInitialized: true,
    });
  });

  it('keeps isAiaibotInitialized true when action is dispatched repeatedly', () => {
    const initializedState = chatbotReducer(
      chatbotInitialState,
      setAiaibotInitialized(),
    );

    expect(chatbotReducer(initializedState, setAiaibotInitialized())).toEqual({
      isAiaibotInitialized: true,
    });
  });
});
