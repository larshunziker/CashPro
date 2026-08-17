import React from 'react';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import { TabsProps } from './typings';

const Tabs = ({
  activeTab,
  setActiveTab,
  buttons,
  origin,
  fullquoteUrl,
}: TabsProps) => {
  const showMoreButton =
    origin === 'hz' || origin === 'blick' || origin === 'cash';

  return (
    <div className={styles.Buttons}>
      {buttons.map(({ type, label }) => (
        <button
          key={`tab-${type}-${label}`}
          className={classNames(
            {
              [styles.Active]: activeTab === type,
            },
            styles.Button,
          )}
          onClick={() => {
            setActiveTab(type);
          }}
        >
          {label}
        </button>
      ))}
      {/* This cannot be a Link component because we need target=_blank from an iframe delivered by cash.ch.
      If the Link component is used we would route inside the iframe because the iframe host is cash.ch.*/}
      {showMoreButton && fullquoteUrl && (
        <a
          target={origin === 'hz' || origin === 'blick' ? '_blank' : ''}
          href={'/' + fullquoteUrl}
        >
          <button className={classNames(styles.Button)}>MEHR</button>
        </a>
      )}
    </div>
  );
};

export default Tabs;
