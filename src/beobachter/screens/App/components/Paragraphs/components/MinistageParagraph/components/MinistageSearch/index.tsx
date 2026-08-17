import React, { memo } from 'react';
import classNames from 'classnames';
import { isInsideColumn } from '../../../../../../../../shared/helpers/isInsideColumn';
import Picture from '../../../../../../../../../common/components/Picture';
import Search from './Search';
import LegalAdviceSearch from '../../../../../LegalAdviceSearch';
import { STYLE_SCALEW_700 } from '../../../../../../../../../shared/constants/images';
import { PAGE_SCREEN_HERO_MEDIA_TYPE } from '../../../../../../screens/PageScreen/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const MinistageSearch = ({
  ministageParagraph,
  origin,
}: {
  ministageParagraph: any;
  origin?: string;
}) => {
  const { image, headline, lead, subhead, searchTypeValue } =
    ministageParagraph;
  const isInColumn =
    isInsideColumn(origin || '') || origin === PAGE_SCREEN_HERO_MEDIA_TYPE;

  return (
    <div
      data-testid="ministage-search"
      className={classNames('ministage-search-wrapper', styles.Wrapper, {
        [grid.ContainerInner]: isInColumn,
        [classNames(grid.Container, styles.WrapperLarge)]: !isInColumn,
      })}
    >
      {image?.relativeOriginPath && origin !== PAGE_SCREEN_HERO_MEDIA_TYPE && (
        <div className={styles.ImageWrapper}>
          <Picture
            relativeOrigin={image.relativeOriginPath}
            style_320={STYLE_SCALEW_700}
            alt={headline || ''}
            disableWrapperClassName
            focalPointX={image.focalPointX}
            focalPointY={image.focalPointY}
          />
        </div>
      )}
      <div className={styles.ContentWrapper}>
        <div className={styles.Badge}>{headline}</div>
        {searchTypeValue === 'global' && (
          <Search placeholder={lead} buttonText={subhead} />
        )}
        {searchTypeValue === 'sub' && (
          <LegalAdviceSearch
            isLabelHidden
            hasSuggestions={true}
            placeholder={lead}
            buttonText={subhead}
          />
        )}
      </div>
    </div>
  );
};

export default memo(MinistageSearch);
