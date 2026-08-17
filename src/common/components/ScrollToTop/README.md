# Scroll To Top Button Factory

The ScrollToTop button initializes a smooth scroll to the target, on click of the button.

## Requirements

To make sure that the button disappears beneath the footer it is required to change the position to relative as well as change the z-index of the footer to be higher then the index of the button.

It is required to import SmoothScroll and set an anchortag.

```js
...
import ScrollToTop, { ANCHOR_TAG_SCROLL_TO_TOP } from 'ScrollToTop';
import SmoothScroll from 'SmoothScroll';
....

return (
      ...
        <SmoothScroll anchorId={ANCHOR_TAG_SCROLL_TO_TOP} >...
        <ScrollToTop
            pixelsScrolledToFadeInComponent={300}
          />
      ...
  );
```

## Options

| Paramenter                               | Description                                                     |
| ---------------------------------------- | --------------------------------------------------------------- |
| `anchorTagScrollToTop`                   | to link the SmoothScroll component to the ScrollToTop component |
| `pixelsScrolledToFadeInComponentDefault` | After how many pixels the button should appear                  |
| `scrollStateSelector`                    | Publication specific helper function                            |
| `styles`                                 | ScrollToTop Button styles                                       |
| `icon`                                   | Icon component                                                  |

## Props

| Parameter                         | Description                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `pixelsScrolledToFadeInComponent` | After how many pixels the button should appear (Optional / Default is set to 200px) |

## Usage

1. Create the ScrollToTop component from the factory. Define a constant which value is an anchortag and export it.

2. Implement a SmoothScroll anchor tag as a target for the button to scroll to (it may be required to add an offset to the anchor tag to achieve the correct scrolling behaviour). Import the constant for the anchor tag and pass it as anchorId to the SmoothScroll component.

3. Implement the ScrollToTop component into the component where you are required to use it.
   (You are able to pass `pixelsScrolledToFadeInComponent` prop to override the defaultprop)

4. Once the button reaches the bottom of the screen it should disappear beneath the footer. So it may be required to change the position of the footer to relative and change the z-index accordingly.

### Create component from factory

```js
import React from 'react';
import Icon from 'Icon';
import scrollToTopFactory from 'ScrollToTop/factory';
import scrollStateSelector from 'selectors/scrollStateSelector';
import styles from './styles.legacy.css';

export const ANCHOR_TAG_SCROLL_TO_TOP: string = 'SmoothScrollToTop';

export default scrollToTopFactory({
  icon: <Icon type="IconChevronUp" addClass={styles.IconStyles} />,
  scrollStateSelector,
  anchorTagScrollToTop: ANCHOR_TAG_SCROLL_TO_TOP,
  pixelsScrolledToFadeInComponentDefault: 200,
  styles: {
    ButtonToTop: styles.ButtonToTop,
    ScrollToTopFadeIn: styles.ScrollToTopFadeIn,
    ButtonWrapper: styles.ButtonWrapper,
  },
});
```

### Implement button in component

```js
...
import ScrollToTop, { ANCHOR_TAG_SCROLL_TO_TOP } from 'ScrollToTop';
import SmoothScroll from 'SmoothScroll';
....

return (
      ...
        <SmoothScroll anchorId={ANCHOR_TAG_SCROLL_TO_TOP} >...
        <ScrollToTop
            pixelsScrolledToFadeInComponent={300}
          />
      ...
  );
```
