/* istanbul ignore file */

import React from 'react';
import { BreadcrumbsItems } from 'src/common/components/Breadcrumbs/typings';
import styleguideFactory from '../../../../../common/screens/Styleguide/factory';
import { setLoading, setScreenReady } from '../../../../shared/actions/route';
import StatusPage from '../StatusPage';
import BreadcrumbsProvider from '../../../../../common/components/BreadcrumbsProvider';
import Overview from './components/Overview';
import styles from './styles.legacy.css';

const breadcrumbItems: BreadcrumbsItems = {
  edges: [
    {
      node: {
        label: 'Styleguide',
        link: null,
      },
    },
  ],
};

const Styleguide = styleguideFactory({
  breadcrumbs: (
    <BreadcrumbsProvider pageUrl={'styleguide'} items={breadcrumbItems} />
  ),
  StatusPage,
  StyleguideComponents: Overview,
  title: 'Styleguide',
  styles: {
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
  },
  setLoading,
  setScreenReady,
});

export default Styleguide;
