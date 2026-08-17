import { ComponentType } from 'react';

export type PianoTemplateParagraphProps = {
  pianoTemplateParagraph: PianoTemplateParagraph;
  colStyle?: string;
};

export type PianoTemplateParagraphComponent =
  ComponentType<PianoTemplateParagraphProps>;
