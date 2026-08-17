import { getBadgeByProps } from '../index';
import {
  ADVERTISING_TYPE_BRANDREPORT,
  ADVERTISING_TYPE_EXTERNAL,
  ARTICLE_TYPE_ASSOCIATION,
  ARTICLE_TYPE_LONG_READ,
  ARTICLE_TYPE_SEATCHANGE,
  CHANNEL_TYPE_SPECIAL,
} from '../../../../../../../../shared/constants/content';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialProps = {
    subtypeValue: '',
    channel: { channelType: '' },
    link: { label: '' },
  };
});

describe('[TeaserRecommendation] getBadgeByProps function', () => {
  it('Should render nothing if no subtypeValue or channel is set', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const badge = getBadgeByProps({ ...initialProps });
    expect(badge).toMatchSnapshot();
  });

  it('Should render badge properly with channelType: special properly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.channel.channelType = CHANNEL_TYPE_SPECIAL;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const badge = getBadgeByProps({ ...initialProps });
    expect(badge).toMatchSnapshot();
  });

  test.each`
    subtypeValue                    | link
    ${ARTICLE_TYPE_LONG_READ}       | ${''}
    ${ARTICLE_TYPE_SEATCHANGE}      | ${''}
    ${ARTICLE_TYPE_ASSOCIATION}     | ${''}
    ${ADVERTISING_TYPE_BRANDREPORT} | ${''}
    ${ADVERTISING_TYPE_EXTERNAL}    | ${{ label: 'testLinkLabel' }}
  `(
    'Should render badge properly with subtypeValue: $subtypeValue properly',
    ({ subtypeValue, link }) => {
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.subtypeValue = subtypeValue;
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      initialProps.link = link;
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      const badge = getBadgeByProps({ ...initialProps });
      expect(badge).toMatchSnapshot();
    },
  );
});
