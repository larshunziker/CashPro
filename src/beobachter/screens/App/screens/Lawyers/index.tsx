import React, { memo } from 'react';
import compose from 'recompose/compose';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-body-classname'. '/Users/bhs/code/work/rasch-stack/node_modules/rea */
import classNames from 'classnames';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Paragraphs from '../../components/Paragraphs';
import LawyersListTable from './components/LawyersListTable';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../shared/constants/structuredData';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { PageScreenProps } from '../PageScreen/typings';

const LawyersPage = (props: PageScreenProps) => {
  const { pageScreen } = props;

  return (
    <>
      <div className={`lawyers-page ${styles.Wrapper}`}>
        <Paragraphs pageBody={pageScreen.body} origin={''} />
      </div>
      <div className={styles.Wrapper} data-testid="keywords-wrapper">
        <div className={grid.Container}>
          <div className={grid.Row}>
            <div
              className={classNames(
                grid.ColXs24,
                grid.ColMd16,
                grid.ColOffsetMd4,
              )}
            >
              <LawyersListTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default compose<any, any>(
  withHelmet({
    getNode: ({ pageScreen }: PageScreenProps) => pageScreen,
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
  }),
)(memo(LawyersPage));
