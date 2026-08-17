import React from 'react';
import { gql } from '@apollo/client';
import { cleanup, render, waitFor } from '@testing-library/react';
import componentFactory, { CommentsPropsInner } from '../factory';
import { authInitialState } from '../../../../shared/reducers/auth';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';
import MockedProvider from '../../../../shared/tests/components/MockedProvider';
import multipleMockData from './multipleMockData.json';
//@TODO: comment back in as soon as mocked Data has been removed from comments/factory.tsx file
// import nullMockData from './nullMockData.json';
import singleMockData from './singleMockData.json';
import grid from '../../../../common/assets/styles/grid.legacy.css';
import { CommentsComponent, CommentsFactoryOptions } from '../typings';

/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'CommentsComponent'. */
let Component: CommentsComponent = null;
const GET_COMMENTS = gql`
  query Comment($limit: Int, $id: String!, $offset: Int, $sort: SortOrderEnum)
  @api(name: cms) {
    commentsById(limit: $limit, id: $id, offset: $offset, sort: $sort) {
      count
      totalCount
      edges {
        node {
          id
          name
          createDate
          body
          commentReplies(limit: 999) {
            edges {
              node {
                id
                name
                createDate
                body
              }
            }
          }
        }
      }
    }
  }
`;

const Icon = () => <>{'Icon'}</>;
const Comment = () => <>{'Comment'}</>;
const Commenting = () => <>{'Commenting'}</>;
const CommentSort = () => <>{'CommentSort'}</>;
const Pager = () => <>{'Pager'}</>;
const setCommentsCount = () => null;
const setCurrentCommentsPaging = () => null;
const setClientSideSorted = () => null;
const toggleCommentsSortOrder = () => null;
//@TODO: comment back in as soon as mocked Data has been removed from comments/factory.tsx file
// const nullData = null;

const initialState: Record<string, any> = {};

const initialProps: CommentsPropsInner = {
  parentCommentsCount: 0,
  isAuthenticated: false,
  commentsSortOrder: '',
  setCommentsSortOrder: () => null,
  gcid: '',
  articleId: 'bm9kZToxMDk4Nw==',
  commentStatus: 'open',
  toggleCommentsSortOrder,
  isClientSideSorted: true,
  setClientSideSorted,
  isDescending: false,
  hasMoreCommentsThanVisible: false,
  currentCommentsPaging: 1,
  setCurrentCommentsPaging,
  setCommentsCount,
};

const variables = {
  limit: 4,
  id: 'bm9kZToxMDk4Nw==',
  offset: 0,
  sort: 'Descending',
};

const componentFactoryOptions: CommentsFactoryOptions = {
  Comment,
  Commenting,
  CommentSort,
  grid,
  Icon,
  Pager,
  pagerType: 'pagerType',
  GET_COMMENTS: GET_COMMENTS,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Function'. */
  setCommentsCountAction: null,
  styles: {
    Container: 'Container',
    Column: 'Column',
    Icon: 'Icon',
    Inner: 'Inner',
    Pager: 'Pager',
    Title: 'Title',
  },
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  // nullData = JSON.parse(JSON.stringify(nullMockData));
  initialState.auth = authInitialState;
});

afterEach(cleanup);

describe('[Component] Comments', () => {
  it('Should return component from factory', () => {
    expect(componentFactory(componentFactoryOptions)).not.toBeNull();
  });

  it('Should render correctly', async () => {
    const { container } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_COMMENTS,
              variables,
            },
            result: {
              data: {
                commentsById: null,
              },
            },
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          <Component {...initialProps} />
        </ReduxProvider>
      </MockedProvider>,
    );
    await waitFor(() => expect(container.innerHTML).not.toBeNull());
  });

  it('Should not render the commenting form if the comment status is hidden', async () => {
    const props = Object.assign({}, initialProps, { commentStatus: 'hidden' });
    const { queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_COMMENTS,
              variables,
            },
            result: {
              data: {
                commentsById: null,
              },
            },
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          <Component {...props} />
        </ReduxProvider>
      </MockedProvider>,
    );
    await waitFor(() =>
      expect(queryByTestId('comments-commenting-wrapper')).toBeNull(),
    );
  });

  it('Should not render the commenting form if the comment status is closed', async () => {
    const props = Object.assign({}, initialProps, { commentStatus: 'closed' });
    const { queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_COMMENTS,
              variables,
            },
            result: {
              data: {
                commentsById: null,
              },
            },
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          <Component {...props} />
        </ReduxProvider>
      </MockedProvider>,
    );
    await waitFor(() =>
      expect(queryByTestId('comments-commenting-wrapper')).toBeNull(),
    );
  });

  //@TODO: comment back in as soon as mocked Data has been removed from comments/factory.tsx file

  // it('Should not render anything if the comments data is null or empty', async () => {
  //   const { queryByTestId } = render(
  //     <MockedProvider
  //       mocks={[
  //         {
  //           request: {
  //             query: GET_COMMENTS,
  //             variables,
  //           },
  //           result: { data: nullData },
  //         },
  //       ]}
  //     >
  //       <ReduxProvider initialState={initialState}>
  //         <Component {...initialProps} />
  //       </ReduxProvider>
  //     </MockedProvider>,
  //   );
  //   await waitFor(() => {
  //     expect(queryByTestId('comments-title-wrapper')).toBeNull();
  //     expect(queryByTestId('comments-comments-wrapper')).toBeNull();
  //   });
  // });

  it('Should display Kommentar (as label in FormattedPlural) if the comments data has only one comment', async () => {
    const { queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_COMMENTS,
              variables,
            },
            result: {
              data: singleMockData,
            },
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          <Component {...initialProps} />
        </ReduxProvider>
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        queryByTestId('comments-title-wrapper').innerHTML.indexOf('Kommentar') >
          0,
      ).toBeTruthy();
      expect(queryByTestId('comments-comments-wrapper')).not.toBeNull();
    });
  });

  it('Should display Kommentare (as label in FormattedPlural) if the comments data has more comments', async () => {
    const { queryByTestId } = render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: GET_COMMENTS,
              variables,
            },
            result: {
              data: multipleMockData,
            },
          },
        ]}
      >
        <ReduxProvider initialState={initialState}>
          <Component {...initialProps} />
        </ReduxProvider>
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        queryByTestId('comments-title-wrapper').innerHTML.indexOf(
          'Kommentare',
        ) > 0,
      ).toBeTruthy();
      expect(queryByTestId('comments-comments-wrapper')).not.toBeNull();
    });
  });
});
