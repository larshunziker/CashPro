import React from 'react';
import { render } from '@testing-library/react';
import componentFactory from '../factory';

window.__GRAPHQL_HOST__ = 'https://api.preview.stage.com/';

const componentFactoryOptions = {
  /* @ts-ignore TODO: TS7031 ->  Binding element 'path' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'label' implicitly has an 'any' type. */
  Link: ({ path, label }) => <a href={path}>{label}</a>,
  closeIcon: <span>icon</span>,
  styles: {
    Wrapper: 'Wrapper',
    WrapperInner: 'WrapperInner',
    ListWrapper: 'ListWrapper',
    ListItem: 'ListItem',
    Link: 'Link',
    CloseButtonWrapper: 'CloseButtonWrapper',
    CloseButton: 'CloseButton',
  },
};

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] EditButtons', () => {
  test('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render link for content edit if we pass editContentUri prop', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component editContentUri={'/content/123/edit'} />,
    );

    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('content-edit-link').innerHTML.includes('Edit Content'),
    ).toBeTruthy();
  });

  it('Should render link for relation edit if we pass editRelationUri prop', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component editRelationUri={'/relation/123/edit'} />,
    );

    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('relation-edit-link').innerHTML.includes('Edit Relation'),
    ).toBeTruthy();
  });

  it('Should render link for content clone if we pass cloneContentUri prop', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component cloneContentUri={'/clone/123/content'} />,
    );

    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('content-clone-link').innerHTML.includes('Clone Content'),
    ).toBeTruthy();
  });

  it('Should render close button', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
      <Component
        editContentUri={'/content/123/edit'}
        editRelationUri={'/relation/123/edit'}
        cloneContentUri={'/content/123/clone'}
      />,
    );

    expect(queryByTestId('close-button')).toBeTruthy();
  });

  it('Should render nothing if we dont pass id and uri prop', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component />);

    expect(queryByTestId('edit-buttons-wrapper')).toBeNull();
  });
});
