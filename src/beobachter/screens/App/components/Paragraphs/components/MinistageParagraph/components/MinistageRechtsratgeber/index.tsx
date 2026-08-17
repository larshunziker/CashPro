import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../../../common/components/Link';
import LegalAdviceSearch from '../../../../../LegalAdviceSearch';
import {
  TRACKING_CLASS_MINISTAGE_GUIDER_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../../../common/screens/PageTemplate/constants';
import {
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_LONG_READ,
} from '../../../../../../../../../shared/constants/content';
import { PAGE_SCREEN_HERO_MEDIA_TYPE } from '../../../../../../screens/PageScreen/constants';
import styles from './styles.legacy.css';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import { LinkProps, MinistageRechtsratgeberProps } from './typings';

type MinistageRechtsratgeberPropsInner = MinistageRechtsratgeberProps;

const MinistageLink = ({ item, index }: LinkProps) => {
  if (!item || !item.node || !item.node.path || !item.node.label) {
    return null;
  }

  return (
    <div className={styles.BoxWrapper} key={index}>
      <Link path={item?.node?.path} nofollow className={styles.MiniStageLink}>
        <span className={styles.Bubble}>{index + 1}</span>
        <div className={styles.Label}>{item?.node?.label}</div>
      </Link>
    </div>
  );
};

type ContainerWrapperProps = {
  children: ReactElement;
  renderContainer?: boolean;
  colStyle?: string;
};

const ContainerWrapper = ({
  children,
  renderContainer = false,
  colStyle = '',
}: ContainerWrapperProps) =>
  renderContainer ? (
    <div className={grid.Container}>
      <div className={grid.Row}>
        <div className={colStyle}>{children}</div>
      </div>
    </div>
  ) : (
    children
  );

const MinistageRechtsratgeber = ({
  ministageGuider,
  origin,
  pageLayoutType,
}: MinistageRechtsratgeberPropsInner) => {
  if (
    !ministageGuider.links ||
    !ministageGuider.links.edges ||
    !Array.isArray(ministageGuider.links.edges) ||
    ministageGuider.links.edges.length === 0
  ) {
    return null;
  }

  const isSplittedPageLayout =
    [RIGHT_COLUMN_PAGE_LAYOUT_TYPE].includes(
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      pageLayoutType,
    ) || origin === PAGE_SCREEN_HERO_MEDIA_TYPE;

  const isInGuideArticle = origin === ARTICLE_TYPE_GUIDE;
  const isInLongReadArticle = origin === ARTICLE_TYPE_LONG_READ;

  return (
    <ContainerWrapper
      renderContainer={!isSplittedPageLayout && !isInGuideArticle}
      colStyle={classNames({
        [classNames(
          grid.ColOffsetSm1,
          grid.ColSm22,
          grid.ColOffsetMd1,
          grid.ColMd17,
          grid.ColOffsetXl5,
          grid.ColXl14,
        )]: !isSplittedPageLayout && !isInLongReadArticle,
        [classNames(
          grid.ColOffsetSm2,
          grid.ColSm20,
          grid.ColOffsetMd4,
          grid.ColMd16,
        )]: isInLongReadArticle,
      })}
    >
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_MINISTAGE_GUIDER_PARAGRAPH,
        )}
        data-testid="ministage-rechtsratgeber-wrapper"
      >
        <div className={styles.Wrapper}>
          <div className={styles.Badge}>Rechtsratgeber</div>

          <div className={styles.Title}>Lassen Sie sich beraten</div>

          {ministageGuider.links.edges.map((item, index) => (
            <MinistageLink
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<LinkEdge>' is not assignable to type 'LinkEdge'. */
              item={item}
              index={index}
              key={`ministage-link-${item?.node?.path || index}`}
            />
          ))}

          <LegalAdviceSearch
            addClass={styles.SearchWrapper}
            label="Oder durchsuchen Sie den Rechtsratgeber selber"
            hasSuggestions={false}
          />
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default MinistageRechtsratgeber;
