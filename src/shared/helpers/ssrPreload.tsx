/**
 * @file   ssr preload helper
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2018-06-28
 *
 */

/**
 * greps all script tags out of the view and separates then by internal and external resources
 * @param {string} view  - content of view
 * @returns {JsTagsObject}
 */
/* @ts-ignore TODO: TS7006 ->  Parameter 'view' implicitly has an 'any' type. */
export const grepJsTagsFromView = (view, fullScripts = false) => {
  let reJS =
    /<script(.+?src="(?<jsSrc>[^"]+?.js)")?(.+?type="(text|application)\/javascript")?>(?<inlineJs>[\s\S]*?)<\/script>/gi;

  if (fullScripts) {
    reJS =
      /<script(.+?src="(?<jsSrc>[^"]+?.js)")?(?!(.*?type="module")+?).*?>(?<inlineJs>[\s\S]*?)<\/script>/gim;
  }

  let m: any = {};

  const internalJsSources = [];
  const externalJsSources = [];
  const inlineJs = [];
  while ((m = reJS.exec(view)) !== null) {
    if (m) {
      if (m?.groups?.inlineJs) {
        inlineJs.push(m?.groups?.inlineJs);
      }
      if (m?.groups?.jsSrc) {
        if (
          m.groups.jsSrc.indexOf('vendors') > -1 ||
          m.groups.jsSrc.indexOf('main.') > -1 ||
          m.groups.jsSrc.indexOf('runtime.') > -1
        ) {
          internalJsSources.push(m.groups.jsSrc);
        } else if (
          m.groups.jsSrc.indexOf(
            'cdn.ringier-advertising.ch/prod/tagmanager/',
          ) >= 0
        ) {
          // do nothing and keep defined order
        } else if (m.groups.jsSrc.indexOf('init-thirdparty.') >= 0) {
          // do nothing and keep defined order
        } else {
          externalJsSources.push(m.groups.jsSrc);
        }
      }
    }
  }

  return {
    internalJsSources,
    externalJsSources,
    inlineJs,
  };
};

/**
 * greps all style tags out of the view
 * @param {string} view  - content of view
 * @returns {JsTagsObject}
 */
/* @ts-ignore TODO: TS7006 ->  Parameter 'view' implicitly has an 'any' type. */
export const grepStyleTagsFromView = (view) => {
  const reCSS = /<link.*?href="([^"]+?.css)"/gi;

  let m = {};

  const cssSources = [];
  /* @ts-ignore TODO: TS2322 ->  Type 'RegExpExecArray | null' is not assignable to type '{}'. */
  while ((m = reCSS.exec(view)) !== null) {
    if (m) {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '1' can't be used to index type '{}'. */
      cssSources.push(`<link rel="preload" href="${m[1]}" as="style">`);
    }
  }

  return cssSources;
};

/**
 * creates script loader to load scripts after dom content loaded
 * @param {CreateScriptLoaderProps} *
 * @returns {string}
 */
export const createScriptLoader = ({
  internalJsSources = [],
  externalJsSources = [],
  chunkedJsSources = [],
  children = '',
}) =>
  `
    <script type="text/javascript">
      ${children}
      if (typeof loadScript !== 'function') {
        var loadScript = function (src,isModule = false) {
          if (src !== '') {
            var tag = document.createElement('script');
            tag.async = false;
            tag.src = src;
            if (isModule) {
              tag.type = "module";
            }
            document.body.appendChild(tag);
          }
        }
      }

      ${
        (internalJsSources.length > 0 &&
          internalJsSources
            .map((src) => `loadScript('${src}', true);`)
            .join('')) ||
        ''
      }
      ${
        (externalJsSources.length > 0 &&
          externalJsSources.map((src) => `loadScript('${src}');`).join('')) ||
        ''
      }
      ${
        (chunkedJsSources.length > 0 &&
          chunkedJsSources
            /* @ts-ignore TODO: TS2339 ->  Property 'publicPath' does not exist on type 'never'. */
            .map((src) => `loadScript('${src.publicPath}', true);`)
            .join('')) ||
        ''
      }
    </script>
  `;

/**
 * append body child and remove existing scripts (except init-thirdparty)
 * @param {string} view
 * @param {string} script
 */
/* @ts-ignore TODO: TS7006 ->  Parameter 'view' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'addScript' implicitly has an 'any' type. */
export const appendBodyChildAndRemoveExistingScripts = (view, addScript) => {
  const scriptsRe = /<script[^>]+([^"]+?.js)"[^>]*?><\/script>/gs;
  const scripts = view.match(scriptsRe);
  const keepRe = /(init-thirdparty\.(.{8})\.min|atm\.js)/;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'script' implicitly has an 'any' type. */
  const keep = scripts?.filter((script) => keepRe.test(script));
  const keepWithoutDuplicate = [...new Set(keep)];
  view = view.replace(scriptsRe, '');
  view = view
    .replace(/<ignoreSSRPreloadScript/gi, '<script')
    .replace(/<\/ignoreSSRPreloadScript/gi, '</script');
  view = view.replace('</head>', keepWithoutDuplicate.join(' ') + '</head>');
  return view.replace('</body>', addScript + '</body>');
};

/**
 * creates preload tags
 * @param {PreloadScriptProps} *
 * @returns {Array<string>}
 */
/* @ts-ignore TODO: TS7031 ->  Binding element 'internalJsSources' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'externalJsSources' implicitly has an 'any' type. */
export const getPreloadScripts = ({ internalJsSources, externalJsSources }) => {
  const scripts = internalJsSources
    /* @ts-ignore TODO: TS7006 ->  Parameter 'src' implicitly has an 'any' type. */
    .map((src) => `<link rel="modulepreload" href="${src}" as="script">`)
    .concat(
      externalJsSources.map(
        /* @ts-ignore TODO: TS7006 ->  Parameter 'src' implicitly has an 'any' type. */
        (src) => `<link rel="preload" href="${src}" as="script">`,
      ),
    );

  return scripts;
};

export const stripScriptTagsFromView = (view: string) => {
  // https://stackoverflow.com/a/18052486
  const regex =
    /<script(?:(?!\/\/)(?!\/\*)[^'"]|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\/\/.*(?:\n)|\/\*(?:(?:.|\s))*?\*\/)*?<\/script>/gm;

  const newHtml = view.replace(regex, '').replace(/esi_script>/g, 'script>');

  return newHtml;
};
