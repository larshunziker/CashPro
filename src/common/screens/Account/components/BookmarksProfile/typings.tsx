import React, { ComponentType } from 'react';
import { Action } from 'redux';
import { NoItemsComponent } from '../../../../components/NoItems/typings';
import { RasHelmetProps } from '../../../../components/Helmet/typings';

export type BookmarksProfileFactoryOptions = {
  styles: {
    BookmarksProfileWrapper: string;
    LoginWrapper: string;
    Title: string;
  };
  grid: any; // TODO: maybe add a global typing for grid.legacy.css?
  titleText?: string;
  loginText?: string;
  LoginForm: React.ComponentType<any>;
  NoBookmarks: NoItemsComponent;
  LoadingSpinner: React.ComponentType<any>;
  BookmarkList: React.ComponentType<any>;
  Helmet: ComponentType<RasHelmetProps>;
  seoTitle?: string;
  setLoading?: (loading: boolean) => Action; // loading state action for new data fetching flow
  setScreenReady?: (screenReady: boolean, tealiumData: TaeliumData) => Action;
};

export type BookmarksProfileComponent = ComponentType<BookmarksProfileProps>;

export type BookmarksProfileProps = Partial<RouterProps>;
