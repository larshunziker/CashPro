import React, { ReactElement, useState } from 'react';
import shuffle from 'lodash/shuffle';
import Tab, { TabItem } from './components/Tab';
import { useSSRContext } from '../SSRContext';
import { CONTENT_SOURCE_MANUAL_RANDOM } from '../../../shared/constants/content';
import { TEASER_LAYOUT_M } from '../../../shared/constants/teaser';
import type {
  ContentBoxTabFactoryOptions,
  ContentBoxTabFactoryOptionsStyles,
  ContentBoxTabProps,
} from './typings';

const defaultStyles: ContentBoxTabFactoryOptionsStyles = {
  Wrapper: '',
  Title: '',
  Link: '',
  TabWrapper: '',
  TabTitleWrapper: '',
  ActiveTab: '',
  TabTitle: '',
};

const ContentBoxTabFactory = ({
  styles: appStyles,
  ContentBoxBodyRenderer,
  SingleTeaser,
  title: appTitle,
}: ContentBoxTabFactoryOptions) => {
  const ContentBoxTab = (props: ContentBoxTabProps): ReactElement => {
    // use the first tab as initial value
    const [currentTab, setTab] = useState(props?.node?.body?.[0] as TabItem);
    const { isSSR } = useSSRContext();

    if (!props?.node) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    const { node } = props;
    const { body, hideTitle } = node;

    const title: string | null =
      (typeof appTitle === 'function' && appTitle(props.node)) ||
      (typeof appTitle === 'string' && appTitle) ||
      null;

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const ContentBoxBody = ContentBoxBodyRenderer();

    const handleTabClick = (tab: TabItem) => {
      setTab(tab);
    };
    // not in use by now but it will work if the the randomised manual Box
    // will also be enabled for the tab content Box in the BE
    const randomManualItems = body?.filter((tab) => {
      return (tab as any).mode === CONTENT_SOURCE_MANUAL_RANDOM;
    });

    if (randomManualItems && randomManualItems.length > 0 && SingleTeaser) {
      const randomItem =
        (!isSSR && (shuffle(randomManualItems)[0] as any)) ||
        (randomManualItems[0] as any);

      return (
        <SingleTeaser
          component={TEASER_LAYOUT_M}
          contentBoxType={CONTENT_SOURCE_MANUAL_RANDOM}
          {...randomItem}
        />
      );
    }

    return (
      <div className={styles.Wrapper}>
        {!hideTitle && <span className={styles.Title}>{title}</span>}
        {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
        {body?.length > 1 && (
          <div className={styles.TabWrapper}>
            {(body as TabItem[])?.map((tab, index) => (
              <Tab
                key={`content-box-tab-${index}-${tab.title}`}
                tab={tab}
                handleTabClick={handleTabClick}
                styles={styles}
                /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                currentTabTitle={currentTab.title}
              />
            ))}
          </div>
        )}
        <ContentBoxBody
          component={currentTab?.sortBy}
          body={body}
          currentTab={currentTab}
          origin={props?.origin || ''}
        />
      </div>
    );
  };

  return ContentBoxTab;
};

export default ContentBoxTabFactory;
