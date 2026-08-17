/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../ensureVideo'. '/Users/bhs/code/work/rasch-stack/src/shared/helpers/ens */
import { ensureVideoItem } from '../ensureVideo';

/* @ts-ignore TODO: TS7034 ->  Variable 'item' implicitly has type 'any' in some locations where its type cannot be determined. */
let item;

beforeEach(() => {
  item = {
    id: '180423',
    brightcoveId: '5997946780001',
    caption: 'Wendy Holdener fliegt im Privatjet zur WM nach Are.',
    shortTitle: null,
    title: 'Privatjet-Flug Wendy Holdener',
    credit: null,
    image: {
      file: {
        alt: '',
        relativeOriginPath:
          '/media/field_image/2019-02/privatjet-flug_wendy_holdener_brightcove_video_thumb_1.jpg',
        __typename: 'ImageFile',
      },
      __typename: 'Image',
    },
    video: {
      id: '180423',
      brightcoveId: '5997946780001',
      caption: 'Wendy Holdener fliegt im Privatjet zur WM nach Are.',
      shortTitle: null,
      title: 'Privatjet-Flug Wendy Holdener',
      credit: null,
      image: {
        file: {
          alt: '',
          relativeOriginPath:
            '/media/field_image/2019-02/privatjet-flug_wendy_holdener_brightcove_video_thumb_1.jpg',
          __typename: 'ImageFile',
        },
        __typename: 'Image',
      },
    },
    __typename: 'VideoParagraph',
  };
});

describe('[Function] ensureVideoItem', () => {
  it('should return the same object which was passed', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'item' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'item' implicitly has an 'any' type. */
    expect(ensureVideoItem(item)).toEqual(item);
  });

  it('should return correct output for ensureVideoItem call', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'item' implicitly has an 'any' type. */
    item.video = null;

    const expectedItem = {
      /* @ts-ignore TODO: TS7005 ->  Variable 'item' implicitly has an 'any' type. */
      ...item,
      video: {
        id: '180423',
        brightcoveId: '5997946780001',
        caption: 'Wendy Holdener fliegt im Privatjet zur WM nach Are.',
        shortTitle: null,
        title: 'Privatjet-Flug Wendy Holdener',
        credit: null,
        image: {
          file: {
            alt: '',
            relativeOriginPath:
              '/media/field_image/2019-02/privatjet-flug_wendy_holdener_brightcove_video_thumb_1.jpg',
            __typename: 'ImageFile',
          },
          __typename: 'Image',
        },
        video: null,
        __typename: 'VideoParagraph',
      },
    };

    /* @ts-ignore TODO: TS7005 ->  Variable 'item' implicitly has an 'any' type. */
    expect(ensureVideoItem(item)).toEqual(expectedItem);
  });
});
