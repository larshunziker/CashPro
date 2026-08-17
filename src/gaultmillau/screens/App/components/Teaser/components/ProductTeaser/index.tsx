import React from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code */
import createComponentSwitch from '../../../../../../../shared/decorators/componentSwitch';
import ProductTeaserBook from './components/ProductTeaserBook';
import ProductTeaserDefault from './components/ProductTeaserDefault';

export const PRODUCT_TYPE_DEFAULT = 'productDefault';
export const PRODUCT_TYPE_BOOK = 'productBook';

const Switch = createComponentSwitch({
  [PRODUCT_TYPE_DEFAULT]: ProductTeaserDefault,
  [PRODUCT_TYPE_BOOK]: ProductTeaserBook,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const ProductTeaser = (props) => <Switch {...props} />;
export default ProductTeaser;
