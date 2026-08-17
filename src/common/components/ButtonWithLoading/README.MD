# Button (WithLoading) Factory

Factory for buttons in our publications, with 3 variants (primary, secondary, tertiary), two sizes (big, small), click effect and optional loading state (loading spinner inside button).

## Options

| Paramenter            | Description     |  
| --------------------  | --------------- |  
| `Icon` | Icon component
| `styles` | Button styles

#### Button styles

**Note** that ButtonWithLoading factory has **defaultStyles** (that are merged with styles given to factory as an option), so you most probably **don't need to prepare all of below styles for your publication**. Most likely you'll be good with just **Primary**, **Secondary**, **Tertiary** and **Small**.

| Paramenter            | Description     |
| --------------------  | --------------- |  
| `Button` | General styles applied to button
| `ClickEffect` | Styles applied to button only when 'clickEffect' prop is set to 'true' (default)
| `Content` | Styles applied to span element wrapping optional icon and button's children
| `Loading` | Styles applied to button only when 'loading' prop is set to 'true'
| `LoadingSpinnerWrapper` | Styles applied to LoadingSpinner's wrapper
| `FullWidth` | Styles applied to button only when 'fullWidth' prop is set to 'true'
| `MobileFullWidth` | Styles applied to button only when 'mobileFullWidth' prop is set to 'true'
| `Primary` | Styles applied to button only when 'variant' prop is set to 'primary' (default)
| `Secondary` | Styles applied to button only when 'variant' prop is set to 'secondary'
| `Tertiary` | Styles applied to button only when 'variant' prop is set to 'tertiary'
| `Small` | Styles applied to button only when 'size' prop is set to 'small'
| `IconLeft` | Styles applied to Icon component

## Button Props:

`* reqiured props`

| option                    | type   | default                 | description  
| ------------------------  | ------ | ----------------------- | ----------------------- |  
| `*OnClick` | `function` | `` | `click handler function`
| `size` | `big / small` | `big` | `size of button, default is big`
| `variant` | `primary / secondary / tertiary` | `primary` | `variant of button, default is primary`
| `fullWidth` | `bool` | `false` | `if true, button will take fullWidth of the container, side margins will be also removed`
| `mobileFullWidth` | `bool` | `false` | `if 'true', button will take fullWidth of the container, but only on mobile (under smBreakpoint), side margins will be also removed - this works only for big buttons (as stated in designs for buttons - small buttons should not have fullWidth option`)
| `loading` | `bool` | `false` | `if 'true' loading spinner shown`
| `iconTypeLeft` | `string` | `` | `type passed to Icon component`
| `tabIndex` | `number` | `0` | `indicates that its element can be focused,, and where it participates in sequential keyboard navigation, default is 0`
| `clickEffect` | `bool` | `true` | `if 'false' 'click effect' transition is not shown (in default styles)`

## Usage:

### Create component from factory

```js
import buttonWithLoadingFactory from '../../../../../common/components/ButtonWithLoading/factory';  
import Icon from '../Icon';  
import styles from './styles.legacy.css';  
  
const ButtonWithLoading = buttonWithLoadingFactory({  
  Icon,  
  styles: {  
  Primary: styles.Primary,  
  Secondary: styles.Secondary,  
  Tertiary: styles.Tertiary,  
  Small: styles.Small,  
 },});  
  
export default ButtonWithLoading;
```

### Implement button in component
```js
import Button from '../../components/ButtonWithLoading';
...
	<Button onClick={() => {}}>button primary</Button>
	<Button onClick={() => {}} variant='secondary' mobileFullWidth>fullWidh mobile</Button>
	<Button onClick={() => {}} variant='tertiary' size='small'>small tertiary</Button>
...
```