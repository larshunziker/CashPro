/* @ts-ignore TODO: .tsx(1,17): ->  Parameter 'error' implicitly has an 'any' type. */
export default (error) => `<!DOCTYPE html>
<html lang="de-CH">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Internal server error</title>
    <style type="text/css">
      @font-face {
        font-family: "LeJeune";
        font-style: normal;
        font-weight: 600;
        font-display: fallback;
        src: local("LeJeuneDeck-Semibold-Web"),
          url(https://www.schweizer-illustrierte.ch/static/media/subset-LeJeuneDeck-Semibold-Web.f90bc9a7.woff2);
      }

      @font-face {
        font-family: "PFBagueSansPro";
        font-style: normal;
        font-weight: 300;
        font-display: fallback;
        src: local("PFBagueSansPro-Light"),
          url(https://www.schweizer-illustrierte.ch/static/media/subset-PFBagueSansPro-Light.8c330ffa.woff2);
      }

      @font-face {
        font-family: "PFBagueSansPro";
        font-style: normal;
        font-weight: bold;
        font-display: fallback;
        src: local("PFBagueSansPro-Bold"),
          url(https://www.schweizer-illustrierte.ch/static/media/subset-PFBagueSansPro-Bold.18fa3504.woff2);
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
        color: #000000;
        font-family: LeJeune, Times New Roman, Times, serif, sans-serif;
        font-size: 27px;
        font-weight: bold;
        line-height: 39px;
        margin-left: 16px;
        min-height: 72px;
      }

      .description {
        color: #000000;
        font-family: PFBagueSansPro, Arial, Helvetica, sans-serif;
        font-size: 18px;
        line-height: 25px;
        margin-top: 16px;
        text-align: left;
      }

      .link {
        background-color: #d51030;
        background: linear-gradient(to right, #e81c4c 0%, #d51030 100%);
        color: #ffffff;
        cursor: pointer;
        display: inline-block;
        filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5));
        font-family: PFBagueSansPro, Arial, Helvetica, sans-serif;
        font-size: 14px;
        font-style: italic;
        font-weight: 900;
        line-height: 18px;
        margin-left: 10px;
        margin-top: 40px;
        outline: none;
        padding: 3px 10px;
        position: relative;
        text-decoration: none;
      }

      .link::before,
      .link::after {
        border-style: solid;
        content: "";
        display: inline-block;
        height: 0;
        position: absolute;
        top: 0;
        width: 0;
      }

      .link::before {
        border-color: #e81c4c;
        border-right-color: transparent;
        border-width: 12px 12px 12px 0;
        left: 0;
        transform: rotate(180deg) translateX(100%);
      }

      .link::after {
        border-bottom: 12px solid transparent;
        border-left: 12px solid #d51030;
        border-right: 0;
        border-top: 12px solid transparent;
        right: 0;
        transform: translateX(100%);
      }

      @media (min-width: 760px) {
        .wrapper {
          margin: 80px 0;
        }

        .title {
          font-size: 40px;
          line-height: 54px;
          margin-left: 32px;
        }

        .description {
          font-size: 20px;
          line-height: 33px;
          margin-left: 104px;
          margin-top: 8px;
        }

        .link {
          margin-left: 104px;
        }
      }

      @media (min-width: 960px) {
        .container {
          width: 796px;
        }
      }

      @media (min-width: 1680px) {
        .title {
          font-size: 50px;
          line-height: 65px;
        }

        .container {
          width: 1272px;
        }
      }
    </style>
    <link
      rel="icon"
      type="image/x-icon"
      href="https://www.schweizer-illustrierte.ch/static/media/9680cfb61965bba00d78b456d84d5ff5.ico"
    />
  </head>
  <body>
    <div class="wrapper">
      <div class="container">
        <div class="headerWrapper">
          <div class="iconWrapper">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72"><style>
              @keyframes a0_so { 0% { stroke-opacity: 1; } 80% { stroke-opacity: 1; } 100% { stroke-opacity: 0; } }
              @keyframes a0_fo { 0% { fill-opacity: 0; } 60% { fill-opacity: 0; } 80% { fill-opacity: 1; } 100% { fill-opacity: 1; } }
              @keyframes a0_da { 0% { stroke-dasharray: 220px 220px; } 30% { stroke-dasharray: 220px 220px; animation-timing-function: cubic-bezier(.4,0,.6,1); } 70% { stroke-dasharray: 220px 220px; } 100% { stroke-dasharray: 220px 220px; } }
              @keyframes a0_do { 0% { stroke-dashoffset: 220px; } 30% { stroke-dashoffset: 220px; animation-timing-function: cubic-bezier(.4,0,.6,1); } 70% { stroke-dashoffset: 0px; } 100% { stroke-dashoffset: 0px; } }
              @keyframes a1_fo { 0% { fill-opacity: 0; } 50% { fill-opacity: 0; } 70% { fill-opacity: 1; } 100% { fill-opacity: 1; } }
              @keyframes a1_do { 0% { stroke-dashoffset: 135px; animation-timing-function: cubic-bezier(.4,0,.6,1); } 70% { stroke-dashoffset: 0px; } 100% { stroke-dashoffset: 0px; } }
              </style>

              <g class="si-500-animation">
                <ellipse rx="35" ry="35" stroke="#d8d8d8" fill="#d8d8d8" stroke-miterlimit="10" stroke-linejoin="round" stroke-width="2" stroke-dasharray="220 220" stroke-dashoffset="220" fill-opacity="0" fill-rule="evenodd" transform="translate(36,36)" style="animation: 1s linear both a0_so, 1s linear both a0_fo, 1s linear both a0_da, 1s linear both a0_do;"/><g transform="translate(16.2,-936.9)"><path class="st0" d="M1.6 960c-1.2 3.5-0.5 7.6 2.3 10.4c2.8 2.8 6.9 3.6 10.4 2.3l18.5 18.5c1.7 1.7 4.4 1.7 6 0c1.6-1.7 1.7-4.4 0-6l-18.5-18.5c1.2-3.5 .5-7.6-2.3-10.4c-2.8-2.8-6.9-3.6-10.4-2.3l4 4c1.7 1.7 1.7 4.4 0 6c-1.7 1.7-4.4 1.7-6 0l-4-4Z" stroke-width="2" stroke-linejoin="round" stroke="#4a4a4a" stroke-miterlimit="10" fill="#fff" fill-opacity="0" stroke-dashoffset="135" stroke-dasharray="135 135" stroke-linecap="round" transform="translate(-0.7,0)" style="animation: 1s linear both a1_fo, 1s linear both a1_do;"/></g>
              </g>
            </svg>
          </div>

          <div class="title">
            Hoppla! schweizer-illustrierte.ch ist gerade nicht erreichbar.
          </div>
        </div>

        <div class="description">
          Entschuldige ... Es ist ein technischer Fehler aufgetreten. Versuch es
          später erneut.
        </div>

        <a href="/" class="link">
          Zur Startseite
        </a>
      </div>
    </div>

    <div id="errorMessage" style="display: none;">${error.message}</div>
    <script>
      console.error('${error.message}');
    </script>
  </body>
</html>`;
