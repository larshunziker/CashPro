import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import mockData from './mockData.json';
import {
  CommentComponent,
  CommentFactoryOptions,
  CommentProps,
} from '../typings';
import { CommentBodyComponent } from '../../CommentBody/typings';
import { CommentRepliesComponent } from '../../CommentReplies/typings';
import { CommentReplyFormComponent } from '../../CommentReplyForm/typings';

const CommentBody: CommentBodyComponent = () => null;
const CommentReplies: CommentRepliesComponent = () => null;
const CommentReplyForm: CommentReplyFormComponent = () => null;

const componentFactoryOptions: CommentFactoryOptions = {
  CommentBody,
  CommentReplies,
  CommentReplyForm,
  styles: {
    Comment: 'CommentDefaultClass',
  },
};

let Component: CommentComponent;
let initialProps: CommentProps = {
  name: '',
  createDate: '',
  body: '',
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] Comment', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('comment-wrapper')).not.toBeNull();
  });

  it('Should render CommentReplyForm if commentstatus is open', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('comment-commentreplyform-wrapper')).not.toBeNull();
  });

  it('Should render CommentReplyForm if commentstatus is hidden', () => {
    initialProps.commentStatus = 'hidden';
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('comment-commentreplyform-wrapper')).not.toBeNull();
  });

  it('Should not render CommentReplyForm if commentstatus is closed', () => {
    initialProps.commentStatus = 'closed';
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('comment-commentreplyform-wrapper')).toBeNull();
  });

  it('Should render CommentReplies if replies exist', () => {
    initialProps.commentReplies = {
      edges: [
        {
          node: {
            body: 'Test',
            id: '1',
            name: 'Test',
            createDate: '2017',
            __typename: 'Comment',
          },
          __typename: 'CommentEdge',
        },
      ],
      __typename: 'CommentConnection',
    };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('comment-commentreplies-wrapper')).not.toBeNull();
  });

  it('Should not render CommentReplies if replies are empty', () => {
    initialProps.commentReplies = {
      edges: [],
      __typename: 'CommentConnection',
    };
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('comment-commentreplies-wrapper')).toBeNull();
  });

  it('Should not render CommentReplies if replies are null', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('comment-commentreplies-wrapper')).toBeNull();
  });
});
