import React, { ComponentType, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import raf from 'raf';
import { useSSRContext } from '../../../../components/SSRContext';
import windowStateSelector from '../../../../../shared/selectors/windowStateSelector';
import { PANGRAMS } from './constants';
import grid from '../../../../assets/styles/grid.legacy.css';
import {
  TypographyStyleguideFactoryOptions,
  TypographyStyleguideProps,
} from './typings';

type TypographyStyleguidePropsInner = TypographyStyleguideProps;

const typographyStyleguideFactory = ({
  StatusPage,
  typography: appTypography,
  styles,
  breadcrumbs,
  setLoading,
  setScreenReady,
}: TypographyStyleguideFactoryOptions<any>) => {
  const TypographyStyleguidePage: ComponentType<
    TypographyStyleguidePropsInner
  > = (props) => {
    const dispatch = useDispatch();
    const { viewportLabel } = props;
    const typography =
      typeof appTypography === 'function'
        ? appTypography(props)
        : appTypography;

    const [typographyList, setTypographyList] = useState(
      Object.entries(typography),
    );

    const [previewText, setPreviewText] = useState(PANGRAMS[0]);

    const { isSSR } = useSSRContext();

    useEffect(() => {
      if (setLoading && setScreenReady) {
        raf(() => {
          dispatch(setLoading(false));
          dispatch(setScreenReady(true, { pathname: location.pathname }));
        });
      }
    }, [dispatch]);

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const onChange = (event) => {
      const filteredList = Object.entries(typography).filter((item) => {
        return item[0].toLowerCase().includes(event.target.value.toLowerCase());
      });

      setTypographyList(
        (event.target.value && filteredList) || Object.entries(typography),
      );
    };

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const onPreviewTextChange = (event) => {
      setPreviewText(event?.target?.value ? event.target.value : PANGRAMS[0]);
    };

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
      <div
        className={styles.Wrapper}
        data-testid="styleguide-typography-wrapper"
      >
        {breadcrumbs || null}
        <div className={grid.Container}>
          <h1 className={styles.HeaderTitle}>
            Typography ({typographyList.length})
          </h1>
          {viewportLabel && (
            <section className={styles.Label}>{viewportLabel}</section>
          )}
          <label className={styles.InputLabel}>
            Search:
            <input
              id="search"
              data-testid="search-field"
              type="text"
              placeholder="Search for text style"
              onChange={onChange}
              className={styles.Input}
            />
          </label>
          <label className={styles.InputLabel}>
            Preview:
            <input
              id="preview"
              type="text"
              placeholder="Enter preview Text"
              onChange={onPreviewTextChange}
              className={styles.Input}
            />
          </label>
          <br />
          <br />
          {typographyList.map((item) => {
            return (
              <ul
                className={styles.ItemWrapper}
                data-testid="typography-item"
                key={`typography-item-${item[0]}`}
              >
                <li>
                  <span className={styles.Title}>{item[0]}</span>
                  <div className={styles.WrapperInner}>
                    <p className={item[1]}>{previewText}</p>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    );
  };

  const mapStateToProps = (state: Record<string, any>) => ({
    viewportLabel: windowStateSelector(state).viewport.label,
  });

  return connect(mapStateToProps)(TypographyStyleguidePage);
};

export default typographyStyleguideFactory;
