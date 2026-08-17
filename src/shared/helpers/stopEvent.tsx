/**
 * @file    prevent default event and stop propagation
 */

const stopEvent = (event: Event): void => {
  if (
    event &&
    typeof event.preventDefault === 'function' &&
    typeof event.stopPropagation === 'function'
  ) {
    event.preventDefault();
    event.stopPropagation();
  }
};

export default stopEvent;
