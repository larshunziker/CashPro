/* istanbul ignore file */

import React from 'react';
import styleguideTypographyFactory from '../../../../../../../common/screens/Styleguide/components/Typography/factory';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import StatusPage from '../../../StatusPage';
import BreadcrumbsProvider from '../../../../../../../common/components/BreadcrumbsProvider';
import typography from '../../../../assets/styles/typography.legacy.css';
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
        label: 'Typography',
        link: null,
      },
    },
  ],
};

const StyleguideTypography = styleguideTypographyFactory({
  breadcrumbs: (
    <BreadcrumbsProvider pageUrl={'Typography'} items={breadcrumbItems} />
  ),
  StatusPage,
  styles: {
    Wrapper: styles.Wrapper,
    HeaderTitle: styles.HeaderTitle,
    Label: styles.Label,
    WrapperInner: styles.WrapperInner,
    Title: styles.Title,
    ItemWrapper: styles.ItemWrapper,
    Input: styles.Input,
    InputLabel: styles.InputLabel,
  },
  typography,
  setLoading,
  setScreenReady,
});

export default StyleguideTypography;
