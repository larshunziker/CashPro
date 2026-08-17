import { getStylesByProps } from '../index';
import { ORIGIN_POPSTAGE } from '../../PopStage/constants';

describe('[Component] ExpansionPanel', () => {
  it('Should return the correct styles for default case', () => {
    const styles = getStylesByProps({ origin: 'default' });
    expect(styles).toMatchSnapshot();
  });

  it('Should return the correct styles for Popstage', () => {
    const styles = getStylesByProps({ origin: ORIGIN_POPSTAGE });
    expect(styles).toMatchSnapshot();
  });
});
