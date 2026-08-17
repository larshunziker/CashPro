import { ReactElement } from 'react';
import { IconComponent } from '../Icon/typings';
import { SVGIconComponent } from '../SVGIcon/typings';

export type MultiSelectDropdownFactoryStyles = {
  Wrapper: string;
  SelectButtonWrapper: string;
  SelectButton: string;
  OptionsWrapper: string;
  BodyClass: string;
  Open: string;
  OverlayWrapper: string;
  CloseWrapper: string;
  ClearButton: string;
  Checkbox: string;
  Selected: string;
  DropdownListItem: string;
};

export type MultiSelectDropdownFactoryOptions =
  | {
      customIcon?: false;
      Icon: IconComponent;
      styles: MultiSelectDropdownFactoryStyles;
      SVGIcon?: SVGIconComponent;
      iconActive?: string;
      iconNotActive?: string;
    }
  | {
      customIcon: true;
      Icon: IconComponent;
      styles: MultiSelectDropdownFactoryStyles;
      SVGIcon: SVGIconComponent;
      iconActive?: string;
      iconNotActive?: string;
    };

export type MultiSelectDropdownOptions = Record<
  string,
  {
    label: string;
    itemsCount: number;
  }
>;

export type MultiSelectDropdownProps = {
  children: ReactElement[];
  label?: string;
  onSelect: (options: any) => void;
  defaultSelected: MultiSelectDropdownOptions;
};
