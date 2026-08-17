import React from 'react';
import { render } from '@testing-library/react';
import Component from '../../Head';
import mockData from './mockData.json';

describe('[Component] Head', () => {
  test.each([
    [{ title: '', shortTitle: '', subtitle: '', zodiacSlug: '' }],
    [
      {
        title: '',
        shortTitle: mockData.shortTitle,
        subtitle: mockData.subtitle,
        zodiacSlug: mockData.zodiacSlug,
      },
    ],
    [
      {
        title: mockData.title,
        shortTitle: '',
        subtitle: mockData.subtitle,
        zodiacSlug: mockData.zodiacSlug,
      },
    ],
    [
      {
        title: mockData.title,
        shortTitle: mockData.shortTitle,
        subtitle: '',
        zodiacSlug: mockData.zodiacSlug,
      },
    ],
    [
      {
        title: mockData.title,
        shortTitle: mockData.shortTitle,
        subtitle: mockData.subtitle,
        zodiacSlug: '',
      },
    ],
  ])('Should render nothing if there are no valid props', (props) => {
    const { queryByTestId } = render(<Component {...props} isYearly />);

    expect(queryByTestId('head-wrapper')).toBeNull();
  });

  test('Should render head properly', () => {
    const { queryByTestId } = render(
      <Component
        isYearly
        title={mockData.title}
        shortTitle={mockData.shortTitle}
        subtitle={mockData.subtitle}
        zodiacSlug={mockData.zodiacSlug}
      />,
    );

    expect(queryByTestId('icon-wrapper')).not.toBeNull();
    // @ts-ignore
    expect(queryByTestId('title-wrapper')).toHaveTextContent(mockData.title);
    // @ts-ignore
    expect(queryByTestId('short-title-wrapper')).toHaveTextContent(
      mockData.shortTitle,
    );
    // @ts-ignore
    expect(queryByTestId('subtitle-wrapper')).toHaveTextContent(
      mockData.subtitle,
    );
  });
});
