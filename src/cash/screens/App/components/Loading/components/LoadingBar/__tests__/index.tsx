import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

describe('[Component] LoadingBar', () => {
  it('Should return render component correctly', () => {
    const { container } = render(<Component />);
    expect(container).toMatchSnapshot();
  });
});
