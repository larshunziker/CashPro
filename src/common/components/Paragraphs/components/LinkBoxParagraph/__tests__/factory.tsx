/**
 * @file   LinkBoxParagraph factory tests
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-05-13 14:21:32
 */

import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';

const componentFactoryOptions = {
  styles: {
    Title: 'TitleClassName',
    GroupWrapper: 'GroupWrapperClassName',
    Link: 'LinkClassName',
  },
  /* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'path' implicitly has an 'any' type. */
  Link: ({ label, path }) => <a href={path}>{label}</a>,
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
const propsWithEmptyEdges = JSON.parse(JSON.stringify(mockData));
propsWithEmptyEdges.linkBox.links.edges = null;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] LinkBoxParagraph', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it.each([
    { props: null },
    { props: {} },
    { props: [] },
    { props: '' },
    { props: JSON.parse(JSON.stringify(mockData)) },
    { props: propsWithEmptyEdges },
  ])('Should match snapshot $#', (testCase) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { container } = render(<Component {...testCase.props} />);

    expect(container).toMatchSnapshot();
  });
});
