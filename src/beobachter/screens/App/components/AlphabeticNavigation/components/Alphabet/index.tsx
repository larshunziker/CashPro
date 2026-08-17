/* istanbul ignore file */

import classNames from 'classnames';
import alphabetFactory from '../../../../../../../common/components/AlphabeticNavigation/components/Alphabet/factory';
import Link from '../../../../../../../common/components/Link';
import styles from './styles.legacy.css';
import {
  AlphabetFactoryOptionsStyles,
  AlphabetProps as AlphabetCommonProps,
} from '../../../../../../../common/components/AlphabeticNavigation/components/Alphabet/typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.ThemeRed];

const getStylesByProps = ({
  theme = '',
}: AlphabetCommonProps): AlphabetFactoryOptionsStyles => ({
  ActiveLink: styles.ActiveLink,
  Link: styles.Link,
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Wrappe */
  MobileWrapper: classNames(styles.MobileWrapper, styles[theme]),
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ readonly Wrappe */
  Wrapper: classNames(styles.Wrapper, styles[theme]),
});

const Alphabet = alphabetFactory({
  Link,
  styles: getStylesByProps,
});

export default Alphabet;
