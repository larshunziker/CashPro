import React, { ComponentType, ReactElement } from 'react';
import classNames from 'classnames';
import termsOverviewFactory from '../../../../../common/components/TermsOverview/factory';
import AlphabeticNavigation from '../AlphabeticNavigation';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { TermsOverviewProps } from '../../../../../common/components/TermsOverview/typings';

const getAlphabeticNavigationByProps = (
  props: TermsOverviewProps,
): ReactElement<typeof AlphabeticNavigation> => (
  <AlphabeticNavigation enableOverlay={true} {...props} />
);

const TermsOverview: ComponentType<TermsOverviewProps> = termsOverviewFactory({
  styles: {
    Container: grid.Container,
    Title: styles.Title,
    TitleInnerWrapper: classNames(grid.ColMd16, grid.ColOffsetMd4),
    TitleWrapper: classNames(grid.Row, styles.Wrapper),
  },
  AlphabeticNavigation: getAlphabeticNavigationByProps,
});

export default TermsOverview;
