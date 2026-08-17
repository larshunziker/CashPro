import React from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { TabsProps } from './typings';

const Tabs = ({ activeTab, setActiveTab, buttons }: TabsProps) => {
  return (
    <div className={styles.Buttons}>
      {buttons.map((label) => (
        <button
          key={`tab-${label}`}
          className={classNames(
            {
              [styles.Active]: activeTab === label,
            },
            styles.Button,
          )}
          onClick={() => setActiveTab(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
