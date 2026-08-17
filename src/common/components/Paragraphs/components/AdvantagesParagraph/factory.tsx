import React from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import getItemWrapper from './getItemWrapper';
import {
  AdvantagesParagraphFactoryOptions,
  AdvantagesParagraphProps,
} from './typings';

const AdvantagesParagraphFactory = ({
  AdvantagesItem,
  styles,
}: AdvantagesParagraphFactoryOptions) => {
  const AdvantagesParagraph = (props: AdvantagesParagraphProps) => {
    const { header, advantagesItems } = props.entry;

    if (
      !advantagesItems ||
      !Array.isArray(advantagesItems) ||
      advantagesItems.length === 0
    ) {
      return null;
    }
    return (
      <div className={styles.OuterWrapper}>
        <div data-testid="wrapper" className={styles.Wrapper}>
          {header && (
            <TestFragment data-testid="title">
              <h3 className={styles.Title}>{header}</h3>
            </TestFragment>
          )}

          {advantagesItems.map((item, index) => {
            const itemWrapper =
              (typeof styles.ItemWrapper === 'function' &&
                styles.ItemWrapper(advantagesItems.length, index)) ||
              (typeof styles.ItemWrapper === 'string' && styles.ItemWrapper) ||
              getItemWrapper(advantagesItems.length, index);

            return (
              <div
                /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                key={`item-${item.id}`}
                className={classNames(itemWrapper)}
                data-testid="item-wrapper"
              >
                <AdvantagesItem
                  /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<AdvantagesItemParagraph>' is not assignable to type 'AdvantagesItemParagraph'. */
                  item={item}
                  isWide={advantagesItems.length === 4}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return AdvantagesParagraph;
};
export default AdvantagesParagraphFactory;
