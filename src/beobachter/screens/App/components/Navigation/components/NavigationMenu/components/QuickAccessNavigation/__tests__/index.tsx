import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

const listId = 'service-navigation-links-list';
/* @ts-ignore TODO: TS7034 ->  Variable 'container' implicitly has type 'any' in some locations where its type cannot be determined. */
let container = null;
/* @ts-ignore TODO: TS7034 ->  Variable 'linksList' implicitly has type 'any' in some locations where its type cannot be determined. */
let linksList = null;

beforeEach(() => {
  const { queryByTestId } = render(<Component menu={{}} />);

  container = queryByTestId(listId);
  if (container) {
    linksList = container.querySelectorAll('li a');
  }
});

describe.only('[Component] ServiceNavigation', () => {
  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'container' implicitly has an 'any' type. */
    expect(container).not.toBeNull();
    /* @ts-ignore TODO: TS7005 ->  Variable 'linksList' implicitly has an 'any' type. */
    expect(linksList).not.toBeNull();
  });
});
