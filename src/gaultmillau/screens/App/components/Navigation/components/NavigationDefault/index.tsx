import type { NavigationDefaultProps } from './typings';

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const NavigationDefault = ({
  navigationPrimaryMenu,
  navigationPrimaryMenuFr,
  navigationSecondaryMenu,
  renderNavigationOverlay,
}: NavigationDefaultProps) => {
  return renderNavigationOverlay(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Menu | undefined' is not assignable to parameter of type 'Menu'. */
    navigationPrimaryMenu,
    navigationPrimaryMenuFr,
    navigationSecondaryMenu,
  );
};

export default NavigationDefault;
