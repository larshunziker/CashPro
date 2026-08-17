# Breadcrumbs Factory

Breadcrumbs for all publications and pages

1. What props are allowed for breadcrumbs?
2. What do the props do?

##### Options:

`* reqiured props`

| option           | type              | default | allowed values/description |
| ---------------- | ----------------- | ------- | -------------------------- | ----- |
| `Link`           | `Component`       | ``      | `Component                 | null` |
| `styles`         | `function/object` | ``      | `function/object`          |
| `hasPlaceholder` | `function`        | ``      | `callback function`        |

## Usage

### 1. Using the factory

Use the `Breadcrumbs` to have a active menu-trail for usability and SEO.

```js
import breadcrumbsFactory from 'Breadcrumbs/factory';
import Link from 'LinkLegacy';
import classNames from 'classnames';
import { LANDING_PAGE_TYPE_HOME } from 'LandingPage/constants';
import type {
  BreadcrumbsFactoryOptionsStyles,
  BreadcrumbsProps,
} from 'Breadcrumbs/typings';
import styles from './styles.legacy.css';

type BreadcrumbsPropsInner = BreadcrumbsProps;

const getStylesByProps: Function = ({
  addClass = '',
  origin,
}: BreadcrumbsPropsInner): BreadcrumbsFactoryOptionsStyles => ({
  OuterWrapper: '',
  Wrapper: classNames(styles.Wrapper, {
    [addClass]: !!addClass,
  }),
  Placeholder: (origin === LANDING_PAGE_TYPE_HOME && styles.Placeholder) || '',
  List: styles.BreadcrumbList,
  Link: styles.BreadcrumbLink,
  Title: styles.Title,
});

const hasPlaceholder: Function = ({ origin }: BreadcrumbsPropsInner): boolean =>
  origin === LANDING_PAGE_TYPE_HOME;

export default breadcrumbsFactory({
  Link,
  styles: getStylesByProps,
  hasPlaceholder: hasPlaceholder,
});
```

### 2. Using a placeholder

As Breadcrumbs are (and should be) implemented in every screen, we needed a global solution to
handle the paddings on top and below the breadcrumbs. The issue here are the screens without
content for breadcrumbs (like home) but who need the padding as well.

This is now solved with a `hasPlaceholder` callback function to choose if that screen wants to have the placeholder with just the paddings/margins rendered or not. If `hasPlaceholder` results to `true` it's mandatory to provide a class for it as well `styles.Placeholder`
