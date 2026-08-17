import { ReactElement, SyntheticEvent } from 'react';

export type Tabs = Tab[];

export type Tab = {
  index: number;
  anchor: string;
  title: string | ReactElement;
  subtitle?: string | ReactElement;
  contents: TabContents;
  addClass?: string;
  itemProp?: string;
};

export type TabContents = TabContent[];

export type TabContent = {
  content: ReactElement | string;
  addClass?: string;
};

export type TabsTwoColsProps = {
  tabs: Tabs;
  addClass?: string;
};

export type TabsContentProps = {
  tabs: Tabs;
  tabIndex: number;
};

export type TabContentProps = {
  tabContent: TabContent;
  index: number;
};

export type TabsHeaderProps = {
  tabs: Tabs;
  toggleTab: (tabId: number) => (event: SyntheticEvent) => void;
  tabIndex: number;
};
