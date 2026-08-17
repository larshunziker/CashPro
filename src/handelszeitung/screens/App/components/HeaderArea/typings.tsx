import { ComponentType } from 'react';

export type HeaderAreaProps = {
  isStickyEnabled?: boolean;
  verticalOverwriteRule?: Function;
  publication?: string;
  subtypeValue?: string;
};

export type HeaderAreaComponent = ComponentType<HeaderAreaProps>;
