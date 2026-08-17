import { ComponentType } from 'react';

export type HeaderAreaProps = {
  isStickyEnabled?: boolean;
  verticalOverwriteRule?: Function;
  isHome?: boolean;
};

export type HeaderAreaComponent = ComponentType<HeaderAreaProps>;
