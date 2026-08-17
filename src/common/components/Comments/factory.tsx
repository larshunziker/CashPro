import React, { ReactElement, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, withPropsOnChange, withState } from 'recompose';
import { WatchQueryFetchPolicy, useQuery } from '@apollo/client';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../shared/helpers/ensureCommentsInterface'. '/Users/bhs/code/work/r */
import ensureCommentsInterface from '../../../shared/helpers/ensureCommentsInterface';
import { hashString, noop } from '../../../shared/helpers/utils';
import authStateSelector from '../../../shared/selectors/authStateSelector';
import withComments, {
  WithComments,
} from '../../../shared/decorators/withComments';
import TestFragment from '../../../shared/tests/components/TestFragment';
import { dispatchHybridAppEvent } from '../HybridAppProvider';
import {
  COMMENT_SECTION_ID,
  COMMENT_SIZE,
  COMMENT_STATUS_CLOSED,
  COMMENT_STATUS_OPEN,
} from '../../../shared/constants/comments';
import { GLOBAL_SEARCH_SORT_DESC } from '../../../shared/constants/globalSearch';
import { CommentProps } from './components/Comment/typings';
import {
  CommentsComponent,
  CommentsFactoryOptions,
  CommentsProps,
  CommentsQueryComponentProps,
} from './typings';

export type CommentsPropsInner = CommentsProps &
  WithComments & {
    isClientSideSorted: boolean;
    setClientSideSorted: (isClientSideSorted: boolean) => void;
    parentCommentsCount: number;
    hasMoreCommentsThanVisible: boolean;
    isDescending: boolean;
    currentCommentsPaging: number;
    setCurrentCommentsPaging: Function;
    setCommentsCount: Function;
    isAuthenticated: boolean;
  };

type CommentsListProps = {
  comments: Array<CommentGraphListItem>;
  reverseClientSide: boolean;
  commentStatus: string;
  articleId: string;
  gcid: string;
  commentsData: CommentsQueryComponentProps;
};

const CommentsFactory = ({
  styles,
  grid,
  Icon,
  Comment,
  Commenting,
  CommentSort,
  Pager,
  pagerType,
  setCommentsCountAction,
  GET_COMMENTS,
  /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '(props */
  pager: getPagerJsx = noop,
}: CommentsFactoryOptions): CommentsComponent => {
  const CommentsList = ({
    comments,
    reverseClientSide = false,
    commentStatus,
    articleId,
    gcid,
    commentsData,
  }: CommentsListProps): ReactElement => {
    // create a deep copy to not affect the original references by revert the order
    const commentsCopy: Array<CommentGraphListItem> = !reverseClientSide
      ? comments
      : comments.map(
          (item: CommentGraphListItem): CommentGraphListItem =>
            Object.assign({}, item),
        );

    const commentList: Array<ReactElement> = ensureCommentsInterface(
      commentsCopy,
    ).map(
      ({
        id,
        name,
        createDate,
        body,
        commentReplies,
      }: CommentProps): ReactElement => (
        <Comment
          key={`comment-${id}-${name}-${hashString(body)}`}
          id={id}
          articleId={articleId}
          gcid={gcid}
          name={name}
          createDate={createDate}
          body={body}
          commentReplies={commentReplies}
          commentStatus={commentStatus}
          commentsData={commentsData}
        />
      ),
    );

    if (reverseClientSide) {
      return <>{commentList.reverse()}</>;
    }
    return <>{commentList}</>;
  };

  const Comments = ({
    articleId,
    gcid,
    commentStatus,
    toggleCommentsSortOrder,
    isClientSideSorted,
    setClientSideSorted,
    isDescending,
    hasMoreCommentsThanVisible,
    currentCommentsPaging,
    setCurrentCommentsPaging,
    commentsSortOrder,
    setCommentsCount,
    isAuthenticated,
    isInView = true,
  }: CommentsPropsInner): ReactElement | Array<ReactElement> => {
    const gqlVariables = {
      limit: currentCommentsPaging * COMMENT_SIZE,
      id: articleId,
      offset: 0,
      sort: commentsSortOrder,
    };
    const commentsRef = useRef({ commentStatus, totalCount: 0 });

    // https://www.apollographql.com/docs/react/api/react-apollo/#optionsfetchpolicy
    const fetchPolicy: WatchQueryFetchPolicy = isAuthenticated
      ? 'network-only'
      : 'cache-first';

    const { data, loading } = useQuery<CommentsQueryComponentProps>(
      GET_COMMENTS,
      {
        variables: gqlVariables,
        fetchPolicy,
      },
    );

    useEffect(() => {
      setCommentsCount(data?.commentsById?.totalCount || 0);
      commentsRef.current = {
        commentStatus,
        totalCount: data?.commentsById?.totalCount || 0,
      };
    }, [data?.commentsById?.totalCount, setCommentsCount, commentStatus]);

    useEffect(() => {
      if (isInView && data) {
        dispatchHybridAppEvent('get-comments-data', commentsRef.current);
      }
    }, [isInView, data]);

    if (loading && currentCommentsPaging < 1) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>> | ReactElement<any, strin */
      return null;
    }

    const edges: Array<CommentGraphListItem> | null =
      data?.commentsById?.edges || null;
    const commentCountWithReplies: number = data?.commentsById?.totalCount || 0;
    const commentCountWithoutReplies: number = data?.commentsById?.count || 0;
    const hasComments = !!commentCountWithReplies;

    if (
      commentStatus !== COMMENT_STATUS_OPEN &&
      !hasComments &&
      !__VIAFOURA_DATE__
    ) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>> | ReactElement<any, strin */
      return null;
    }

    const pager = getPagerJsx({
      currentPage: currentCommentsPaging,
      updatePage: setCurrentCommentsPaging,
      itemsCount: commentCountWithoutReplies,
      itemsPerPage: COMMENT_SIZE,
      isLoading: loading,
      text: 'Mehr Kommentare anzeigen',
    });

    const pagerJsx: ReactElement = pager || (
      <Pager
        className={styles.Pager}
        component={pagerType}
        currentPage={currentCommentsPaging}
        updatePage={setCurrentCommentsPaging}
        itemsCount={commentCountWithoutReplies}
        itemsPerPage={COMMENT_SIZE}
      >
        <span>Mehr Kommentare anzeigen</span>
        <Icon addClass={styles.Icon} type="IconChevronDown" />
      </Pager>
    );

    return (
      <div
        className={styles.Inner}
        id={COMMENT_SECTION_ID}
        data-testid="comments-wrapper"
      >
        <div className={styles.Container}>
          <div className={grid.Row}>
            <div className={styles.Column}>
              {__VIAFOURA_DATE__ && (
                <div className={styles.Info}>
                  <div className={styles.TitleWrapper}>Ihr Kommentar</div>
                  <span>Die Kommentarfunktion wurde geschlossen.</span>
                </div>
              )}

              {!__VIAFOURA_DATE__ && commentStatus === COMMENT_STATUS_OPEN && (
                <TestFragment data-testid="comments-commenting-wrapper">
                  <Commenting
                    articleId={articleId}
                    gcid={gcid}
                    commentsData={data}
                  />
                </TestFragment>
              )}
              {hasComments && (
                <TestFragment data-testid="comments-comments-wrapper">
                  <TestFragment data-testid="comments-title-wrapper">
                    <h3 className={styles.Title}>
                      <span className={styles.Counter}>
                        {commentCountWithReplies}
                      </span>{' '}
                      {`Kommentar${commentCountWithReplies !== 1 ? 'e' : ''}`}
                    </h3>
                  </TestFragment>
                  <CommentSort
                    isDescending={isDescending}
                    toggleSortOrder={toggleCommentsSortOrder}
                    isReverseClientSide={!hasMoreCommentsThanVisible}
                    isClientSideSorted={isClientSideSorted}
                    setClientSideSorted={setClientSideSorted}
                  />
                  <CommentsList
                    /* @ts-ignore TODO: TS2322 ->  Type 'CommentGraphListItem[] | null' is not assignable to type 'CommentGraphListItem[]'. */
                    comments={edges}
                    reverseClientSide={isClientSideSorted}
                    commentStatus={commentStatus}
                    articleId={articleId}
                    gcid={gcid}
                    /* @ts-ignore TODO: TS2322 ->  Type 'CommentsQueryComponentProps | undefined' is not assignable to type 'CommentsQueryComponentProps'. */
                    commentsData={data}
                  />
                  {pagerJsx}
                </TestFragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const updateHasMoreCommentsThanVisible = withPropsOnChange(
    ['parentCommentsCount', 'currentCommentsPaging'],
    ({
      parentCommentsCount,
      currentCommentsPaging,
    }: CommentsPropsInner): Record<string, any> => ({
      hasMoreCommentsThanVisible:
        parentCommentsCount > COMMENT_SIZE * currentCommentsPaging,
    }),
  );

  const withSortOrderChanged = withPropsOnChange(
    ['commentsSortOrder'],
    ({ commentsSortOrder }: CommentsPropsInner): Record<string, any> => ({
      isDescending: commentsSortOrder === GLOBAL_SEARCH_SORT_DESC,
    }),
  );

  const withLifecycle = lifecycle<any, any>({
    componentWillUnmount(): void {
      this.props.setCommentsCount(0);
    },
  });

  const mapDispatchToProps: Record<string, any> = {
    setCommentsCount: setCommentsCountAction,
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    isAuthenticated: authStateSelector(state).isAuthenticated,
  });

  const DrupalComments = compose<any, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withComments,
    withSortOrderChanged,
    withState<Record<string, any>, number, string, string>(
      'currentCommentsPaging',
      'setCurrentCommentsPaging',
      1,
    ),
    withState<Record<string, any>, boolean, string, string>(
      'isClientSideSorted',
      'setClientSideSorted',
      false,
    ),
    updateHasMoreCommentsThanVisible,
    withLifecycle,
    // @ts-ignore
  )(Comments);

  return (props: CommentsProps) => {
    if (__VIAFOURA_DATE__) {
      const viafouraDate = new Date(__VIAFOURA_DATE__);
      if (props.lastDate && new Date(props.lastDate) > viafouraDate) {
        return (
          <div className={classNames('viafoura', styles.ViafouraContainer)}>
            <vf-conversations
              reply-limit={3}
              pagination-reply-limit={10}
              initial-height={468}
            />
          </div>
        );
      }
      return (
        <DrupalComments {...props} commentStatus={COMMENT_STATUS_CLOSED} />
      );
    } else {
      return <DrupalComments {...props} />;
    }
  };
};

export default CommentsFactory;
