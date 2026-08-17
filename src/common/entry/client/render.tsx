/* istanbul ignore file */

import React, { ComponentType } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

if (__USE_DEBUG_TRACING__) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, { include: [/^(?!TestFragment).*$/] });
}

export default (mountNode: any, Root: ComponentType) => {
  if (__PRODUCTION__) {
    return hydrateRoot(mountNode, <Root />, {
      onRecoverableError: (error) => {
        // eslint-disable-next-line no-console
        console.log('hydrateRoot', error);
      },
    });
  }

  return createRoot(mountNode, {
    onRecoverableError: (error) => {
      // eslint-disable-next-line no-console
      console.log('hydrateRoot', error);
    },
  }).render(<Root />);
};
