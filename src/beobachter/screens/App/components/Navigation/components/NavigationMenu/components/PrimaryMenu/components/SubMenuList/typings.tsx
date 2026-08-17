export type SubMenuListProps = {
  items: MenuTreeItemEdge[];
  /* @ts-ignore TODO: TS7051 ->  Parameter has a name but no type. Did you mean 'arg0 */
  closeNavigation: (KeyboardEvent) => void;
  theme?: string;
};
