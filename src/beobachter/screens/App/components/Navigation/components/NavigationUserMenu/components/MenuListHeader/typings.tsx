export enum menuListHeaderType {
  primary,
  secondary,
}

export type MenuListHeaderProps = {
  label?: string;
  type?: menuListHeaderType;
};
