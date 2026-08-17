import { ComponentType } from 'react';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import withState from 'recompose/withState';
import {
  GLOBAL_SEARCH_SORT_ASC,
  GLOBAL_SEARCH_SORT_DESC,
} from '../constants/globalSearch';
import namedComponent from './namedComponent';

export type WithComments = {
  commentsSortOrder: string;
  setCommentsSortOrder: Function;
  toggleCommentsSortOrder: Function;
};

const extendWithHandlers: Function = withHandlers({
  toggleCommentsSortOrder:
    /* @ts-ignore TODO: TS7031 ->  Binding element 'commentsSortOrder' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'setCommentsSortOrder' implicitly has an 'any' type. */

    ({ commentsSortOrder, setCommentsSortOrder }) =>
      (): void => {
        setCommentsSortOrder(
          commentsSortOrder === GLOBAL_SEARCH_SORT_DESC
            ? GLOBAL_SEARCH_SORT_ASC
            : GLOBAL_SEARCH_SORT_DESC,
        );
      },
});

export default (Component: ComponentType<any>): Function =>
  compose<any, any>(
    namedComponent('withCommentsHandlers'),
    withState<Record<string, any>, string, string, string>(
      'commentsSortOrder',
      'setCommentsSortOrder',
      GLOBAL_SEARCH_SORT_DESC,
    ),
    extendWithHandlers,
  )(Component);
