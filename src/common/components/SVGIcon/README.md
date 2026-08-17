# SVGIcon Factory

The SVG icon component can be used everywhere!

## Usage

To implement a SvgIcon you can render this component with appropriate factory options. The component does not receive any props at all.

SVGIcon factory call inside of the **APP**:

```jsx
import svgIconFactory from '../../../../../common/components/SVGIcon/factory';
import { SVG_ICONS_DEFAULT_CONFIG } from '../../../../../shared/constants/svgIcons';
import { SVG_ICONS_TYPE_BOOKMARK } from '../../../../../shared/constants/svgIcons';

export default svgIconFactory({
  iconConfig: SVG_ICONS_DEFAULT_CONFIG,
  styles: {
    Wrapper: '',
  },
});
```

Component usage:

```html
<SVGIcon type="{SVG_ICONS_TYPE_BOOKMARK}" />
```
