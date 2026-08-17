/* istanbul ignore file */

import React from 'react';
import classNames from 'classnames';
import bookTeaserFactory from '../../../../../../../../../common/components/Paragraphs/components/BookTeaserParagraph/factory';
import Icon from '../../../../../../components/Icon';
import Link from '../../../../../../../../../common/components/Link';
import ButtonWithLoading from '../../../../../../components/ButtonWithLoading';
import { STYLE_BOOK_TEASER } from '../../../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';

const callToActionButton = (bookTeaser: Product) => {
  return (
    bookTeaser?.link?.path && (
      /* @ts-ignore TODO: TS2322 ->  Type '{ children */
      <Link {...bookTeaser.link}>
        <ButtonWithLoading
          variant="primary"
          size="big"
          addClass={styles.CallToAction}
        >
          Mehr Infos
        </ButtonWithLoading>
      </Link>
    )
  );
};

export default bookTeaserFactory({
  Icon,
  style_320: STYLE_BOOK_TEASER,
  title: 'Buchtipp',
  callToActionButton,
  isDescriptionVisible: true,
  styles: {
    Wrapper: styles.Wrapper,
    InnerWrapper: classNames(grid.ColXs24, grid.ColOffsetSm1, grid.ColSm22),
    InnerContainer: styles.InnerContainer,
    TextColumn: styles.TextColumn,
    Title: styles.Title,
    ImageColumn: styles.ImageColumn,
    ImageWrapper: styles.ImageWrapper,
    HeadingTitle: styles.HeadingTitle,
  },
});
