import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { Identifier, XYCoord } from 'dnd-core';
import windowStateSelector from '../../../../../../../../../shared/selectors/windowStateSelector';
import { VIEWPORT_XS } from '../../../../../../../../../shared/actions/window';
import Link from '../../../../../../../../../common/components/Link';
import Icon from '../../../../../../components/Icon';
import styles from './styles.legacy.css';
import { ItemTypes, ListItemProps } from './typings';

type DragItemProps = {
  index: number;
  id: string;
  type: string;
};

const ListItem: FC<ListItemProps> = ({
  id,
  name,
  index,
  moveItem,
  removeListItemByIndex,
  moveListItemToTop,
  saveListItems,
  listItemsCount,
  isLoading,
  isDeletable,
  isCustomOrder = false,
}) => {
  const viewportLabel = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => windowStateSelector(state)?.viewport.label,
  );
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.ITEM,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: () => {
      return !isLoading;
    },
  });
  const [{ handlerId }, drop] = useDrop<
    DragItemProps,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.ITEM,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop() {
      if (!ref.current) {
        return;
      }
      saveListItems();
    },
    hover(item: DragItemProps, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  if (!isLoading && listItemsCount > 1 && viewportLabel === VIEWPORT_XS) {
    drop(preview(ref));
  } else if (!isLoading && listItemsCount > 1) {
    drag(drop(ref));
  }

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={classNames(styles.ListItem, {
        [styles.IsLoading]: isLoading,
        [styles.FirstItem]: index === 0,
        [styles.IsDraging]: isDragging,
        [styles.IsDragingInActive]: listItemsCount <= 1,
      })}
    >
      <span ref={drag}>
        <Icon
          type="IconGripDotsVertical"
          addClass={classNames(styles.Icon, styles.DragIcon)}
        />
      </span>

      <Link
        className={classNames(styles.Icon, styles.IconToTop)}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (!isLoading) {
            moveListItemToTop(index);
          }
        }}
      >
        <Icon type="IconArrowUpToLine" />
      </Link>
      <>{name}</>

      {listItemsCount > 1 && isDeletable && (
        <Link
          className={classNames(styles.Icon, styles.IconTrash)}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (!isLoading) {
              removeListItemByIndex(index);
            }
          }}
        >
          {!isCustomOrder && <Icon type="IconTrash" />}
        </Link>
      )}
    </div>
  );
};

export default ListItem;
