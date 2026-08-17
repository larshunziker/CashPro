import React from 'react';
import { render } from '@testing-library/react';
import Paragraphs from '../../Paragraphs';

jest.mock('../components/ParagraphsRenderer');

describe('[Component] Paragraphs', () => {
  it('Should render correctly', () => {
    const { queryByTestId } = render(
      <Paragraphs
        pageBody={[
          {
            anchorId: null,
            header: null,
            id: 'cGFyYWdyYXBoOnRleHQ6MTMxNDExMzozOTcxMzY3',
            styleValue: null,
            text: 'TestParagraph',
            __typename: 'TextParagraph',
          },
        ]}
      />,
    );
    expect(queryByTestId('mocked-paragraph-renderer')).not.toBeNull();
  });

  it('Should not render without pageBody ', () => {
    const { queryByTestId } = render(<Paragraphs pageBody={null} />);
    expect(queryByTestId('mocked-paragraph-renderer')).toBeNull();
  });

  it('Should not render if pageBody length < 1 ', () => {
    const { queryByTestId } = render(<Paragraphs pageBody={[]} />);
    expect(queryByTestId('mocked-paragraph-renderer')).toBeNull();
  });
});
