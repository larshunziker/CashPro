import { render } from '@testing-library/react';
import React from 'react';
import componentFactory from '../factory';
import mockData from './mockData.json';
import {
  CommentBodyFactoryOptions,
  CommentBodyComponent,
  CommentBodyProps,
} from '../typings';

const componentFactoryOptions: CommentBodyFactoryOptions = {
  publicationAccountName: 'Beobachter',
  logo: 'test.svg',
  logoAlt: 'test',
  getFormattedElapsedDate: () => null,
  elapsedDateFormat: '',
  styles: {
    Body: 'BodyDefaultClass',
    Date: 'DateDefaultClass',
    Logo: 'LogoDefaultClass',
    Name: 'NameDefaultClass',
    Text: 'TestDefaultClass',
  },
};

let Component: CommentBodyComponent;
let initialProps: CommentBodyProps;

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
  initialProps = JSON.parse(JSON.stringify(mockData));
});

describe('[Component] CommentBody', () => {
  it('Should return component from factory', () => {
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);

    const componentBody = queryByTestId('commentbody-wrapper');

    expect(componentBody).not.toBeNull();
    /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
    expect(componentBody.firstChild).toMatchSnapshot();
  });

  it('Should render logo when username equals publicationAccountname', () => {
    initialProps.name = componentFactoryOptions.publicationAccountName;
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('commentbody-logo-wrapper')).not.toBeNull();
    expect(queryByTestId('commentbody-name-wrapper')).toBeNull();
  });

  it('Should render name when username does not equal publicationAccountname', () => {
    const { queryByTestId } = render(<Component {...initialProps} />);
    expect(queryByTestId('commentbody-logo-wrapper')).toBeNull();
    expect(queryByTestId('commentbody-name-wrapper')).not.toBeNull();
  });
});
