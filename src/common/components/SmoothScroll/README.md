# Smooth Scroll api

##### Options:

| option     | default  |
| ---------- | -------- |
| `anchorId` | ``       |
| `offset`   | `60`     |
| `behavior` | `smooth` |

## Usage

### 1. Creating a smooth scrollable anchor

Use the `SmoothScroll` tag to wrap any React element, making it a smooth scrollable anchor using the smooth-scroll polyfill.

```js
import React, { Component } from 'react';
import SmoothScroll from 'SmoothScroll';

export default class Page extends Component {
  render() {
    return (
      <>
        <a href="#section1"> Go to section 1 </a>
        <a href="#section2"> Go to section 2 </a>
        <SmoothScroll anchorId={'section1'}>
          <div> Hello World! </div>
        </SmoothScroll>
        <SmoothScroll anchorId={'section2'}>
          <div> How are you world? </div>
        </SmoothScroll>
      </>
    );
  }
}
```
