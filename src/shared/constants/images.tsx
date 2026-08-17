/**
 * @file   image format constants
 */

// formats
export const IMAGE_FORMAT_LANDSCAPE = 'landscape';
export const IMAGE_FORMAT_PORTRAIT = 'portrait';
export const IMAGE_FORMAT_SQUARE = 'square';
export const IMAGE_FORMAT_FULLWIDTH = 'fullwidth'; // handling fullWidth checkbox from CMS
export const IMAGE_FORMAT_DEFAULT = IMAGE_FORMAT_LANDSCAPE;

// INFO: These are all the image styles copied from SI. Its possible that other publication have some more image styles that are missing here. Please update the list accordingly.
// images styles
export const STYLE_16X9_1130 = '16x9_1130';
export const STYLE_16X9_1180 = '16x9_1180';
export const STYLE_16X9_170_BLUE = '16x9_170_blue';
export const STYLE_16X9_170 = '16x9_170';
export const STYLE_16X9_220_BLUE = '16x9_220_blue';
export const STYLE_16X9_220 = '16x9_220';
export const STYLE_16X9_280 = '16x9_280';
export const STYLE_16X9_340 = '16x9_340';
export const STYLE_16X9_360 = '16x9_360';
export const STYLE_16X9_440 = '16x9_440';
export const STYLE_16X9_560 = '16x9_560';
export const STYLE_16X9_700 = '16x9_700';
export const STYLE_16X9_800 = '16x9_800';
export const STYLE_16X9_890 = '16x9_890';
export const STYLE_1X1_140 = '1x1_140';
export const STYLE_1X1_160_PERSON = '1x1_160_person';
export const STYLE_1X1_210 = '1x1_210';
export const STYLE_1X1_250 = '1x1_250';
export const STYLE_1X1_280 = '1x1_280';
export const STYLE_1X1_290_PERSON = '1x1_290_person';
export const STYLE_1X1_410 = '1x1_410';
export const STYLE_1X1_495 = '1x1_495';
export const STYLE_1X1_640 = '1x1_640';
export const STYLE_1X1_660 = '1x1_660';
export const STYLE_1X1_70 = '1x1_70';
export const STYLE_1x2_218 = '1x2_218';
export const STYLE_2X1_1280 = '2x1_1280';
export const STYLE_2X1_800 = '2x1_800';
export const STYLE_2X3_210 = '2x3_210';
export const STYLE_2X3_280 = '2x3_280';
export const STYLE_2X3_305 = '2x3_305';
export const STYLE_2X3_360 = '2x3_360';
export const STYLE_2X3_960 = '2x3_960';
export const STYLE_3X2_210 = '3x2_210';
export const STYLE_3X2_280 = '3x2_280';
export const STYLE_3X2_440 = '3x2_440';
export const STYLE_3X2_770 = '3x2_770';
export const STYLE_3X2_1000 = '3x2_1000';
export const STYLE_3X4_360 = '3x4_360';
export const STYLE_3X4_960 = '3x4_960';
export const STYLE_4X5_480 = '4x5_480';
export const STYLE_8X3_1130 = '8x3_1130';
export const STYLE_8X3_890 = '8x3_890';
export const STYLE_BANNER_LARGE = 'banner_large';
export const STYLE_BANNER_MEDIUM = 'banner_medium';
export const STYLE_BANNER_SMALL = 'banner_small';
export const STYLE_BOOK_TEASER = 'book_teaser';

export const STYLE_HEADER_16_9_LARGE = 'header_16_9_large';
export const STYLE_HEADER_16_9_SMALL = 'header_16_9_small';
export const STYLE_HEADER_16_9 = 'header_16_9';
export const STYLE_HEADER_BLUR_1200 = 'header_blur_1200';
export const STYLE_HEADER_BLUR_320 = 'header_blur_320';
export const STYLE_HEADER_BLUR_480 = 'header_blur_480';
export const STYLE_HEADER_BLUR_760 = 'header_blur_760';
export const STYLE_HEADER_BLUR_960 = 'header_blur_960';
export const STYLE_INLINE_IMAGE_1200 = 'inline_image_1200';
export const STYLE_LARGE = 'large';
export const STYLE_MEDIUM = 'medium';
export const STYLE_MINISTAGE_L = 'ministage_l';
export const STYLE_MINISTAGE_M = 'ministage_m';
export const STYLE_SCALEH_120 = 'scaleh_120';
export const STYLE_SCALEW_140 = 'scalew_140';
export const STYLE_SCALEW_280 = 'scalew_280';
export const STYLE_SCALEW_440 = 'scalew_440';
export const STYLE_SCALEW_700 = 'scalew_700';
export const STYLE_SCALEW_800 = 'scalew_800';
export const STYLE_TEASER_1_1_SMALL = 'teaser_1_1_small';
export const STYLE_TEASER_1_1 = 'teaser_1_1';
export const STYLE_TEASER_3_2_LARGE = 'teaser_3_2_large';
export const STYLE_TEASER_3_2_SMALL = 'teaser_3_2_small';
export const STYLE_TEASER_3_2 = 'teaser_3_2';
export const STYLE_TEASER_M_480 = 'teaser_m_480';
export const STYLE_TEASER_S_1200 = 'teaser_s_1200';
export const STYLE_TEASER_S_320 = 'teaser_s_320';
export const STYLE_TEASER_S_480 = 'teaser_s_480';
export const STYLE_TEASER_S_760 = 'teaser_s_760';
export const STYLE_TEASER_S_960 = 'teaser_s_960';
export const STYLE_THUMBNAIL = 'thumbnail';

// image placeholders
export const STYLE_16X9_PLACEHOLDER = '16x9_placeholder';
export const STYLE_8X3_PLACEHOLDER = '8x3_placeholder';
export const STYLE_1X1_PLACEHOLDER = '1x1_placeholder';
export const STYLE_2X1_PLACEHOLDER = '2x1_placeholder';
export const STYLE_1X2_PLACEHOLDER = '1x2_placeholder';
export const STYLE_2X3_PLACEHOLDER = '2x3_placeholder';
export const STYLE_3X2_PLACEHOLDER = '3x2_placeholder';

export const DEFAULT_FOCALPOINT = 50;

/**
 * image placeholders data urls
 *
 * Create placeholders like this
 * convert placeholder.gif resize 40x15! placeholder_8x3.gif
 * (aim for around 100-600 pixels in total, not more than 70 bytes, 1x1 could be 10x10px for example)
 * cat placeholder_8x3.gif | base64
 * to get the base64 encoded data
 */
export const STYLE_2X1_PLACEHOLDER_DATA =
  'data:image/gif;base64,R0lGODlhHgAPAPAAAPb29gAAACH5BAAAAAAALAAAAAAeAA8AAAIThI+py+0Po5y02ouz3rz7D4ZTAQA7';
export const STYLE_3X2_PLACEHOLDER_DATA =
  'data:image/gif;base64,R0lGODlhFQAOAPAAAPb29gAAACH5BAAAAAAALAAAAAAVAA4AAAIPhI+py+0Po5y02ouz3rYAADs=';
export const STYLE_1X1_PLACEHOLDER_DATA =
  'data:image/gif;base64,R0lGODdhDwAPAJEAAAAAAPb29v///wAAACH5BAkAAAMALAAAAAAPAA8AAAINjI+py+0Po5y02otnAQA7';
export const STYLE_SCALE_W_PLACEHOLDER_DATA =
  'data:image/gif;base64,R0lGODdhbgAbAJEAAAAAAPb29v///wAAACH5BAkAAAMALAAAAABuABsAAAI5jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJhRUAADs=';
export const STYLE_16X9_PLACEHOLDER_DATA =
  'data:image/gif;base64,R0lGODdhEAAJAJEAAAAAAPb29v///wAAACH5BAkAAAMALAAAAAAQAAkAAAIKjI+py+0Po5yUFQA7';
/* const STYLE_1X1_TRANSPARENT_PLACEHOLDER_DATA: string =
  'data:image/gif;base64,R0lGODlhCgAKAIABAAAAAP///yH5BAEKAAEALAAAAAAKAAoAAAIIjI+py+0PYysAOw=='; */

// Image format mapping
const FORMAT_16x9 = {
  thumbnail: STYLE_16X9_PLACEHOLDER,
};
const FORMAT_8x3 = {
  thumbnail: STYLE_8X3_PLACEHOLDER,
};
const FORMAT_1x1 = {
  thumbnail: STYLE_1X1_PLACEHOLDER,
};
const FORMAT_2x1 = {
  thumbnail: STYLE_2X1_PLACEHOLDER,
};
const FORMAT_1x2 = {
  thumbnail: STYLE_1X2_PLACEHOLDER,
};
const FORMAT_2x3 = {
  thumbnail: STYLE_2X3_PLACEHOLDER,
};
const FORMAT_3x2 = {
  thumbnail: STYLE_3X2_PLACEHOLDER,
};

export const FORMAT = {
  [STYLE_16X9_1130]: FORMAT_16x9,
  [STYLE_16X9_1180]: FORMAT_16x9,
  [STYLE_16X9_170_BLUE]: FORMAT_16x9,
  [STYLE_16X9_170]: FORMAT_16x9,
  [STYLE_16X9_220_BLUE]: FORMAT_16x9,
  [STYLE_16X9_220]: FORMAT_16x9,
  [STYLE_16X9_280]: FORMAT_16x9,
  [STYLE_16X9_340]: FORMAT_16x9,
  [STYLE_16X9_360]: FORMAT_16x9,
  [STYLE_16X9_440]: FORMAT_16x9,
  [STYLE_16X9_560]: FORMAT_16x9,
  [STYLE_16X9_700]: FORMAT_16x9,
  [STYLE_16X9_800]: FORMAT_16x9,
  [STYLE_16X9_890]: FORMAT_16x9,
  [STYLE_1X1_140]: FORMAT_1x1,
  [STYLE_1X1_160_PERSON]: FORMAT_1x1,
  [STYLE_1X1_210]: FORMAT_1x1,
  [STYLE_1X1_250]: FORMAT_1x1,
  [STYLE_1X1_280]: FORMAT_1x1,
  [STYLE_1X1_290_PERSON]: FORMAT_1x1,
  [STYLE_1X1_410]: FORMAT_1x1,
  [STYLE_1X1_495]: FORMAT_1x1,
  [STYLE_1X1_640]: FORMAT_1x1,
  [STYLE_1X1_660]: FORMAT_1x1,
  [STYLE_1X1_70]: FORMAT_1x1,
  [STYLE_1x2_218]: FORMAT_1x2,
  [STYLE_2X1_1280]: FORMAT_2x1,
  [STYLE_2X1_800]: FORMAT_2x1,
  [STYLE_2X3_210]: FORMAT_2x3,
  [STYLE_2X3_280]: FORMAT_2x3,
  [STYLE_2X3_305]: FORMAT_2x3,
  [STYLE_2X3_360]: FORMAT_2x3,
  [STYLE_2X3_960]: FORMAT_2x3,
  [STYLE_3X2_210]: FORMAT_3x2,
  [STYLE_3X2_280]: FORMAT_3x2,
  [STYLE_3X2_440]: FORMAT_3x2,
  [STYLE_3X2_770]: FORMAT_3x2,
  [STYLE_8X3_1130]: FORMAT_8x3,
  [STYLE_8X3_890]: FORMAT_8x3,
  [STYLE_HEADER_16_9_LARGE]: FORMAT_16x9,
  [STYLE_HEADER_16_9_SMALL]: FORMAT_16x9,
  [STYLE_HEADER_16_9]: FORMAT_16x9,
  [STYLE_TEASER_1_1]: FORMAT_1x1,
  [STYLE_TEASER_1_1_SMALL]: FORMAT_1x1,
};
