/* istanbul ignore file */

import React from 'react';
import styleguideFactory from '../../../../../../../common/screens/Styleguide/components/Default/factory';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import StatusPage from '../../../StatusPage';
import Paragraphs from '../../components/Paragraphs';
import BreadcrumbsProvider from '../../../../../../../common/components/BreadcrumbsProvider';
import styles from './styles.legacy.css';
import { BreadcrumbsItems } from '../../../../../../../common/components/Breadcrumbs/typings';

const breadcrumbItems: BreadcrumbsItems = {
  edges: [
    {
      node: {
        label: 'Styleguide',
        link: '/styleguide',
      },
    },
    {
      node: {
        label: 'Paragraphs',
        link: null,
      },
    },
  ],
};

const Styleguide = styleguideFactory({
  breadcrumbs: (
    <BreadcrumbsProvider pageUrl={'paragraphs'} items={breadcrumbItems} />
  ),
  StatusPage,
  StyleguideComponents: Paragraphs,
  title: 'Paragraphs',
  styles: {
    ContentWrapper: styles.ContentWrapper,
    Title: styles.Title,
  },
  setLoading,
  setScreenReady,
});

export default Styleguide;
