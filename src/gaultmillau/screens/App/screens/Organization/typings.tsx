import { IntlShape } from 'react-intl';
import { WithHeaderProps } from '../../../../shared/decorators/withHeaderProps';
import { WithHelmetProps } from '../../../../shared/decorators/withHelmet';

export type OrganizationProps = WithHelmetProps &
  WithHeaderProps & {
    setHeaderData: (props: HeaderState) => void;
    resetHeaderData: () => void;
  } & {
    organization: Organization;
    params: Record<string, any>;
  };

// Moved Innerprops here in order to avoid circular dependencies
export type OrganizationPropsInner = OrganizationProps & {
  organization: Organization;
  params: Record<string, any>;
  relay: Record<string, any>;
  setVerticalTitle: (title: string) => void;
  intl: IntlShape;
  viewportLabel: string;
  language: string;
};
