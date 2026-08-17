import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import defaultComponentFactoryOptions from './defaultComponentFactoryOptions.json';
import defaultComponentProps from './defaultComponentProps.json';
import { TextParagraphFactoryOptions } from '../../../typings';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
// @ts-ignore
let componentFactoryOptions: TextParagraphFactoryOptions = {};

const initialState: Record<string, any> = { window: { width: 1200 } };
const store = createStore((state) => state, initialState);

beforeEach(() => {
  componentFactoryOptions = JSON.parse(
    JSON.stringify(defaultComponentFactoryOptions),
  );

  Component = componentFactory(componentFactoryOptions);
});

describe('[Common] Paragraphs - TextParagraph table factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...defaultComponentProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should return null if there is no textparagraph', () => {
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...defaultComponentProps} textParagraph={null} />
      </Provider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should only render title but not text if textParagraph.header is set and .text is empty.', () => {
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component
          {...defaultComponentProps}
          textParagraph={{ header: 'SomeHeader', text: '' }}
        />
      </Provider>,
    );

    expect(queryByTestId('textparagraph-table')).toBeNull();
    expect(getByTestId('textparagraph-table-header')).not.toBeNull();
  });

  it('Should only render text but not title if text is set and header is empty.', () => {
    const { getByTestId, queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component
          {...defaultComponentProps}
          textParagraph={{ header: '', text: 'SomeText' }}
        />
      </Provider>,
    );

    expect(getByTestId('textparagraph-table')).not.toBeNull();
    expect(getByTestId('textparagraph-table').innerHTML).toMatch('SomeText');
    expect(queryByTestId('textparagraph-table-header')).toBeNull();
  });

  it("Shouldn't render title and text if textParagraph.header and .title are empty.", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component
          {...defaultComponentProps}
          textParagraph={{ header: '', title: '' }}
        />
      </Provider>,
    );

    expect(queryByTestId('textparagraph-table')).toBeNull();
    expect(queryByTestId('textparagraph-table-header')).toBeNull();
  });

  it('Should render header, text and classes correctly.', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component {...defaultComponentProps} />
      </Provider>,
    );

    const text = getByTestId('textparagraph-table');
    const wrapper = getByTestId('textparagraph-table-outer-div');
    const header = getByTestId('textparagraph-table-header');

    // text is rendered correctly
    expect(text.innerHTML).toMatch(defaultComponentProps.textParagraph.text);
    // header is rendered correctly
    expect(header.innerHTML).toMatch(
      defaultComponentProps.textParagraph.header,
    );

    // classes are set correctly
    // @ts-ignore
    expect(wrapper).toHaveClass(defaultComponentFactoryOptions.styles.Wrapper);
    // @ts-ignore
    expect(header).toHaveClass(defaultComponentFactoryOptions.styles.Header);
  });
});
