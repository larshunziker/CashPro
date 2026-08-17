import React from 'react';
import classNames from 'classnames';
import { enrichGridConfigWithData } from './helper';
import { CONTENT_BOX_TYPE } from '../../../shared/constants/content';
import { TYPE_TEASER } from './gridConfigs/constants';
import grid from '../../assets/styles/grid.legacy.css';
import {
  GridItemProps,
  TeaserGridComponent,
  TeaserGridFactoryOptions,
} from './typings';

const teaserGridFactory = <T extends {}>({
  Teaser,
  ContentBox,
  ErrorMessage,
  getGridItem,
  cssGridConfig,
  appValidDataTypes = [],
}: TeaserGridFactoryOptions<T>) => {
  const GridItem = ({
    item,
    index,
    layout,
    origin,
    isNumbered,
  }: GridItemProps<T>) => {
    const { styles } = cssGridConfig[layout];

    let gridItem = null;

    switch (item.type) {
      case TYPE_TEASER: {
        if (!item.data) {
          break;
        }

        const isContentBox = [
          item.data.subtypeValue,
          item.data.__typename,
        ].includes(CONTENT_BOX_TYPE);

        if (isContentBox) {
          if (!item.data.node || !item.data.contentSourceValue) {
            break;
          }
          gridItem = (
            /* @ts-ignore TODO: TS2604 ->  JSX element type 'ContentBox' does not have any construct or call signatures. */
            <ContentBox
              component={item.data.contentSourceValue}
              node={item.data.node as ContentBox}
              origin={origin}
            />
          );
          break;
        }

        gridItem = (
          <Teaser
            /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
            component={item.teaserType}
            origin={origin}
            {...item.data}
            itemIndex={index}
            isNumbered={isNumbered}
          />
        );
        break;
      }

      default:
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        gridItem = getGridItem(item, origin);

        if (!gridItem) {
          gridItem = __DEVELOPMENT__ ? (
            <ErrorMessage
              msg={`TeaserGrid - GridItem: No component for type: ${item.type}`}
            />
          ) : null;
        }
    }

    if (gridItem === null) {
      return null;
    }

    return (
      <div
        className={classNames(styles[`Item${index}`], styles.Item)}
        style={{ '--item-index': index } as React.CSSProperties}
      >
        {gridItem}
      </div>
    );
  };

  const TeaserGrid: TeaserGridComponent<T> = ({
    items,
    layout,
    origin,
    isNumbered,
    isSplittedPageLayout,
  }) => {
    if (!cssGridConfig.hasOwnProperty(layout)) {
      return (
        <ErrorMessage msg={`No TeaserGrid config found: ${String(layout)}`} />
      );
    }

    const { config, styles } = cssGridConfig[layout];
    if (!styles || !layout || !Array.isArray(items) || items.length === 0) {
      return null;
    }

    const enrichedGridConfig = enrichGridConfigWithData({
      gridConfigItems: config.gridGroups,
      data: items,
      appValidDataTypes,
    });

    return (
      <>
        {/* @ts-ignore TODO: TS7006 ->  Parameter 'group' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7006 ->  Parameter 'groupIndex' implicitly has an 'any' type. */}
        {enrichedGridConfig.map((group, groupIndex) => {
          return (
            <div
              className={classNames(
                styles[layout as string],
                'css-teaser-grid',
                {
                  [grid.Container]:
                    config.gridGroups[groupIndex].config.hasContainer &&
                    !isSplittedPageLayout,
                },
              )}
              key={`${String(layout)}-group-${groupIndex}`}
            >
              <div
                className={classNames(
                  styles[`Grid${groupIndex}`],
                  `group-${groupIndex}`,
                )}
              >
                {/* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */}
                {/* @ts-ignore TODO: TS7006 ->  Parameter 'itemIndex' implicitly has an 'any' type. */}
                {group.map((item, itemIndex) => (
                  <GridItem
                    layout={layout}
                    item={item}
                    key={`${String(
                      layout,
                    )}-group-${groupIndex}-item-${itemIndex}`}
                    index={itemIndex}
                    origin={origin}
                    isNumbered={isNumbered}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return TeaserGrid;
};

export default teaserGridFactory;
