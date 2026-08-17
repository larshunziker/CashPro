'strict';
(function () {
  function getBrandingDayCss({
    imageUrls = [],
    bgColor = '',
    bgFixed = true,
    paddingTop = 0,
    bgCover = false,
    hideHpa = true,
    debug = false,
    isImageUrlPresent = false,
  }) {
    const brandingDayCss = `
      /* main css */
        @media (min-width: 1024px) {
          .branding-day {
            padding-top: ${paddingTop}px;
            background: ${
              bgColor
                ? bgColor
                : imageUrls?.['960']
                ? `url(${imageUrls?.['960']})`
                : 'none'
            };
            background-attachment: ${bgFixed ? 'fixed' : 'scroll'};
            background-repeat: no-repeat;
            background-size: ${bgCover ? 'cover' : '100%'};
            background-position: top center;
            overflow-x: hidden;
          }
        }

        ${
          (imageUrls?.['960'] !== imageUrls?.['1680'] &&
            `
        @media (min-width: 1680px) {
          .branding-day {
            background: ${`url(${imageUrls?.['1680']})`};
            background-attachment: ${bgFixed ? 'fixed' : 'scroll'};
            background-repeat: no-repeat;
            background-size: ${bgCover ? 'cover' : '100%'};
            background-position: top center;
          }
        }
        `) ||
          ''
        }

        ${
          (!bgCover &&
            `
              @media (min-width: 1920px) {
                .branding-day {
                  background-size: 1920px auto;
                }
              }
            `) ||
          ''
        }

        @media (min-width: 1024px) {
          #brandingday-top-header-click-wrapper {
            background: ${debug ? `rgba(255,255,0,0.4);` : `none`};
            position: absolute;
            top: 0;
            width: 994px;
            height: ${paddingTop}px;
            left:0;
            right: 0;
            margin: auto;
          }

          #brandingday-top-click-wrapper {
            background: ${debug ? `rgba(255,255,0,0.4);` : `none`};
            position: absolute;
            top: 296px;
            width: 994px;
            left:0;
            right: 0;
            margin: auto;
            height: 100%;
            max-height: 260px;
          }

          #brandingday-left-click-wrapper,
          #brandingday-right-click-wrapper {
            height: 100vh;
            background: ${debug ? `rgba(255,255,0,0.4);` : `none`};
            position: ${
              bgFixed || (!isImageUrlPresent && bgColor) ? 'fixed' : 'absolute'
            };
            top: 0;
            width: calc((100% - 994px) / 2);
        }

        #brandingday-left-click-wrapper {
          left: 0;
        }


        #brandingday-right-click-wrapper {
          right: 0;
        }
      }

      @media (min-width: 1680px) {
        #brandingday-left-click-wrapper,
        #brandingday-right-click-wrapper {
          width: calc((100% - 1320px) / 2);
        }

        #brandingday-top-click-wrapper {
          width: 1320px;
        }

        #brandingday-top-header-click-wrapper {
          width: 1320px;
        }
      }

      .ad-sky {
        display: ${hideHpa ? 'none' : 'inline-block'};
      };
    `;

    const smallImageCss = `        
      /* img 960 css */
      #brandingday-left-click-wrapper,
      #brandingday-right-click-wrapper {
        height: ${
          bgCover && bgFixed
            ? `100vh`
            : `calc((${this.height} / ${this.width}) * 100vw)`
        };
        min-height: ${bgCover && !bgFixed ? `100vh` : 'auto'};
      }

      ${
        (((!bgCover && !bgFixed) ||
          (!bgCover && bgFixed && imageUrls['960'] === imageUrls['1680'])) &&
          `
            @media (min-width: 1920px) {
              #brandingday-left-click-wrapper,
              #brandingday-right-click-wrapper {
                height: ${(this.height / this.width) * 1920}px;
                width: 240px; /* this is always the remaining width if the img max-width is 1920 */
              }

              #brandingday-left-click-wrapper {
                left: calc((100% - 1920px) / 2);
              }

              #brandingday-right-click-wrapper {
                right: calc((100% - 1920px) / 2);
              }
            }
          `) ||
        ''
      }`;

    const largeImageCss = `
      /* img 1680 css */
      @media (min-width: 1680px) {
        #brandingday-left-click-wrapper,
        #brandingday-right-click-wrapper {
          height: ${
            bgCover && bgFixed
              ? `100vh`
              : `calc((${this.height} / ${this.width}) * 100vw)`
          } !important;
          min-height: ${bgCover && !bgFixed ? `100vh` : 'auto'};
        }
      }

      ${
        (((!bgCover && !bgFixed) || (!bgCover && bgFixed)) &&
          `
            @media (min-width: 1920px) {
              #brandingday-left-click-wrapper,
              #brandingday-right-click-wrapper {
                height: ${(this.height / this.width) * 1920}px;
                width: 240px; /* this is always the remaining width if the img max-width is 1920 */
              }

              #brandingday-left-click-wrapper {
                left: calc((100% - 1920px) / 2);
              }

              #brandingday-right-click-wrapper {
                right: calc((100% - 1920px) / 2);
              }
            }
          `) ||
        ''
      }`;

    const expandTopClickWrapper = () => {
      const wb1Element = document.getElementById('apn-ad-slot-wb-1');
      const topClickElement = document.getElementById(
        'brandingday-top-click-wrapper',
      );

      if (wb1Element && topClickElement) {
        if (wb1Element.getBoundingClientRect().height > 90) {
          // @ts-ignore
          topClickElement.style.height =
            wb1Element.getBoundingClientRect().height + 40 + 'px';

          if (paddingTop > 0) {
            // @ts-ignore
            topClickElement.style.top = `${paddingTop + 96}px`;
          }
        } else {
          // @ts-ignore
          topClickElement.style.height =
            wb1Element.getBoundingClientRect().height + 40 + 'px';

          if (paddingTop > 0) {
            // @ts-ignore
            topClickElement.style.top = `${paddingTop + 100}px`;
          }
        }
      }
    };

    return {
      brandingDayCss,
      largeImageCss,
      smallImageCss,
      expandTopClickWrapper,
    };
  }
  window.getBrandingDayCss = getBrandingDayCss;
})();
