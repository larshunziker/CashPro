import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import placeholderParagraphFactory from '../factory';
import mockOptions from './mockData.json';

/* @ts-ignore TODO: TS7006 ->  Parameter 'fn' implicitly has an 'any' type. */
let Component = (fn) => fn;
const initialState = {};

const componentFactoryOptions = {
  styles: {
    Wrapper: '.SampleWrapperClass',
    Title: '.SampleTitleClass',
    TitleWrapper: '.SampleTitleWrapperClass',
  },
};

let mockOptionsCopy: any = null;

beforeEach(() => {
  mockOptionsCopy = JSON.parse(JSON.stringify(componentFactoryOptions));
  mockOptionsCopy.placeholderParagraph = JSON.parse(
    JSON.stringify(mockOptions),
  );
  Component = placeholderParagraphFactory(componentFactoryOptions);
});

describe('[Common] Paragraphs - placeholderParagraph factory', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render factory correctly without title', () => {
    mockOptionsCopy.placeholderParagraph.title = null;
    const store = createStore((state) => state, initialState);

    const { queryByTestId } = render(
      <Provider store={store}>
        <Component {...mockOptionsCopy} />
      </Provider>,
    );

    expect(
      queryByTestId('placeholder-paragraph-factory-wrapper'),
    ).not.toBeNull();
    expect(queryByTestId('placeholder-paragraph-factory-header')).toBeNull();
  });
});
