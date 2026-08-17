import React, { useEffect, useRef, useState } from 'react';
import {
  grepJsTagsFromView,
  stripScriptTagsFromView,
} from '../../../../../shared/helpers/ssrPreload';
import { log } from '../../../../../shared/helpers/utils';
import { ClientSideESIProps } from './typings';

/* @ts-ignore TODO: TS7006 ->  Parameter 'scriptToAppend' implicitly has an 'any' type. */
export const appendScript = (scriptToAppend) => {
  const script = document.createElement('script');
  script.src = scriptToAppend;
  script.defer = true;
  document.body.appendChild(script);

  return script;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'inlineJs' implicitly has an 'any' type. */
export const appendInlineScript = (inlineJs) => {
  const script = document.createElement('script');

  script.innerHTML = inlineJs;
  document.body.appendChild(script);

  return script;
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'htmlContent' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'htmlRef' implicitly has an 'any' type. */
const appendModuleScripts: any = (htmlContent, htmlRef) => {
  const html = document.createRange().createContextualFragment(htmlContent);
  if (htmlRef.current) {
    htmlRef.current.appendChild(html);
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'view' implicitly has an 'any' type. */
const grepModuleJsTagsFromView = (view) => {
  const reJS = /<script(.+?type="module").*?>.?((.|\n|\r\n)*?)?<\/script>/gim;
  let m: any = {};
  const moduleJs = [];
  while ((m = reJS.exec(view)) !== null) {
    if (m) {
      moduleJs.push(m[0]);
    }
  }
  return moduleJs;
};

const clientSideEsiFactory = () => {
  const ClientSideESI = ({ html }: ClientSideESIProps) => {
    const htmlRef = useRef(null);
    const [htmlWithoutScripts] = useState(() => {
      return stripScriptTagsFromView(html);
    });

    useEffect(() => {
      const scriptTags: HTMLScriptElement[] = [];
      let appendedScripts: HTMLScriptElement[] = [];
      let htmlWithoutComment = html;
      if (html !== null) {
        htmlWithoutComment = html.replace(/<!--esi.*?-->/gs, '');
      }
      const { inlineJs, externalJsSources } = grepJsTagsFromView(
        htmlWithoutComment,
        true,
      );
      const moduleJs = grepModuleJsTagsFromView(htmlWithoutComment);
      if (inlineJs && inlineJs?.length > 0) {
        scriptTags.push(appendInlineScript(inlineJs.join('')));
      }

      if (moduleJs && moduleJs?.length > 0) {
        appendModuleScripts(moduleJs.join(''), htmlRef);
      }

      if (externalJsSources && externalJsSources?.length > 0) {
        externalJsSources.forEach((src) => {
          // create regex with dynamic src
          const scriptReg = new RegExp(
            `<script.+?src="${src}".+?><\/script>`,
            'gi',
          );
          if (
            !scriptReg.test(document.body.innerHTML) &&
            !scriptReg.test(document.head.innerHTML)
          ) {
            appendedScripts.push(src);
            scriptTags.push(appendScript(src));
          }
        });
      }

      return () => {
        try {
          appendedScripts = [];
          scriptTags.forEach((scriptTag) => {
            document.body.removeChild(scriptTag);
          });
        } catch (error) {
          if (__DEVELOPMENT__) {
            log('ClientSideESI', `there was an error ${error}`, 'red');
          }
        }
      };
    }, [html]);

    if (!html || !htmlWithoutScripts) {
      return null;
    }

    return (
      <div
        ref={htmlRef}
        className="esi_client"
        dangerouslySetInnerHTML={{ __html: htmlWithoutScripts }}
      ></div>
    );
  };
  return ClientSideESI;
};

export default clientSideEsiFactory;
