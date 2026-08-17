export type MenuItemProps = {
  link?: MenuLink;
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  closeNavigation: (KeyboardEvent) => void;
  itemIndex: number;
};
