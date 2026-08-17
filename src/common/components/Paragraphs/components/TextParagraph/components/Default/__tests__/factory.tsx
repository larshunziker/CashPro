import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import defaultComponentFactoryOptions from './defaultComponentFactoryOptions.json';
import defaultComponentProps from './defaultComponentProps.json';
import { TextParagraphFactoryOptions } from '../../../typings';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
// @ts-ignore
let componentFactoryOptions: TextParagraphFactoryOptions = {};

beforeEach(() => {
  componentFactoryOptions = JSON.parse(
    JSON.stringify(defaultComponentFactoryOptions),
  );

  Component = componentFactory(componentFactoryOptions);
});

describe('[Common] Paragraphs - TextParagraph default factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { container } = render(<Component {...defaultComponentProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Should return null if there is no textparagraph', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component {...defaultComponentProps} textParagraph={null} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should only render title but not text if textParagraph.header is set and .text is empty.', () => {
    const { getByTestId, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component
        {...defaultComponentProps}
        textParagraph={{ header: 'SomeHeader', text: '' }}
      />,
    );

    expect(queryByTestId('textparagraph-text')).toBeNull();
    expect(getByTestId('textparagraph-header')).not.toBeNull();
  });

  it('Should only render text but not title if text is set and header is empty.', () => {
    const { getByTestId, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component
        {...defaultComponentProps}
        textParagraph={{ header: '', text: 'SomeText' }}
      />,
    );

    expect(getByTestId('textparagraph-text')).not.toBeNull();
    expect(getByTestId('textparagraph-text').innerHTML).toMatch('SomeText');
    expect(queryByTestId('textparagraph-header')).toBeNull();
  });

  it("Shouldn't render title and text if textParagraph.header and .title are empty.", () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component
        {...defaultComponentProps}
        textParagraph={{ header: '', title: '' }}
      />,
    );

    expect(queryByTestId('textparagraph-text')).toBeNull();
    expect(queryByTestId('textparagraph-header')).toBeNull();
  });

  it('Should render header, text and classes correctly.', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { getByTestId } = render(<Component {...defaultComponentProps} />);

    const text = getByTestId('textparagraph-text');
    const wrapper = getByTestId('textparagraph-outer-div');
    const header = getByTestId('textparagraph-header');

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
