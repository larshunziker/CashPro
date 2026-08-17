/**
 * @file   Single Alert Topic Ministage
 */

import { ComponentType } from 'react';
import { AlertItemComponent } from '../../../../../AlertItem/typings';
import { SubscribeButtonComponent } from '../../../../../SubscribeButton/typings';

export type MinistageSingleAlertTopicProps = {
  ministageParagraph: MinistageParagraph;
  isSplittedPageLayout?: boolean;
};

export type MinistageSingleAlertTopicFactoryOptionsStyles = {
  Wrapper: string;
  ContentWrapper: string;
  Title: string;
  AlertItemWrapper: string;
};

export type MinistageSingleAlertTopicFactoryOptions = {
  AlertItem: AlertItemComponent;
  SubscribeButton: SubscribeButtonComponent;
  imageStyles: ImageStylesObject;
  styles:
    | MinistageSingleAlertTopicFactoryOptionsStyles
    | ((
        props: MinistageSingleAlertTopicProps,
      ) => MinistageSingleAlertTopicFactoryOptionsStyles);
};

export type MinistageSingleAlertTopicComponent =
  ComponentType<MinistageSingleAlertTopicProps>;
