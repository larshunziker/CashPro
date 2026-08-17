/* istanbul ignore file */

import React from 'react';
import styleguideFactory from '../../../../../common/screens/Styleguide/factory';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import Overview from '../../../../../common/screens/Styleguide/components/Overview';
import Breadcrumbs from '../../components/Breadcrumbs';
import StatusPage from '../StatusPage';
import styles from './styles.legacy.css';

const breadcrumbItems: Omit<ActiveMenuTrailItemConnection, 'pageInfo'> = {
  count: 2,
  totalCount: 2,
  edges: [
    {
      node: {
        id: '',
        label: 'Styleguide',
        link: null,
        __typename: 'ActiveMenuTrailItem',
      },
      __typename: 'ActiveMenuTrailItemEdge',
    },
  ],
  __typename: 'ActiveMenuTrailItemConnection',
};

const Styleguide = styleguideFactory({
  /* @ts-ignore TODO: TS2322 ->  Type 'Omit<ActiveMenuTrailItemConnection, "pageInfo">' is not assignable to type 'BreadcrumbsItems'. */
  breadcrumbs: <Breadcrumbs pageUrl={'styleguide'} items={breadcrumbItems} />,
  StatusPage,
  StyleguideComponents: Overview,
  title: 'Styleguide',
  styles,
  setLoading,
  setScreenReady,
});

export default Styleguide;
