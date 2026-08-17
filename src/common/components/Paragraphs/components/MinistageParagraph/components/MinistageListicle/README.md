# Ministage Listicle Factory

## Usage

Ministage Listicle factory call inside of the **APP**:

```jsx
import ministageListicle from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageListicle/factory';
import MinistageListicleHeader from './components/MinistageListicleHeader';
import styles from './styles.legacy.css';

const MinistageListicle = ministageListicle({
  Header: MinistageListicleHeader,
  styles: {
    Wrapper: styles.Wrapper,
    ContentWrapper: styles.ContentWrapper,
    HeaderWrapper: styles.HeaderWrapper,
    LinkWrapper: styles.LinkWrapper,
    LinkList: styles.LinkList,
    ListItem: styles.ListItem,
    Link: styles.Link,
  },
});

export default MinistageListicle;
```

Ministage Listicle Component usage:

```html
<MinistageListicle ministageParagraph="{props.ministageParagraph}" />
```
