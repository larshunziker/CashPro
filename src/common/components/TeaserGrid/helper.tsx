import {
  TYPE_AD,
  TYPE_RIGHT_WIDGET,
  TYPE_TEASER,
} from './gridConfigs/constants';
import { EnrichedGridConfig } from './typings';

type EnrichGridConfigWithDataOptions = {
  gridConfigItems: Record<string, any>;
  data: TeaserInterface[] | TeasableInterfaceGraphList[];
  appValidDataTypes?: Array<string>;
};

/**
 * Removes null values and dangling Ads from gridConfigGroup.
 * Dangling Ads are Ad-Positions in the grid AFTER null values
 * i.e. {griditem, Ad, null, null, Ad} <- this last Ad will be removed
 */
const sanitizeGridConfigItems = (
  gridConfigItems: EnrichedGridConfig[],
): EnrichedGridConfig[] => {
  const firstEmptyItemIndex = gridConfigItems.findIndex(
    (gridItem) => gridItem.data === null,
  );

  const hasMoreItems =
    gridConfigItems
      .slice(0, firstEmptyItemIndex)
      .findIndex(({ data, type }) => data !== null && type !== TYPE_AD) > 0;

  // Cut array on last valid item
  if (firstEmptyItemIndex > 0 && !hasMoreItems) {
    return gridConfigItems.filter((item, index) => {
      if (
        index < firstEmptyItemIndex ||
        (item &&
          item.type !== TYPE_AD &&
          (item.data || item.type !== TYPE_TEASER)) ||
        item.type === TYPE_RIGHT_WIDGET
      ) {
        return true;
      }
    });
  }

  return gridConfigItems.filter((item) => item);
};

export const enrichGridConfigWithData = ({
  gridConfigItems,
  data,
  appValidDataTypes = [],
}: EnrichGridConfigWithDataOptions) => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'notWidgetData' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const notWidgetData = [];
  /* @ts-ignore TODO: TS7034 ->  Variable 'widgetsData' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const widgetsData = [];
  let itemIndex = 0;
  // we will only split data to WIDGET and no WIDGET for simplicity
  data.map((item) => {
    /* @ts-ignore TODO: TS2339 ->  Property 'type' does not exist on type 'TeaserInterface | TeasableInterfaceGraphList'. */
    if (item.type === TYPE_RIGHT_WIDGET) {
      widgetsData.push(item);
    } else {
      notWidgetData.push(item);
    }
  });
  const validDataTypes = [TYPE_TEASER, ...appValidDataTypes];

  const enrichData = (item: EnrichedGridConfig, downloadPriority: string) => {
    // only enrich with data if type matches validDataTypes,
    // to make sure no data gets skipped if an adslot is rendered
    if (validDataTypes.includes(item.type)) {
      const enrichedData =
        /* @ts-ignore TODO: TS7005 ->  Variable 'notWidgetData' implicitly has an 'any[]' type. */
        (notWidgetData[itemIndex] && {
          /* @ts-ignore TODO: TS7005 ->  Variable 'notWidgetData' implicitly has an 'any[]' type. */
          ...notWidgetData[itemIndex],
          downloadPriority,
        }) ||
        null;

      const enrichedSubItem = {
        ...item,
        data: enrichedData,
      };
      itemIndex++;
      return enrichedSubItem;
    } else {
      if (item.type === TYPE_RIGHT_WIDGET) {
        /* @ts-ignore TODO: TS7005 ->  Variable 'widgetsData' implicitly has an 'any[]' type. */
        const typeItemData = widgetsData?.shift();
        if (typeItemData) {
          return {
            ...item,
            data: typeItemData,
          };
        }
      }
      return item;
    }
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'group' implicitly has an 'any' type. */
  const enriched = gridConfigItems.map((group) => {
    let itemsCopy = JSON.parse(JSON.stringify(group.items));
    if (group?.config?.autoFill) {
      if (group.items.length > 1) {
        itemsCopy.pop();
      }
      let itemsToFill =
        notWidgetData.length -
          /* @ts-ignore TODO: TS2363 ->  The right-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type. */
          (group.items.length - (group.items.length > 1 && 2)) || 1;
      if (itemsToFill < 0) {
        itemsToFill = 0;
      }
      itemsCopy = [
        ...itemsCopy,
        ...Array(itemsToFill).fill(group.items[group.items.length - 1]),
      ];
    }

    const displayOnLastPositionItem = itemsCopy.filter(
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      (item) => item.forceDisplayOnLastPosition,
    );

    if (displayOnLastPositionItem && displayOnLastPositionItem.length > 0) {
      itemsCopy = itemsCopy.splice(0, notWidgetData.length);
      itemsCopy.push(...displayOnLastPositionItem);
    }

    return itemsCopy.map((gridItem: EnrichedGridConfig) => {
      const downloadPriority = gridItem.downloadPriority || 'default';

      if (gridItem?.items) {
        return {
          ...gridItem,
          items: gridItem.items.map((gridItem) =>
            enrichData(gridItem, downloadPriority),
          ),
        };
      }
      return enrichData(gridItem, downloadPriority);
    });
  });

  const sanitizedGridConfigItems = enriched.map(
    (gridConfigGroup: EnrichedGridConfig[]) =>
      sanitizeGridConfigItems(gridConfigGroup),
  );
  return sanitizedGridConfigItems;
};
