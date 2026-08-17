import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import mockData from './mockData.json';
import { CommentSortComponent, CommentSortProps } from '../typings';

let initialProps: CommentSortProps = {
  isDescending: false,
  toggleSortOrder: () => null,
  isReverseClientSide: false,
  isClientSideSorted: false,
  setClientSideSorted: () => null,
};
let Component: CommentSortComponent;
const Icon: Function = () => <i>Icon</i>;
const componentFactoryOptions = {
  Icon,
  styles: {
    Action: 'Action',
    Icon: 'Icon',
    Sort: 'Sort',
    Text: 'Text',
  },
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] CommentSort', () => {
  it('Should render without crashing', () => {
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('commentsort-wrapper')).not.toBeNull();
  });

  it('Should display Neuste zuerst if sort order is descending and not client side sorted', () => {
    initialProps.isDescending = true;
    const { queryByTestId } = render(<Component {...initialProps} />);
    const sorter = queryByTestId('commentsort-order');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(sorter.textContent).toEqual('Neuste zuerst');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(sorter.textContent).not.toEqual('Älteste zuerst');
  });

  it('Should display Älteste zuerst if sort order is ascending and not client side sorted', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    const sorter = queryByTestId('commentsort-order');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(sorter.textContent).toEqual('Älteste zuerst');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(sorter.textContent).not.toEqual('Neuste zuerst');
  });
});
