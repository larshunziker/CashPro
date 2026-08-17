function isReactModule(path) {
  return path.startsWith('react');
}
function isReduxModule(path) {
  return path.indexOf('redux') !== -1;
}
function isRecomposeModule(path) {
  return path.indexOf('recompose') !== -1;
}
function isImage(path) {
  return path.indexOf('graphics/') !== -1;
}

function isStyleFile(path) {
  return path.endsWith('.css');
}
function isfactory(path) {
  return path.endsWith('factory');
}
function isConstants(path) {
  return (
    path.startsWith('constants') ||
    path.endsWith('constants') ||
    path.indexOf('shared/constants') !== -1
  );
}
function isLocalType(path) {
  return path.endsWith('typings') || path.endsWith('types');
}
function isSelector(path) {
  return (
    path.startsWith('selectors') || path.indexOf('shared/selectors') !== -1
  );
}
function isDecorator(path) {
  return (
    path.startsWith('decorators') || path.indexOf('shared/decorators') !== -1
  );
}
function isReducer(path) {
  return (
    path.startsWith('reducers') ||
    path.indexOf('shared/reducers') !== -1 ||
    path.indexOf('./reducers') !== -1
  );
}
function isAction(path) {
  return path.startsWith('actions') || path.indexOf('shared/actions') !== -1;
}
function isHook(path) {
  return path.startsWith('hooks') || path.indexOf('shared/hooks') !== -1;
}
function isQueriesOrFragments(path) {
  return path.indexOf('queries') !== -1 || path.indexOf('fragments') !== -1;
}
function isHelpers(path) {
  return path.indexOf('helpers') !== -1;
}
function startsWithUpper(path) {
  var char = path.charAt(0);
  return char === char.toUpperCase();
}
function startsWithLower(path) {
  var char = path.charAt(0);
  return char === char.toLowerCase();
}
function isFile(path) {
  return (
    path.extname(path) ||
    path.toLowerCase().indexOf('mock') !== -1 ||
    path.toLowerCase().indexOf('config') !== -1
  );
}
function isComponent(path) {
  var char = path.basename(path).charAt(0);
  return char === char.toUpperCase();
}
// function isOtherModule(path) {
//   if (
//     isHook(imported) ||
//     isAction(imported) ||
//     isSelector(imported) ||
//     isHelpers(imported) ||
//     isReducer(imported) ||
//     isDecorator(imported) ||
//     isfactory(imported) ||
//     isLocalType(imported) ||
//     isStyleFile(imported) ||
//     isTypeImport(imported) ||
//     isConstants(imported) ||
//     startsWithUpper(imported)
//   ) {
//     return false;
//   }
//   return startsWithLower(imported);
// }

const importSortStyleRasch = {
  groups: [
    'builtin',
    'external',
    ['internal', 'parent', 'sibling', 'index', 'object'],
    'unknown',
    'type',
  ],
  pathGroups: [
    { pattern: isReactModule, group: 'builtin', position: 'before' },
    { pattern: isReduxModule, group: 'builtin' },
    { pattern: isRecomposeModule, group: 'builtin' },
    { pattern: isConstants, group: 'unknown', position: 'before' },
    { pattern: isQueriesOrFragments, group: 'unknown' },
    { pattern: isStyleFile, group: 'unknown', position: 'after' },
    { pattern: isImage, group: 'type', position: 'before' },
    { pattern: isLocalType, group: 'type' },
  ],
};

module.exports = { importSortStyleRasch };

/*

```code
  // react 👍🏻
  // redux 👍🏻
  // recompose 👍🏻
  // classnames 👍🏻
  // other external libs 👍🏻
  // factories 👍🏻
  // helpers 👍🏻
  // selectors 👍🏻
  // decorators 👍🏻
  // reducers 👍🏻
  // actions 👍🏻
  // hooks 👍🏻
  // components /provider 👍🏻
  // constants 👍🏻
  // queries / fragments 👍🏻
  // stylings 👍🏻
  // images 👍🏻
  // typings 👍🏻
```

This is a result set how it will look after it's sorted 😎

  ```javascript
import React from 'react';
import thunk from 'redux-thunk';
import { compose } from 'recompose/compose';
import classnames from 'classnames';
import selectFieldFactory from '../../../../../../../../../common/components/Paragraphs/components/WebformParagraph/components/SelectField/factory';
import testFactory from '../../Test/factory';
import testHelper from '../../Test/helpers';
import testUtilsHelpers from '../../helpers/utils';
import testUtilsHelper from 'helpers/utils';
import windowStateSelector from '../../../../../../../../../shared/selectors/windowStateSelector';
import { initialState as headerInitialState } from './reducers/header';
import reducerHeaders from './reducers/headers';
import reducerAuth from 'reducers/auth';
import reducerRout from 'reducers/rout';
import { VIEWPORT_XS } from '../../../../../../../../../shared/actions/window';
import actionAuth from 'actions/auth';
import useInView, { type UseInViewResponse } from 'hooks/useInView';
import Icon from '../../../../../Icon';
import IconFOO from 'IconFoo';
import { XXX } from '../../../../../../../../../shared/constants/window';
import { FOO } from './constants'; // flow-ignore-next-line
import { PIANO_CONTAINER_ANIMATED } from 'constants/piano'; // flow-ignore-next-line
import { fragment } from './fragments';
import { QUERY } from './queries'; // flow-ignore-next-line
import styles from '../../Test/styles.css';
import commonStyles from '../../shared/styles.legacy.css';
import IconSVG from '../../../../../Icon.svg';
import { ActiveMainChannel } from '../../../../../../shared/types';
import { xx } from './types';
import type { xsx } from './typings';
```
*/
