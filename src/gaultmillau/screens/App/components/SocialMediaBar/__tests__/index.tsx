import React from 'react';
import { render } from '@testing-library/react';
import {
  SocialMediaBarIcon,
  getSocialMediaItemsByProps,
} from '../../SocialMediaBar';
import { SOCIAL_MEDIA_LINK_FACEBOOK } from '../../SocialMediaBar/constants';

jest.mock(
  '../../SVGIcon',
  () =>
    /* @ts-ignore TODO: TS7031 ->  Binding element 'type' implicitly has an 'any' type. */
    ({ type }) =>
      type,
);
jest.mock('LinkLegacy');

describe('[Component] SocialMediaBar', () => {
  test.each`
    language
    ${'de'}
    ${'fr'}
    ${''}
  `(
    'Should return social media bar icons for language $language correctly',
    ({ language }) => {
      const icons = getSocialMediaItemsByProps({ language });
      expect(icons).toMatchSnapshot();
    },
  );

  test.each`
    type          | link                          | component
    ${'Facebook'} | ${SOCIAL_MEDIA_LINK_FACEBOOK} | ${(<div>Icon</div>)}
  `(
    'Should render SocialMediaIcons $type correctly',
    ({ type, link, component }) => {
      const { container } = render(
        <SocialMediaBarIcon link={link} component={component} type={type} />,
      );
      expect(container).toMatchSnapshot();
    },
  );
});
