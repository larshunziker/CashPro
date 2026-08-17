# LinkBoxParagraph Factory

## Props

| Parameter | Description                                                               | Default value |
| --------- | ------------------------------------------------------------------------- | ------------- |
| `linkBox` | object containing the `LinkBoxParagraph` content that we get from GraphQL |

## Usage

LinkBoxParagraph factory call inside of the **APP**:

```jsx
import linkBoxParagraphFactory from 'Paragraphs/components/LinkBoxParagraph/factory';
import Link from 'LinkLegacy';
import styles from './styles.legacy.css';

export default linkBoxParagraphFactory({
  styles: {
    Title: styles.Title,
    GroupWrapper: styles.GroupTitle,
    Link: styles.Link,
  },
  Link,
});
```

Component usage:

```html
<LinkBoxParagraph linkBox="{entry}" />
```
