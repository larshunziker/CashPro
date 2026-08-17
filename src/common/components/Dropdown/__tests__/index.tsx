import React from 'react';
import { act, render } from '@testing-library/react';
import componentFactory from '../factory';

const styles = {
  BodyClass: 'BodyClass',
  OverlayWrapper: 'OverlayWrapper',
  Open: 'Open',
  Wrapper: 'Wrapper',
  CloseWrapper: 'CloseWrapper',
  OptionsWrapper: 'OptionsWrapper',
  Right: 'Right',
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'onClick' implicitly has an 'any' type. */
const Button = ({ onClick }) => {
  return <button onClick={(e) => onClick(e)}></button>;
};

const Icon = () => <>{'Icon'}</>;
const ButtonWithLoading = Button;

const resizewindow = (x: number, y: number) => {
  // @ts-ignore
  window.innerWidth = x;
  // @ts-ignore
  window.innerHeight = y;
  window.dispatchEvent(new Event('resize'));
};

describe('[Common] Dropdown', () => {
  it('Should render factory', () => {
    const Component = componentFactory({
      Icon: Icon,
      ButtonWithLoading: ButtonWithLoading,
      styles: styles,
    });
    // @ts-ignore
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('dropdown-factory-wrapper')).toBeVisible();
  });

  it('Should render factory with children', () => {
    const Component = componentFactory({
      Icon: Icon,
      ButtonWithLoading: ButtonWithLoading,
      styles: styles,
    });
    // @ts-ignore
    const { queryByTestId } = render(
      <Component>
        <p data-testid="dropdown-child-1">Child</p>
        <p data-testid="dropdown-child-2">Child</p>
      </Component>,
    );
    expect(queryByTestId('dropdown-factory-wrapper')).toBeVisible();
    expect(queryByTestId('dropdown-child-1')).toBeInTheDocument();
    expect(queryByTestId('dropdown-child-2')).toBeInTheDocument();
  });

  it('Should render mobile drawer', () => {
    const Component = componentFactory({
      Icon: Icon,
      ButtonWithLoading: ButtonWithLoading,
      styles: styles,
    });
    // @ts-ignore
    const { queryByTestId } = render(<Component />);
    act(() => {
      resizewindow(759, 300);
    });
    expect(queryByTestId('dropdown-overlay-wrapper')).toBeVisible();
  });

  it('Should render desktop dropdown', () => {
    const Component = componentFactory({
      Icon: Icon,
      ButtonWithLoading: ButtonWithLoading,
      styles: styles,
    });
    // @ts-ignore
    const { queryByTestId } = render(<Component />);
    act(() => {
      resizewindow(760, 300);
    });
    expect(queryByTestId('dropdown-overlay-wrapper')).toBeNull();
  });

  it('Should open/close desktop dropdown on click', () => {
    const Component = componentFactory({
      Icon: Icon,
      ButtonWithLoading: ButtonWithLoading,
      styles: styles,
    });
    // @ts-ignore
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('dropdown-factory-wrapper')).toBeVisible();
    // Dropdown should not be open
    expect(queryByTestId('dropdown-options-wrapper')).not.toHaveClass('Open');
    act(() => {
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('dropdown-factory-wrapper')
        .getElementsByTagName('button')[0]
        .click();
    });
    // Dropdown should be open
    expect(queryByTestId('dropdown-options-wrapper')).toHaveClass('Open');
    act(() => {
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('dropdown-factory-wrapper')
        .getElementsByTagName('button')[0]
        .click();
    });
    // Dropdown should not be open
    expect(queryByTestId('dropdown-options-wrapper')).not.toHaveClass('Open');
  });

  it('Should open/close mobile dropdown on click', () => {
    act(() => {
      resizewindow(759, 300);
    });
    const Component = componentFactory({
      Icon: Icon,
      ButtonWithLoading: ButtonWithLoading,
      styles: styles,
    });
    // @ts-ignore
    const { queryByTestId } = render(<Component />);
    expect(queryByTestId('dropdown-factory-wrapper')).toBeVisible();
    // Dropdown should not be open
    expect(queryByTestId('dropdown-options-wrapper')).not.toHaveClass('Open');
    act(() => {
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('dropdown-factory-wrapper')
        .getElementsByTagName('button')[0]
        .click();
    });
    // Dropdown should be open
    expect(queryByTestId('dropdown-options-wrapper')).toHaveClass('Open');
    act(() => {
      // click on x to close
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      const closingX = queryByTestId(
        'dropdown-factory-wrapper',
      ).getElementsByClassName('CloseWrapper')[0] as HTMLElement;
      closingX.click();
    });
    // Dropdown should not be open
    expect(queryByTestId('dropdown-options-wrapper')).not.toHaveClass('Open');
    act(() => {
      // Open dropdown again
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('dropdown-factory-wrapper')
        .getElementsByTagName('button')[0]
        .click();
    });
    expect(queryByTestId('dropdown-options-wrapper')).toHaveClass('Open');
    act(() => {
      // first open dropdown, then click outside of dropdown to close
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('dropdown-factory-wrapper')
        .getElementsByTagName('button')[0]
        .click();
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('dropdown-overlay-wrapper').click();
    });
    expect(queryByTestId('dropdown-options-wrapper')).not.toHaveClass('Open');
  });
});
