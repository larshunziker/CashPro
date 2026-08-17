import {
  ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
  ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
} from '../../../../../../shared/constants/content';

export const shortTitleFallback = (article: Article) => {
  if (!article.subtypeValue) return '';

  switch (article.subtypeValue) {
    case ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE:
      return 'Grundlage';
    case ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL:
      if (article.toolTypeLabel) return article.toolTypeLabel;
      return 'Hilfsmittel';
    default:
      return '';
  }
};
