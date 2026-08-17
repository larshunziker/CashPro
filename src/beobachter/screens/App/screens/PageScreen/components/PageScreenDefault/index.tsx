import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import Paragraphs from '../../../../components/Paragraphs';
import EditButtons from './../../../../components/EditButtons';
import { PAGE_SCREEN_DEFAULT } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { PageScreenDefaultProps } from './typings';

const PageScreenDefault = ({
  pageScreen,
}: PageScreenDefaultProps): ReactElement => (
  <div data-testid="page-container" className="page-screen">
    <EditButtons
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
      editContentUri={pageScreen.editContentUri}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      editRelationUri={pageScreen.editRelationUri}
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      cloneContentUri={pageScreen.cloneContentUri}
    />
    {(pageScreen.title || pageScreen.lead) && (
      <div data-testid="head-container" className={grid.Container}>
        <div className={grid.Row}>
          <div className={classNames('pagescreen-lead', styles.HeadWrapper)}>
            {pageScreen.title && (
              <h1 data-testid="title-container" className={styles.Title}>
                <div className={styles.MainTitle} itemProp="headline">
                  {pageScreen.title}
                </div>
              </h1>
            )}

            {pageScreen.lead && (
              <p
                data-testid="lead-container"
                className={styles.Lead}
                itemProp="description"
              >
                {pageScreen.lead}
              </p>
            )}
          </div>
        </div>
      </div>
    )}

    <div
      data-testid="paragraphs-container"
      className={getRestrictedClassName(pageScreen.__typename)}
    >
      <Paragraphs
        colStyle={grid.ColXs24}
        pageBody={pageScreen.body}
        origin={PAGE_SCREEN_DEFAULT}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
        isAdSuppressed={pageScreen?.channel?.suppressAds}
      />
    </div>
  </div>
);

export default PageScreenDefault;
