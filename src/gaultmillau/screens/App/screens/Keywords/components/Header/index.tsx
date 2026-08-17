import React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';

const Header = () => (
  <>
    <div className={sections.Container}>
      <div className={grid.Row}>
        <div
          className={classNames(
            grid.ColSm20,
            grid.ColMd16,
            grid.ColOffsetSm2,
            grid.ColOffsetMd4,
          )}
        >
          <div className={styles.Header}>
            <h1 className={styles.HeaderTitle}>
              <FormattedMessage
                id="app.header.stichworte.title"
                description="The default title for stichworte"
                defaultMessage="Stichwortverzeichnis"
              />
            </h1>
          </div>
          <span className={styles.Lead}>
            <FormattedMessage
              id="app.header.stichworte.text"
              description="The default text for stichworte"
              defaultMessage="Sie suchen nach einem spezifischen Begriff und nach Artikeln in denen er vorkommt? Mit unserem Stichwortverzeichnis finden Sie was Sie suchen!"
            />
          </span>
        </div>
      </div>
    </div>
    <div className={sections.Container}>
      <div className={styles.DividerThick} />
    </div>
  </>
);

export default Header;
