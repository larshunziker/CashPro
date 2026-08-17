import { ReactNode } from 'react';
import { TopicFactoryStyles } from '../../typings';

export type TopicPageHeaderProps = {
  title: string;
  lead: string;
  headerImage: Image;
  alertId?: string;
  alertType?: string;
  showFollowButton: boolean;
  styles: TopicFactoryStyles;
  children?: ReactNode;
};
