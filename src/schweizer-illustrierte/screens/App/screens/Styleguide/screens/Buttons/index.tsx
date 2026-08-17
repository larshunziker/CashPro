/* istanbul ignore file */

import React, { useEffect } from 'react';
import raf from 'raf';
import { useDispatch } from 'react-redux';
import StatusPage from '../../../StatusPage';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import ButtonRenderer from './components/ButtonRenderer';
import { useHasMounted } from '../../../../../../../shared/hooks/useHasMounted';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { Button } from './components/ButtonRenderer/typings';

type ButtonStyleguidePropsInner = Partial<RouterProps>;

const buttons: Button[] = [
  {
    buttonType: 'primary',
    buttonVariants: [
      { title: 'button', buttonText: '', iconTypeLeft: null },
      {
        title: 'button with Icon',
        buttonText: '',
        iconTypeLeft: 'IconMagnifyingGlass',
      },
      {
        title: 'button with loading',
        buttonText: '',
        iconTypeLeft: null,
        loadingState: true,
      },
    ],
  },
  {
    buttonType: 'secondary',
    buttonVariants: [
      { title: 'button', buttonText: '', iconTypeLeft: null },
      {
        title: 'button with Icon',
        buttonText: '',
        iconTypeLeft: 'IconMagnifyingGlass',
      },
      {
        title: 'button with loading',
        buttonText: '',
        iconTypeLeft: null,
        loadingState: true,
      },
    ],
  },
  {
    buttonType: 'tertiary',
    buttonVariants: [
      { title: 'button', buttonText: '', iconTypeLeft: null },
      {
        title: 'button with Icon',
        buttonText: '',
        iconTypeLeft: 'IconMagnifyingGlass',
      },
      {
        title: 'button with loading',
        buttonText: '',
        iconTypeLeft: null,
        loadingState: true,
      },
    ],
  },
];

const ButtonStyleguide = ({ location }: ButtonStyleguidePropsInner) => {
  const dispatch = useDispatch();
  const hasMounted = useHasMounted();

  useEffect(() => {
    /* @ts-ignore TODO: TS2774 ->  This condition will always return true since this function is always defined. Did you mean to call it instead? */
    if (setLoading && setScreenReady) {
      raf(() => {
        dispatch(setLoading(false));
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        dispatch(setScreenReady(true, { pathname: location.pathname }));
      });
    }
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  }, [dispatch, location.pathname]);

  if (!hasMounted) {
    return null;
  }

  if (
    !__TESTING__ &&
    __PRODUCTION__ &&
    (!document.cookie || document.cookie.indexOf('RASCHSTYLEGUIDE') <= -1)
  ) {
    return <StatusPage statusCode={404} />;
  }

  return (
    <div className={grid.Container}>
      <h1 className={styles.Title}>Buttons Preview</h1>
      <div className={styles.ButtonsWrapper}>
        <div>
          <h2 className={styles.Title2}>Normal Buttons</h2>
          <div className={styles.ButtonsWrapper}>
            {buttons.map((button, index) => {
              return (
                <ButtonRenderer
                  key={`button-${button.buttonType}-${index}`}
                  button={button}
                  highAttention={false}
                />
              );
            })}
          </div>
        </div>
        <div>
          <h2 className={styles.Title2}>High Attention Buttons</h2>
          <div className={styles.ButtonsWrapper}>
            {buttons.map((button, index) => {
              return (
                <ButtonRenderer
                  key={`high-attention-button-${button.buttonType}-${index}`}
                  button={button}
                  highAttention={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonStyleguide;
