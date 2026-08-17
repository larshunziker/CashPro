import React from 'react';
import { IntlShape } from 'react-intl';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import classNames from 'classnames';
import Helmet from '../../../../components/Helmet';
import {
  ANCHOR_TITLE,
  ANCHOR_SHORT_TITLE,
} from '../../../../../../../shared/constants/content';
import styles from './styles.legacy.css';
import { RecipeLeadProps } from './typings';

type RecipeLeadPropsInner = RecipeLeadProps & {
  recipe: Recipe;
  intl: IntlShape;
};

const RecipeLead = ({ recipe, articleColStyle }: RecipeLeadPropsInner) => {
  return (
    <div className={classNames('recipe-lead', articleColStyle)}>
      <Helmet
        title={recipe.seoTitle || recipe.metaTitle || recipe.shortTitle || ''}
      />
      <span id={ANCHOR_SHORT_TITLE} className={styles.ShortTitle}>
        {recipe.shortTitle || ''}
      </span>
      <h2>
        <div id={ANCHOR_TITLE} className={styles.Title}>
          {recipe.title || recipe.shortTitle || ''}
        </div>
      </h2>
    </div>
  );
};

const updatePolicy = shouldUpdate<any>(
  (props: RecipeLeadPropsInner, nextProps: RecipeLeadPropsInner) =>
    props.recipe !== nextProps.recipe,
);

export default compose<any, any>(updatePolicy)(RecipeLead);
