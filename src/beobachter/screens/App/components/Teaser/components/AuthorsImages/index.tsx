import React from 'react';
import Picture from '../../../../../../../common/components/Picture';
import { STYLE_1X1_140 } from '../../../../../../../shared/constants/images';

const AuthorsImages = ({
  authors,
  authorAvatarStyle,
}: {
  authors: AuthorEdge[];
  authorAvatarStyle: string;
}) => (
  <>
    {authors.map((author, index) => {
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      const imageFile = author.node.imageParagraph.image.file || null;
      /* @ts-ignore TODO: TS2339 ->  Property 'alt' does not exist on type 'ImageFile | null'. */
      /* @ts-ignore TODO: TS2339 ->  Property 'relativeOriginPath' does not exist on type 'ImageFile | null'. */
      const { alt = '', relativeOriginPath = '' } = imageFile;
      const focalPointX =
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        author.node.imageParagraph.image.file.focalPointX || null;
      const focalPointY =
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        author.node.imageParagraph.image.file.focalPointY || null;

      if (!relativeOriginPath) {
        return null;
      }

      return (
        <Picture
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          key={`author-image-${author.node.id || index}`}
          relativeOrigin={relativeOriginPath}
          alt={alt}
          className={authorAvatarStyle}
          style_320={STYLE_1X1_140}
          /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
          focalPointX={focalPointX}
          /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
          focalPointY={focalPointY}
        />
      );
    })}
  </>
);
export default AuthorsImages;
