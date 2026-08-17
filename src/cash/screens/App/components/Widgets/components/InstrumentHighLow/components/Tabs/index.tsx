import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { TabsProps } from './typings';

const Tabs = ({ activeTab, setActiveTab, buttons }: TabsProps) => {
  const [tabClicked, setTabClicked] = useState(false);

  useEffect(() => {
    if (!tabClicked) {
      setActiveTab(buttons[0]);
    }
  }, [buttons, setActiveTab, tabClicked]);

  const handleClick = useCallback(
    (label: string) => {
      setActiveTab(label);
      setTabClicked(true);
    },
    [setActiveTab, setTabClicked],
  );

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
          onClick={() => handleClick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
