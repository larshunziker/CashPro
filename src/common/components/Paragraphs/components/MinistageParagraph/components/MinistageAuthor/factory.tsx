import React from 'react';
import Link from '../../../../../Link';
import { MinistageAuthorFactoryOptions, MinistageAuthorProps } from './typings';

const MinistageAuthorFactory = ({
  styles: appStyles,
  TeaserGrid,
  teaserGridLayout,
  Icon,
}: MinistageAuthorFactoryOptions) => {
  const MinistageAuthor = (props: MinistageAuthorProps) => {
    const defaultStyles = {
      Container: '',
      Wrapper: '',
      TitleWrapper: '',
      Title: '',
      Link: '',
    };
    const styles = {
      ...defaultStyles,
      ...((typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles),
    };
    const { ministageAuthor } = props;
    const { authors, title, link } = ministageAuthor;
    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    const items = authors?.edges.map((author) => ({
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      ...author.node,
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      author: author.node,
    }));
    return (
      <div className={styles.Container}>
        <div className={styles.Wrapper}>
          <div className={styles.TitleWrapper}>
            <h2 className={styles.Title}>
              {link && link.path ? (
                <Link path={link.path} className={styles.Link}>
                  <>
                    {title}
                    {Icon || null}
                  </>
                </Link>
              ) : (
                <>{title}</>
              )}
            </h2>
          </div>
          <TeaserGrid layout={teaserGridLayout} items={items} />
        </div>
      </div>
    );
  };
  return MinistageAuthor;
};

export default MinistageAuthorFactory;
