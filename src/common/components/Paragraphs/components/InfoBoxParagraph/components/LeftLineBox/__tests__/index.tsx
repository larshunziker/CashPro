import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import mockInfoBoxData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
let componentFactoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'mockData' implicitly has type 'any' in some locations where its type cannot be determined. */
let mockData;
/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const appPragraphRenderer = ({ children }) => (
  <div data-testid="info-box-paragraph-renderer">{children}</div>
);

beforeEach(() => {
  mockData = JSON.parse(JSON.stringify(mockInfoBoxData));
  componentFactoryOptions = {
    paragraphsRenderer: appPragraphRenderer,
    styles: {
      Wrapper: 'WrapperClassname',
      InnerWrapper: 'InnerWrapperClassname',
      Border: 'BorderClassname',
      Devider: 'DeviderClassname',
      ParagraphWrapper: 'ParagraphWrapperClassname',
    },
  };
  /* @ts-ignore TODO: TS2345 ->  Argument of type '{ paragraphsRenderer */
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] InfoBoxPargraph - LeftLineBox Factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockData' implicitly has an 'any' type. */
    const { container } = render(<Component infoBoxParagraph={mockData} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockData' implicitly has an 'any' type. */
    mockData.infoBox = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockData' implicitly has an 'any' type. */
    const { container } = render(<Component infoBoxParagraph={mockData} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing if infobox body is empty array', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockData' implicitly has an 'any' type. */
    mockData.infoBox.body = [];
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockData' implicitly has an 'any' type. */
    const { container } = render(<Component infoBoxParagraph={mockData} />);
    expect(container).toMatchSnapshot();
  });
});
