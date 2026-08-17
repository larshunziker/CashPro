export type RecipeProps = Pick<RouterProps, 'location' | 'params'> & {
  recipe: Recipe;
};
