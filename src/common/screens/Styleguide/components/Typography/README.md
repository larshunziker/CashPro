# Typography Factory

This factory gets the typography file as a factory option and renders a filterable list of text styles.

## Usage

Typography factory call inside of the **APP**:

```tsx
import React from 'react';
import styleguideTypographyFactory from '../../../../../../../common/screens/Styleguide/components/Typography/factory';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import StatusPage from '../../../StatusPage';
import typography from '../../../../assets/styles/typography.legacy.css';
import styles from './styles.legacy.css';

const breadcrumbItems = {
  count: 2,
  edges: [
    {
      node: {
        label: 'Styleguide',
        link: '/styleguide',
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    },
    {
      node: {
        label: 'Typography',
        link: null,
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    },
  ],
  __typename: 'ActiveMenuTrailItemConnection',
};

const StyleguideTypography = styleguideTypographyFactory({
  breadcrumbs: <Breadcrumbs pageUrl={'typography'} items={breadcrumbItems} />,
  StatusPage,
  styles,
  typography,
  setLoading,
  setScreenReady,
});

export default StyleguideTypography;
```

Styleguide Component usage:

```html
<StyleguideTypography path="styleguide/typography/*" />
```
