import { render } from '@testing-library/react';
import React from 'react';
import Error from '../index';

it('renders correctly', () => {
  const { container } = render(<Error msg="i am a test error" />);
  expect(container).toMatchSnapshot();
});
