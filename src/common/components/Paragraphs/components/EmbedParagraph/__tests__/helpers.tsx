import { render } from '@testing-library/react';
import { getEmbed } from '../factory';

jest.mock('../components/EmbedDefault');
jest.mock('../components/EmbedDefaultNew');

const styles = {
  Wrapper: '.SampleWrapperClass',
  Title: '.SampleTitleClass',
  TitleWrapper: '.SampleTitleWrapperClass',
  VideoPlayer: '.SampleVideoPlayerClass',
};

describe('[Common] Paragraphs - EmbedParagraph helpers', () => {
  test.each`
    embedCode                                                         | result
    ${'<iframe src=\\"https://www.facebook.com/plugins/post.php />'}  | ${'mocked-embed-default'}
    ${'<iframe src=\\"https://www.instagram.com/plugins/post.php />'} | ${'mocked-embed-default'}
    ${'<iframe src=\\"https://www.youtube.com/plugins/post.php />'}   | ${'mocked-embed-default'}
    ${'<iframe src=\\"https://www.twitter.com />'}                    | ${'mocked-embed-default'}
    ${'<iframe src=\\"https://www.x.com />'}                          | ${'mocked-embed-default'}
    ${'<iframe src=\\"https://www.any-other-url.com />'}              | ${'mocked-embed-default'}
  `('Should render $result component', ({ embedCode, result }) => {
    const embed = { embedCode };
    //@ts-ignore
    const { queryByTestId } = render(getEmbed(embed, styles));
    expect(queryByTestId(result)).not.toBeNull();
  });
});
