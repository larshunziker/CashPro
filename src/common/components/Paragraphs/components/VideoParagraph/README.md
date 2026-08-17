# VideoParagraph Factory

The VideoParagraph contains a video with an optional title and caption.

## Usage

VideoParagraph factory call inside of the **APP**:

```jsx
import VideoParagraphFactory from 'Paragraphs/components/VideoParagraph/factory';
import Video from 'Video';
import styles from './styles.legacy.css';

export default VideoParagraphFactory({
  styles: {
    Wrapper: styles.Wrapper,
    VideoTitle: styles.VideoTitle,
    CaptionWrapper: styles.CaptionWrapper,
    VideoCaption: styles.VideoCaption,
    VideoCredit: styles.VideoCredit,
  },
  Video,
});
```

VideoParagraph Component usage:

```html
<VideoParagraph video="{video}" />
```
