import { TimeRange } from '../../typings';

export type TabsProps = {
  activeTab: TimeRange | string;
  setActiveTab: (tab: TimeRange | string) => void;
  buttons: { type: TimeRange | string; label: string }[];
  origin?: string;
  fullquoteUrl?: string;
};
