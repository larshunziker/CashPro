import React from 'react';
import { render } from '@testing-library/react';
import Component from '../../TabsTwoCols';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

// Added this to avoid the "Missing Translation" error being logged
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

beforeEach(() => {
  initialProps = {
    tabs: [
      {
        addClass: '',
        anchor: 'ingredients',
        contents: [
          {
            addClass: 'RecipeClass',
            content:
              '<p>50 g Zwiebeln</p><p>2 Lorbeerblätter</p><p>2 Nelken</p><p>1 Prise Curry </p>↵↵<p>1 Prise Muskatnuss</p>',
          },
        ],
        index: 1,
        title: () => <div>Zutaten</div>,
        subtitle: () => <div>Zutaten</div>,
      },
      {
        addClass: '',
        anchor: 'preparation',
        contents: [
          {
            addClass: 'RecipeClass',
            content: 'Zwiebeln würfeln.',
          },
        ],
        index: 1,
        title: () => <div>Zubereitung</div>,
        subtitle: () => <div>Zubereitung</div>,
      },
    ],
  };
});

describe('[Component] TabsTwoCols', () => {
  it('Should render correctly', () => {
    const { queryByTestId, queryAllByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      <Component {...initialProps} />,
    );
    expect(queryByTestId('tabs-two-cols-wrapper')).not.toBeNull();
    const tabContentCount = queryAllByTestId('tab-content-wrapper').length;
    expect(tabContentCount).toBe(2);
  });

  it('Should not render if there is only one tab', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.tabs[1];
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('tabs-two-cols-wrapper')).toBeNull();
  });

  it('Should render empty tab if there is no content', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.tabs[1].contents = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryAllByTestId } = render(<Component {...initialProps} />);
    const tabContentCount = queryAllByTestId('tab-content-wrapper').length;
    expect(tabContentCount).toBe(1);
  });

  it('Should render empty tab if content is not string or object', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.tabs[1].contents[0].content = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryAllByTestId } = render(<Component {...initialProps} />);
    const tabContentCount = queryAllByTestId('tab-content-wrapper').length;
    expect(tabContentCount).toBe(1);
  });

  it('Should render tab if content is an object', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.tabs[1].contents[0].content = <div>Tomaten würfeln</div>;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryAllByTestId } = render(<Component {...initialProps} />);
    const tabContentCount = queryAllByTestId('tab-content-wrapper').length;
    expect(tabContentCount).toBe(2);
  });
});
