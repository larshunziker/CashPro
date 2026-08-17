import { LinkComponent } from '../../../Link/typings';

export type LinkBoxParagraphProps = {
  linkBox: LinkBoxParagraph; //TODO: add LinkBoxParagraphComponent typing here
};

export type LinkBoxParagraphFactoryOptions = {
  styles: {
    Title: string;
    GroupWrapper: string;
    Link: string;
  };
  Link: LinkComponent;
};
