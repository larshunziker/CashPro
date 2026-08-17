import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { AsideComponent, AsideFactoryOptions, AsideProps } from './typings';

const asideFactory = ({ styles, content }: AsideFactoryOptions) => {
  const Aside: AsideComponent = ({
    props,
    pageLayoutType,
    scrollDirection,
  }: AsideProps): ReactElement => {
    const isCollapsed = scrollDirection === 'down';
    const children = content({ props, pageLayoutType });

    if (!children || !Array.isArray(children) || !children.length) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    return (
      <div className={styles.Wrapper} data-testid="wrapper">
        {children.map((child, index) => {
          const isLastElement = index === children.length - 1;
          return (
            <div
              key={`content-aside-item-${index}`}
              id={`content-aside-item-${index}`}
              className={classNames({
                [styles.Sticky]: isLastElement,
                /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                [styles.StickyOnScroll]: isLastElement && isCollapsed,
              })}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  };

  return Aside;
};

export default asideFactory;
