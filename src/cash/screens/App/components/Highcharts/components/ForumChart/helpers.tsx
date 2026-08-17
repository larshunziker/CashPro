import classNames from 'classnames';

type TrendStyles = {
  up: string;
  down: string;
  green: string;
  red: string;
};

export const trendClass = (
  value: string,
  styles: TrendStyles,
  direction = false,
) => {
  if (parseFloat(value) > 0) {
    return direction ? classNames(styles.green, styles.up) : styles.green;
  }
  return direction ? classNames(styles.red, styles.down) : styles.red;
};

export const roundToTwo = (input: string) => {
  const n = parseFloat(input);
  return n.toFixed(2);
};
