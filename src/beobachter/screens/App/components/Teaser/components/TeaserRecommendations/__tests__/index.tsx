import React from 'react';
import { render } from '@testing-library/react';
import { getShortTitleElementByProps } from '../../../../Teaser/shared/helpers';
import { BeoPlusBadge, getStylesByProps } from '../index';
import { RESTRICTION_STATUS_PAID } from '../../../../../../../../shared/constants/content';

describe('[Component] Teaser - TeaserRecommendations', () => {
  it('Should return styles by props', () => {
    // @ts-ignore
    const shortTitle = getStylesByProps({ addClass: 'addClass' });
    expect(shortTitle).toMatchSnapshot();
  });

  it('Should return shortTitle by props', () => {
    // @ts-ignore
    const styles = getShortTitleElementByProps('ShortTitle')({
      shortTitle: 'Some Short Title',
    });
    expect(styles).toMatchSnapshot();
  });

  it('Should return shortTitle by props', () => {
    // @ts-ignore
    const styles = getShortTitleElementByProps('ShortTitle')({
      link: {
        label: 'Some label Title',
      },
    });
    expect(styles).toMatchSnapshot();
  });

  it('Should return empty shortTitle by props', () => {
    // @ts-ignore
    const styles = getShortTitleElementByProps('ShortTitle')({});
    expect(styles).toBeNull();
  });

  it('Should render BeoPlusBadge correctly', () => {
    const { container } = render(
      // @ts-ignore
      <BeoPlusBadge restrictionStatus={RESTRICTION_STATUS_PAID} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should not render BeoPlusBadge correctly', () => {
    const { container } = render(
      // @ts-ignore
      <BeoPlusBadge />,
    );
    expect(container.innerHTML).toBe('');
  });
});
