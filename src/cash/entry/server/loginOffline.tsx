export default () => `<!DOCTYPE html>
<html lang="de-CH">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Login Service nicht verfügbar</title>
    <style type="text/css">

    @font-face {
      font-family: 'Source Serif Pro';
      font-display: block;
      font-weight: normal;
      src: url('https://fonts.gstatic.com/s/sourceserifpro/v15/neIQzD-0qpwxpaWvjeD0X88SAOeauXQ-oAGIyY0.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Source Serif Pro';
      font-display: block;
      font-weight: bold;
      src: url('https://fonts.gstatic.com/s/sourceserifpro/v15/neIXzD-0qpwxpaWvjeD0X88SAOeasc8btSyqxKcsdrM.woff2') format('woff2')
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
        font-family: Source Serif Pro, Times New Roman, Times, serif;
        font-size: 27px;
        font-weight: bold;
        line-height: 39px;
        margin-left: 16px;
        min-height: 72px;
      }

      .description {
        color: #000000;
        font-family: Source Serif Pro, Arial, Helvetica, serif;
        font-weight: normal;
        font-size: 18px;
        line-height: 25px;
        margin: 16px 0 40px;
        text-align: left;
      }

      .link-text {
        color: #B11029;
      }
      
      .link-text:hover {
        color: #7A0000;
      }

      .link {
        background-color: #B11029;
        border-radius: 4px;
        color: #ffffff;
        cursor: pointer;
        display: inline-block;
        font-family: Source Serif Pro, Arial, Helvetica, serif;
        font-size: 14px;
        font-weight: 900;
        line-height: 18px;
        outline: none;
        padding: 10px 18px;
        position: relative;
        text-decoration: none;
      }

      .link:hover {
        background-color: #7A0000;
        cursor: pointer;
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
          font-size: 18px;
          padding: 16px 24px;
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

        .description {
          font-size: 22px;
          line-height: 32px;
        }
      }
    </style>
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

              <g class="bg-500-animation">
                <ellipse rx="35" ry="35" stroke="#d8d8d8" fill="#d8d8d8" stroke-miterlimit="10" stroke-linejoin="round" stroke-width="2" stroke-dasharray="220 220" stroke-dashoffset="220" fill-opacity="0" fill-rule="evenodd" transform="translate(36,36)" style="animation: 1s linear both a0_so, 1s linear both a0_fo, 1s linear both a0_da, 1s linear both a0_do;"/><g transform="translate(16.2,-936.9)"><path class="st0" d="M1.6 960c-1.2 3.5-0.5 7.6 2.3 10.4c2.8 2.8 6.9 3.6 10.4 2.3l18.5 18.5c1.7 1.7 4.4 1.7 6 0c1.6-1.7 1.7-4.4 0-6l-18.5-18.5c1.2-3.5 .5-7.6-2.3-10.4c-2.8-2.8-6.9-3.6-10.4-2.3l4 4c1.7 1.7 1.7 4.4 0 6c-1.7 1.7-4.4 1.7-6 0l-4-4Z" stroke-width="2" stroke-linejoin="round" stroke="#4a4a4a" stroke-miterlimit="10" fill="#fff" fill-opacity="0" stroke-dashoffset="135" stroke-dasharray="135 135" stroke-linecap="round" transform="translate(-0.7,0)" style="animation: 1s linear both a1_fo, 1s linear both a1_do;"/></g>
              </g>
            </svg>
          </div>

          <div class="title">
            Anmelden aktuell nicht möglich
          </div>
        </div>

        <div class="description">
          Aufgrund einer technischen Störung bei unserem Login-Anbieter OneLog können Sie sich aktuell nicht anmelden. Das gesamte Team arbeitet intensiv an der Wiederherstellung des Login-Services.
        </div>

        <div class="description">
          Falls Sie Fragen zu Ihrem Kundenkonto haben oder Anpassungen an Ihrem Abonnement vornehmen möchten, wenden Sie sich bitte an unseren Kundenservice. Sie erreichen uns telefonisch unter <a class="link-text" href="tel:0585107301">058 510 73 01</a> oder per E-Mail an <a class="link-text" href="mailto:kundenservice@ringier.ch">kundenservice@ringier.ch</a>.
        </div>

        <div class="description">
          Für weitere Informationen verweisen wir Sie auf die Medienmitteilungen von <a class="link-text" target="_blank" href="https://onelog.ch/info/">OneLog</a>
        </div>

        <div class="description">
          Wir bedauern diese Umstände und bedanken uns für Ihr Verständnis.
        </div>

        <a href="/" class="link">
          Zur Startseite
        </a>
      </div>
    </div>
  </body>
</html>`;
