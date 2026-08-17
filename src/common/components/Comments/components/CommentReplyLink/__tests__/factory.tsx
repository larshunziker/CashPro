import { render } from '@testing-library/react';
import React from 'react';
import { IconComponent } from 'src/common/components/Icon/typings';
import componentFactory from '../factory';
import mockData from './mockData.json';
import {
  CommentReplyLinkComponent,
  CommentReplyLinkProps,
  CommentReplyLinkFactoryOptions,
} from '../typings';

const Icon: IconComponent = () => null;

const componentFactoryOptions: CommentReplyLinkFactoryOptions = {
  Icon,
  styles: {
    Icon: 'IconDefaultClass',
    IconChevronUp: 'IconChevronUpDefaultClass',
    IconChevronUpActive: 'IconChevronUpActiveDefaultClass',
    Reply: 'ReplyDefaultClass',
  },
};

let Component: CommentReplyLinkComponent;
let initialProps: CommentReplyLinkProps = {
  isFormVisible: false,
  name: '',
  onReplyButtonClick: () => null,
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] CommentReplyLink Factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    const componentWrapper = queryByTestId('commentreplylink-wrapper');

    expect(componentWrapper).not.toBeNull();
    expect(componentWrapper).toMatchSnapshot();
  });
});
