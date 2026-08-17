import React, { ReactElement } from 'react';
import classNames from 'classnames';
import termsOverviewFactory from '../../../../../common/components/TermsOverview/factory';
import AlphabeticNavigation from '../AlphabeticNavigation';
import Breadcrumbs from '../Breadcrumbs';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import {
  TermsOverviewFactoryOptionsStyles,
  TermsOverviewProps as TermsOverviewCommonProps,
} from '../../../../../common/components/TermsOverview/typings';

type TermsOverviewProps = TermsOverviewCommonProps & {
  breadcrumbItems: ActiveMenuTrailItemConnection;
  theme?: string;
};

const getStylesByProps = ({
  theme = '',
}: TermsOverviewProps): TermsOverviewFactoryOptionsStyles => {
  return {
    Container: sections.Container,
    Title: styles.Title,
    TitleWrapper: styles.TitleWrapper,
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Header */
    Wrapper: classNames(styles[theme], styles.HeaderSection),
  };
};

const getBreadcrumbsByProps = ({
  activeLetter,
  breadcrumbItems,
  title,
}: TermsOverviewProps): ReactElement<typeof Breadcrumbs> => (
  <Breadcrumbs
    /* @ts-ignore TODO: TS2322 ->  Type 'Pick<ActiveMenuTrailItemConnection, "edges"> & ActiveMenuTrailItemConnection' is not assignable to type 'Breadcru */
    items={breadcrumbItems}
    title={`${title}: ${activeLetter}`}
    staticData
    pageUrl={'/'}
  />
);

const getAlphabeticNavigationByProps = (
  props: TermsOverviewProps,
): ReactElement<typeof AlphabeticNavigation> => (
  <AlphabeticNavigation enableOverlay={true} {...props} />
);

const TermsOverview = termsOverviewFactory({
  styles: getStylesByProps,
  Breadcrumbs: getBreadcrumbsByProps,
  AlphabeticNavigation: getAlphabeticNavigationByProps,
});

export default TermsOverview;
