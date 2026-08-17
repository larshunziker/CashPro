import React from 'react';
import { render } from '@testing-library/react';
import { ArticlePage } from '../index';

jest.mock('../components/Default', () => () => null);
jest.mock('../components/Swipeable', () => () => null);
jest.mock('../../../components/Helmet', () => () => null);

const baseArticle = {
  id: 'article-id-123',
  gcid: 'gcid-1',
  nid: 1,
  title: 'title',
  shortTitle: 'short',
  lead: 'lead',
  subtypeValue: 'default',
  channel: { id: 'channel-1' },
  commentStatus: 'enabled',
  preferredUri: '/foo/bar',
  socialMediaTitle: 'social title',
  restrictionStatus: 'paid',
  activeMenuTrail: { edges: [] },
  createDate: '2024-01-01',
  __typename: 'Article',
};

describe('[Component] Cash ArticlePage', () => {
  it('dispatches setHeaderData with the article id on mount', () => {
    const setHeaderData = jest.fn();
    const resetHeaderData = jest.fn();

    render(
      <ArticlePage
        article={baseArticle}
        setHeaderData={setHeaderData}
        resetHeaderData={resetHeaderData}
      />,
    );

    expect(setHeaderData).toHaveBeenCalledTimes(1);
    expect(setHeaderData).toHaveBeenCalledWith(
      expect.objectContaining({
        articleData: expect.objectContaining({ id: 'article-id-123' }),
        contentType: 'Article',
      }),
    );
    expect(resetHeaderData).not.toHaveBeenCalled();
  });

  it('dispatches resetHeaderData on unmount', () => {
    const setHeaderData = jest.fn();
    const resetHeaderData = jest.fn();

    const { unmount } = render(
      <ArticlePage
        article={baseArticle}
        setHeaderData={setHeaderData}
        resetHeaderData={resetHeaderData}
      />,
    );

    expect(resetHeaderData).not.toHaveBeenCalled();

    unmount();

    expect(resetHeaderData).toHaveBeenCalledTimes(1);
  });
});
