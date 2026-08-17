import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

jest.mock('Link');

const noop = jest.fn();

const buildProps = (items: any[]) => ({
  title: 'News (42)',
  items,
  handleSearchResults: noop,
  handleTitleSearchResults: noop,
});

describe('[Component] AutoSuggestSearchResults', () => {
  it('Should render the section title and the item name when mName is provided (instrument case)', () => {
    const { getByText } = render(
      <Component
        {...buildProps([
          {
            __typename: 'Equity',
            listingId: '1234-4-1',
            mName: 'ABB Ltd N',
            name: 'ABB Ltd N',
            currency: 'CHF',
            marketDescription: 'SIX Swiss Exchange',
            mIsin: 'CH0012221716',
          },
        ])}
      />,
    );

    expect(getByText('News (42)')).not.toBeNull();
    expect(getByText('ABB Ltd N')).not.toBeNull();
    expect(getByText('CHF')).not.toBeNull();
    expect(getByText('SIX Swiss Exchange')).not.toBeNull();
    expect(getByText('CH0012221716')).not.toBeNull();
  });

  // RDP: regression guard for the cash hybrid news bug — news edges from the
  // `globalSearch` query carry `name` (mapped from `node.title`) but no `mName`.
  // Before the fix, the renderer used `entity?.mName || ''`, which made the
  // news section render as empty rows while the section header still showed
  // the count.
  it('Should fall back to entity.name when mName is missing (news case)', () => {
    const { getByText } = render(
      <Component
        {...buildProps([
          {
            __typename: 'Article',
            name: 'ABB übernimmt US-Konkurrenten',
            preferredUri: '/news/abb-uebernimmt-us-konkurrenten-12345',
          },
        ])}
      />,
    );

    expect(getByText('ABB übernimmt US-Konkurrenten')).not.toBeNull();
  });

  it('Should prefer mName over name when both are present', () => {
    const { getByText, queryByText } = render(
      <Component
        {...buildProps([
          {
            __typename: 'Equity',
            listingId: '1234-4-1',
            mName: 'ABB Override',
            name: 'ABB Ltd N',
          },
        ])}
      />,
    );

    expect(getByText('ABB Override')).not.toBeNull();
    expect(queryByText('ABB Ltd N')).toBeNull();
  });

  it('Should not render the section title when items are empty', () => {
    const { queryByText } = render(<Component {...buildProps([])} />);

    expect(queryByText('News (42)')).toBeNull();
  });

  it('Should render an item row even when neither mName nor name is provided', () => {
    const { container, queryByText } = render(
      <Component
        {...buildProps([
          {
            __typename: 'Equity',
            listingId: '1234-4-1',
            currency: 'CHF',
          },
        ])}
      />,
    );

    expect(queryByText('CHF')).not.toBeNull();
    expect(
      container.querySelectorAll('[data-testid="mocked-link"]').length,
    ).toBe(1);
  });
});
