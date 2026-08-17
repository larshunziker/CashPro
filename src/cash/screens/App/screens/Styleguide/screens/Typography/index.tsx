/* istanbul ignore file */

import styleguideTypographyFactory from '../../../../../../../common/screens/Styleguide/components/Typography/factory';
import {
  setLoading,
  setScreenReady,
} from '../../../../../../shared/actions/route';
import StatusPage from '../../../StatusPage';
import typography from '../../../../assets/styles/typography.legacy.css';
import styles from './styles.legacy.css';

const StyleguideTypography = styleguideTypographyFactory({
  StatusPage,
  styles: {
    Wrapper: styles.Wrapper,
    HeaderTitle: styles.HeaderTitle,
    Label: styles.Label,
    WrapperInner: styles.WrapperInner,
    Title: styles.Title,
    ItemWrapper: styles.ItemWrapper,
    Input: styles.Input,
    InputLabel: styles.InputLabel,
  },
  typography,
  setLoading,
  setScreenReady,
});

export default StyleguideTypography;
