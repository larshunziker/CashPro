import React from 'react';
import { render } from '@testing-library/react';
import teaserFactory, { getFormattedDate } from '../factory';
import { routeInitialState } from '../../../../beobachter/shared/reducers/route';
import { windowInitialState } from '../../../../shared/reducers/window';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';
import mockOptions from './mockdata.json';
import {
  STYLE_16X9_560,
  STYLE_16X9_700,
  STYLE_1X1_280,
  STYLE_3X2_440,
} from '../../../../shared/constants/images';
import {
  PUBLICATION_BEOBACHTER,
  PUBLICATION_BIL,
  PUBLICATION_GM,
  PUBLICATION_GM_FR,
  PUBLICATION_HZ,
  PUBLICATION_HZB,
  PUBLICATION_SI,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../shared/constants/publications';

jest.mock('Link');
jest.mock('Picture');

const Badge = () => <div />;
const Icon = () => <div />;

const initialState = { window: windowInitialState, route: routeInitialState };
/* @ts-ignore TODO: TS7034 ->  Variable 'initialData' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialData = null;

const styles = {
  ContentWrapper: 'ContentWrapper',
  ImageWrapper: 'ImageWrapper',
  Image: 'Image',
  ShortTitle: 'ShortTitle',
  SponsorImage: 'SponsorImage',
  Title: 'Title',
  Wrapper: 'Wrapper',
  IconStyle: 'IconStyle',
  SkeletonWrapper: 'SkeletonWrapper',
  SkeletonContentWrapper: 'SkeletonContentWrapper',
  SkeletonShortTitle: 'SkeletonShortTitle',
  SkeletonTitle: 'SkeletonTitle',
};

const MinimalisticTeaser = teaserFactory({
  isPublicationDateVisible: true,
  leadOptions: {
    truncateCount: 22,
    suffixText: 'More...',
  },
  styles,
  teaserImageStyles: { style_320: STYLE_1X1_280 },
  teaserImageIdentifier: '',
});

const Teaser = teaserFactory({
  badge: Badge,
  icon: Icon,
  hasPublicationLogo: true,
  isPublicationDateVisible: true,
  formattedPublicationDate: ({ publicationDate }) => {
    if (!publicationDate) {
      return null;
    }

    const date = new Date(publicationDate).toISOString();

    return date.split('T')[0].split('-').reverse().join('.');
  },
  /* @ts-ignore TODO: TS2322 ->  Type '({ sponsor } */
  sponsorImage: ({ sponsor }) => {
    if (!sponsor || !sponsor?.teaserImage?.image?.file?.relativeOriginPath) {
      return null;
    }

    return (
      <img
        className={styles.SponsorImage}
        src={sponsor?.teaserImage?.image?.file?.relativeOriginPath}
        alt="Sponsor Logo"
      />
    );
  },
  leadOptions: {
    truncateCount: 190,
    suffixText: 'Mehr...',
  },
  styles,
  teaserImageStyles: {
    style_320: STYLE_1X1_280,
    style_760: STYLE_3X2_440,
    style_960: STYLE_16X9_560,
    style_1680: STYLE_16X9_700,
  },
  teaserImageIdentifier: '',
});

const TeaserNoImage = teaserFactory({
  badge: Badge,
  icon: Icon,
  styles,
  // @ts-ignore
  teaserImage: {},
});

beforeEach(() => {
  initialData = JSON.parse(JSON.stringify(mockOptions));
});

describe('[Common] Teaser factory', () => {
  it('Should render teaser without a anchor tag because no preferredUri is given.', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */
    initialData.preferredUri = null;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */}
        <Teaser {...initialData} />
      </ReduxProvider>,
    );

    expect(queryByTestId('teaser-factory-image-wrapper')).not.toBeNull();
    expect(queryByTestId('teaser-factory-link-wrapper')).toBeNull();
    expect(queryByTestId('teaser-factory-anchor-link-wrapper')).not.toBeNull();
  });

  it('Should render factory correctly', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */}
        <Teaser {...initialData} />
      </ReduxProvider>,
    );

    expect(queryByTestId('teaser-factory-image-wrapper')).not.toBeNull();
    expect(queryByTestId('teaser-factory-anchor-link-wrapper')).toBeNull();
    expect(queryByTestId('teaser-factory-link-wrapper')).not.toBeNull();
  });

  it('Should render factory as skeleton teaser', () => {
    const props: any = { isSkeleton: true };
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        <Teaser {...props} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render factory without image', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */
    initialData.teaserImage.image = null;
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */}
        <TeaserNoImage {...initialData} />
      </ReduxProvider>,
    );

    expect(queryByTestId('teaser-factory-image-wrapper')).toBeNull();
    expect(queryByTestId('teaser-factory-anchor-link-wrapper')).toBeNull();
    expect(queryByTestId('teaser-factory-link-wrapper')).not.toBeNull();
  });

  it('Should render the link.path instead of the preferredUri', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */
    initialData.preferredUri = null;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */
    initialData.link = {
      path: 'https://www.beobachter.ch',
    };

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */}
        <Teaser {...initialData} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render factory with auto hyphens option', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */
    initialData.useAutoHyphens = true;

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */}
        <TeaserNoImage {...initialData} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it.each([
    { publicationDate: '2019-06-20T19:37:11' },
    { publicationDate: '2018-02-01T09:22:00' },
    { publicationDate: 1561983691170 },
    { publicationDate: null },
    { publicationDate: '' },
  ])(
    'Should render with the correct publicationDate (custom formatted date) $#',
    (testCase) => {
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */
      initialData.publicationDate = testCase.publicationDate;

      const { container } = render(
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */}
          <Teaser {...initialData} />
        </ReduxProvider>,
      );

      expect(container).toMatchSnapshot();
    },
  );

  it.each([
    { publicationDate: '2019-06-20T19:37:11' },
    { publicationDate: '2018-02-01T09:22:00' },
    { publicationDate: 1561983691170 },
    { publicationDate: null },
    { publicationDate: '' },
  ])(
    'Should render with the correct publicationDate (default date "am dd.mm.yyyy") $#',
    (testCase) => {
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */
      initialData.publicationDate = testCase.publicationDate;

      const { container } = render(
        <ReduxProvider initialState={initialState}>
          {/* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */}
          <MinimalisticTeaser {...initialData} />
        </ReduxProvider>,
      );

      expect(container).toMatchSnapshot();
    },
  );

  it.each([
    { publication: PUBLICATION_BEOBACHTER },
    { publication: PUBLICATION_BIL },
    { publication: PUBLICATION_SI },
    { publication: PUBLICATION_GM },
    { publication: PUBLICATION_GM_FR },
    { publication: PUBLICATION_HZ },
    { publication: PUBLICATION_SWISS_INSURANCE },
    { publication: PUBLICATION_HZB },
    { publication: '' },
    { publication: null },
    { publication: '20min' },
  ])('Should render with the correct publication Logo $#', (testCase) => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */
    initialData.publication = testCase.publication;

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialData' implicitly has an 'any' type. */}
        <Teaser {...initialData} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  test.each`
    input                         | output
    ${'2019-06-20T19:37:11'}      | ${'20.06.2019'}
    ${'2018-02-01T09:22:00'}      | ${'01.02.2018'}
    ${'2019-03-08T06:49:02+0100'} | ${'08.03.2019'}
    ${1561983691170}              | ${'01.07.2019'}
    ${null}                       | ${null}
  `(
    'Should gerate format the input date $input correctly',
    ({ input, output }) => {
      const result = getFormattedDate(input);
      expect(result).toBe(output);
    },
  );
});
