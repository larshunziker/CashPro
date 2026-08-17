# Styleguide Factory

The styleguide factory and it's sub-factories are supposed to automatically generate a styleguide (for now from Paragraphs and Typography, but this can be extended in the future.

This factory itself is responsible for rendering an overview page - with links to the different styleguide pages available.

## Usage

Styleguide factory call inside of the **APP**:

```tsx
import React from 'react';
import styleguideFactory from '../../../../../common/screens/Styleguide/factory';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import Overview from '../../../../../common/screens/Styleguide/components/Overview';
import Breadcrumbs from '../../components/Breadcrumbs';
import StatusPage from '../StatusPage';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const breadcrumbItems = {
  count: 2,
  edges: [
    {
      node: {
        label: 'Styleguide',
        link: null,
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    },
  ],
  __typename: 'ActiveMenuTrailItemConnection',
};

const Styleguide = styleguideFactory({
  breadcrumbs: (
    <div className={grid.Container}>
      <Breadcrumbs pageUrl={'styleguide'} items={breadcrumbItems} />
    </div>
  ),
  StatusPage,
  StyleguideComponents: Overview,
  title: 'Styleguide',
  styles,
  setLoading,
  setScreenReady,
});

export default Styleguide;
```

Make sure you always lazy load the style guide component!

```html
<StyleguideLazy path="styleguide" />
```
