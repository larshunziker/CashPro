import React from 'react';
import Picture from '../../../../../Picture';
import { STYLE_1X1_140 } from '../../../../../../../shared/constants/images';

interface AuthorPictureProps {
  imageParagraph: ImageParagraph;
  name: string;
  className?: string;
}

const AuthorPicture = ({
  imageParagraph,
  name,
  className = '',
}: AuthorPictureProps) => {
  const imageFile = imageParagraph?.image?.file || null;
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const focalPointX = imageParagraph?.image?.file.focalPointX || null;
  /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
  const focalPointY = imageParagraph?.image?.file.focalPointY || null;

  return (
    <Picture
      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
      relativeOrigin={imageFile?.relativeOriginPath}
      alt={imageFile?.alt || name}
      className={className}
      style_320={STYLE_1X1_140}
      /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
      focalPointX={focalPointX}
      /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
      focalPointY={focalPointY}
    />
  );
};

export default AuthorPicture;
