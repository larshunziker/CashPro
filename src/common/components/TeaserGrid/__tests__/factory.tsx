import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import { TYPE_TEASER } from '../gridConfigs/constants';

describe('[Common] TermsOverview', () => {
  /* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
  let Component;
  /* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
  let initialProps;
  let componentFactoryOptions;

  beforeEach(() => {
    componentFactoryOptions = {
      Teaser: () => <div data-testid="mocked-teaser">teaser</div>,
      /* @ts-ignore TODO: TS7031 ->  Binding element 'msg' implicitly has an 'any' type. */
      ErrorMessage: ({ msg }) => <div data-testid="mocked-error">{msg}</div>,
      getGridItem: () => null,
      cssGridConfig: {
        layout1: {
          config: {
            gridGroups: [
              {
                config: {
                  hasContainer: true,
                },
                items: [
                  {
                    type: TYPE_TEASER,
                    teaserType: 'teaser-layout-m',
                  },
                  {
                    type: TYPE_TEASER,
                    teaserType: 'teaser-layout-m',
                  },
                ],
              },
            ],
          },
          styles: {
            Grid0: 'Grid0',
            Item0: 'Item0',
            Item1: 'Item1',
            Item2: 'Item2',
            Item3: 'Item3',
            Item4: 'Item4',
          },
        },
      },
    };
    initialProps = {
      items: [{}, {}],
      layout: '',
    };
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ Teaser */
    Component = componentFactory(componentFactoryOptions);
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('wrapper')).not.toBeNull;
  });

  it('Should render non existing layout', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.layout = 'non-existing-layout';
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render layout1', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.layout = 'layout1';
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { container } = render(<Component {...initialProps} />);

    expect(container).toMatchSnapshot();
  });
});
