import React, { Fragment, SyntheticEvent } from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import classNames from 'classnames';
import styles from './styles.legacy.css';
import type {
  TabContentProps,
  Tabs,
  TabsContentProps,
  TabsHeaderProps,
  TabsTwoColsProps,
} from './typings';

type TabsTwoColsPropsInner = TabsTwoColsProps & {
  tabIndex: number;
  setTabIndex: (tabId: number) => void;
  toggleTab: (tabId: number) => (event: SyntheticEvent) => void;
};

export const NUMBER_OF_TABS = 2;

const hasTwoContents = (tabs: Tabs) => tabs && tabs.length === NUMBER_OF_TABS;

const hasTwoIndices = (tabs: Tabs) =>
  tabs &&
  tabs.filter((tab) => isIndexValid(tab.index)).length === NUMBER_OF_TABS;

const isIndexValid = (index: number) => index >= 1 && index <= NUMBER_OF_TABS;

const TabsHeader = ({ tabs, toggleTab, tabIndex }: TabsHeaderProps) => (
  <div className={styles.TabsWrapper} key={tabIndex}>
    {tabs &&
      Array.isArray(tabs) &&
      tabs.length > 0 &&
      tabs.map((tab, index) => (
        <Fragment key={`tab-item-${tab.anchor || tab.title || index}`}>
          <a
            key={`tab-item-${tab.anchor || tab.title || index}`}
            href={`#${tab.anchor || ''}`}
            onClick={toggleTab(tab.index)}
            className={classNames(styles.TabItem, {
              [styles.TabItemActive]: tabIndex === tab.index,
            })}
          >
            {tab.title || ''}
          </a>
          {index === 0 && (
            <div
              className={classNames(styles.Divider, {
                [styles.DividerRight]: tabIndex !== 1,
              })}
            >
              &nbsp;
            </div>
          )}
        </Fragment>
      ))}
  </div>
);

const TabsContent = ({ tabs, tabIndex }: TabsContentProps) => {
  const tabClasses = [styles.Left, styles.Right];
  return (
    <>
      {tabs.map((tab, index) => {
        const addClass = tab.addClass || '';
        return (
          <div
            key={index}
            className={classNames(tabClasses[index], {
              [styles.Active]: tabIndex === tab.index,
              [addClass]: !!addClass,
            })}
            itemProp={tab.itemProp}
          >
            {tab.subtitle && <p className={styles.SubTitle}>{tab.subtitle}</p>}
            {tab.contents &&
              tab.contents.map((item, index) => (
                <TabContent
                  tabContent={item}
                  index={index}
                  key={`tab-content-key-${index}`}
                />
              ))}
          </div>
        );
      })}
    </>
  );
};

const TabContent = ({ tabContent, index }: TabContentProps) => {
  const addClass = tabContent.addClass || '';
  if (typeof tabContent.content === 'string') {
    return (
      <div
        key={index}
        data-testid="tab-content-wrapper"
        className={classNames({ [addClass]: !!addClass })}
        dangerouslySetInnerHTML={{ __html: tabContent.content || '' }} // eslint-disable-line react/no-danger
      />
    );
  }

  if (!tabContent.content || typeof tabContent.content !== 'object') {
    return null;
  }

  return (
    <div
      className={classNames({ [addClass]: !!addClass })}
      key={index}
      data-testid="tab-content-wrapper"
    >
      {tabContent.content}
    </div>
  );
};

const TabsTwoCols = ({
  tabs,
  addClass = '',
  toggleTab,
  tabIndex,
}: TabsTwoColsPropsInner) => {
  if (!hasTwoContents(tabs) || !hasTwoIndices(tabs)) {
    return null;
  }
  return (
    <div
      className={classNames(styles.ContentWrapper, { [addClass]: !!addClass })}
      data-testid="tabs-two-cols-wrapper"
    >
      <TabsHeader tabs={tabs} toggleTab={toggleTab} tabIndex={tabIndex} />
      <TabsContent tabs={tabs} tabIndex={tabIndex} />
      <div className={styles.Clearfix} />
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'tabId' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
export const doToggleTab = (props, tabId) => (event) => {
  event.preventDefault();
  props.setTabIndex(tabId); // update the tab index
};

const withToggleTab = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  toggleTab: (props) => (tabId: number) => doToggleTab(props, tabId),
});

export default compose<any, any>(
  withState('tabIndex', 'setTabIndex', 1),
  withToggleTab,
)(TabsTwoCols);
