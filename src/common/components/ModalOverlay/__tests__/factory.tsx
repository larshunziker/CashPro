import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import modalFactory from '../factory';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

const initialState = {
  height: 500,
  scrollTop: 0,
  viewport: {
    label: 'viewport/xs',
    from: 0,
    to: 759,
  },
  imageBreakpoint: {
    label: '0',
    from: 0,
    to: 759,
  },
  width: 320,
};

const store = createStore((state) => state, initialState);
const MODAL_ROOT_ID = 'MODAL_ROOT';
const appStyles = () => ({
  BodyClass: 'ClassNameBodyClass',
  FadeIn: 'ClassNameFadeIn',
  Wrapper: 'ClassNameWrapper',
});

beforeAll(() => {
  Component = modalFactory({
    styles: appStyles,
    modalRootId: MODAL_ROOT_ID,
  });
});

describe('[Common] modal overlay component', () => {
  test.each([
    {
      children: <div>test</div>,
      isDifferentFlavour: true,
      isVisible: true,
    },
    {
      children: <div>test 2</div>,
      isDifferentFlavour: false,
      isVisible: false,
    },
  ])('Should modal overlay component match snapshot $# ', (testCase) => {
    const { container } = render(
      <>
        <div id={MODAL_ROOT_ID} />
        <Provider store={store}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component {...testCase} />
        </Provider>
      </>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should present modal content when isVisible is true', () => {
    const props = {
      children: <div>test</div>,
      isDifferentFlavour: false,
      isVisible: true,
    };

    const { queryByTestId } = render(
      <>
        <div id={MODAL_ROOT_ID} />
        <Provider store={store}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component {...props} />
        </Provider>
      </>,
    );

    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('modal-wrapper').innerHTML.includes('test'),
    ).toBeTruthy();
  });

  it('Should not present modal when isVisible is false', () => {
    const props = {
      children: <div>test</div>,
      isDifferentFlavour: false,
      isVisible: false,
    };

    const { container } = render(
      <>
        <div id={MODAL_ROOT_ID} />
        <Provider store={store}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
          <Component {...props} />
        </Provider>
      </>,
    );

    expect(container).toMatchSnapshot();
  });
});
