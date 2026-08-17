import React from 'react';
import { RenderResult, render } from '@testing-library/react';
import googlePreferredSourceFactory from '../factory';
import type { GooglePreferredSourceFactoryOptions } from '../typings';

let Component: React.ComponentType = () => null;
let factoryOptions: GooglePreferredSourceFactoryOptions;

beforeAll(() => {
  factoryOptions = {
    Button: () => <button data-testid="gps-button">Dummy Button</button>,
    ExplanationButton: () => (
      <a data-testid="gps-explanation" href="https://example.com">
        Dummy Explanation
      </a>
    ),
    styles: {
      GooglePreferredSource: 'GooglePreferredSourceClassName',
    },
  };

  Component = googlePreferredSourceFactory(factoryOptions);
});

describe('[Common] GooglePreferredSource Factory', () => {
  it('returns a component from the factory', () => {
    expect(Component).not.toBeNull();
  });

  it('renders Button and ExplanationButton', () => {
    const { queryByTestId }: RenderResult = render(<Component />);
    expect(queryByTestId('gps-button')).not.toBeNull();
    expect(queryByTestId('gps-explanation')).not.toBeNull();
  });

  it('applies the correct wrapper class', () => {
    const { container }: RenderResult = render(<Component />);
    expect(container.firstChild).toHaveClass('GooglePreferredSourceClassName');
  });
});
