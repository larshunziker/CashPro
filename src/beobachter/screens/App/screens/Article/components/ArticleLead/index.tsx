import React from 'react';
import ArticleLeadDefault from './components/ArticleLeadDefault';
import ArticleLeadRatgeber from './components/ArticleLeadRatgeber';
import {
  ADVERTISING_TYPE_ADVERTORIAL,
  ADVERTISING_TYPE_BRANDREPORT,
  ADVERTISING_TYPE_NATIVE_ARTICLE,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_RATGEBER,
} from '../../../../../../../shared/constants/content';
import type { ArticleLeadProps } from './typings';

type ArticleLeadPropsInner = ArticleLeadProps & {
  componentName?: string;
};

const ARTICLE_TYPE_MAP = {
  [ARTICLE_TYPE_OPINION]: ArticleLeadRatgeber,
  [ARTICLE_TYPE_RATGEBER]: ArticleLeadRatgeber,
  [ADVERTISING_TYPE_BRANDREPORT]: ArticleLeadDefault,
  [ADVERTISING_TYPE_NATIVE_ARTICLE]: ArticleLeadRatgeber,
  [ADVERTISING_TYPE_ADVERTORIAL]: ArticleLeadDefault,
};

const ArticleLead = (props: ArticleLeadPropsInner) => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  if (Object.keys(ARTICLE_TYPE_MAP).includes(props.componentName)) {
    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
    return React.createElement(ARTICLE_TYPE_MAP[props.componentName], props);
  }

  return React.createElement(ARTICLE_TYPE_MAP[ARTICLE_TYPE_RATGEBER], props);
};

export default ArticleLead;
