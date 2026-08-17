import {
  ChatbotStateAction,
  SET_AIAIBOT_INITIALIZED,
} from '../actions/chatbot';

export const chatbotInitialState: ChatbotState = {
  isAiaibotInitialized: false,
};

const chatbotReducer = (
  state: ChatbotState = chatbotInitialState,
  action: ChatbotStateAction,
): ChatbotState => {
  if (action.type === SET_AIAIBOT_INITIALIZED) {
    return {
      ...state,
      isAiaibotInitialized: action.initialized,
    };
  }

  return state;
};

export default chatbotReducer;
