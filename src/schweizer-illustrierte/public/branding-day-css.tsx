'strict';
/* eslint-disable no-console */
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
      @media (min-width: 960px) {
        .branding-day {
          padding-top: ${paddingTop}px;
          background: ${
            bgColor
              ? bgColor
              : imageUrls['960']
              ? `url(${imageUrls['960']})`
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
        (imageUrls['960'] !== imageUrls['1680'] &&
          `
            @media (min-width: 1680px) {
              .branding-day {
                background: ${`url(${imageUrls['1680']})`};
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

      @media (min-width:960px) {
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
          top: 100px;
          width: 994px;
          left:0;
          right: 0;
          margin: auto;
          height: 100%;
          max-height: 300px;
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
          width: calc((100% - 1440px) / 2);
        }

        #brandingday-top-click-wrapper {
          top: 155px;
          width: 1440px;
        }

        #brandingday-top-header-click-wrapper {
          width: 1440px;
        }
      }

      .ad-sky {
        display: ${hideHpa ? 'none' : 'inline-block'};
      }
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
      const menuHeader = document.getElementsByClassName('site-header')[0];
      const topClickElement = document.getElementById(
        'brandingday-top-click-wrapper',
      );

      if (paddingTop > 0) {
        // @ts-ignore
        topClickElement.style.top = `${paddingTop + menuHeader.clientHeight}px`;
      } else {
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        topClickElement.style.top = `${menuHeader.clientHeight}px`;
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
