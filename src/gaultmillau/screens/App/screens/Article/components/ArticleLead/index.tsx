import React from 'react';
import ArticleLeadBlog from './components/ArticleLeadBlog';
import ArticleLeadHeadless from './components/ArticleLeadHeadless';
import ArticleLeadHotTen from './components/ArticleLeadHotTen';
import ArticleLeadInterview from './components/ArticleLeadInterview';
import ArticleLeadJournalistic from './components/ArticleLeadJournalistic';
import {
  ARTICLE_TYPE_HEADLESS,
  ARTICLE_TYPE_HOT_TEN,
  ARTICLE_TYPE_INTERVIEW,
  ARTICLE_TYPE_JOURNALISTIC,
} from '../../../../../../../shared/constants/content';

const getComponents = () => ({
  [ARTICLE_TYPE_JOURNALISTIC]: ArticleLeadJournalistic,
  [ARTICLE_TYPE_HOT_TEN]: ArticleLeadHotTen,
  [ARTICLE_TYPE_HEADLESS]: ArticleLeadHeadless,
  [ARTICLE_TYPE_INTERVIEW]: ArticleLeadInterview,
  ['default']: ArticleLeadBlog,
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const ArticleLead = (props) => {
  const components = getComponents();
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ journalistic */
  const Lead = components[props.component] || components['default'];

  return (
    (Lead && <Lead {...props} />) || <ArticleLeadJournalistic {...props} />
  );
};

export default ArticleLead;
