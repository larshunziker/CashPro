import React from 'react';
import classNames from 'classnames';
import { ALPHABET_LAYOUT_MAIN, ALPHABET_LAYOUT_MOBILE } from './constants';
import {
  AlphabetFactoryOptions,
  AlphabetFactoryOptionsStyles,
  AlphabetProps,
} from './typings';

const letters: Array<string> = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const defaultStyles: AlphabetFactoryOptionsStyles = {
  ActiveLink: '',
  Link: '',
  MobileWrapper: '',
  Wrapper: '',
};

const AlphabetFactory = ({
  Link,
  styles: appStyles,
}: AlphabetFactoryOptions) => {
  const Alphabet = (props: AlphabetProps) => {
    const { activeLetter, url, layout } = props;
    const styles: AlphabetFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <nav
        className={classNames({
          [styles.Wrapper]: layout === ALPHABET_LAYOUT_MAIN,
          [styles.MobileWrapper]: layout === ALPHABET_LAYOUT_MOBILE,
        })}
        data-testid="wrapper"
      >
        {letters.map((letter) => (
          <Link
            data-testid="link"
            path={`${url}/${letter}`}
            key={`alphabet-letter-${letter}`}
            className={
              !activeLetter || letter === activeLetter.toUpperCase()
                ? styles.ActiveLink
                : styles.Link
            }
            label={letter}
          />
        ))}
      </nav>
    );
  };

  return Alphabet;
};

export default AlphabetFactory;
