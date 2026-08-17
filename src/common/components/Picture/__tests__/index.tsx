import React from 'react';
import { render } from '@testing-library/react';
import { getWidthAndHeightByImageStyle } from '../helpers';
import { routeInitialState } from '../../../../beobachter/shared/reducers/route';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';
import PictureComponent from '../index';
import { imageStylesMapping } from '../imageStylesMapping';
import {
  STYLE_16X9_1130,
  STYLE_16X9_220,
  STYLE_16X9_280,
  STYLE_16X9_440,
  STYLE_16X9_700,
  STYLE_16X9_890,
  STYLE_2X1_1280,
} from '../../../../shared/constants/images';

jest.mock('react-helmet-async');

const initialState = {
  route: {
    ...routeInitialState,
    clientUrl: 'https://develop.publication.ch',
  },
};

const Component = (props: any) => {
  return (
    <ReduxProvider initialState={initialState}>
      <PictureComponent {...props} />
    </ReduxProvider>
  );
};

describe('[Component] Picture', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  test.each`
    imageStyle         | result
    ${STYLE_16X9_1130} | ${getWidthAndHeightByImageStyle(STYLE_16X9_1130)}
    ${STYLE_16X9_220}  | ${getWidthAndHeightByImageStyle(STYLE_16X9_220)}
    ${STYLE_16X9_280}  | ${getWidthAndHeightByImageStyle(STYLE_16X9_280)}
    ${STYLE_16X9_440}  | ${getWidthAndHeightByImageStyle(STYLE_16X9_440)}
    ${STYLE_16X9_700}  | ${getWidthAndHeightByImageStyle(STYLE_16X9_700)}
    ${STYLE_16X9_890}  | ${getWidthAndHeightByImageStyle(STYLE_16X9_890)}
    ${STYLE_2X1_1280}  | ${getWidthAndHeightByImageStyle(STYLE_2X1_1280)}
  `(
    'Should return correct width and height from imageStyle',
    ({ imageStyle, result }) => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ '16x9_1130' */
      expect(result).toStrictEqual(imageStylesMapping[imageStyle]);
    },
  );

  it('Should render with all image styles and lazy loading and no title', () => {
    const { container } = render(
      <Component
        relativeOrigin="/bild.jpg"
        style_320={STYLE_16X9_220}
        style_480={STYLE_16X9_280}
        style_540={STYLE_16X9_440}
        style_760={STYLE_16X9_700}
        style_960={STYLE_16X9_890}
        style_1680={STYLE_16X9_1130}
        alt="alt"
        className="PictureClassName"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render with all image styles and lazy loading with title', () => {
    const { container } = render(
      <Component
        relativeOrigin="/bild.jpg"
        style_320={STYLE_16X9_220}
        style_480={STYLE_16X9_280}
        style_540={STYLE_16X9_440}
        style_760={STYLE_16X9_700}
        style_960={STYLE_16X9_890}
        style_1680={STYLE_16X9_1130}
        alt="alt"
        title="This is a lazy frog named Timmy"
        className="PictureClassName"
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render with only a few image styles', () => {
    const { container } = render(
      <Component
        relativeOrigin="/bild.jpg"
        style_320={STYLE_16X9_440}
        style_540={STYLE_16X9_700}
        style_1680={STYLE_16X9_1130}
        alt="alt"
        className="PictureClassName"
        title="A very nice image"
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render with gray image placeholder because of different aspect ratio across viewports', () => {
    const { container } = render(
      <Component
        relativeOrigin="/bild.jpg"
        style_320={STYLE_16X9_440}
        style_540={STYLE_16X9_700}
        style_1680={STYLE_2X1_1280}
        alt="alt"
        className="PictureClassName"
        title="A very nice image"
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should only render the img provided in the url prop', () => {
    const { container } = render(
      <Component
        url="https://google.ch/images/tree.png"
        relativeOrigin="/bild.jpg"
        style_320={STYLE_16X9_440}
        style_540={STYLE_16X9_700}
        style_1680={STYLE_2X1_1280}
        alt="alt"
        className="PictureClassName"
        title="A very nice image"
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should only render the img provided in the url prop 2', () => {
    const { container } = render(
      <Component
        url="https://google.ch/images/tree2.png"
        alt="alt"
        className="PictureClassName"
        title="A very nice image"
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render empty image if no relativeOrigin or url is provided', () => {
    const { container } = render(
      <Component
        style_320={STYLE_16X9_700}
        alt="alt"
        className="PictureClassName"
        title="A very nice image"
      />,
    );
    expect(container).toMatchSnapshot();
  });
  it('Should render the correct width and height values, when width and height both width and height props are set', () => {
    const { container } = render(
      <Component
        style_320={STYLE_16X9_700}
        alt="alt"
        className="PictureClassName"
        title="A very nice image"
        height={333}
        width={666}
      />,
    );
    expect(container.innerHTML).toContain('333');
    expect(container.innerHTML).toContain('666');
  });
  it('Should render the correct width and height values, when only height prop is set', () => {
    const { container } = render(
      <Component
        style_320={STYLE_16X9_700}
        alt="alt"
        className="PictureClassName"
        title="A very nice image"
        height={333}
      />,
    );
    expect(container.innerHTML).not.toContain('333');
    expect(container.innerHTML).toContain('591');
    expect(container.innerHTML).toContain('1050');
  });
  it('Should render mobile (style_320) width and height values when there are no width and height props and the aspect ratio differs between viewports', () => {
    const { container } = render(
      <Component
        style_320={STYLE_16X9_700}
        style_480={STYLE_2X1_1280}
        alt="alt"
        className="PictureClassName"
        title="A very nice image"
      />,
    );
    expect(container.innerHTML).not.toContain('333');
    expect(container.innerHTML).not.toContain('666');
    expect(container.innerHTML).toContain('591');
    expect(container.innerHTML).toContain('1050');
  });

  it('Should render with title as alt-attribute, when the picture a fallback image is', () => {
    const { container } = render(
      <Component
        relativeOrigin="/fallback.jpg"
        style_320={STYLE_16X9_220}
        style_480={STYLE_16X9_280}
        style_540={STYLE_16X9_440}
        style_760={STYLE_16X9_700}
        style_960={STYLE_16X9_890}
        style_1680={STYLE_16X9_1130}
        alt="alt"
        className="PictureClassName"
        title="title"
      />,
    );
    expect(container.innerHTML).toContain('alt="title"');
  });

  it('Should render with title as alt-attribute, when the picture has no given alt attribute', () => {
    const { container } = render(
      <Component
        relativeOrigin="/bild.jpg"
        style_320={STYLE_16X9_220}
        style_480={STYLE_16X9_280}
        style_540={STYLE_16X9_440}
        style_760={STYLE_16X9_700}
        style_960={STYLE_16X9_890}
        style_1680={STYLE_16X9_1130}
        alt=""
        className="PictureClassName"
        title="title"
      />,
    );
    expect(container.innerHTML).toContain('alt="title"');
  });

  it('Should render with the given alt alt-attribute, when the picture is not a fallback image', () => {
    const { container } = render(
      <Component
        relativeOrigin="/bild.jpg"
        style_320={STYLE_16X9_220}
        style_480={STYLE_16X9_280}
        style_540={STYLE_16X9_440}
        style_760={STYLE_16X9_700}
        style_960={STYLE_16X9_890}
        style_1680={STYLE_16X9_1130}
        alt="bild"
        className="PictureClassName"
        title="title"
      />,
    );
    expect(container.innerHTML).toContain('alt="bild"');
  });
});
