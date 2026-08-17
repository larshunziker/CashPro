# PlaceholderParagraph Factory

The PlaceholderParagraph Component renders urls as appropriate placeholders.
Supports: Youtube, Twitter, Instagram, Facebook, iFrames.
It expects an PlaceholderParagraph entry.

## Usage

PlaceholderParagraph factory call inside of the **APP**:

```jsx
import PlaceholderParagraphFactory from 'Paragraphs/components/PlaceholderParagraph/factory';
import styles from './styles.legacy.css';

export default PlaceholderParagraphFactory({
  styles: {
    Wrapper: styles.Wrapper,
    TitleWrapper: '',
    Title: '',
  },
});
```

PlaceholderParagraph Component usage:

```html
<PlaceholderParagraph placeholderParagraph="{entry}" />
```
