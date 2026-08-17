import React from 'react';
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
    Container: 'ContainerClass',
    Row: 'RowClass',
  },
  paragraphsRenderer: Paragraphs,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'multiColumnParagraph' implicitly has an 'any' type. */
  getGridColsByProps: ({ multiColumnParagraph }) => {
    return multiColumnParagraph?.style &&
      multiColumnParagraph.style.indexOf('three') !== -1
      ? 'grid.ColSm8'
      : 'grid.ColSm12';
  },
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] MultiColumnParagraph', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it.each([
    { multiColumnParagraph: null },
    { multiColumnParagraph: {} },
    { multiColumnParagraph: [] },
    { multiColumnParagraph: '' },
    { ...JSON.parse(JSON.stringify(mockData)) },
    {
      multiColumnParagraph: {
        ...JSON.parse(JSON.stringify(mockData)).multiColumnParagraph,
        style: 'two_column',
      },
    },
  ])('Should match snapshot $#', (testCase) => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component multiColumnParagraph={testCase.multiColumnParagraph} />,
    );

    expect(container).toMatchSnapshot();
  });
});
