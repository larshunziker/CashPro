const scroll = (element: Element, headerOffset = 150) => {
  const scrollY: number = window.scrollY;
  global.scrollTo({
    left: 0,
    top: element.getBoundingClientRect().top + scrollY - headerOffset,
    behavior: 'smooth',
  });
};

const scrollToError = (anchorId = '', errorFieldClassname = '') => {
  if (anchorId) {
    const errorAnchor = document.querySelector(`#${anchorId}`);
    if (errorAnchor) {
      scroll(errorAnchor);
    }
  } else {
    // scroll to first error
    const firstErrorAnchor = document.querySelector(`.${errorFieldClassname}`);
    if (firstErrorAnchor) {
      scroll(firstErrorAnchor);
    }
  }
};
export default scrollToError;
