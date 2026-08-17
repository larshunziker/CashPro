/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/componentSwitch.js'. '/Users/bhs/c */
import createComponentSwitch from '../../../../../../../shared/decorators/componentSwitch.js';
import withNavigate from '../../../../../../../shared/decorators/withNavigate';
import DefaultSearchForm from './components/DefaultSearchForm';
import RestaurantSearchForm from './components/RestaurantSearchForm';

export const TYPE_SEARCH_FORM_DEFAULT = 'search/type-default';
export const TYPE_SEARCH_FORM_RESTAURANT = 'search/type-restaurant';

const searchFormTypes = {
  [TYPE_SEARCH_FORM_DEFAULT]: DefaultSearchForm,
  [TYPE_SEARCH_FORM_RESTAURANT]: RestaurantSearchForm,
};

export default withNavigate(createComponentSwitch(searchFormTypes));
