import React from 'react';
import { render } from '@testing-library/react';
import { ExpansionPanelLogo, ExpansionPanelSocialMediaBar } from '../index';
import { EXPANSION_PANEL_TYPE_HZ, EXPANSION_PANEL_TYPE_SV } from '../constants';

describe('[Component] Expansion Panel Menu', () => {
  it('Should return the correct logo', () => {
    const publication = {
      src: 'logoUrl',
      alt: 'Schweizer Versicherung',
      className: '.LogoClass',
    };
    const { container } = render(
      <ExpansionPanelLogo publication={publication} />,
    );
    expect(container.innerHTML).toMatchSnapshot();
  });

  it('Should return no logo if there is no image source', () => {
    const publication = {
      alt: 'Schweizer Versicherung',
      className: '.LogoClass',
      src: null,
    };

    const { container } = render(
      /* @ts-ignore TODO: TS2322 ->  Type '{ alt */
      <ExpansionPanelLogo publication={publication} />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render the HZ socialMediaBar if expansion panel type is HZ', () => {
    const { queryByTestId } = render(
      <ExpansionPanelSocialMediaBar type={EXPANSION_PANEL_TYPE_HZ} />,
    );
    expect(queryByTestId('expansion-panel-socialmedia-bar-hz')).not.toBeNull();
  });

  it('Should render no socialMediaBar if expansion panel type is SV', () => {
    const { queryByTestId } = render(
      <ExpansionPanelSocialMediaBar type={EXPANSION_PANEL_TYPE_SV} />,
    );
    expect(queryByTestId('expansion-panel-socialmedia-bar-hz')).toBeNull();
  });
});
