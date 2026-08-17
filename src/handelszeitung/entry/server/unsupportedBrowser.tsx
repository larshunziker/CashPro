export default () => `<!DOCTYPE html>
<html lang="de-CH">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Browser nicht unterstützt</title>
    <script type="text/javascript">
      var utag_data = {
        cms_page_type : "ErrorPage"
      }
    </script>
    <style type="text/css">
      @font-face {
        font-family: "Gotham-Book";
        font-display: fallback;
        font-weight: 300;
        src: local("Gotham-Book"),
          url(https://www.handelszeitung.ch/static/media/GothamSSm-Book.06b7c920.woff);
      }

      @font-face {
        font-family: "Gotham-Black";
        font-display: fallback;
        font-weight: 900;
        src: local("Gotham-Black"),
          url(https://www.handelszeitung.ch/static/media/Gotham-Black.ace06cec.woff);
      }

      html,
      body {
        margin: 0;
        padding: 0;
      }

      body {
        -webkit-font-smoothing: antialiased;
      }

      .container {
        margin-left: auto;
        margin-right: auto;
        width: calc(100% - 38px);
      }

      .wrapper {
        margin: 40px 0 64px;
      }

      .headerWrapper {
        align-items: flex-start;
        display: flex;
      }

      .iconWrapper {
        height: 72px;
        width: 72px;
      }

      .icon {
        height: 72px;
        width: 72px;
      }

      .title {
        color: #192a6b;
        font-family: Gotham-Black, Helvetica-Bold, Arial-Bold, Verdana-Bold,
          sans-serif;
        font-size: 30px;
        font-weight: bold;
        letter-spacing: -0.04px;
        line-height: 34px;
        margin-left: 16px;
        min-height: 72px;
        word-break: break-word;
      }

      .description {
        color: #1f1f1f;
        font-family: Gotham-Book, Helvetica, Arial, Verdana, sans-serif;
        font-size: 18px;
        line-height: 25px;
        margin-top: 16px;
        text-align: left;
      }

      .linkWrapper {
        display: flex;
        flex-direction: column;
        margin-top: 28px;
      }

      .link {
        font-family: Gotham-Black, Helvetica-Bold, Arial-Bold, Verdana-Bold,
        sans-serif;
        font-size: 16px;
        font-weight: 900;
        text-align: center;
        text-decoration: none;
        background-color: #ffffff;
        border-radius: 4px;
        color: #192a6b;
        margin-bottom: 8px;
        padding: 16px 24px;
        width: 90%;
        border: 1px solid #192a6b;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .link:hover {
        color: #00003F;
        border-color: #00003F;
      }

      .externalLinkIcon {
        height: 18px;
      }

      .externalLinkIcon > g > g {
        fill: #192a6b;
      }

      .link:hover .externalLinkIcon > g > g {
        fill: #00003F;
      }

      @media (min-width: 760px) {
        .wrapper {
          margin: 80px 0;
        }

        .title {
          letter-spacing: -0.15px;
          line-height: 38px;
          margin-left: 32px;
        }

        .description {
          font-size: 22px;
          line-height: 32px;
          margin-left: 104px;
          margin-top: -24px;
        }

        .linkWrapper {
          flex-direction: row;
          align-items: center;
        }

        .link {
          width: 248px;
          margin-right: 24px;
        }
      }

      @media (min-width: 1024px) {
        .container {
          width: 796px;
        }

        .title {
          font-size: 40px;
          line-height: 46px;
        }

        .description {
          margin-top: 8px;
        }

        .link {
          font-size: 18px;
        }
      }

      @media (min-width: 1680px) {
        .container {
          width: 1272px;
        }

        .description {
          margin-top: -16px;
        }
      }
    </style>
    <link
      rel="icon"
      type="image/x-icon"
      href="https://www.handelszeitung.ch/static/media/d597d3de2b26f4c0472628114746a21e.ico"
    />
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <div class="headerWrapper">
          <div class="iconWrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
              <g>
                <circle fill="#BDBCBC" stroke="#BDBCBC" stroke-miterlimit="10" cx="36" cy="36" r="35.5"/><path fill="#FFF" stroke="#363636" stroke-width="2" stroke-linejoin="round" stroke-miterlimit="10" d="M47.28 54.91H22.17a.76.76 0 01-.76-.76V23.42a1 1 0 01.3-.71l5.39-5.32c.19-.18.44-.29.7-.29h19.48c.42 0 .76.34.76.76v36.3c0 .41-.34.75-.76.75z"/><path fill="none" stroke="#363636" stroke-width="2" stroke-linejoin="round" stroke-miterlimit="10" d="M21.57 23.63h5.54c.55 0 1-.45 1-1v-5.54"/><path fill="none" stroke="#363636" stroke-width="2" stroke-miterlimit="10" d="M35 30v9"/><g fill="#363636"><circle cx="35" cy="42" r="1"/><path d="M35 41.5c.28 0 .5.22.5.5s-.22.5-.5.5-.5-.22-.5-.5.22-.5.5-.5m0-1c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/></g>
              </g>
              </svg>
          </div>

          <div class="title">
            Dieser Browser wird nicht mehr unterstützt
          </div>
        </div>

        <div class="description">
          Wir empfehlen Ihnen, einen der folgenden Browser zu nutzen
        </div>

        <div class="linkWrapper">
          <a href="https://www.google.com/intl/de/chrome/" class="link">
            Google Chrome
            <svg class="externalLinkIcon" version="1.1" viewBox="0 0 11 11" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(-587 -247)" fill="#000" fill-rule="nonzero">
                    <g transform="translate(587 247)">
                        <path id="a"
                            d="m5.9583 5.7444 3.3162-3.3543 0.90319 0.8284c0.15278 0.15391 0.32802 0.18107 0.52574 0.081481s0.29657-0.25802 0.29657-0.47531v-2.2951c0-0.15391-0.049428-0.28066-0.14828-0.38025-0.098856-0.099588-0.22018-0.14938-0.36397-0.14938h-2.5074c-0.23366 0-0.39318 0.10638-0.47855 0.31914-0.085376 0.21276-0.042688 0.39609 0.12806 0.55l0.95711 0.8284-3.3297 3.3407 0.70098 0.70617z" />
                        <path
                            d="m9.2341 11c0.21569 0 0.39767-0.076955 0.54596-0.23086s0.22243-0.33951 0.22243-0.55679v-4.9568h-0.94363v4.7802h-8.0613v-8.1617h4.7451v-0.9642h-4.9608c-0.21569 0-0.39992 0.076955-0.5527 0.23086-0.15278 0.15391-0.22917 0.33951-0.22917 0.55679v8.5148c0 0.21728 0.076389 0.40288 0.22917 0.55679 0.15278 0.15391 0.33701 0.23086 0.5527 0.23086h8.4522z" />
                    </g>
                </g>
            </g>
          </svg>
          </a>
          <a href="https://www.mozilla.org/de/firefox/new/" class="link">
            Mozilla Firefox
            <svg class="externalLinkIcon" version="1.1" viewBox="0 0 11 11" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(-587 -247)" fill="#000" fill-rule="nonzero">
                    <g transform="translate(587 247)">
                        <path id="a"
                            d="m5.9583 5.7444 3.3162-3.3543 0.90319 0.8284c0.15278 0.15391 0.32802 0.18107 0.52574 0.081481s0.29657-0.25802 0.29657-0.47531v-2.2951c0-0.15391-0.049428-0.28066-0.14828-0.38025-0.098856-0.099588-0.22018-0.14938-0.36397-0.14938h-2.5074c-0.23366 0-0.39318 0.10638-0.47855 0.31914-0.085376 0.21276-0.042688 0.39609 0.12806 0.55l0.95711 0.8284-3.3297 3.3407 0.70098 0.70617z" />
                        <path
                            d="m9.2341 11c0.21569 0 0.39767-0.076955 0.54596-0.23086s0.22243-0.33951 0.22243-0.55679v-4.9568h-0.94363v4.7802h-8.0613v-8.1617h4.7451v-0.9642h-4.9608c-0.21569 0-0.39992 0.076955-0.5527 0.23086-0.15278 0.15391-0.22917 0.33951-0.22917 0.55679v8.5148c0 0.21728 0.076389 0.40288 0.22917 0.55679 0.15278 0.15391 0.33701 0.23086 0.5527 0.23086h8.4522z" />
                    </g>
                </g>
            </g>
          </svg>
          </a>
          <a href="https://www.microsoft.com/de-de/edge" class="link">
            Microsoft Edge
            <svg class="externalLinkIcon" version="1.1" viewBox="0 0 11 11" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
                <g transform="translate(-587 -247)" fill="#000" fill-rule="nonzero">
                    <g transform="translate(587 247)">
                        <path id="a"
                            d="m5.9583 5.7444 3.3162-3.3543 0.90319 0.8284c0.15278 0.15391 0.32802 0.18107 0.52574 0.081481s0.29657-0.25802 0.29657-0.47531v-2.2951c0-0.15391-0.049428-0.28066-0.14828-0.38025-0.098856-0.099588-0.22018-0.14938-0.36397-0.14938h-2.5074c-0.23366 0-0.39318 0.10638-0.47855 0.31914-0.085376 0.21276-0.042688 0.39609 0.12806 0.55l0.95711 0.8284-3.3297 3.3407 0.70098 0.70617z" />
                        <path
                            d="m9.2341 11c0.21569 0 0.39767-0.076955 0.54596-0.23086s0.22243-0.33951 0.22243-0.55679v-4.9568h-0.94363v4.7802h-8.0613v-8.1617h4.7451v-0.9642h-4.9608c-0.21569 0-0.39992 0.076955-0.5527 0.23086-0.15278 0.15391-0.22917 0.33951-0.22917 0.55679v8.5148c0 0.21728 0.076389 0.40288 0.22917 0.55679 0.15278 0.15391 0.33701 0.23086 0.5527 0.23086h8.4522z" />
                    </g>
                </g>
            </g>
          </svg>
          </a>
        </div>
      </div>
    </div>
    <script type="text/javascript">
      (function(a,b,c,d){
      a='https://tags.tiqcdn.com/utag/rasch/handelszeitung.ch/prod/utag.js';
      b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
      a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
      })();
    </script>
  </body>
</html>`;
