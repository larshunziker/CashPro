import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import mockData from './mockData.json';
import { CommentFormComponent } from '../../CommentForm/typings';
import { CommentReplyLinkComponent } from '../../CommentReplyLink/typings';
import { CommentReplyFormProps, CommentReplyFormComponent } from '../typings';

const CommentForm: CommentFormComponent = () => null;
const CommentReplyLink: CommentReplyLinkComponent = () => null;

const componentFactoryOptions = {
  CommentForm,
  CommentReplyLink,
  styles: {
    Form: 'FormDefaultClass',
    FormWrapper: 'FormWrapperDefaultClass',
  },
};

let Component: CommentReplyFormComponent;
let initialProps: CommentReplyFormProps = {
  articleId: '',
  gcid: '',
  commentId: '',
  name: '',
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] CommentReplyForm Factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('commentreplyform-wrapper')).not.toBeNull();
    expect(queryByTestId('commentreplylink-wrapper')).not.toBeNull();
    expect(queryByTestId('commentform-wrapper')).not.toBeNull();
  });
});
