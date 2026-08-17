type ListIdsStateActionTypes =
  | 'list-ids/add-list-items'
  | 'list-ids/remove-list-items'
  | 'list-ids/clear-list-by-name';

export type ListIdsStateAction<T> = {
  type: ListIdsStateActionTypes;
  payload?: T;
};

type ListParams = {
  listName: string;
  items: string[];
};

export const addItemsToList = ({
  listName,
  items,
}: ListParams): ListIdsStateAction<{ listName: string; items: string[] }> => ({
  type: 'list-ids/add-list-items',
  payload: {
    listName,
    items,
  },
});

export const removeItemsFromList = ({
  listName,
  items,
}: ListParams): ListIdsStateAction<{ listName: string; items: string[] }> => ({
  type: 'list-ids/remove-list-items',
  payload: {
    listName,
    items,
  },
});

export const clearListByName = (
  listName: string,
): ListIdsStateAction<{ listName: string }> => ({
  type: 'list-ids/clear-list-by-name',
  payload: {
    listName: listName,
  },
});
