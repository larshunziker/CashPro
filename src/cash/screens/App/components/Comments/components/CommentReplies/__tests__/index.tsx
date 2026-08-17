import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';

describe('[Components] Comments - CommentReplies', () => {
  it('Should render correctly', async () => {
    const { container } = render(<Component commentReplies={[]} />);
    expect(container).toMatchSnapshot();
  });
});
