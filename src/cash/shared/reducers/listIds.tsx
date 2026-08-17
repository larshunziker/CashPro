import { ListIdsStateAction } from '../actions/listIds';

// TODO: add more list names if needed
export type ListIdsState = {
  alerts: string[];
};

export const listIdsInitialState: ListIdsState = {
  alerts: [],
};

export default (
  state: ListIdsState = listIdsInitialState,
  action: ListIdsStateAction<any>,
): ListIdsState => {
  switch (action.type) {
    case 'list-ids/clear-list-by-name': {
      return {
        ...state,
        [action.payload.listName]: [],
      };
    }
    case 'list-ids/add-list-items': {
      const isSubset = action.payload.items.every((item: string) =>
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'ListIdsState'. */
        state[action.payload.listName].includes(item),
      );
      if (!isSubset) {
        return {
          ...state,
          [action.payload.listName]: Array.from(
            new Set([
              /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'ListIdsState'. */
              ...state[action.payload.listName],
              ...action.payload.items,
            ]),
          ),
        };
      }

      return state;
    }
    case 'list-ids/remove-list-items': {
      return {
        ...state,
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type 'ListIdsState'. */
        [action.payload.listName]: state[action.payload.listName].filter(
          (item: string) => !action.payload.items.includes(item),
        ),
      };
    }

    default:
      return state;
  }
};
