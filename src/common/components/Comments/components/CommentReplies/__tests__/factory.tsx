import { render } from '@testing-library/react';
import React from 'react';
import { IconComponent } from 'src/common/components/Icon/typings';
import componentFactory from '../factory';
import mockData from './mockData.json';
import {
  CommentRepliesComponent,
  CommentRepliesProps,
  CommentRepliesFactoryOptions,
} from '../typings';
import { CommentReplyComponent } from '../../CommentReply/typings';

const CommentReply: CommentReplyComponent = () => null;
const Icon: IconComponent = () => null;

const componentFactoryOptions: CommentRepliesFactoryOptions = {
  CommentReply,
  Icon,
  styles: {
    Icon: 'IconDefaultClass',
    RepliesWrapper: 'RepliesWrapperDefaultClass',
    Toggle: 'ToggleDefaultClass',
    ToggleLink: 'ToggleLinkDefaultClass',
    Wrapper: 'WrapperDefaultClass',
  },
};

let Component: CommentRepliesComponent;
let initialProps: CommentRepliesProps = {
  commentReplies: [],
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps.commentReplies = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] CommentReplies', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render nothing', () => {
    initialProps = {
      commentReplies: [],
    };
    const { container } = render(<Component {...initialProps} />);

    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('commentreplies-wrapper')).not.toBeNull();
  });

  it('Should render one reply correctly', () => {
    initialProps.commentReplies = [{ node: { name: 'test', body: 'test' } }];
    const { queryByTestId, queryAllByTestId } = render(
      <Component {...initialProps} />,
    );

    expect(
      queryByTestId('commentreplies-button-text-wrapper'),
    ).toMatchSnapshot();
    expect(
      queryAllByTestId('commentreplies-commentreply-wrapper').length,
    ).toEqual(1);
  });

  it('Should render multiple replies correctly', () => {
    const { queryByTestId, queryAllByTestId } = render(
      <Component {...initialProps} />,
    );

    expect(
      queryByTestId('commentreplies-button-text-wrapper'),
    ).toMatchSnapshot();
    expect(
      queryAllByTestId('commentreplies-commentreply-wrapper').length,
    ).toEqual(2);
  });

  it('Should render one reply and replies are visible', () => {
    initialProps.commentReplies = [{ node: { name: 'test', body: 'test' } }];
    // @ts-ignore
    initialProps.areRepliesVisible = true;
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(
      queryByTestId('commentreplies-button-text-wrapper'),
    ).toMatchSnapshot();
  });

  it('Should render multiple replies and replies are visible', () => {
    // @ts-ignore
    initialProps.areRepliesVisible = true;
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(
      queryByTestId('commentreplies-button-text-wrapper'),
    ).toMatchSnapshot();
  });
});
