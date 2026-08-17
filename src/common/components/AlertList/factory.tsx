import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { getRCTrackingSource } from '../../../shared/helpers/getRCTrackingSource';
import storageAvailable from '../../../shared/helpers/storage';
import { getAlertItemTypeByTypename } from '../SubscribeButton/helper';
import { ALERTLIST_SUBSCRIPTION_ID_KEY } from '../SubscribeButton/constants';
import defaultStyles from './styles.legacy.css';
import type {
  AlertListComponent,
  AlertListFactoryOptions,
  AlertListFactoryOptionsStyles,
  AlertListProps,
} from './typings';

type ListItemProps = {
  nodeLabel?: string;
  nodeTypeName?: string;
  nodeId?: string;
  nodePreferredUri?: string;
  theme: 'light' | 'default';
  styles: AlertListFactoryOptionsStyles;
  isSingleElement: boolean;
};

type AlertListPageMetadata = PianoPageMetadata & { termId?: string };

export const EMAIL_ALERT_ANCHOR_ID = 'email-alert';

const isLocalStorageAvailable: boolean = storageAvailable('localStorage');

const AlertListFactory = ({
  styles: appStyles,
  AlertItem,
  SubscribeButton,
  ExpansionPanel,
}: AlertListFactoryOptions<any>): AlertListComponent => {
  const ListItem = ({
    nodeLabel,
    nodeTypeName,
    nodeId,
    nodePreferredUri,
    theme,
    styles,
    isSingleElement,
  }: ListItemProps) => {
    const pageMetadata: AlertListPageMetadata = useSelector(
      (state: ReduxState) => state?.piano?.pageMetadata,
    );

    if (!nodeLabel || !nodeId || !nodeTypeName) {
      return null;
    }

    pageMetadata && (pageMetadata.termId = nodeId);
    const source = getRCTrackingSource('alert-function', pageMetadata);

    return (
      <div
        className={classNames(styles.AlertListItem, styles.ListItem, {
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [styles.OnlySingleAlertItem]: isSingleElement,
        })}
      >
        {/* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */}
        <AlertItem label={nodeLabel} url={nodePreferredUri} theme={theme}>
          <SubscribeButton
            key={`alertlist-subscribe-button-${nodeId}-${getAlertItemTypeByTypename(
              nodeTypeName,
            )}`}
            theme={theme}
            id={Number(nodeId)}
            label={nodeLabel}
            type={getAlertItemTypeByTypename(nodeTypeName)}
            anchorId={`${EMAIL_ALERT_ANCHOR_ID}s`}
            source={source}
          />
        </AlertItem>
      </div>
    );
  };

  const AlertList = (props: AlertListProps): ReactElement | null => {
    const { items = [], isLongRead, theme = 'default' } = props;

    const defaultAppStyles: AlertListFactoryOptionsStyles = {
      AlertListWrapper: '',
      AlertListInner: '',
      AlertListItem: '',
      OnlySingleAlertItem: '',
    };

    const getStyles = (): AlertListFactoryOptionsStyles => {
      return (
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultAppStyles
      );
    };

    const styles = {
      ItemCount: defaultStyles.ItemCount,
      ListItem: defaultStyles.ListItem,
      ItemCountExpansionPanel: defaultStyles.ItemCountExpansionPanel,
      ExpansionPanelHiddenOnDesktop:
        defaultStyles.ExpansionPanelHiddenOnDesktop,
      ...getStyles(),
    };
    const automaticallySubscribedId: number | null =
      (isLocalStorageAvailable &&
        Number(global.localStorage.getItem(ALERTLIST_SUBSCRIPTION_ID_KEY))) ||
      null;

    // TODO: only open expansionpanel automatically if the automatically subscribed keyword is in there
    const [isExpansionPanelOpen] = useState(!!automaticallySubscribedId);

    if (!items || !Array.isArray(items) || items.length === 0) {
      return null;
    }

    /**
     * This following logic is not easy to understand, so here comes some explanation:
     * We only show 3 items on mobile and 6 items on desktop AND
     * the expansion panel with more items also has to be in the dom for both cases. Since we do not
     * differentiate between mobile and desktop with JS anymore, we came up with this CSS solution
     * Mobile: 6 items are rendered initially. First 3 are shown, last 3 are hidden (they are relevant for Desktop view)
     * All other items are in the initially hidden expansion panel including those 3 hidden items on mobile (duplicates).
     * Desktop: 6 items are rendered and shown initially.
     * In the expansion panel the first three entries (relevant for mobile) are hidden (duplicates)
     */
    return (
      <div
        id="alert-list"
        className={classNames({
          [styles.AlertListWrapper]: !isLongRead,
        })}
      >
        <div className={classNames(styles.AlertListInner, styles.ItemCount)}>
          {items.slice(0, 6).map(({ node }) => (
            <ListItem
              key={`alert-item-${getAlertItemTypeByTypename(
                node?.__typename,
              )}-${node.id}`}
              nodeId={node.id}
              nodeTypeName={node?.__typename}
              nodeLabel={node?.label}
              nodePreferredUri={node.preferredUri}
              theme={theme}
              styles={styles}
              isSingleElement={items.length === 1}
            />
          ))}
          {items.length > Number(3) && (
            <div
              className={classNames(styles.ItemCountExpansionPanel, {
                [styles.ExpansionPanelHiddenOnDesktop]:
                  items.length - 3 <= Number(3),
              })}
            >
              <ExpansionPanel
                theme={theme}
                isOpen={isExpansionPanelOpen}
                toggleOnChildrenClick={false}
              >
                {items.slice(3).map(({ node }) => (
                  <ListItem
                    key={`alert-item-${getAlertItemTypeByTypename(
                      node?.__typename,
                    )}-${node.id}`}
                    nodeId={node.id}
                    nodeTypeName={node?.__typename}
                    nodeLabel={node?.label}
                    nodePreferredUri={node.preferredUri}
                    theme={theme}
                    styles={styles}
                    isSingleElement={items.length === 1}
                  />
                ))}
              </ExpansionPanel>
            </div>
          )}
        </div>
      </div>
    );
  };
  /* @ts-ignore TODO: TS2322 ->  Type '(props */
  return AlertList;
};

export default AlertListFactory;
