import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import shuffle from 'lodash/shuffle';
import { useSSRContext } from '../../../../../SSRContext';
import { PERSON_CONTENT_TYPE } from '../../../../../../../shared/constants/content';
import {
  STYLE_1X1_PLACEHOLDER_DATA,
  STYLE_SCALE_W_PLACEHOLDER_DATA,
} from '../../../../../../../shared/constants/images';
import {
  TRACKING_CLASS_MINISTAGE_SPONSOR_LOGO_BOX,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import { TeaserFactoryProps } from '../../../../../Teaser/typings';
import {
  MinistageLogoBoxFactoryOptions,
  MinistageLogoBoxFactoryOptionsStyles,
  MinistageLogoBoxProps,
} from './typings';

type MinistageLogoBoxPropsInner = MinistageLogoBoxProps;

const defaultStyles: MinistageLogoBoxFactoryOptionsStyles = {
  Title: '',
  SubTitle: '',
  ItemWrapper: '',
};

const ministageLogoBoxFactory = ({
  styles: appStyles,
  Teaser,
}: MinistageLogoBoxFactoryOptions) => {
  const MinistageLogoBox = (props: MinistageLogoBoxPropsInner) => {
    const { ministageParagraph, isShuffleEnabled = true } = props;
    const ministageLogoBox: MinistageLogoBox | null =
      (ministageParagraph?.ministage &&
        (ministageParagraph.ministage as MinistageLogoBox)) ||
      null;
    const [ministageItems, setMinistageItems] = useState(
      JSON.parse(JSON.stringify(ministageLogoBox?.items?.edges || [])),
    );
    const ministageItemsRef = useRef(ministageItems);

    const { isSSR } = useSSRContext();

    useEffect(() => {
      if (
        isShuffleEnabled &&
        Array.isArray(ministageItemsRef.current) &&
        ministageItemsRef.current?.length > 0
      ) {
        setMinistageItems(shuffle(ministageItemsRef.current as any));
      }
    }, [isShuffleEnabled]);

    if (!Array.isArray(ministageItems) || ministageItems?.length < 1) {
      return null;
    }

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    const title = ministageLogoBox.headline || '';
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    const subTitle = ministageLogoBox.subhead || '';

    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_MINISTAGE_SPONSOR_LOGO_BOX,
        )}
      >
        <div>
          {title && <div className={styles.Title}>{title}</div>}
          {subTitle && <div className={styles.SubTitle}>{subTitle}</div>}
          <div className={styles.ItemWrapper}>
            {ministageItems?.map((item) => {
              const node = item.node as TeaserFactoryProps;
              let skeletoImage = STYLE_SCALE_W_PLACEHOLDER_DATA;
              if (node.__typename === PERSON_CONTENT_TYPE) {
                skeletoImage = STYLE_1X1_PLACEHOLDER_DATA;
              }
              return (
                <Teaser
                  key={node.id}
                  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                  component={`teaser/layout-${node.__typename.toLowerCase()}`}
                  {...node}
                  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'boolean | undefined'. */
                  isSkeleton={isSSR}
                  skeletonPlaceholderImg={skeletoImage}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return MinistageLogoBox;
};

export default ministageLogoBoxFactory;
