import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import authorMock from './mockData.json';

let initialProps: any = null;

describe('[Component] AuthorBox', () => {
  test('Should render nothing if there are no props defined', () => {
    const { container } = render(
      <ReduxProvider>
        <Component author={initialProps} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  test('Should render the authorbox wrapper correctly, if all props are passed to the component', () => {
    initialProps = authorMock;
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component author={initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('article-author-box-wrapper')).not.toBeNull();
  });

  test('Should render the authorbox img with the correct alt and source attribute', () => {
    initialProps = authorMock;
    const { queryByTestId, container } = render(
      <ReduxProvider>
        <Component author={initialProps} />
      </ReduxProvider>,
    );
    // @ts-ignore
    expect(queryByTestId('article-author-box-name')).toHaveTextContent(
      'Max Muster',
    );
    // @ts-ignore
    expect(queryByTestId('article-author-box-description')).toHaveTextContent(
      'Ihr Teenie-Zimmer war voll ung ganz mit Starpostern tapeziert. Heute berichtet sie exklusiv für Style über die Outfits der Stars.',
    );

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(container.querySelector('img').srcset).toMatch(
      /\/sites\/default\/files\/portrait2014.jpg$/,
    );
  });

  test('Should not render the authorbox img wrapper correctly', () => {
    initialProps = authorMock;
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component author={initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('article-author-box-img-wrapper')).not.toBeNull();
  });

  test('Should not render the authorbox img wrapper, if the imageParagraph source is empty', () => {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    authorMock.imageParagraph.image.file.relativeOriginPath = null;
    initialProps = authorMock;
    const { queryByTestId } = render(
      <ReduxProvider>
        <Component author={initialProps} />
      </ReduxProvider>,
    );
    expect(queryByTestId('article-author-box-img-wrapper')).toBeNull();
  });
});
