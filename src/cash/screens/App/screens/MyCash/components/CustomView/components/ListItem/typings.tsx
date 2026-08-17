export const ItemTypes = {
  ITEM: 'list',
};

export interface ListItemProps {
  id: any;
  name: string | JSX.Element;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  removeListItemByIndex: (index: number) => void;
  moveListItemToTop: (index: number) => void;
  saveListItems: () => void;
  listItemsCount: number;
  isLoading: boolean;
  isDeletable: boolean;
  isCustomOrder?: boolean;
}
