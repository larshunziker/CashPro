# Component intersection observer api

## Usage

### 1. compose the withComponentIntersectionObserver HOC

Use the `withComponentIntersectionObserver` hoc to observe any component.

## Description

This HOC extends the component props with `isComponentVisible`. When the user scrolls to the configured px of the component this props is setted to true and the component can be shown.

More information about intersection observer [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

##### Options:

| option                | type            | values                        |
| --------------------- | --------------- | ----------------------------- | ------ |
| `selectors`           | `Array<string>` | `['.stage-gallery']`          |
| `rootMargin`          | `string`        | `300px` `(300px 0px 0px 0px)` |
| `threshold`           | `number`        | `0`                           |
| `continuousObserving` | `boolean`       | `true                         | false` |

```js
import React, { Component } from 'react';
import compose from 'recompose/compose';
import withComponentIntersectionObserver, {
  type WithComponentIntersectionObserverProps,
} from 'decorators/withComponentIntersectionObserver';

type PropsPropsInner = WithComponentIntersectionObserverProps;

const OBSERVER_SELECTOR: string = 'stage-gallery';

class TextParagraph extends Component<PropsPropsInner> {
  render() {
    const { isComponentVisible } = this.props;
    return (
      <div className={OBSERVER_SELECTOR}>
        {isComponentVisible && (
          <>
            Hallo Welt I'm intersected{' '}
            <img
              src={
                'https://api.dev.schweizer-illustrierte.ch/sites/default/files/styles/16x9_1180/public/gettyimages-989745648.jpg'
              }
            />
          </>
        )}
      </div>
    );
  }
}

export default compose<any, any>(
  withComponentIntersectionObserver({
    selectors: [`.${OBSERVER_SELECTOR}`],
    rootMargin: '300px',
    threshold: 0,
  }),
)(TextParagraph);
```
