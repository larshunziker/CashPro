import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
// @ts-ignore
import mockData from './mockData.json';

describe('[Component] ComponentName', () => {
  it('Should render with  nothing if items are empty', () => {
    const { container } = render(
      <ReduxProvider>
        <Component items={[]} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render correctly', () => {
    // @ts-ignore
    const items = JSON.parse(JSON.stringify(mockData.items));

    const { container, queryByTestId } = render(
      <ReduxProvider>
        <Component items={items} />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toContain('Themen per E-Mail folgen');
    expect(container.innerHTML).not.toContain('TextLightTheme');
    expect(queryByTestId('alertlist-wrapper')).not.toBe('');
  });

  it('Should render correctly in light theme', () => {
    // @ts-ignore
    const items = JSON.parse(JSON.stringify(mockData.items));

    const { container, queryByTestId } = render(
      <ReduxProvider>
        <Component items={items} theme="light" />
      </ReduxProvider>,
    );

    expect(container.innerHTML).toContain('TextLightTheme');
    expect(queryByTestId('alertlist-wrapper')).not.toBe('');
  });
});
