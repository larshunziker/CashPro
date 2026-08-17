/**
 * @file   parallax image paragraph factory typings
 * @author Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @date   2019-02-13
 */

export type ParallaxImageParagraphProps = {
  parallaxImageParagraph: ParallaxImageParagraph;
  isSplittedPageLayout?: boolean;
  hasWiderGrid?: boolean;
};

export type ParallaxImageParagraphFactoryOptionsStyles = {
  CreditsTitle: string;
  ImageDefault: string;
  Parallax: string;
};

export type ParallaxImageParagraphFactoryOptions = {
  language?: 'de' | 'fr';
  styles:
    | ParallaxImageParagraphFactoryOptionsStyles
    | ((
        props: ParallaxImageParagraphProps,
      ) => ParallaxImageParagraphFactoryOptionsStyles);
};
