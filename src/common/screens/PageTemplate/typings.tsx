export type GetStylesByProps<T> = (
  props: T,
) => PageTemplateFactoryOptionsStyles;

export type PageTemplateFactoryOptions<T = {}> = {
  styles: GetStylesByProps<T> | PageTemplateFactoryOptionsStyles;
};

export type PageTemplateFactoryOptionsStyles = {
  Wrapper: string;
  MainContent: string;
  AsideContent: string;
  TopContent?: string;
};
