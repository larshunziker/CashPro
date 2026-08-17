import React from 'react';
import classNames from 'classnames';
import Icon from '../../../../components/Icon';
// @ts-ignore
import { ReactComponent as NewIcon } from '../../../../components/SVGIcon/assets/new-in-list.svg';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'rankingTrend' implicitly has an 'any' type. */
export const RankingIcon = ({ rankingTrend, addStyles = null }) => {
  if (!rankingTrend) return null;

  const mergedStyles = {
    /* @ts-ignore TODO: TS2339 ->  Property 'IconNew' does not exist on type 'never'. */
    new: addStyles?.IconNew || styles.IconNew,
    /* @ts-ignore TODO: TS2339 ->  Property 'IconReturnee' does not exist on type 'never'. */
    returnee: addStyles?.IconReturnee || styles.IconReturnee,
    /* @ts-ignore TODO: TS2339 ->  Property 'Positive' does not exist on type 'never'. */
    up: addStyles?.Positive || styles.Positive,
    /* @ts-ignore TODO: TS2339 ->  Property 'Negative' does not exist on type 'never'. */
    down: addStyles?.Negative || styles.Negative,
    /* @ts-ignore TODO: TS2339 ->  Property 'RankingIcon' does not exist on type 'never'. */
    icon: addStyles?.RankingIcon || styles.RankingIcon,
  };

  const iconTypes = {
    up: 'IconArrowUpRight',
    down: 'IconArrowDownRight',
    returnee: 'IconArrowRotateLeft',
    default: 'IconArrowRight',
  };

  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ up */
  const type = iconTypes[rankingTrend] || iconTypes.default;
  const isNew = rankingTrend === 'new';
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ new */
  const addClass = mergedStyles[rankingTrend];

  return (
    <>
      {!isNew && (
        <Icon
          addClass={classNames(mergedStyles.icon, {
            [addClass]: !!addClass,
          })}
          type={type}
        />
      )}
      {isNew && (
        // @ts-ignore
        <NewIcon
          className={classNames(mergedStyles.icon, {
            [mergedStyles.new]: !!mergedStyles.new,
          })}
        />
      )}
    </>
  );
};

export default RankingIcon;
