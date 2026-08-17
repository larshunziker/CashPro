import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import mockData from './mockData.json';
import { CommentReplyComponent, CommentReplyFactoryOptions } from '../typings';
import { CommentProps } from '../../Comment/typings';
import { CommentBodyComponent } from '../../CommentBody/typings';

const CommentBody: CommentBodyComponent = () => null;

const componentFactoryOptions: CommentReplyFactoryOptions = {
  CommentBody,
  styles: {
    Inner: 'InnerDefaultClass',
    Reply: 'ReplyDefaultClass',
  },
};

let Component: CommentReplyComponent;
let initialProps: CommentProps;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] CommentReply', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('commentreply-wrapper')).not.toBeNull();
  });
});
