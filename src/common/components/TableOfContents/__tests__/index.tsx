import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import componentFactory from '../factory';
import { ANCHOR_TAG_SCROLL_TO_TOP } from '../../SmoothScroll/constants';

const initialProps = {
  headings: [
    {
      anchorLink: ANCHOR_TAG_SCROLL_TO_TOP,
      text: 'Einleitung',
    },
    {
      anchorLink: 'link-1',
      text: 'first link',
      isSectionTitle: false,
    },
    {
      anchorLink: 'link-2',
      text: 'second link',
      isSectionTitle: false,
    },
    [
      {
        anchorLink: 'section-link-1',
        text: 'section title',
        isSectionTitle: true,
      },
      {
        anchorLink: 'nested-link-1',
        text: 'nested first',
        isSectionTitle: false,
      },
    ],
  ],
};

const observe = jest.fn().mockReturnValue(null);
const disconnect = jest.fn().mockReturnValue(null);

const Component = componentFactory({
  styles: {
    Wrapper: 'Wrapper',
    ActiveLink: 'ActiveLink',
    Divider: 'Divider',
    FirstLevelLink: 'FirstLevelLink',
    Header: 'Header',
    HiddenMdUp: 'HiddenMdUp',
    InnerWrapper: 'InnerWrapper',
    Link: 'Link',
    SecondLevelListEl: 'SecondLevelListEl',
  },
});

beforeEach(() => {
  window.IntersectionObserver = jest.fn().mockReturnValue({
    observe,
    disconnect,
  });
});

afterEach(cleanup);

describe('[Component] Table of Contents', () => {
  it('Should render nothing', () => {
    const { container } = render(
      <Component headings={[]} shouldHideContent={false} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    const { queryByTestId, queryByText, container } = render(
      <MemoryRouter>
        <Component headings={initialProps.headings} shouldHideContent={false} />
      </MemoryRouter>,
    );

    expect(queryByTestId('table-of-contents-wrapper')).toBeTruthy();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByText('first link').getAttribute('href')).toBe('/#link-1');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByText('second link').getAttribute('href')).toBe('/#link-2');
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByText('section title').getAttribute('href')).toBe(
      '/#section-link-1',
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByText('nested first').getAttribute('href')).toBe(
      '/#nested-link-1',
    );

    expect(observe).toHaveBeenCalledTimes(5);

    expect(container).toMatchSnapshot();
  });

  it('Should render correctly with anchers to piano template', () => {
    const { queryByTestId, queryByText, container } = render(
      <MemoryRouter>
        <Component headings={initialProps.headings} shouldHideContent={true} />
      </MemoryRouter>,
    );
    expect(queryByTestId('table-of-contents-wrapper')).toBeTruthy();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByText('first link').getAttribute('href')).toBe(
      '/#piano-inlined',
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByText('second link').getAttribute('href')).toBe(
      '/#piano-inlined',
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByText('section title').getAttribute('href')).toBe(
      '/#piano-inlined',
    );
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(queryByText('nested first').getAttribute('href')).toBe(
      '/#piano-inlined',
    );

    expect(observe).toHaveBeenCalledTimes(0);

    expect(container).toMatchSnapshot();
  });
});
