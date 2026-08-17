import classNames from 'classnames';
import advantagesItemFactory from '../../../../../common/components/AdvantagesItem/factory';
import styles from './styles.legacy.css';
import {
  AdvantagesItemFactoryOptionsStyles,
  AdvantagesItemProps,
} from '../../../../../common/components/AdvantagesItem/typings';

const getStyleByProps = ({
  isWide,
}: AdvantagesItemProps): AdvantagesItemFactoryOptionsStyles => ({
  Icon: styles.Icon,
  Text: styles.Text,
  Wrapper: classNames(styles.Wrapper, { [styles.WideItem]: isWide }),
});

const AdvantagesParagraph = advantagesItemFactory({
  styles: getStyleByProps,
});

export default AdvantagesParagraph;
