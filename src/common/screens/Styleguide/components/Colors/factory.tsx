import React, { useEffect } from 'react';
import raf from 'raf';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useSSRContext } from '../../../../components/SSRContext';
import grid from '../../../../assets/styles/grid.legacy.css';
import { ColorsStyleguideFactoryOptions } from './typings';

const colorsStyleguideFactory = ({
  StatusPage,
  colors,
  styles,
  setLoading,
  setScreenReady,
}: ColorsStyleguideFactoryOptions) => {
  const ColorsStyleguidePage: any = () => {
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
      <div className={grid.Container} data-testid="styleguide-default-wrapper">
        <h2 className={styles.Title}>Colors Preview</h2>
        <div className={styles.ColorPreviewWrapper}>
          {colors.map((color) => {
            return (
              <div
                key={`color-item-${color.name}`}
                /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ ColorPreviewWrappe */
                className={classNames(styles.ColorItem, styles[color.name])}
              >
                <div className={styles.DescriptionWrapper}>
                  <p>name: {color.name}</p>
                  <p>rgba: {color.rgba}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return ColorsStyleguidePage;
};
export default colorsStyleguideFactory;
