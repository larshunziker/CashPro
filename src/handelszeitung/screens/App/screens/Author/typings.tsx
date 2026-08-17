import { WithHelmetProps } from '../../../../../shared/decorators/@types/withHelmetFactory';
import { WithPagePagerProps } from '../../../../../shared/decorators/@types/withPagePager';

export type AuthorPageProps = WithHelmetProps &
  WithPagePagerProps & {
    author: Author;
  };
