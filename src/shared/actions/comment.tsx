type CommentStateActionTypes = 'comment/set-count';

export type CommentStateAction<T> = {
  type: CommentStateActionTypes;
  payload: T;
};

// Set comments count
export const setCount = (count: number): CommentStateAction<CommentState> => ({
  type: 'comment/set-count',
  payload: {
    count,
  },
});
