import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
beforeEach(() => {
  initialProps = {
    ministageTeaser: {
      lead: '<p>some lead is here</p>',
      subhead: 'some subhead',
      image: {
        alt: 'alt Text',
        relativeOriginPath: '/image.jpeg',
        focalPointX: 50,
        focalPointY: 50,
      },
      link: {
        path: '/path',
        label: 'label',
      },
      headline: 'some headline',
    },
  };
});

describe('[Paragraphs] MinistageParagraph - MinistageTeaser', () => {
  it('Should render correctly', () => {
    const { container } = render(
      <MemoryRouter>
        <ReduxProvider>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
          <Component {...initialProps} />
        </ReduxProvider>
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
