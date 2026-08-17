import React, { ReactElement } from 'react';
import type {
  ElementItem,
  ElementListFactoryOptions,
  ElementListFactoryOptionsStyles,
  ElementListProps,
} from './typings';

const defaultStyles: ElementListFactoryOptionsStyles = {
  ListItem: '',
  Wrapper: '',
};

const elementListFactory = ({
  Link,
  icon,
  styles: appStyles,
}: ElementListFactoryOptions) => {
  const ElementList = (props: ElementListProps): ReactElement => {
    const { data }: ElementListProps = props;

    if (!data || !Array.isArray(data) || !data.length) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    const styles: ElementListFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <div className={styles.Wrapper} data-testid="wrapper">
        {data.map((item, index) => renderItem(item, index, styles))}
      </div>
    );
  };

  const renderItem = (
    item: ElementItem,
    index: number,
    styles: ElementListFactoryOptionsStyles,
  ): ReactElement => {
    if (!item.preferredUri) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }
    return (
      <h2 key={`element-list-item-${index}`} className={styles.ListItem}>
        <Link
          path={item.preferredUri}
          data-testid="link"
          className={styles.Link}
        >
          <>
            {item.label || ''}
            {icon}
          </>
        </Link>
      </h2>
    );
  };

  return ElementList;
};

export default elementListFactory;
