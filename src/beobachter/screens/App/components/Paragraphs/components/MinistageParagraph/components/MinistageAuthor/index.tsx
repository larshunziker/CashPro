import React from 'react';
import classNames from 'classnames';
import ministageAuthorFactory from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageAuthor/factory';
import { isInLongFormArticleBody } from '../../../../../../../../shared/helpers/isInLongFormArticleBody';
import SVGIcon from '../../../../../SVGIcon';
import TeaserGrid from '../../../../../TeaserGrid';
import { SVG_ICONS_TYPE_CHEVRON_RIGHT } from '../../../../../../../../../shared/constants/svgIcons';
import { GRID_LAYOUT_TEASER_AUTHOR } from '../../../../../TeaserGrid/gridConfigs/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import type { MinistageAuthorProps } from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageAuthor/typings';

const getStylesByProps = ({ origin }: MinistageAuthorProps) => {
  const inLongForm = isInLongFormArticleBody(origin ?? '');

  return {
    Container: classNames(inLongForm ? grid.Container : grid.Row),
    Wrapper: classNames(
      inLongForm
        ? classNames(
            grid.ColSm20,
            grid.ColOffsetSm2,
            grid.ColOffsetMd4,
            grid.ColMd16,
            grid.ColOffsetXl4,
            styles.Wrapper,
          )
        : classNames(
            grid.ColSm24,
            grid.ColMd24,
            grid.ColXl18,
            grid.ColOffsetXl3,
          ),
    ),
    TitleWrapper: styles.TitleWrapper,
    Title: styles.Title,
    Link: styles.Link,
  };
};

const MinistageAuthor = ministageAuthorFactory({
  styles: getStylesByProps,
  TeaserGrid,
  teaserGridLayout: GRID_LAYOUT_TEASER_AUTHOR,
  Icon: <SVGIcon className={styles.Icon} type={SVG_ICONS_TYPE_CHEVRON_RIGHT} />,
});

export default MinistageAuthor;
