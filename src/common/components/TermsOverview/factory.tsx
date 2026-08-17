import React, { ReactElement } from 'react';
import TestFragment from '../../../shared/tests/components/TestFragment';
import {
  TermsOverviewFactoryOptions,
  TermsOverviewFactoryOptionsStyles,
  TermsOverviewProps,
} from './typings';

const defaultStyles: TermsOverviewFactoryOptionsStyles = {
  BreadcrumbsSection: '',
  Container: '',
  Divider: '',
  DividerInnerWrapper: '',
  DividerWrapper: '',
  Title: '',
  TitleInnerWrapper: '',
  TitleWrapper: '',
  Wrapper: '',
};

const termsOverviewFactory = ({
  Breadcrumbs: appBreadcrumbs,
  AlphabeticNavigation: appAlphabeticNavigation,
  styles: appStyles,
}: TermsOverviewFactoryOptions) => {
  return (props: TermsOverviewProps): ReactElement => {
    const { title, activeLetter, showDivider = false } = props;

    if (!activeLetter) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    const styles: TermsOverviewFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;
    /* @ts-ignore TODO: TS2322 ->  Type 'ReactElement<any, string | JSXElementConstructor<any>> | null' is not assignable to type 'ReactElement<any, strin */
    const Breadcrumbs: ReactElement =
      (typeof appBreadcrumbs === 'function' && appBreadcrumbs(props)) ||
      (typeof appBreadcrumbs === 'object' && appBreadcrumbs) ||
      null;
    /* @ts-ignore TODO: TS2322 ->  Type 'ReactElement<any, string | JSXElementConstructor<any>> | null' is not assignable to type 'ReactElement<any, strin */
    const AlphabeticNavigation: ReactElement =
      (typeof appAlphabeticNavigation === 'function' &&
        appAlphabeticNavigation(props)) ||
      (typeof appAlphabeticNavigation === 'object' &&
        appAlphabeticNavigation) ||
      null;

    return (
      <div className={styles.Wrapper} data-testid="wrapper">
        {Breadcrumbs && (
          <div className={styles.BreadcrumbsSection}>
            <div className={styles.Container} data-testid="breadcrumbs-wrapper">
              {Breadcrumbs}
            </div>
          </div>
        )}

        <TestFragment data-testid="alphabetic-navigation-wrapper">
          {AlphabeticNavigation}
        </TestFragment>

        <div className={styles.Container}>
          <div className={styles.TitleWrapper}>
            <div className={styles.TitleInnerWrapper}>
              <h1 className={styles.Title} data-testid="title-wrapper">
                {title && `${title}: `}
                {activeLetter}
              </h1>
            </div>
          </div>
        </div>

        {showDivider && (
          <div className={styles.Container}>
            <div className={styles.DividerWrapper}>
              <div className={styles.DividerInnerWrapper}>
                <div className={styles.Divider} data-testid="divider" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
};

export default termsOverviewFactory;
