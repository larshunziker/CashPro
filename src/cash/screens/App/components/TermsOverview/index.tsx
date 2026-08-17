import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import termsOverviewFactory from '../../../../../common/components/TermsOverview/factory';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import AlphabeticNavigation from '../AlphabeticNavigation';
import Breadcrumbs from '../Breadcrumbs';
import styles from './styles.legacy.css';
import { TermsOverviewProps as TermsOverviewCommonProps } from '../../../../../common/components/TermsOverview/typings';

type TermsOverviewProps = TermsOverviewCommonProps & {
  breadcrumbItems: ActiveMenuTrailItemConnection;
  theme?: string;
};

const BreadcrumbsByProps = ({
  activeLetter,
  breadcrumbItems,
  title,
}: TermsOverviewProps): ReactElement<typeof Breadcrumbs> => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  if (isHybridApp) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<ScrollButtonComponent | BreadcrumbsComponent, string | JSXElementCo */
    return null;
  }
  return (
    <Breadcrumbs
      /* @ts-ignore TODO: TS2322 ->  Type 'Pick<ActiveMenuTrailItemConnection, "edges"> & ActiveMenuTrailItemConnection' is not assignable to type 'Breadcru */
      items={breadcrumbItems}
      title={`${title}: ${activeLetter}`}
      staticData
      pageUrl={'/'}
    />
  );
};

const getAlphabeticNavigationByProps = (
  props: TermsOverviewProps,
): ReactElement<typeof AlphabeticNavigation> => (
  <AlphabeticNavigation enableOverlay={true} {...props} />
);

const TermsOverview = termsOverviewFactory({
  styles: {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    Container: null,
    Title: styles.Title,
    TitleWrapper: styles.TitleWrapper,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string | undefined'. */
    Wrapper: null,
  },
  Breadcrumbs: BreadcrumbsByProps,
  AlphabeticNavigation: getAlphabeticNavigationByProps,
});

export default TermsOverview;
