/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code */
import createComponentSwitch from '../../../../../../../shared/decorators/componentSwitch';
import ArticleHeadDefault from './components/ArticleHeadDefault';
import ArticleHeadFullWidth from './components/ArticleHeadFullWidth';
import ArticleHeadRatgeber from './components/ArticleHeadRatgeber';
import ArticleHeadLongForm from './components/ArticleHeadLongForm';
import NativeAdvertisingHeader from './components/NativeAdvertisingHeader';
import ArticleHeadLegalAdvice from './components/ArticleHeadLegalAdvice';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_BRANDREPORT,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ADVERTISING_TYPE_SPONSORING,
  ARTICLE_TYPE_LONG_FORM,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_RATGEBER,
  ARTICLE_TYPE_SPONSORED,
} from '../../../../../../../shared/constants/content';

export const ARTICLE_HEAD_STYLE_GUIDE = 'guide';
export const ARTICLE_HEAD_STYLE_TOOL = 'tool';
export const ARTICLE_HEAD_STYLE_COMMENT = 'comment';

export default createComponentSwitch({
  [ADVERTISING_TYPE_SPONSORING]: ArticleHeadFullWidth,
  [ADVERTISING_TYPE_NATIVE_ARTICLE]: NativeAdvertisingHeader,
  [ADVERTISING_TYPE_BRANDREPORT]: NativeAdvertisingHeader,
  [ADVERTISING_TYPE_ADVERTORIAL]: NativeAdvertisingHeader,
  [ARTICLE_HEAD_STYLE_GUIDE]: ArticleHeadDefault,
  [ARTICLE_TYPE_RATGEBER]: ArticleHeadRatgeber,
  [ARTICLE_TYPE_OPINION]: ArticleHeadLongForm,
  [ARTICLE_TYPE_LONG_FORM]: ArticleHeadLongForm,
  [ARTICLE_TYPE_SPONSORED]: ArticleHeadLongForm,
  [ARTICLE_HEAD_STYLE_TOOL]: ArticleHeadLegalAdvice,
  [ARTICLE_HEAD_STYLE_COMMENT]: ArticleHeadLegalAdvice,
});
