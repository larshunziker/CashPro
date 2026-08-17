export const SET_AIAIBOT_INITIALIZED = 'chatbot/set-aiaibot-initialized';

export type ChatbotStateAction = {
  type: typeof SET_AIAIBOT_INITIALIZED;
  initialized: boolean;
};

export const setAiaibotInitialized = (
  initialized: boolean = true,
): ChatbotStateAction => ({
  type: SET_AIAIBOT_INITIALIZED,
  initialized,
});
