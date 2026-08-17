import React from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../../../shared/decorators/componentSwitch'. '/Users/bh */
import createComponentSwitch from '../../../../../../../../../shared/decorators/componentSwitch';
import DefaultProduct from './components/DefaultProduct';
import FullWidthImageLeftProduct from './components/FullWidthImageLeftProduct';

export const PRODUCT_STYLE_DEFAULT = 'default';
export const PRODUCT_STYLE_FULL_WIDTH_IMAGE_LEFT = 'fullWidthImageLeft';

const Switch = createComponentSwitch(
  {
    [PRODUCT_STYLE_DEFAULT]: DefaultProduct,
    [PRODUCT_STYLE_FULL_WIDTH_IMAGE_LEFT]: FullWidthImageLeftProduct,
  },
  'type',
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const ProductTeaser = (props) => <Switch {...props} />;
export default ProductTeaser;
