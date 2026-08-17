import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';

jest.mock('../../../../../../Link');

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;

const componentFactoryOptions = {
  styles: {
    Wrapper: 'WrapperClassName',
    ContentWrapper: 'ContentWrapperClassName',
    HeaderWrapper: 'LogoWrapperClassName',
    LinkWrapper: 'LinkWrapperClassName',
    LinkList: 'LinkListClassName',
    ListItem: 'ListItemClassName',
    Link: 'LinkClassName',
  },
};

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] MinistageListicle', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should not render if ministageparagraph is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should not render if ministageListicle is empty', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph.ministage = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should not render if links do not exist', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.ministageParagraph.ministage.links;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should not render if there are no links related', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph.ministage.links = [];
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly if Header is not present', () => {
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <Component {...initialProps} />,
    );
    expect(container).toMatchSnapshot();
    expect(queryByTestId('ministage-listicle-header')).toBeNull();
  });

  it('Should render correctly if Header is present', () => {
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"Header"' can't be used to index type '{ styles */
    componentFactoryOptions['Header'] = () => <div>Header</div>;
    Component = componentFactory(componentFactoryOptions);
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <Component {...initialProps} />,
    );
    expect(queryByTestId('ministage-listicle-header')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
});
