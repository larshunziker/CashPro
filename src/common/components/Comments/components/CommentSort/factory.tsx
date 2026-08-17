import React, { ReactElement, SyntheticEvent } from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import type {
  CommentSortComponent,
  CommentSortFactoryOptions,
  CommentSortProps,
} from './typings';

type CommentSortPropsInner = CommentSortProps & {
  toggleSortOrderHandler: (event: SyntheticEvent<any>) => void;
};

const doToggleSortOrder = ({
  isReverseClientSide,
  toggleSortOrder,
  isClientSideSorted,
  setClientSideSorted,
}: CommentSortPropsInner): void => {
  if (isReverseClientSide) {
    setClientSideSorted(!isClientSideSorted);
  }

  if (!isReverseClientSide) {
    if (isClientSideSorted) {
      setClientSideSorted(false);
    }
    toggleSortOrder();
  }
};

const withExtendedHandlers = withHandlers({
  toggleSortOrderHandler:
    (props: CommentSortPropsInner) =>
    (event: Event): void => {
      event.preventDefault();
      doToggleSortOrder(props);
    },
});

const CommentSortFactory = ({
  Icon,
  styles,
}: CommentSortFactoryOptions): CommentSortComponent => {
  const CommentSort = ({
    isDescending,
    toggleSortOrderHandler,
    isClientSideSorted,
  }: CommentSortPropsInner): ReactElement => (
    <div className={styles.Sort} data-testid="commentsort-wrapper">
      <span className={styles.Text}>Sortieren nach:</span>
      <button
        className={styles.Action}
        onClick={toggleSortOrderHandler}
        data-testid="commentsort-button"
      >
        <span data-testid="commentsort-order">
          {isDescending && !isClientSideSorted
            ? 'Neuste zuerst'
            : 'Älteste zuerst'}
        </span>
        <Icon
          data-testid="commentsort-icon"
          type={
            isDescending && !isClientSideSorted
              ? 'IconChevronDown'
              : 'IconChevronUp'
          }
          addClass={styles.Icon}
        />
      </button>
    </div>
  );
  return compose<any, any>(withExtendedHandlers)(CommentSort);
};

export default CommentSortFactory;
