import { ContentTypeUnion } from '../../../../../shared/@types/gql';

export type RecipesProps = {
  data: ApolloData & {
    environment?: Partial<Environment> & {
      routeByPath?: Partial<Route> & {
        object: Partial<
          ContentTypeUnion & {
            editContentUri: string;
            editRelationUri?: string;
            cloneContentUri?: string;
            title: string;
            lead: string;
            subtypeValue: string;
          }
        >;
      };
    };
  };
  page: string;
  language: string;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  renderFilterListItems: (props) => JSX.Element;
  recipeCategory?: string;
};
