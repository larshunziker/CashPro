# EmbedParagraph Factory

The EmbedParagraph Component renders urls as appropriate embeds.
Supports: Youtube, Twitter, Instagram, Facebook, iFrames.
It expects an embedParagraph.

## Usage

EmbedParagraph factory call inside of the **APP**:

```jsx
import windowStateSelector from 'selectors/windowStateSelector';
import embedParagraphFactory from 'Paragraphs/components/EmbedParagraph/factory';
import styles from './styles.legacy.css';

export default embedParagraphFactory({
  windowStateSelector,
  styles: {
    Wrapper: styles.Wrapper,
    VideoPlayer: styles.VideoPlayer,
    TitleWrapper: '',
    Title: '',
  },
});
```

EmbedParagraph Component usage:

```html
<EmbedParagraph embedParagraph="{entry}" />
```

## autoAdjustHeight on resize

we're listening to postMessage events from the iframe to adjust the height of the iframe.

pls ask your source provider if they support this. if not ask them to add this functionality by using the following script tags in theyr iframe body:

```html
<script>
  !(function () {
    var e, n;
    function t() {
      e ||
        (e = setTimeout(function () {
          window.parent.postMessage(
            {
              frame: window.location.hash.substr(1),
              h: document.body.clientHeight,
              src: window.location.href,
            },
            '*',
          ),
            (e = null);
        }, 500));
    }
    window.ResizeObserver
      ? new ResizeObserver(t).observe(document.body)
      : setInterval(function () {
          requestAnimationFrame(function () {
            var e = document.body.clientHeight;
            n !== e && (t(), (n = e));
          });
        }, 1e3);
    t();
  })();
</script>
```
