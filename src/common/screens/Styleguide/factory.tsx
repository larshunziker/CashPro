import React, { ComponentType, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import raf from 'raf';
import { useSSRContext } from '../../components/SSRContext';
import grid from '../../assets/styles/grid.legacy.css';
import { StyleguideFactoryOptions, StyleguideProps } from './typings';

const styleguideFactory = ({
  StyleguideComponents,
  StatusPage,
  title,
  styles,
  breadcrumbs,
  setLoading,
  setScreenReady,
}: StyleguideFactoryOptions) => {
  const Styleguide: ComponentType<StyleguideProps> = () => {
    const { isSSR } = useSSRContext();
    const dispatch = useDispatch();

    useEffect(() => {
      if (setLoading && setScreenReady) {
        raf(() => {
          dispatch(setLoading(false));
          dispatch(setScreenReady(true, { pathname: location.pathname }));
        });
      }
    }, [dispatch]);

    if (
      !__TESTING__ &&
      __PRODUCTION__ &&
      (isSSR ||
        !document.cookie ||
        document.cookie.indexOf('RASCHSTYLEGUIDE') <= -1)
    ) {
      return (StatusPage && <StatusPage statusCode={404} />) || null;
    }

    return (
      <div className={styles.Wrapper} data-testid="styleguide-wrapper">
        {breadcrumbs || null}
        <div className={grid.Container}>
          <h1 className={styles.Title}>{title}</h1>
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
