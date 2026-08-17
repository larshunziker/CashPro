import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';

describe('[Common] AlphabetOverlay', () => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
  let Component;
  /* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
  let initialProps;

  const componentFactoryOptions = {
    styles: {
      GridRow: 'GridRow',
      GridColumns: 'GridColumns',
      MobileMenu: 'MobileMenu',
      MobileMenuOpen: 'MobileMenuOpen',
      MobileCloseIconWrapper: 'MobileCloseIconWrapper',
      MobileMenuInner: 'MobileMenuInner',
      Wrapper: 'Wrapper',
    },
    Alphabet: <div className="Alphabet" />,
    CloseIcon: <div className="CloseIcon" />,
  };

  beforeEach(() => {
    Component = componentFactory(componentFactoryOptions);
    initialProps = {
      isMobile: true,
      isNavigationOpen: false,
      toggleMobileNavigation: jest.fn(),
    };
  });

  it('Should render if isMobile is true', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('wrapper')).not.toBeNull;
  });

  it('Should not render if isMobile is false', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.isMobile = false;

    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('wrapper')).toBeNull;
  });

  it('Should have correct class if is open', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.isNavigationOpen = true;

    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('mobile-menu').classList.contains('MobileMenuOpen'))
      .toBeTruthy;
  });

  it('Should render alphabet', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.isNavigationOpen = true;

    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('alphabet-wrapper').innerHTML).toEqual(
      '<div class="Alphabet"></div>',
    );
  });
});
