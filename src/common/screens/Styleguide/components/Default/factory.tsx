import React, { ComponentType, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import raf from 'raf';
import { useHasMounted } from '../../../../../shared/hooks/useHasMounted';
import grid from '../../../../assets/styles/grid.legacy.css';
import { StyleguideFactoryOptions, StyleguideProps } from '../../typings';

const styleguideFactory = ({
  StatusPage,
  StyleguideComponents,
  title,
  styles,
  breadcrumbs,
  setLoading,
  setScreenReady,
}: StyleguideFactoryOptions) => {
  const Styleguide: ComponentType<StyleguideProps> = () => {
    const dispatch = useDispatch();
    const hasMounted = useHasMounted();

    useEffect(() => {
      if (setLoading && setScreenReady) {
        raf(() => {
          dispatch(setLoading(false));
          dispatch(setScreenReady(true, { pathname: location.pathname }));
        });
      }
    }, [dispatch]);

    if (!hasMounted) {
      return null;
    }

    if (
      !__TESTING__ &&
      __PRODUCTION__ &&
      (!document.cookie || document.cookie.indexOf('RASCHSTYLEGUIDE') <= -1)
    ) {
      return (StatusPage && <StatusPage statusCode={404} />) || null;
    }
    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const onChange = (event) => {
      const parent = document.getElementById('styleguide-default');
      let selector = null;
      if (event.target.value.length > 2) {
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        selector = parent.querySelectorAll(`[class*=${event.target.value} i]`);
      }

      const allComponent = document.querySelectorAll(`[class^=component-]`);
      if (selector && selector.length > 0) {
        for (const component of allComponent) {
          // @ts-ignore
          component.style.display = 'none';
        }
        for (const component of selector) {
          // @ts-ignore
          component.style.display = 'block';
        }
      } else {
        for (const component of allComponent) {
          // @ts-ignore
          component.style.display = 'block';
        }
      }
    };

    return (
      <div
        className={styles.Wrapper}
        id="styleguide-default"
        data-testid="styleguide-default-wrapper"
      >
        {breadcrumbs || null}
        <div className={grid.Container}>
          <h1 className={styles.Title}>{title}</h1>
          <label className={styles.InputLabel}>
            Search:
            <input
              type="text"
              data-testid="search-field"
              onChange={onChange}
              className={styles.Input}
            />
          </label>

          <div className={styles.ContentWrapper}>
            {/* @ts-ignore TODO: TS2604 ->  JSX element type 'StyleguideComponents' does not have any construct or call signatures. */}
            <StyleguideComponents />
          </div>
        </div>
      </div>
    );
  };

  return Styleguide;
};

export default styleguideFactory;
