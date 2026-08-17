# Partner Banner Factory

The partner banner component get an array of sponsors. on every location change a random item from the sponsor array will be picked.

The sponsor will render a placeholder on the server. The image and link will be set on the client.

## Usage

Partner Banner factory call inside of the **APP**:

```jsx
import partnerBannerFactory from 'PartnerBanner/factory';
import styles from './styles.legacy.css';

export default partnerBannerFactory({
  styles: {
    ImageContainer: styles.ImageContainer,
    BackgroundImageWrapper: styles.BackgroundImageWrapper,
    BackgroundImage: styles.BackgroundImage,
    PartnerLogo: styles.PartnerLogo,
    Caption: styles.Caption,
  },
});
```

Partner Banner Component usage:

```html
<PartnerBanner sponsors="{sponsors?.edges" || []} />
```
