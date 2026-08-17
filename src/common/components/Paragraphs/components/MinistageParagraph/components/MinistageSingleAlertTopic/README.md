# Ministage Single Alert Topic factory

Displays one single keyword/person/organization that the user can subscribe to.

## Usage

Ministage Single Alert Topic factory call inside of the **APP**:

```jsx
import ministageSingleAlertTopic from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageSingleAlertTopic/factory';
import AlertItem from '../../../../../AlertItem';
import SubscribeButton from '../../../../../SubscribeButton';
import {
  STYLE_16X9_280,
  STYLE_16X9_440,
} from '../../../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';

const MinistageSingleAlertTopic = ministageSingleAlertTopic({
  AlertItem,
  SubscribeButton,
  imageStyles: {
    style_320: STYLE_16X9_280,
    style_1680: STYLE_16X9_440,
  },
  styles: {
    Wrapper: styles.Wrapper,
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
    AlertItemWrapper: styles.AlertItemWrapper,
  },
});

export default MinistageSingleAlertTopic;
```

Ministage Single Alert Topic Component usage:

```html
<MinistageSingleAlertTopic ministageParagraph="{props.ministageParagraph}" />
```
