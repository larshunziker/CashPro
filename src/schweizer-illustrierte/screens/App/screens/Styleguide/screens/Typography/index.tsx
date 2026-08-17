/* istanbul ignore file */

import React from 'react';
import styleguideTypographyFactory from '../../../../../../../common/screens/Styleguide/components/Typography/factory';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import StatusPage from '../../../StatusPage';
import typography from '../../../../assets/styles/typography.legacy.css';
import typographySY from '../../../../assets/styles/typographySY.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const getTypographyByProps = (props) => {
  let typo: Record<string, string> = typography;
  if (props['*'] === 'style') {
    typo = typographySY;
  }
  return typo;
};

const breadcrumbItems: Omit<ActiveMenuTrailItemConnection, 'pageInfo'> = {
  count: 2,
  totalCount: 2,
  edges: [
    {
      node: {
        id: '',
        label: 'Styleguide',
        link: '/styleguide',
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    },
    {
      node: {
        id: '',
        label: 'Typography',
        link: null,
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    },
  ],
  __typename: 'ActiveMenuTrailItemConnection',
};

const StyleguideTypography = styleguideTypographyFactory({
  /* @ts-ignore TODO: TS2322 ->  Type 'Omit<ActiveMenuTrailItemConnection, "pageInfo">' is not assignable to type 'BreadcrumbsItems'. */
  breadcrumbs: <Breadcrumbs pageUrl={'typography'} items={breadcrumbItems} />,
  StatusPage,
  styles,
  typography: getTypographyByProps,
  setLoading,
  setScreenReady,
});

export default StyleguideTypography;
