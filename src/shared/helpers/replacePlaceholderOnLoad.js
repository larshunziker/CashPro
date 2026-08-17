/**
 * @file   swap placeholder image onLoad
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2018-07-30
 *
 */
import raf from 'raf';

export const setOriginalImageSrc = ({ element, config }) => {
  // check if original image exists
  const originalImgSrc =
    (element &&
      element.attributes &&
      element.attributes['data-image-src'] &&
      element.attributes['data-image-src'].value) ||
    '';

  // check if blurred thumb image exist
  const thumbImageSrc =
    (element &&
      element.attributes &&
      element.attributes['data-thumbnail-image-src'] &&
      element.attributes['data-thumbnail-image-src'].value) ||
    '';

  // do nothing if its already replaced

  if (!element.attributes['data-image-src']) {
    return;
  }

  if (__CLIENT__) {
    raf(() => {
      let placeholderImgEl = null;

      // if blurred image exist clone the original img element and replace its data
      if (thumbImageSrc) {
        placeholderImgEl = element.cloneNode(true);
        placeholderImgEl.src = thumbImageSrc; // eslint-disable-line no-param-reassign
        placeholderImgEl.classList.add('placeholder');

        element &&
          element.parentNode &&
          element.parentNode.appendChild(placeholderImgEl);
      }

      // always remove the attrib so no further clones will be created
      element.removeAttribute('data-image-src');

      // preload image

      const preload = document.createElement('img');
      preload.onload = () => {
        raf(() => {
          if (config && config.useBackgroundImage) {
            element.style.backgroundImage = `url("${originalImgSrc}")`;
          } else {
            element.src = originalImgSrc; // eslint-disable-line no-param-reassign
          }

          if (thumbImageSrc && placeholderImgEl) {
            placeholderImgEl.style.opacity = '0';
            // remove attribute after image is loaded prevent infinit loop
            element.removeAttribute('data-thumbnail-image-src');

            setTimeout(() => {
              raf(() => {
                placeholderImgEl &&
                  placeholderImgEl.parentNode &&
                  placeholderImgEl.parentNode.removeChild(placeholderImgEl);
              });
            }, 300); // check .placeholder transition in Img/styles.css if you change this
          }
        });
      };

      preload.src = originalImgSrc;
    });
  }
};

export const replacePlaceholderOnLoad = (event) => {
  const element = event.target;

  // do nothing if its already replaced
  if (!element.attributes['data-image-src']) {
    return;
  }

  setOriginalImageSrc({ element });
};
