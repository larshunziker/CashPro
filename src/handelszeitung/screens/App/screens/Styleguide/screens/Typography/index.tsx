/* istanbul ignore file */

import React from 'react';
import styleguideTypographyFactory from '../../../../../../../common/screens/Styleguide/components/Typography/factory';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import Breadcrumbs from '../../../../components/Breadcrumbs';
import StatusPage from '../../../StatusPage';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import typography from '../../../../assets/styles/typography.legacy.css';
import styles from './styles.legacy.css';

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
  breadcrumbs: (
    <div className={grid.Container}>
      {/* @ts-ignore TODO: TS2322 ->  Type 'Omit<ActiveMenuTrailItemConnection, "pageInfo">' is not assignable to type 'BreadcrumbsItems'. */}
      <Breadcrumbs pageUrl={'typography'} items={breadcrumbItems} />
    </div>
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
