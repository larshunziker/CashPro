import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import Component from '../index';

let activeIndex = 0;
const FIXED_INNER_HEIGHT = 768;

const stripInlineStyles = (element: Element): Element => {
  const clone = element.cloneNode(true) as Element;
  clone
    .querySelectorAll('[style]')
    .forEach((el) => el.removeAttribute('style'));
  return clone;
};

beforeEach(() => {
  activeIndex = 0;
  Object.defineProperty(global, 'innerHeight', {
    value: FIXED_INNER_HEIGHT,
    writable: true,
    configurable: true,
  });
});

const preparedComponent = (
  <Component activeIndex={activeIndex}>
    {(c) => {
      return (
        <>
          <h1>fixed content</h1>
          <c.ScrollableContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptate, atque? Impedit minima perferendis cupiditate quisquam
              officiis distinctio, quis expedita fugit tempora quaerat, qui
              praesentium ipsum accusamus aut pariatur illo corrupti fuga iusto
              laborum harum laudantium tenetur architecto saepe. Praesentium,
              neque amet quae voluptatum sed corrupti sapiente rem. Voluptas,
              rerum facere.
            </p>
          </c.ScrollableContent>
        </>
      );
    }}
  </Component>
);

describe('[Component] ComponentName', () => {
  it('Should render nothing', () => {
    const { container } = render(
      <>
        {/* @ts-ignore */}
        <Component activeIndex={activeIndex}>
          {/* @ts-ignore */}
          <div>child element</div>
        </Component>
      </>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly', () => {
    const { container } = render(preparedComponent);

    expect(stripInlineStyles(container)).toMatchSnapshot();
  });

  it.each([
    { pageX: 0, pageY: 600 },
    { pageX: 0, pageY: 500 },
    { pageX: 0, pageY: 200 },
    { pageX: 0, pageY: 300 },
    { pageX: 0, pageY: 400 },
    { pageX: 0, pageY: 100 },
    { pageX: 0, pageY: 50 },
    { pageX: 0, pageY: 0 },
    { pageX: 0, pageY: -50 },
  ])('Should render correctly and handle touches', (testCase) => {
    const { container } = render(preparedComponent);

    const touchstart = [{ pageX: 0, pageY: 0 }];
    const touchdest = [testCase];

    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'ChildNode | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.touchStart(container.firstChild, { touches: touchstart });
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'ChildNode | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.touchMove(container.firstChild, { touches: touchdest });
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'ChildNode | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.touchEnd(container.firstChild, { touches: touchdest });
    });
    expect(stripInlineStyles(container)).toMatchSnapshot();
  });

  it('Should render correctly and handle add the touch-move class', () => {
    const { container } = render(preparedComponent);

    const touchstart = [{ pageX: 0, pageY: 0 }];

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'ChildNode | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.touchStart(container.firstChild, { touches: touchstart });

    expect(stripInlineStyles(container)).toMatchSnapshot();
  });

  it('Should render correctly and handle touches and change activeIndex', () => {
    const { container, rerender } = render(
      <Component activeIndex={activeIndex}>
        {(c) => {
          return (
            <>
              <h1>fixed content</h1>
              <c.ScrollableContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptate, atque? Impedit minima perferendis cupiditate
                  quisquam officiis distinctio, quis expedita fugit tempora
                  quaerat, qui praesentium ipsum accusamus aut pariatur illo
                  corrupti fuga iusto laborum harum laudantium tenetur
                  architecto saepe. Praesentium, neque amet quae voluptatum sed
                  corrupti sapiente rem. Voluptas, rerum facere.
                </p>
              </c.ScrollableContent>
            </>
          );
        }}
      </Component>,
    );

    const touchstart = [{ pageX: 0, pageY: 0 }];
    const touchdest = [{ pageX: 0, pageY: 500 }];

    act(() => {
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'ChildNode | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.touchStart(container.firstChild, { touches: touchstart });
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'ChildNode | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.touchMove(container.firstChild, { touches: touchdest });
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'ChildNode | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
      fireEvent.touchEnd(container.firstChild, { touches: touchdest });
    });
    expect(stripInlineStyles(container)).toMatchSnapshot();

    rerender(
      <Component activeIndex={1}>
        {(c) => {
          return (
            <>
              <h1>fixed content</h1>
              <c.ScrollableContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptate, atque? Impedit minima perferendis cupiditate
                  quisquam officiis distinctio, quis expedita fugit tempora
                  quaerat, qui praesentium ipsum accusamus aut pariatur illo
                  corrupti fuga iusto laborum harum laudantium tenetur
                  architecto saepe. Praesentium, neque amet quae voluptatum sed
                  corrupti sapiente rem. Voluptas, rerum facere.
                </p>
              </c.ScrollableContent>
            </>
          );
        }}
      </Component>,
    );

    expect(stripInlineStyles(container)).toMatchSnapshot();
  });
});
