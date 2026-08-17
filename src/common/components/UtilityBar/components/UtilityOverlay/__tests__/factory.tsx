import React from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import utilityOverlayFactory from '../factory';
import { UTILITY_BAR_OVERLAY_ORIGIN_HEADER } from '../constants';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

const componentFactoryOptions = {
  UtilityBar: () => (
    <div
      className="UtilityBar"
      data-testid="utility-overlay-utility-bar-wrapper"
    />
  ),
  styles: {
    Wrapper: 'WrapperClassName',
    Title: 'TitleClassName',
    CloseButton: 'CloseButtonClassName',
    WrapperToggle: 'WrapperToggleClassName',
    WrapperSticky: 'WrapperStickyClassName',
    UtilityBarWrapper: 'UtilityBarWrapper',
  },
};

beforeEach(() => {
  initialProps = {
    enabledUtilities: ['utility-bar/print'],
    isOverlayVisible: true,
    toggleOverlayVisible: jest.fn(),
  };
  Component = utilityOverlayFactory(componentFactoryOptions);
});

describe('[Component] UtilityOverlay', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <Component {...initialProps} />,
    );

    expect(container).toMatchSnapshot();
    expect(queryByTestId('utility-overlay-portal-wrapper')).toBeNull();
    expect(queryByTestId('utility-overlay-wrapper')).not.toBeNull();
    expect(queryByTestId('utility-overlay-title-wrapper')).toBeNull();
    expect(queryByTestId('utility-overlay-utility-bar-wrapper')).not.toBeNull();
  });

  it('Should render correctly as portal', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.isUsingPortal = true;
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <Component {...initialProps}>
        <div id="utility-bar-overlay" />
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
      </Component>,
    );

    expect(queryByTestId('utility-overlay-portal-wrapper')).not.toBeNull();
    expect(queryByTestId('utility-overlay-wrapper')).toBeNull();
  });

  it('Should render title correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.overlayTitle = 'overlayTitle';
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('utility-overlay-wrapper')).not.toBeNull();
    expect(queryByTestId('utility-overlay-title-wrapper')).not.toBeNull();
  });

  it('Should close overlay with button click', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    const closeButton = queryByTestId('utility-overlay-close-button');
    expect(queryByTestId('utility-overlay-wrapper')).not.toBeNull();

    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.click(closeButton);
    });
    await waitFor(() => {
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      expect(initialProps.toggleOverlayVisible).toHaveBeenCalledTimes(1);
    });
  });

  it('Should close overlay when scroll to top', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.isOverlayVisible = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.isScrolledToCollapse = false;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.origin = UTILITY_BAR_OVERLAY_ORIGIN_HEADER;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('utility-overlay-wrapper')).not.toBeNull();
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    expect(initialProps.toggleOverlayVisible).toHaveBeenCalledTimes(1);
  });

  it('Should not render UtilityBar when there are no enabled utilities', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.enabledUtilities = [];
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('utility-overlay-wrapper')).not.toBeNull();
    expect(queryByTestId('utility-overlay-utility-bar-wrapper')).toBeNull();
  });
});
