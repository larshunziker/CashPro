import { CommentStateAction } from '../actions/comment';

// Initial window state
export const commentInitialState: CommentState = {
  count: 0,
};

/**
 * Merge profile state into the global application state.
 */
export default (
  state: CommentState = commentInitialState,
  action: CommentStateAction<CommentState>,
): CommentState => {
  switch (action.type) {
    case 'comment/set-count':
      return {
        ...state,
        count: action.payload.count,
      };

    default:
      return state;
  }
};
