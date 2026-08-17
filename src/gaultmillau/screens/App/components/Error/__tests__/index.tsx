import React from 'react';
import { render } from '@testing-library/react';
import Error from '../index';

describe('[Component] Error', () => {
  it('Should render correctly', () => {
    const { container } = render(<Error msg="i am a error" />);
    expect(container).toMatchSnapshot();
  });
});
