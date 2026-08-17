import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Component, { Source } from '../index';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps: any;

beforeEach(() => {
  initialProps = {
    article: {
      publicationDate: '2016-11-24T08:00:08',
      changeDate: '2017-11-24T08:00:08',
      showUpdated: true,
      contentTypeLabel: 'None',
    },
  };
});

describe('[Component] AuthorDateBlocks', () => {
  it('Should render main container', () => {
    initialProps = { article: {} };
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('main-container')).not.toBeNull();
  });

  it('Should render with publication date and without modification date', () => {
    initialProps.article.showUpdated = false;

    initialProps.article.contentTypeLabel = null;

    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('main-container')).not.toBeNull();
    expect(queryByTestId('publication-date-wrapper')).not.toBeNull();
    expect(queryByTestId('publication-date-label')).not.toBeNull();
    // @ts-ignore
    expect(queryByTestId('publication-date-wrapper')).toHaveTextContent(
      'Veröffentlicht am 24. November 2016 - 08:00 Uhr',
    );

    expect(queryByTestId('modification-date-wrapper')).toBeNull();
    expect(queryByTestId('modification-date-label')).toBeNull();
  });

  it('Should render with publication date and modification date when contentTypeLabel is "None"', () => {
    initialProps.article.contentTypeLabel = null;

    const { queryByTestId } = render(<Component {...initialProps} />);

    // @ts-ignore
    expect(queryByTestId('publication-date-wrapper')).toHaveTextContent(
      'Veröffentlicht am 24. November 2016 - 08:00 Uhr',
    );
    // @ts-ignore
    expect(queryByTestId('modification-date-wrapper')).toHaveTextContent(
      'aktualisiert am 24. November 2017',
    );
  });

  it('Should render with publication date and modification date when contentTypeLabel is "Not updatable"', () => {
    initialProps.article.contentTypeLabel = 'Not updatable';

    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('publication-date-wrapper')).toMatchSnapshot();
  });

  it('Should render with publication date and without modification date when contentTypeLabel is "Redirected"', () => {
    initialProps.article.contentTypeLabel = 'Redirected';

    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('publication-date-wrapper')).toMatchSnapshot();
    expect(queryByTestId('modification-date-wrapper')).toBeNull();
  });

  it('Should render with publication date and modification date when contentTypeLabel is "Open"', () => {
    initialProps.article.contentTypeLabel = 'Open';

    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('publication-date-wrapper')).not.toBeNull();
    // @ts-ignore
    expect(queryByTestId('modification-date-wrapper')).toHaveTextContent(
      'aktualisiert am 24. November 2017',
    );
  });

  it('Should render with one author', () => {
    initialProps.article.authorPrefix = 'by';

    initialProps.article.authors = {
      edges: [
        {
          node: {
            id: 'YXV0aG9yOjgxNjX',
            name: 'Ralph Wyss',
          },
        },
      ],
    };

    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('author-container')).toMatchSnapshot();
  });

  it('Should render with two authors', () => {
    initialProps.article.authorPrefix = 'by';

    initialProps.article.authors = {
      edges: [
        {
          node: {
            id: 'YXV0aG9yOjgxNjX',
            name: 'Ralph Wyss',
          },
        },
        {
          node: {
            id: 'YXV0aG9yOjgxNjY',
            name: 'John Doe',
          },
        },
      ],
    };

    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('author-container')).toMatchSnapshot();
  });

  it('Should render with multiple authors', () => {
    initialProps.article.authorPrefix = 'by';

    initialProps.article.authors = {
      edges: [
        {
          node: {
            id: 'YXV0aG9yOjgxNjX',
            name: 'Ralph Wyss',
          },
        },
        {
          node: {
            id: 'YXV0aG9yOjgxNjY',
            name: 'John Doe',
          },
        },
        {
          node: {
            id: 'YXV0aG9yOjgxNjZ',
            name: 'Jane Appleseed',
          },
        },
      ],
    };

    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('author-container')).toMatchSnapshot();
  });

  it('Should render with multiple authors and links to their profiles', () => {
    initialProps.article.authorPrefix = 'by';

    initialProps.article.authors = {
      edges: [
        {
          node: {
            id: 'YXV0aG9yOjgxNjX',
            name: 'Ralph Wyss',
            hasProfilePage: true,
            preferredUri: '/author/1234',
          },
        },
        {
          node: {
            id: 'YXV0aG9yOjgxNjY',
            name: 'John Doe',
            hasProfilePage: false,
            preferredUri: null,
          },
        },
        {
          node: {
            id: 'YXV0aG9yOjgxNjZ',
            name: 'Jane Appleseed',
            hasProfilePage: true,
            preferredUri: '/author/1234',
          },
        },
      ],
    };

    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );

    expect(queryByTestId('author-container')).toMatchSnapshot();
  });

  it('Should render with one modifying author', () => {
    initialProps.article.contentTypeLabel = null;
    initialProps.article.modifyingAuthors = {
      edges: [
        {
          node: {
            id: 'YXV0aG9yOjgxNjX',
            name: 'Ralph Wyss',
          },
        },
      ],
    };

    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('modifying-author-container')).toMatchSnapshot();
  });

  it('Should render with two modifying authors', () => {
    initialProps.article.contentTypeLabel = null;
    initialProps.article.modifyingAuthors = {
      edges: [
        {
          node: {
            id: 'YXV0aG9yOjgxNjX',
            name: 'Ralph Wyss',
          },
        },
        {
          node: {
            id: 'YXV0aG9yOjgxNjY',
            name: 'John Doe',
          },
        },
      ],
    };

    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('modifying-author-container')).toMatchSnapshot();
  });

  it('Should render with multiple modifying authors', () => {
    initialProps.article.contentTypeLabel = null;
    initialProps.article.modifyingAuthors = {
      edges: [
        {
          node: {
            id: 'YXV0aG9yOjgxNjX',
            name: 'Ralph Wyss',
          },
        },
        {
          node: {
            id: 'YXV0aG9yOjgxNjY',
            name: 'John Doe',
          },
        },
        {
          node: {
            id: 'YXV0aG9yOjgxNjZ',
            name: 'Jane Appleseed',
          },
        },
      ],
    };

    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('modifying-author-container')).toMatchSnapshot();
  });

  it('Should render with multiple modifying authors and links to their profiles', () => {
    initialProps.article.contentTypeLabel = null;
    initialProps.article.modifyingAuthors = {
      edges: [
        {
          node: {
            id: 'YXV0aG9yOjgxNjX',
            name: 'Ralph Wyss',
            hasProfilePage: true,
            preferredUri: '/author/1234',
          },
        },
        {
          node: {
            id: 'YXV0aG9yOjgxNjY',
            name: 'John Doe',
            hasProfilePage: false,
            preferredUri: null,
          },
        },
        {
          node: {
            id: 'YXV0aG9yOjgxNjZ',
            name: 'Jane Appleseed',
            hasProfilePage: true,
            preferredUri: '/author/1234',
          },
        },
      ],
    };

    const { queryByTestId } = render(
      <MemoryRouter>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </MemoryRouter>,
    );

    expect(queryByTestId('modifying-author-container')).toMatchSnapshot();
  });

  test.each`
    source                      | addClass
    ${null}                     | ${''}
    ${'Schweizer Illustrierte'} | ${'TestClass'}
    ${'Beobachter'}             | ${''}
    ${''}                       | ${''}
    ${''}                       | ${'TestClassShouldNotBeRendered'}
  `(
    'Should render Source Component for source $source with addClass $addClass correctly',
    ({ source, addClass }) => {
      const { container } = render(
        <Source source={source} addClass={addClass} />,
      );
      expect(container).toMatchSnapshot();
    },
  );
});
