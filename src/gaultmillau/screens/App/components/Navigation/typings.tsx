import { NavigationStateAction } from '../../../../../shared/actions/navigation';

export type NavigationProps = {
  component: string;
  layout: string;
  navigationToggle: (toggle: boolean) => NavigationStateAction<{}>;
};
