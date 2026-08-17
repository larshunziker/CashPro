import { DropdownItemProps } from './typings';

const dropdownItemFactory = () => {
  const DropdownItem = ({ children }: DropdownItemProps) => {
    return children;
  };

  return DropdownItem;
};

export default dropdownItemFactory;
