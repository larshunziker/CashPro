import React from 'react';
import { render } from '@testing-library/react';
import { MainLinks, SubLinks, createFormattedTrackingLabel } from '../index';
import mockData from './mockData.json';
import mockDataSubLinks from './mockDataSubLinks.json';

jest.mock('LinkLegacy');
jest.mock('Link');
jest.mock('Icon');
jest.mock('../../LanguageSwitch');
jest.mock('../components/MenuFooter');
jest.mock('../components/MenuTeaser');
jest.mock('../../../../Header/components/HeaderInner/components/MenuItems');

/* @ts-ignore TODO: TS7034 ->  Variable 'visibleSubmenuId' implicitly has type 'any' in some locations where its type cannot be determined. */
let visibleSubmenuId;

describe('[Component] Overlay', () => {
  test.each`
    label                | result
    ${'GaultMillau Pop'} | ${'gaultmillau-pop'}
    ${'Züri Isst'}       | ${'züri-isst'}
    ${'Restaurants'}     | ${'restaurants'}
    ${''}                | ${''}
    ${null}              | ${''}
  `(
    'Should return correct tracking label for link label $label',
    ({ label, result }) => {
      expect(createFormattedTrackingLabel({ link: { label } })).toBe(result);
    },
  );

  it('Should render SubLinks correctly', () => {
    const sublinks = SubLinks({});
    const { container } = render(
      //@ts-ignore
      sublinks(JSON.parse(JSON.stringify(mockDataSubLinks))),
    );
    expect(
      container.querySelectorAll('[data-testid="sub-link-item"]'),
    ).toHaveLength(5);
    expect(container).toMatchSnapshot();
  });

  it('Should render no Sublinks when there are no links', () => {
    const sublinks = SubLinks({});
    const { container } = render(
      //@ts-ignore
      sublinks(),
    );
    expect(
      container.querySelectorAll('[data-testid="sub-link-item"]'),
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });

  it('Should render MainLinks correctly', () => {
    const mainLinks = MainLinks({
      /* @ts-ignore TODO: TS7005 ->  Variable 'visibleSubmenuId' implicitly has an 'any' type. */
      visibleSubmenuId,
      navigationToggle: () => null,
      linkClickHandler: () => null,
      renderSubLinks: () => <div data-testid="sublink"></div>,
    });
    const { container } = render(
      //@ts-ignore
      mainLinks(JSON.parse(JSON.stringify(mockData))),
    );
    expect(
      container.querySelectorAll('[data-testid="main-link-item"]'),
    ).toHaveLength(10);
    expect(container).toMatchSnapshot();
  });

  it('Should render no MainLinks when there are no links', () => {
    const mainLinks = MainLinks({
      /* @ts-ignore TODO: TS7005 ->  Variable 'visibleSubmenuId' implicitly has an 'any' type. */
      visibleSubmenuId,
      navigationToggle: () => null,
      linkClickHandler: () => null,
      renderSubLinks: () => <div data-testid="sublink"></div>,
    });
    const { container } = render(
      //@ts-ignore
      mainLinks(),
    );
    expect(
      container.querySelectorAll('[data-testid="main-link-item"]'),
    ).toHaveLength(0);
    expect(container).toMatchSnapshot();
  });
});
