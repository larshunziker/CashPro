export type TabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  buttons: ButtonProps[];
};

export type ButtonProps = {
  key: string;
  label: string;
};
