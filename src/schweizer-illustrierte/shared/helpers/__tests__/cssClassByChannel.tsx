// import { settingsInitialState } from '../../reducers/settings';
import cssClassByChannel from '../cssClassByChannel';
import { MAIN_CHANNEL_STYLE } from '../../../screens/App/constants';
import { ActiveContentType, ActiveMainChannel } from '../../types';

const mockedStyles = {
  Class: 'idForClass',
  ClassSI: 'idForClassSI',
  ClassSY: 'idForClassSY',
  NoBaseSI: 'idForNoBaseSI',
  NoBaseSY: 'idForNoBaseSY',
  ClassWithoutTheme: 'idForClassWithoutTheme',
};

const settingsInitialState: {
  activeMainChannel: ActiveMainChannel | '';
  activeContentType: ActiveContentType | '';
} = {
  activeMainChannel: '',
  activeContentType: '',
};

describe('[SHARED] helpers - cssClassByChannel', () => {
  test.each([
    [
      {
        activeMainChannel: settingsInitialState.activeMainChannel,
        class: 'Class',
        expected: 'idForClass idForClassSI',
      },
    ],
    [
      {
        activeMainChannel: MAIN_CHANNEL_STYLE,
        class: 'Class',
        expected: 'idForClass idForClassSY',
      },
    ],
    [
      {
        activeMainChannel: settingsInitialState.activeMainChannel,
        class: 'NoBase',
        expected: 'idForNoBaseSI',
      },
    ],
    [
      {
        activeMainChannel: MAIN_CHANNEL_STYLE,
        class: 'NoBase',
        expected: 'idForNoBaseSY',
      },
    ],
  ])('Should return channel-specific class', (config) => {
    const getThemedClass = cssClassByChannel(
      mockedStyles,
      config.activeMainChannel,
      true,
    );

    expect(getThemedClass(config.class)).toEqual(config.expected);
  });

  test('Should return fallback class', () => {
    const getThemedClass = cssClassByChannel(
      mockedStyles,
      MAIN_CHANNEL_STYLE,
      true,
    );
    expect(getThemedClass('ClassWithoutTheme')).toEqual(
      'idForClassWithoutTheme',
    );
  });
});
