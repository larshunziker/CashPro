import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import componentFactory from '../factory';
import { ExpansionPanelFactoryOptions, ExpansionPanelProps } from '../typings';

const componentFactoryOptions: ExpansionPanelFactoryOptions = {
  header: () => null,
  styles: {
    ExpansionPanel: 'ExpansionPanelClassName',
    IsOpen: 'IsOpenClassName',
    Header: 'HeaderClassName',
    HeaderContentWrapper: 'HeaderContentWrapperClassName',
    Title: 'TitleClassName',
    BoldTitle: 'BoldTitleClassName',
    Spacer: 'SpacerClassName',
    Icon: 'IconClassName',
    ArrowIcon: 'ArrowIconClassName',
    Content: 'ContentClassName',
  },
};

let initialProps: ExpansionPanelProps = {};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = {
    title: 'Header Title',
  };
});

describe('[Component] ExpansionPanel', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should nothing if title is empty', () => {
    initialProps.title = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...initialProps}>
        <p>Test child Item</p>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
      </Component>,
    );
    expect(container).toMatchSnapshot();
    expect(queryByTestId('expansion-panel-header-component')).toBeNull();
    expect(queryByTestId('expansion-panel-header-title')).not.toBeNull();
  });

  it('Should render in "open" state if the prop "isOpen" is set to true', () => {
    initialProps.duration = 800;
    initialProps.isOpen = true;
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...initialProps}>
        <p>Test child Item</p>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
      </Component>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render in "open" after clicking on the header', async () => {
    const { container, getByText } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...initialProps}>
        <p>Test child Item</p>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
      </Component>,
    );

    fireEvent(
      getByText('Header Title'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    );
    expect(container).toMatchSnapshot();
    await waitFor(() => expect(container.innerHTML).toContain('height: auto'));
  });

  it('Should render in "closed" state after clicking on the header, if the prop "isOpen" is set to true', async () => {
    initialProps.duration = 800;
    initialProps.isOpen = true;
    const { container, getByText } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...initialProps}>
        <p>Test child Item</p>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
      </Component>,
    );

    fireEvent(
      getByText('Header Title'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    );

    expect(container).toMatchSnapshot();
    await waitFor(() => expect(container.innerHTML).toContain('height: 0px'));
  });

  it('Should render header component if header given', async () => {
    /* @ts-ignore TODO: TS7006 ->  Parameter '_' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'isClosed' implicitly has an 'any' type. */
    componentFactoryOptions.header = (_, { isClosed }) => (
      <div>{isClosed ? 'Show more' : 'Show less'}</div>
    );
    Component = componentFactory(componentFactoryOptions);
    const { container, queryByTestId, getByText } = render(
      <Component {...initialProps}>
        <p>Test child Item</p>
      </Component>,
    );

    expect(container).toMatchSnapshot();
    expect(queryByTestId('expansion-panel-header-component')).not.toBeNull();
    expect(queryByTestId('expansion-panel-header-title')).toBeNull();

    fireEvent(
      getByText('Show more'),
      new MouseEvent('click', {
        bubbles: true, // click events must bubble for React to see it
        cancelable: true,
      }),
    );

    expect(container).toMatchSnapshot();
    expect(queryByTestId('expansion-panel-header-component')).not.toBeNull();
    expect(queryByTestId('expansion-panel-header-title')).toBeNull();
  });
});
