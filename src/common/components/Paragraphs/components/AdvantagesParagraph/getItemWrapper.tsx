import classNames from 'classnames';
import grid from '../../../../../common/assets/styles/grid.legacy.css';

const getItemWrapper = (count: number, index: number) =>
  classNames({
    [grid.ColXl8]: count === 4 || count === 2,
    [grid.ColSm12]: count === 4 || count === 2,
    [grid.ColSm8]: count !== 4 && count !== 2 && count !== 1,
    [grid.ColXl16]: count === 1,
    [grid.ColSm24]: count === 1,
    [grid.ColOffsetXl4]:
      ((count === 4 || count === 2) && (index === 0 || index === 2)) ||
      count === 1,
    [grid.ColOffsetSm4]: count === 5 && index === 3,
  });

export default getItemWrapper;
