export default () => `<!DOCTYPE html>
<html lang="de-CH">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Browser nicht unterstützt</title>
    <script type="text/javascript">
      var utag_data = {
        cms_page_type : "ErrorPage"
      }
    </script>
    <style type="text/css">
    @font-face {
      font-family: 'ActaDisplay';
      font-weight: 700;
      font-style: normal;
      src: local('ActaDisplayBold'),
        url(https://www.gaultmillau.ch/static/media/ActaDisplay-Bold.2b799229.woff)
    }
  
    @font-face {
      font-family: 'BagueSansProLight';
      font-weight: 300;
      font-style: normal;
      src: local('BagueSansProLight'),
       url(https://www.gaultmillau.ch/static/media/PFBagueSansPro-Light.adb8b725.woff)
    }

    @font-face {
      font-family: 'BagueSansProRegular';
      font-weight: 400;
      font-style: normal;
      src: local('BagueSansProRegular'),
       url(https://www.gaultmillau.ch/static/media/PFBagueSansPro-Regular.712a9be0.woff)
    }

    html,
    body {
      margin: 0;
      padding: 0;
    }

    body {
      -webkit-font-smoothing: antialiased;
    }

    .wrapper {
      margin: 40px 0 64px;
    }

    .container {
      margin-left: auto;
      margin-right: auto;
      width: calc(100% - 38px);
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 524px;
      text-align: center;
      color: #000000;
    }

    .headerWrapper {
      align-items: flex-start;
      display: flex;
      width: 100%;
    }

    .title {
      font-family: ActaDisplay, serif;
      font-size: 40px;
      font-weight: bold;
      letter-spacing: -0.04px;
      line-height: 40px;
      word-break: break-word;
    }

    .description {
      font-family: BagueSansProLight, sans-serif;
      font-size: 20px;
      line-height: 29px;
      margin-top: 16px;
      text-align: center;
    }

    .linkWrapper {
      display: flex;
      flex-direction: column;
      margin-top: 39px;
    }

    .link {
      font-family: BagueSansProRegular, sans-serif;
      font-size: 15px;
      line-height: 18px;
      text-decoration: none;
      margin-bottom: 27px;
      letter-spacing: 5px;
      color: #000000;
      text-transform: uppercase;
    }
    
    .link:hover {
      color: #e5b630;
    }

    .externalLinkIcon {
      height: 11px;
      margin-left: 8px;
      width: 15px;
    }

    .externalLinkIcon > g > g {
      fill: #000000;
    }

    .link:hover .externalLinkIcon > g > g {
      fill: #e5b630;
    }
    </style>
    <link rel="icon" type="image/x-icon" href="https://www.gaultmillau.ch/static/media/da6a6e615ceb6cb53ec1bcad6251c927.ico"/>
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <div class="headerWrapper">
          <div class="title">
            Dieser Browser wird nicht mehr unterstützt
          </div>
        </div>

        <div class="description">
          Wir empfehlen Ihnen, einen der folgenden Browser zu nutzen
        </div>

        <div class="linkWrapper">
          <a href="https://www.google.com/intl/de/chrome/" class="link">
            / Google Chrome
            <svg class="externalLinkIcon" version="1.1" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
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
            / Mozilla Firefox
            <svg class="externalLinkIcon" version="1.1" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
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
            / Microsoft Edge
            <svg class="externalLinkIcon" version="1.1" viewBox="0 0 11 11" xmlns="http://www.w3.org/2000/svg">
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
      a='https://tags.tiqcdn.com/utag/rasch/gaultmillau.ch/prod/utag.js';
      b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
      a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
      })();
    </script> 
  </body>
</html>`;
