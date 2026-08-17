import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import styles from './styles.legacy.css';
import { TeaserFactoryProps } from '../../../../../../../common/components/Teaser/typings';

const TeaserSponsorList = ({
  itemIndex,
  title,
  preferredUri,
  sponsor,
  isSkeleton = true,
}: TeaserFactoryProps & { itemIndex: number }): ReactElement => {
  const { isSSR } = useSSRContext();

  const headerJsx = (
    <div
      className={classNames(styles.Wrapper, styles.Header, {
        [styles.NoBorder]: itemIndex === 0,
      })}
    >
      <div className={styles.SponsorWrapper}>Anbieter</div>
      <div className={styles.ArticleWrapper}>Fond des Monats</div>
    </div>
  );

  return (
    <>
      {itemIndex === 0 && headerJsx}
      {isSkeleton && isSSR ? (
        <Skeleton itemIndex={itemIndex} />
      ) : (
        <div
          className={classNames(styles.Wrapper, {
            [styles.NoBorder]: itemIndex === 0,
          })}
        >
          <div className={styles.SponsorWrapper}>{sponsor?.title || ''}</div>
          <div className={styles.ArticleWrapper}>
            <Link className={styles.Link} path={preferredUri} label={title} />
          </div>
        </div>
      )}
    </>
  );
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'itemIndex' implicitly has an 'any' type. */
const Skeleton = ({ itemIndex }) => (
  <section
    className={classNames(styles.Wrapper, {
      [styles.NoBorder]: itemIndex === 0,
    })}
  >
    <div className={classNames(styles.SponsorWrapper, styles.SkeletonTitle)}>
      <span>&nbsp;</span>
    </div>
    <div className={classNames(styles.ArticleWrapper, styles.SkeletonTitle)}>
      <span>&nbsp;</span>
    </div>
  </section>
);

export default TeaserSponsorList;
