import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';

describe('[Common] ElementList', () => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
  let Component;
  /* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
  let initialProps;
  /* @ts-ignore TODO: TS7034 ->  Variable 'componentFactoryOptions' implicitly has type 'any' in some locations where its type cannot be determined. */
  let componentFactoryOptions;

  beforeEach(() => {
    componentFactoryOptions = {
      /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
      Link: ({ children }) => <div data-testid="link">{children}</div>,
      styles: {
        ListItem: 'ListItem',
        Wrapper: 'Wrapper',
      },
    };
    initialProps = {
      data: [
        {
          label: 'Test',
          preferredUri: '/test',
        },
      ],
    };
    Component = componentFactory(componentFactoryOptions);
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('wrapper')).not.toBeNull;
    expect(queryByTestId('link')).not.toBeNull;
  });

  it('Should render link with label inside', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('link').innerHTML).toEqual('Test');
  });

  it('Should render link with icon inside if we pass one', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    componentFactoryOptions.icon = <span className="Icon" />;

    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(componentFactoryOptions);

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('link').querySelector('Icon')).not.toBeNull;
  });
});
