import React from 'react';
import { render } from '@testing-library/react';
import Component from '../index';
import mockData from './mockData.json';

let initialProps;

beforeEach(() => {
  initialProps = {
    imageParagraph: JSON.parse(JSON.stringify(mockData)),
    plainImage: false,
    origin: '',
    hideCaption: false,
  };
});

describe('[Component] ImageParagraph', () => {
  it('should render nothing ', () => {
    initialProps.imageParagraph = null;
    const { container } = render(<Component {...initialProps} />);
    expect(container).toMatchSnapshot();
  });

  // it('should render correctly ', () => {
  //   const { container } = render(<Component {...initialProps} />);
  //   expect(container).toMatchSnapshot();
  // });

  // it('should render imageWrapper if plainImage is false ', () => {
  //   const { queryByTestId } = render(<Component {...initialProps} />);
  //   expect(queryByTestId('image-paragraph-wrapper')).not.toBeNull();
  // });
});
