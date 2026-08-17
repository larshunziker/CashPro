export type OverlayProps = {
  navigationPrimaryMenu?: Menu;
  navigationSecondaryMenu?: Menu;
  navigationToggle?: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => void;
};
