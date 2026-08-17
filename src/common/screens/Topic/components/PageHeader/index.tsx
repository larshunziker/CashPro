/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import Default from './components/Default';
import Keyword from './components/Keyword';
import Person from './components/Person';

export const TOPIC_PAGE_HEADER_PERSON = 'topic-page-header/person';
export const TOPIC_PAGE_HEADER_DEFAULT = 'topic-page-header/default';
export const TOPIC_PAGE_HEADER_KEYWORD = 'topic-page-header/keyword';

const OverviewPageHeaderLayouts = {
  [TOPIC_PAGE_HEADER_DEFAULT]: Default,
  [TOPIC_PAGE_HEADER_PERSON]: Person,
  [TOPIC_PAGE_HEADER_KEYWORD]: Keyword,
};

export default createComponentSwitch(OverviewPageHeaderLayouts);
