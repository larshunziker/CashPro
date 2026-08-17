import React, { ReactElement, memo } from 'react';
import classNames from 'classnames';
import Header from '../Header';
import { TRACKING_CLASS_SITE_HEADER } from '../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import { HeaderAreaComponent, HeaderAreaProps } from './typings';

type HeaderAreaPropsInner = HeaderAreaProps & { headerState?: HeaderState };

const HeaderArea: HeaderAreaComponent = (
  props: HeaderAreaPropsInner,
): ReactElement => {
  const { isStickyEnabled = true, publication, subtypeValue } = props;
  return (
    <div
      className={classNames(TRACKING_CLASS_SITE_HEADER, styles.HeaderContainer)}
    >
      <Header
        hasStickiness={isStickyEnabled}
        publication={publication}
        subtypeValue={subtypeValue}
      />
    </div>
  );
};

export default memo<HeaderAreaPropsInner>(HeaderArea);
