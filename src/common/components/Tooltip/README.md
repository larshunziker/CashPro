# Tooltip Factory

The Tooltip factory renders a tooltip button next to a given child input element.
On clicking the tooltip button the tip appears/disappears.

**Note**: the child element needs to be an inline element.

## Usage

Tooltip factory call inside of the **APP**:

```tsx
import tooltipFactory from 'Tooltip/factory';
import classNames from 'classnames';
import Link from 'LinkLegacy';
import styles from './styles.legacy.css';

export default tooltipFactory({
  Link,
  styles: {
    Wrapper: styles.Wrapper,
    Button: classNames(styles.Button, styles.ButtonAdvertorial),
    TooltipWrapper: styles.TooltipWrapper,
    Tooltip: styles.Tooltip,
    ButtonOpen: styles.ButtonOpen,
    ButtonText: styles.ButtonText,
    Content: styles.Content,
    Link: styles.Link,
  },
});
```

Tooltip Component usage:

```html
<Tooltip
  content="Dieser Inhalt wurde von oder in Zusammenarbeit mit einem Werbepartner erstellt."
  link="{linkData}"
  origin="{ADVERTISING_TYPE_ADVERTORIAL}"
>
  <span className="{styles.ShortTitle}"> {shortTitle} </span>
</Tooltip>
```
