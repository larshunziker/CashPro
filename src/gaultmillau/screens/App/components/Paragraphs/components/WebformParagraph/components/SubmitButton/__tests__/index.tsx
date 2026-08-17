import { render } from '@testing-library/react';
import React from 'react';
import Component from '../index';

describe('[Component] Paragraphs - WebformParagraph - SubmitButton', () => {
  it('Should render correctly', () => {
    const { container } = render(<Component>{'Jetzt abschicken'}</Component>);
    expect(container).toMatchSnapshot();
  });
});
