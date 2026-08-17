import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockInfoBoxData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'componentFactoryOptions' implicitly has type 'any' in some locations where its type cannot be determined. */
let componentFactoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'mockData' implicitly has type 'any' in some locations where its type cannot be determined. */
let mockData;
let Component;
/* @ts-ignore TODO: TS7006 ->  Parameter 'infoBoxBody' implicitly has an 'any' type. */
const appPragraphRenderer = (infoBoxBody) => (
  <div data-testid="info-box-paragraph-renderer">{infoBoxBody[0].id}</div>
);

beforeEach(() => {
  mockData = JSON.parse(JSON.stringify(mockInfoBoxData));
  componentFactoryOptions = {
    paragraphsRenderer: appPragraphRenderer,
    styles: {
      Wrapper: 'WrapperClassname',
      LeftWrapper: 'LeftWrapperClassname',
      RightWrapper: 'RightWrapperClassname',
    },
  };
});

describe('[Component] InfoBoxPargraph - TwoColumns Factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(componentFactoryOptions);
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(componentFactoryOptions);
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockData' implicitly has an 'any' type. */
    const { container } = render(<Component infoBoxParagraph={mockData} />);

    expect(container).toMatchSnapshot();
  });

  it('Should render nothing', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(componentFactoryOptions);
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockData' implicitly has an 'any' type. */
    mockData.infoBox = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockData' implicitly has an 'any' type. */
    const { container } = render(<Component infoBoxParagraph={mockData} />);
    expect(container).toMatchSnapshot();
  });

  it('Should render nothing if infobox body is empty array', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    Component = componentFactory(componentFactoryOptions);
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockData' implicitly has an 'any' type. */
    mockData.infoBox.body = [];
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockData' implicitly has an 'any' type. */
    const { container } = render(<Component infoBoxParagraph={mockData} />);
    expect(container).toMatchSnapshot();
  });
});
