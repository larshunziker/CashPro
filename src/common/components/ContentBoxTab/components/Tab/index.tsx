import React from 'react';
import classnames from 'classnames';

export type TabItem = {
  id: string;
  title?: string;
  sortBy: string;
  mode: string;
  style: string;
  termReference?: Channel;
  linkLabel?: string;
  link?: string;
  items?: NodeInterfaceConnection;
};

export type TabProps = {
  tab: TabItem;
  styles: {
    TabTitleWrapper: string;
    ActiveTab: string;
    TabTitle: string;
  };
  handleTabClick: (tab: TabItem) => void;
  currentTabTitle: string;
};

const Tab = ({ tab, styles, handleTabClick, currentTabTitle }: TabProps) => {
  return (
    <button
      onClick={() => handleTabClick(tab)}
      className={classnames(styles.TabTitleWrapper, {
        [styles.ActiveTab]: tab.title === currentTabTitle,
      })}
    >
      <span className={styles.TabTitle}>{tab.title}</span>
    </button>
  );
};

export default Tab;
