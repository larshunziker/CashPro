# Modal Factory

Factory for confirm alert overlay in our publications, with 2 variants, 1. default with 2 buttons and a title and a content message. 2. overlay with customUi to render a custom jsx component.

## Options

| Paramenter          | Description                 | Default                                                                                                                                                                                           |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Icon`              | Icon component              | -                                                                                                                                                                                                 |
| `ButtonWithLoading` | ButtonWithLoading component | `check details for button props in` [ButtonWithLoading](https://github.com/rasch-dtc/rasch-stack/blob/98718c88b7576665f13d79f6823f4e82db4b5f11/src/common/components/ButtonWithLoading/README.MD) |
| `targetId`          | id of the div to render     | rasch-confirm-alert                                                                                                                                                                               |
| `styles`            | Button styles               | defaultStyles                                                                                                                                                                                     |

| option                | type       | default | description                                                                                                                                         |
| --------------------- | ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `overlay`             | `ref`      | ``      | `current overlay referenz`                                                                                                                          |
| `title`               | `string`   | ``      | ``                                                                                                                                                  |
| `content`             | `string`   | ``      | ``                                                                                                                                                  |
| `overlayClassName`    | `string`   | ``      | `overlay class to overwrite the default overly designs, for example another background-color`                                                       |
| `customUi`            | `jsx`      | ``      | `custom jsx component which can be rendered in an overlay, using the close callback so you can close the overlay after a submit handler or similar` |
| `closeOnClickOutside` | `boolean`  | `true`  | `close the overlay on document click`                                                                                                               |
| `isCloseVisible`      | `boolean`  | `true`  | `not available in customUi`                                                                                                                         |
| `closeOnEscape`       | `boolean`  | `true`  | `hit esc keyboard to close the overlay`                                                                                                             |
| `keyCodeForClose`     | `array`    | `[]`    | `provide more keykodes to close the overlay`                                                                                                        |
| `afterClose`          | `function` | `null`  | `callback after close`                                                                                                                              |
| `onClickOutside`      | `function` | `null`  | `callback on click outside the overlay`                                                                                                             |
| `onkeyPress`          | `function` | `null`  | `callback on keypress`                                                                                                                              |
| `onKeypressEscape`    | `function` | `null`  | `callback on esc keypress`                                                                                                                          |
| `buttons`             | `array`    | ``      | `Two default buttons "Abbrechen" and "Bestätigen" already exists`                                                                                   |
| `type`                | `modal     | drawer` | `modal`                                                                                                                                             | `use drawer if you wannt to slide on the modal on mobile from bottom. Use modal if you wana see the modal in a centered overlay` |

## Usage:

### Create component from factory

```js
import modalFactory from '../../../../../common/components/Modal/factory';
import ButtonWithLoading from '../ButtonWithLoading';
import Icon from '../Icon';
import styles from './styles.legacy.css';

const modal = modalFactory({
  styles: {
    Title: styles.Title,
    Content: styles.Content,
  },
  ButtonWithLoading,
  Icon,
});

export default modal;
```

### Implement modal with default content overlay

```js
<a
  onClick={() =>
    modal({
      title: 'Alert löschen',
      content:
        'Sind Sie sicher, dass Sie diesen Alert löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
      buttons: [
        {
          label: 'Abbrechen',
        },
        {
          variant: 'secondary',
          label: 'Löschen',
          iconTypeLeft: 'IconTrash',
          onClick: () => {
            alert('delete has been clicked');
          },
        },
      ],
    })
  }
>
  click for an comfirm alert overlay
</a>
```

### Implement modal with a customUi overlay

```js
<a
  onClick={() =>
    modal({
      customUi: ({ close }) => {
      return (
        <div>
          <a onClick={() => { close() }}>
          Some Component!
        </div>
      );
    },
    })
  }
>
  click for an comfirm alert overlay
</a>
```

### Implement modal with a customUi overlay and sticky Header/Footer

```js
<a
  onClick={() =>
    modal({
      hasStickyHeader: true,
      hasStickyFooter: true,
      customUi: ({ close, drawerRef, hasStickyHeader, hasStickyFooter }) => {
        return (
          <MyCustomComponent
            close={close}
            drawerRef={drawerRef}
            hasStickyHeader={hasStickyHeader}
            hasStickyFooter={hasStickyFooter}
          />
        );
      },
    })
  }
>
  click for an comfirm alert overlay
</a>
```

The custom component:

```js
const CustomComponent = () => {
  return (
    <div className={styles.Wrapper}>
      {(drawerRef?.current &&
        hasStickyHeader &&
        createPortal(
          <>{headerJsx}</>,
          document.getElementById('ModalStickyHeader'),
        )) || <>{headerJsx}</>}
      ...
      {(drawerRef?.current &&
        hasStickyFooter &&
        createPortal(
          <>{footerJsx}</>,
          document.getElementById('ModalStickyFooter'),
        )) || <>{footerJsx}</>}
    </div>
  );
};
```

Info:

Inside of the ModalFactory, there are two empty Div's. One for the stickyHeader and another one for the stickyFooter. These Div's will be rendered if we pass the props `hasStickyHeader` or `hasStickyFooter` as `true` by the `modal(...)` call.

By using the `createPortal` we are able to fill these empty placeholder Div's with our custom code. (For example in the Footer having some sticky buttons from a form we're displaying in the modal, or having some dynamically changing values in the header title - see examples on the cash publication).

If we don't use any customUI, the `title` property will be set sticky in the header when we also pass the (`hasStickyHeader: true`) inside the modal.

In the Footer there will be the `buttons` set to sticky if we pass (`hasStickyFooter: true`) inside the modal.
