import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

describe('[Component] Teaser - TeaserHeroB', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <ReduxProvider initialState={{}}>
        <Component />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });
});
