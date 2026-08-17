export type VideoParagraphProps = {
  isFirst?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  video: VideoParagraph;
  origin: string;
  addClass?: string;
  suppressSource?: boolean;
  pageLayoutType?: string;
};

export type VideoParagraphStyles = {
  Wrapper: string;
  VideoTitle: string;
  CaptionWrapper: string;
  VideoCaption: string;
  VideoCredit: string;
};
