import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';

const Paragraphs =
  () =>
  /* @ts-ignore TODO: TS7031 ->  Binding element 'pageBody' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
  ({ pageBody, origin }) => (
    <div data-testid="multicolumn-sparagraphs-renderer">
      {pageBody[0].id} - {origin}
    </div>
  );

const componentFactoryOptions = {
  styles: {
    Wrapper: 'WrapperClassName',
    InnerWrapper: 'InnerWrapperClassName',
    FAQInner: 'FAQInnerClassName',
    Title: 'TitleClassName',
    Paragraphs: 'ParagraphsClassName',
  },
  /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'title' implicitly has an 'any' type. */
  ExpansionPanel: ({ children, title }) => (
    <div data-testid="expansionpanel">
      {children} - {title}
    </div>
  ),
  paragraphsRenderer: Paragraphs,
  fallbackTitle: 'Titel',
  orogin: 'Origin',
};

const initialState = { header: { contentType: 'Article' } };

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
const store = createStore((state) => state, initialState);

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] MinistageAccordionParagraph', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  test('Should render correctly', () => {
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });

  it.each([
    { sections: null },
    { sections: {} },
    { sections: [] },
    { sections: '' },
    { sections: { body: [] } },
  ])('Should match snapshot $#', (testCase) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.ministageParagraph.ministage.sections = testCase.sections;
    const { container } = render(
      <Provider store={store}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
