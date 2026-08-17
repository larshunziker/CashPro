import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';

describe('[Common] AlphabeticNavigation', () => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
  let Component;
  /* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
  let initialProps;
  /* @ts-ignore TODO: TS7034 ->  Variable 'componentFactoryOptions' implicitly has type 'any' in some locations where its type cannot be determined. */
  let componentFactoryOptions;

  beforeEach(() => {
    initialProps = {
      activeLetter: 'A',
      lettersUrl: '/some-url',
      enableOverlay: true,
    };
    componentFactoryOptions = {
      styles: {
        AlphabetWrapper: 'AlphabetWrapper',
        AlphabetOuterWrapper: 'AlphabetOuterWrapper',
        AlphabetInnerWrapper: 'AlphabetInnerWrapper',
        MobileToggle: 'MobileToggle',
        MobileToggleWrapper: 'MobileToggleWrapper',
        MobileToggleInnerWrapper: 'MobileToggleInnerWrapper',
      },
      Alphabet: <div className="Alphabet" />,
      AlphabetOverlay: () => <div className="AlphabetOverlay" />,
      MobileToggleContent: null,
    };
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ styles */
    Component = componentFactory(componentFactoryOptions);
  });

  it('Should render anything', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('wrapper')).not.toBeNull;
  });

  it('Should render Alphabet component', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('alphabet-wrapper').innerHTML).toEqual(
      '<div class="Alphabet"></div>',
    );
  });

  it('Should render toggle button with default value', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('toggle-button').innerHTML).toEqual('A - Z');
  });

  it('Should render toggle button with passed value', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    componentFactoryOptions.MobileToggleContent = <span className="Toggle" />;

    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(componentFactoryOptions);

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('toggle-button').innerHTML).toEqual(
      '<span class="Toggle"></span>',
    );
  });

  it('Should display overlay', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('overlay-wrapper').innerHTML).toEqual(
      '<div class="AlphabetOverlay"></div>',
    );
  });

  it('Should not display overlay and toggle if enableOverlay is false', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.enableOverlay = false;

    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('overlay-wrapper')).toBeNull;
    expect(queryByTestId('toggle-button')).toBeNull;
  });
});
