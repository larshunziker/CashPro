import { getInnerContentByProps } from '../factory';

/* @ts-ignore TODO: TS7034 ->  Variable 'authors' implicitly has type 'any' in some locations where its type cannot be determined. */
let authors;

beforeEach(() => {
  authors = {
    edges: [],
  };
});

describe('[TeaserMLOpinion] getInnerContentByProps function', () => {
  it('Should render nothing if there are no authors', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'authors' implicitly has an 'any' type. */
    const innerContent = getInnerContentByProps({ authors } as any);
    expect(innerContent).toBeNull();
  });
  it('Should render nothing if there is no relativeOriginPath in authorImage', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'authors' implicitly has an 'any' type. */
    authors.edges = [
      {
        node: {
          imageParagraph: { image: { file: { relativeOriginPath: null } } },
        },
      },
    ];
    /* @ts-ignore TODO: TS7005 ->  Variable 'authors' implicitly has an 'any' type. */
    const innerContent = getInnerContentByProps({ authors } as any);
    expect(innerContent).toMatchSnapshot();
  });
  it('Should render authorImage if there is a relativeOriginPath set', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'authors' implicitly has an 'any' type. */
    authors.edges = [
      {
        node: {
          imageParagraph: {
            image: { file: { relativeOriginPath: '/some/relativeOriginPath' } },
          },
        },
      },
    ];
    /* @ts-ignore TODO: TS7005 ->  Variable 'authors' implicitly has an 'any' type. */
    const innerContent = getInnerContentByProps({ authors } as any);
    expect(innerContent).toMatchSnapshot();
  });
});
