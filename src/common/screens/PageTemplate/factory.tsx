import React, { Children } from 'react';
import { FULL_PAGE_LAYOUT_TYPE } from './constants';
import grid from '../../assets/styles/grid.legacy.css';
import {
  PageTemplateFactoryOptions,
  PageTemplateFactoryOptionsStyles,
} from './typings';

const pageTemplateFactory = ({
  styles: appStyles,
}: PageTemplateFactoryOptions) => {
  const PageTemplate = ({
    asideContent = null,
    topContent = null,
    pageLayoutType = FULL_PAGE_LAYOUT_TYPE,
    ...props
  }) => {
    const subtypeValue =
      props?.data?.environment?.routeByPath?.object?.subtypeValue || null;
    const hasChildren = Children.count(props.children);
    const defaultStyles: PageTemplateFactoryOptionsStyles = {
      Wrapper: '',
      MainContent: '',
      AsideContent: '',
      TopContent: '',
    };

    const getStyles = (): PageTemplateFactoryOptionsStyles => {
      const styles: PageTemplateFactoryOptionsStyles =
        (typeof appStyles === 'function' &&
          appStyles({ pageLayoutType, hasChildren, subtypeValue })) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;

      return styles;
    };

    const styles: PageTemplateFactoryOptionsStyles = getStyles();

    return (
      <div className={styles.Wrapper} data-testid="wrapper">
        <div className={grid.Row}>
          {topContent && <div className={styles.TopContent}>{topContent}</div>}
          <div className={styles.MainContent}>{props.children}</div>
          {(asideContent && (
            <div className={styles.AsideContent}>{asideContent}</div>
          )) ||
            null}
        </div>
      </div>
    );
  };

  return PageTemplate;
};

export default pageTemplateFactory;
