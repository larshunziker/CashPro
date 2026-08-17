import { MultiSelectDropdownItemProps } from './typings';

const multiSelectDropdownItemFactory = () => {
  const MultiSelectDropdownItem = ({
    children,
  }: MultiSelectDropdownItemProps) => {
    return children;
  };

  return MultiSelectDropdownItem;
};

export default multiSelectDropdownItemFactory;
