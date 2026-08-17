import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component, { getHeaderByProps, getStylesByProps } from '../index';
import { FINANCE_DICTIONARY_TYPE } from '../../../../../../../../shared/constants/content';
import { PAGESCREEN_MARKETING_TYPE } from '../../../../../screens/PageScreen/constants';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

beforeEach(() => {
  initialProps = {
    textParagraph: {
      header: null,
      text: null,
    },
    origin: '',
  };

  initialState = {};
});

describe('[Component] Paragraphs - TextParagraph', () => {
  it('Should render nothing', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {
          //@ts-ignore
          <Component />
        }
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render RichtextWrapper with paragraph and no header', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.textParagraph = {
      text: '<p>lorem ipsum dolor</p>',
    };
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.origin = 'articleDefault';

    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).not.toBe('');
    expect(queryByTestId('textparagraph-header')).toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('textparagraph-text').innerHTML).toBe(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.textParagraph.text,
    );
  });

  it('Should render RichtextWrapper with header and text paragraph', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.textParagraph = {
      header: 'Hello I am the Header',
      text: '<p>lorem ipsum dolor</p>',
    };

    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).not.toBe('');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('textparagraph-header').innerHTML).toBe(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.textParagraph.header,
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByTestId('textparagraph-text').innerHTML).toBe(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.textParagraph.text,
    );
  });

  it('Should return the correct styles for normal text paragraphs', () => {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TextParagraph'. */
    const styles = getStylesByProps({ origin: '', textParagraph: null });
    expect(styles).toMatchSnapshot();
  });

  it('Should return the correct styles for first text paragraphs', () => {
    const styles = getStylesByProps({
      origin: '',
      isFirst: true,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TextParagraph'. */
      textParagraph: null,
    });
    expect(styles).toMatchSnapshot();
  });

  it('Should return the correct styles for not first text paragraphs', () => {
    const styles = getStylesByProps({
      origin: '',
      isFirst: false,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TextParagraph'. */
      textParagraph: null,
    });
    expect(styles).toMatchSnapshot();
  });

  it('Should return the correct styles for normal text paragraphs on PAGESCREEN_MARKETING_TYPE', () => {
    const styles = getStylesByProps({
      origin: PAGESCREEN_MARKETING_TYPE,
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TextParagraph'. */
      textParagraph: null,
    });
    expect(styles).toMatchSnapshot();
  });

  it('Should return the correct header for FINANCE_DICTIONARY_TYPE ', () => {
    const styles = getStylesByProps({
      origin: '',
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TextParagraph'. */
      textParagraph: null,
    });
    const header = getHeaderByProps(
      {
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
        ...initialProps,
        origin: FINANCE_DICTIONARY_TYPE,
        textParagraph: {
          /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
          ...initialProps.textParagraph,
          header: 'header text',
        },
      },
      styles,
    );
    expect(header).toMatchSnapshot();
  });

  it('Should return the correct default header', () => {
    const styles = getStylesByProps({
      origin: '',
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TextParagraph'. */
      textParagraph: null,
    });
    const header = getHeaderByProps(
      {
        /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
        ...initialProps,
        origin: '',
        textParagraph: {
          /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
          ...initialProps.textParagraph,
          header: 'header text',
        },
      },
      styles,
    );
    expect(header).toMatchSnapshot();
  });
});
