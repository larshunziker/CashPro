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
          <h1 className={styles.HeaderTitle}>
            <FormattedMessage
              id="app.header.starchefs.title"
              description="The default title for the starchefs"
              defaultMessage="Starchefs"
            />
          </h1>
          <span className={styles.Lead}>
            <FormattedMessage
              id="app.header.starchefs.text"
              description="The default text for the starchefs"
              defaultMessage="Der „GaultMillau-Channel“ blickt hinter die Kulissen! Videos, Geschichten und Tipps von den besten Köchen im Land. Starchef-Interviews." // eslint-disable-line max-len
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
