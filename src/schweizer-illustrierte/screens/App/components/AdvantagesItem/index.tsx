/* istanbul ignore file */

import { connect } from 'react-redux';
import advantagesItemFactory from '../../../../../common/components/AdvantagesItem/factory';
import cssClassByChannel from '../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import styles from './styles.legacy.css';
import {
  AdvantagesItemFactoryOptionsStyles,
  AdvantagesItemProps,
} from '../../../../../common/components/AdvantagesItem/typings';
import { ActiveMainChannel } from '../../../../shared/types';

type AdvantagesItemPropsInner = AdvantagesItemProps & {
  activeMainChannel: ActiveMainChannel;
};

const getStyleByProps = ({
  activeMainChannel,
}: AdvantagesItemPropsInner): AdvantagesItemFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return {
    Icon: styles.Icon,
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    Text: getThemedClass('Text'),
    Wrapper: styles.Wrapper,
  };
};

const AdvantagesParagraph = advantagesItemFactory({
  styles: getStyleByProps,
});

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeContentType: settingsStateSelector(state).activeContentType,
});

export default connect(mapStateToProps)(AdvantagesParagraph);
