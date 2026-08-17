import React, { ComponentType } from 'react';
import { IntlShape } from 'react-intl';
import classNames from 'classnames';
import { getAllAuthors } from '../../../Article/shared/helpers';
import CSSPicture from '../../../../../../../common/components/CSSPicture';
import { STYLE_TEASER_1_1 } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';

type RecipeAuthorProps = {
  recipe: Recipe;
  intl: IntlShape;
  language: string;
};

const RecipeAuthor: ComponentType<RecipeAuthorProps> = ({
  recipe,
  intl,
  language,
}) => (
  <div className={styles.AuthorWrapper}>
    {recipe.chiefCook &&
      recipe.chiefCook.edges &&
      recipe.chiefCook.edges.length > 0 &&
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      recipe.chiefCook.edges[0].node &&
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      recipe.chiefCook.edges[0].node.teaserImage && (
        <CSSPicture
          style_320={STYLE_TEASER_1_1}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
          relativeOriginPath={
            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
            /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
            recipe.chiefCook.edges[0].node.teaserImage?.image.file
              ?.relativeOriginPath
          }
        >
          {({ className }) => (
            <span className={classNames(styles.AuthorImage, className)} />
          )}
        </CSSPicture>
      )}
    {recipe.chiefCook &&
      recipe.chiefCook.edges &&
      recipe.chiefCook.edges.length > 0 && (
        <div className={styles.AuthorWrapperInner}>
          <p className={styles.AuthorLink}>
            {/* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<PersonEdge>[]' is not assignable to parameter of type '(AuthorEdge | PersonEdge)[]'. */}
            {getAllAuthors(recipe, recipe.chiefCook.edges, intl, false)}
          </p>
          {/* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */}
          {recipe.chiefCook.edges[0].node &&
            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
            recipe.chiefCook.edges[0].node.description &&
            language === 'fr' && (
              <div
                className={styles.AuthorLead}
                dangerouslySetInnerHTML={{
                  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                  __html: recipe.chiefCook.edges[0].node.description,
                }}
              />
            )}
          {/* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */}
          {recipe.chiefCook.edges[0].node &&
            /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
            recipe.chiefCook.edges[0].node.body &&
            language !== 'fr' && (
              <div
                className={styles.AuthorLead}
                dangerouslySetInnerHTML={{
                  /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
                  __html: recipe.chiefCook.edges[0].node.body,
                }}
              />
            )}
        </div>
      )}
  </div>
);

export default RecipeAuthor;
