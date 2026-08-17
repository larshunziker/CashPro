# Slider api

This is the very first api documentation of our slider

1. What props can the slider have
2. How the slider can be called
3. How global functions can be used outside slider (TODO)

- custom buttons (TODO)

4. How to use the callback function (TODO)
5. How to use the theme aproach (TODO)

##### Options:

`* reqiured props`

| option                    | type       | default                  | allowed values/description                              |
| ------------------------- | ---------- | ------------------------ | ------------------------------------------------------- | --------------------- |
| `*dynamicWidthSlides`     | `boolean`  | `false`                  | `true                                                   | false`                |
| `*autoPlay`               | `boolean`  | `AUTOPLAY_FALSE`         | `AUTOPLAY_START                                         | AUTOPLAY_FALSE`       |
| `*initialIndex`           | `number`   | `0`                      | `index of items`                                        |
| `*preloadCount`           | `number`   | `2`                      | `how many items should be preloaded`                    |
| `*labelClass`             | `string`   | `''`                     | `''`                                                    |
| `*sliderWidth`            | `number`   | `''`                     | `''`                                                    |
| `*sliderheight`           | `string`   | `''`                     | `string (in px)`                                        |
| `*slideInterval`          | `number`   | `5000`                   | `''`                                                    |
| `*slideDimensions,`       | `Array`    | `''`                     | `Array of AspectRatioItem`                              |
| `*slideCount,`            | `number`   | `''`                     | `length of galerryItems`                                |
| `addClass`                | `string`   | `''`                     | `string`                                                |
| `alignArrowsOnTop`        | `boolean`  | `false`                  | `true                                                   | false -> depricated?` |
| `fadeInactive`            | `boolean`  | `true`                   | `true                                                   | false`                |
| `onPositionUpdate`        | `function` | ``                       | `callback function`                                     |
| `showSlideLabel`          | `boolean`  | `''`                     | `depricated not used`                                   |
| `showSliderProgressBar`   | `boolean`  | `false`                  | `''`                                                    |
| `labels`                  | `Array`    | `[]`                     | `Array of labels`                                       |
| `loop`                    | `boolean`  | `true`                   | `true                                                   | false`                |
| `opacityInactive`         | `string`   | `1`                      | `0.1-1 (css opacity)`                                   |
| `slideAlignment`          | `string`   | `SLIDE_ALIGNMENT_CENTER` | `SLIDE_ALIGNMENT_CENTER                                 | SLIDE_ALIGNMENT_LEFT` |
| `syncParentHeight`        | `boolean`  | `false`                  | `true                                                   | false -> depricated`  |
| `sliderNavigationOptions` | `Object`   | `{}`                     | `position: SLIDER_NAVIGATION_POSITION_BOTTOM_IMAGE      | null`                 |
| `swipeIndicatorOptions`   | `Object`   | `{}`                     | `position: SWIPE_INDICATOR_POSITION_BOTTOM_IMAGE_CENTER | null`                 |
| `useCSS`                  | `string`   | `false`                  | `true                                                   | false`                |
| `sliderGutter`            | `number`   | `''`                     | `is used with dynamicWidthSlides props`                 |

## Usage

### 1. Creating a slider

Use the `Slider` tag to create a swipeable slider component.

```js
import React, { Component, type Element } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import heightByAspectRatio from 'helpers/heightByAspectRatio';
import windowStateSelector from 'selectors/windowStateSelector';
import {
  default as detectParentDimensionsMemoized,
  CONTAINER_WIDTH,
} from 'decorators/detectParentDimensionsMemoized';
import { assembleAkamaiImgUrl, getWidthAndHeightByImageStyle } from 'Picture/helpers';
import { STYLE_16X9_1130 } from 'constants/images';
import Img from 'Img';
import Slider from 'Slider';
import type { AspectRatioItem } from 'helpers/resizeByAspectRatio';


const mockGallery: any = {
  id: 'bm9kZToxOTI5MA==',
  title: 'Roger Federer rockt im Kilt gegen Andy Murray',
  shortTitle: 'Bikini',
  preferredUri:
    '/family/galleries/bikini-roger-federer-rockt-im-kilt-gegen-andy-murray',
  lead:
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe culpa consequuntur quibusdam? Placeat enim magnam quibusdam veniam sit, nisi facilis, ullam autem ex porro distinctio vel facere, velit eligendi! Velit dolorum hic impedit.',
  items: [
    {
      id: '179009',
      format: 'portrait',
      caption:
        'Viel Liebe für Prinz Harry und Meghan Markle Nachdem die beiden heute Morgen ihre Verlobung verkündeten, posieren die Turteltauben vor Glück strahlend im Garten des Kensington Palastes für das offizielle Verlobungsbild. Die royale Hochzeit planen der Prinz und seine Schauspielerin für den Frühling 2018. Wir freuen uns über so viel Liebe an diesem kalten Montag!',
      image: {
        credit: '© INSTAGRAM/EMRATA',
        file: {
          alt: 'Sexy Bikini Trend',
          relativeOriginPath: '/bildschirmfoto-2018-07-04-um-14.15.37.jpg',
          width: 385,
          height: 480,
          __typename: 'ImageFile',
        },
        __typename: 'Image',
      },
      __typename: 'ImageParagraph',
    },
    {
      id: '179011',
      format: 'square',
      caption:
        'Topmodel, Musikerin und Première Dame: Das Leben von Carla Bruni ist wie ein Märchen. Jetzt singt die Ehefrau von Nicolas Sarkozy in Zürich bei den Sports Awards. Sie liebt die Schweiz – dank Mama!',
      image: {
        credit: 'Foto: Oliver Brenneisen',
        file: {
          alt: 'Wendy ist happy',
          relativeOriginPath: '/_DSC9718.jpg',
          width: 480,
          height: 329,
          __typename: 'ImageFile',
        },
        __typename: 'Image',
      },
      __typename: 'ImageParagraph',
    },
    {
      id: '179139',
      format: 'landscape',
      caption:
        'Die erste Hürde hat Bella Hadid erfolgreich genommen Sie und ihr italienischer Bodyguard sind oben angekommen. Ganz Gentleman-like trägt er seine und Bellas Ski.',
      image: {
        credit: 'Keystone',
        file: {
          alt: 'Roger im Kilt',
          relativeOriginPath: '/rfederer-kilt.jpg',
          width: 480,
          height: 339,
          __typename: 'ImageFile',
        },
        __typename: 'Image',
      },
      __typename: 'ImageParagraph',
    },
  ],
  __typename: 'ImageGallery',
};

class TestSlider extends Component<any> {
  onSliderPositionUpdated() {
    // custom tealium track goes here
  }

  render(): Element<any> | null {
    const {
      aspectRatio = '3:2', // eslint-disable-line no-unused-vars
      fadeInactive = true,
      fullScreen = false, // eslint-disable-line no-unused-vars
      gallery,
      galleryHeight,
      galleryItems,
      labels,
      parentDimensions,
      slideDimensions,
      windowState,
    } = this.props;
    if (!gallery) {
      return null;
    }
    return (
      <>
        <Slider
          fadeInactive={fadeInactive}
          labels={labels}
          onPositionUpdate={this.onSliderPositionUpdated}
          opacityInactive={0}
          preloadCount={1}
          slideCount={(galleryItems && galleryItems.length) || 0}
          slideDimensions={slideDimensions}
          sliderHeight={`${galleryHeight}px`}
          sliderWidth={parentDimensions.width}
        >
          {galleryItems.map(
            (node: ParagraphInterface, index: number): Function => {
              const {width, height} = getWidthAndHeightByImageStyle(STYLE_16X9_1130);
              const galleryImage: string | null =
                (node?.image?.file?.relativeOriginPath &&
                  assembleAkamaiImgUrl(
                    node?.image?.file?.relativeOriginPath,
                    width, height, node?.image?.file?.focalPointX, node?.image?.file?.focalPointY,
                  )) ||
                null;

              return ({ height }): Element<any> => (
                <div
                  key={`image-gallery-slide-item-${index}`}
                  style={{ height }}
                >
                  <Img
                    allowUpscaling
                    alt={node.image?.file?.alt || ''}
                    url={galleryImage || ''}
                  />
                </div>
              );
            },
          )}
        </Slider>
      </>
    );
  }
}

const withGalleryProps: Function = mapProps(
  ({
    gallery = mockGallery, // delete this mock data
    addClass = '',
    parentDimensions,
    aspectRatio = '16:9',
    fadeInactive = true,
    fullScreen = false,
    onSliderPositionUpdated,
    windowState,
  }: any): any => {
    const galleryHeight: number = heightByAspectRatio(
      Math.round(parentDimensions.width),
      aspectRatio,
    );

    const galleryItems: Array<ParagraphInterface> =
      (gallery &&
        gallery.items &&
        gallery.items.filter(
          (item: ParagraphInterface): boolean =>
            item.image !== null && item.image !== undefined,
        )) ||
      [];

    // set slide width and height to slider width and height
    const slideDimensions: Array<AspectRatioItem> = galleryItems.map(
      (): AspectRatioItem => ({
        width: Math.round(parentDimensions.width),
        height: galleryHeight,
      }),
    );

    const labels: Array<Object> = galleryItems.map(
      (item: ParagraphInterface): Object => {
        return {
          caption: item.caption || '',
          credit: item.image?.credit || '',
        };
      },
    );

    return {
      gallery,
      addClass,
      parentDimensions,
      aspectRatio,
      fadeInactive,
      fullScreen,
      onSliderPositionUpdated,
      galleryItems,
      galleryHeight,
      slideDimensions,
      labels,
      windowState,
    };
  },
);

const TestSliderWrapper: Function = compose<any, any>(
  detectParentDimensionsMemoized({ cacheKey: CONTAINER_WIDTH }),
  withGalleryProps,
)(TestSlider);

const mapStateToProps: Function = (state: Object): Object => ({
  windowState: windowStateSelector(state),
});

export default connect(mapStateToProps)(TestSliderWrapper);

```

### TODO add more documentation!!
