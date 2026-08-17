/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../../../shared/decorators/componentSwitch'. '/Users/bh */
import createComponentSwitch from '../../../../../../../../../shared/decorators/componentSwitch';
import ArticleVideo from '../ArticleVideo';
import ArticleImageRatgeber from './components/ArticleImageRatgeber';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_BRANDREPORT,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_RATGEBER,
} from '../../../../../../../../../shared/constants/content';

export const ARTICLE_VIDEO_STYLE_DEFAULT = 'VideoParagraph';

export default createComponentSwitch({
  [ADVERTISING_TYPE_NATIVE_ARTICLE]: ArticleImageRatgeber,
  [ADVERTISING_TYPE_ADVERTORIAL]: ArticleImageRatgeber,
  [ARTICLE_TYPE_OPINION]: ArticleImageRatgeber,
  [ADVERTISING_TYPE_BRANDREPORT]: ArticleImageRatgeber,
  [ARTICLE_TYPE_RATGEBER]: ArticleImageRatgeber,
  [ARTICLE_VIDEO_STYLE_DEFAULT]: ArticleVideo,
});
