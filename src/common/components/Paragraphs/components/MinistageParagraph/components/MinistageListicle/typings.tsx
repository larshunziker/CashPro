import { ComponentType } from 'react';

export type MinistageListicleProps = {
  ministageParagraph: MinistageParagraph;
};

export type MinistageListicleFactoryOptions = {
  Header?: ComponentType;
  styles: {
    Wrapper: string;
    ContentWrapper: string;
    HeaderWrapper?: string;
    LinkWrapper: string;
    LinkList: string;
    ListItem: string;
    Link: string;
  };
};

export type MinistageListicleComponent = ComponentType<MinistageListicleProps>;
