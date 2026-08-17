import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import componentFactory from '../factory';
import { authInitialState } from '../../../../../../shared/reducers/auth';
import ReduxProvider from '../../../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from './mockData.json';

jest.mock('../../../../../../shared/helpers/tealium');
jest.mock('react-transition-group', () => {
  return {
    /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
    CSSTransition: ({ children }) => children,
  };
});
jest.mock('react-google-recaptcha', () => {
  return () => {
    return <div />;
  };
});

/* @ts-ignore TODO: TS7034 ->  Variable 'componentFactoryOptions' implicitly has type 'any' in some locations where its type cannot be determined. */
let componentFactoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;
/* @ts-ignore TODO: TS7034 ->  Variable 'RestrictedWebformComponent' implicitly has type 'any' in some locations where its type cannot be determined. */
let RestrictedWebformComponent = null;
/* @ts-ignore TODO: TS7006 ->  Parameter 'data' implicitly has an 'any' type. */
const mutateMockFn = (data) => {
  // eslint-disable-next-line
  return new Promise(function (resolve, reject) {
    // do a thing, possibly async, then…
    return resolve(data);
  });
};

beforeEach(() => {
  componentFactoryOptions = {
    SubmitButton: () => <div data-testid="webform-factory-submitbutton" />,
    ErrorMessage: () => <div data-testid="webform-factory-error" />,
    Icon: () => <div data-testid="webform-factory-icon" />,
    InputField: () => <div data-testid="webform-factory-inputfield" />,
    MultiField: () => <div data-testid="webform-factory-multifield" />,
    SelectField: () => <div data-testid="webform-factory-selectfield" />,
    IconTypes: {
      errorIconType: 'errorIcon',
      successIconType: 'successIcon',
    },
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ SubmitButton */
    DefaultErrorMessage:
      'Aus technischen Gründen konnte das Formular nicht versendet werden.',
    DefaultSuccessMessage: 'Das Formular wurde erfolgreich versendet.',
    styles: {
      SubTitle: 'SubTitleClassName',
      ToggleFormAppear: 'ToggleFormAppearClassName',
      ToggleFormAppearActive: 'ToggleFormAppearActiveClassName',
      ToggleFormLeave: 'ToggleFormLeaveClassName',
      ToggleFormLeaveActive: 'ToggleFormLeaveActiveClassName',
      MultiFieldWrapper: 'MultiFieldWrapperClassName',
      Description: 'DescriptionClassName',
      Required: 'RequiredClassName',
      ButtonWrapper: 'ButtonWrapperClassName',
      Loading: 'LoadingClassName',
      ToggleErrorAppear: 'ToggleErrorAppearClassName',
      ToggleErrorAppearActive: 'ToggleErrorAppearActiveClassName',
      ToggleErrorLeave: 'ToggleErrorLeaveClassName',
      ToggleErrorLeaveActive: 'ToggleErrorLeaveActiveClassName',
      ErrorIcon: 'ErrorIconClassName',
      ErrorPanelWrapper: 'ErrorPanelWrapperClassName',
      ErrorPanelHeader: 'ErrorPanelHeaderClassName',
      ErrorPanelContent: 'ErrorPanelContentClassName',
      SuccessIcon: 'SuccessIconClassName',
      SuccessWrapper: 'SuccessWrapperClassName',
      SuccessContent: 'SuccessContentClassName',
      SuccessTitle: 'SuccessTitleClassName',
      SuccessMessage: 'SuccessMessageClassName',
    },
  };

  Component = componentFactory(componentFactoryOptions);

  /* @ts-ignore TODO: TS2345 ->  Argument of type '{ SubmitButton */
  RestrictedWebformComponent = componentFactory({
    getIsUserLoggedIn: () => false,
    LoadingSpinner: () => <div>loading...</div>,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'message' implicitly has an 'any' type. */
    RestrictionForm: ({ message }) => (
      <div dangerouslySetInnerHTML={{ __html: message }}></div>
    ),
    ...componentFactoryOptions,
  });

  initialProps = {
    origin: 'articleDefault',
    mutate: mutateMockFn,
    webform: mockData.webform,
    register: () => null,
    data: {
      saveWebform: {
        status: 200,
        message:
          '{"title":"Herzlichen Dank","message":"Der Newsletter f&uuml;r die Schweizer Illustrierte wurde erfolgreich abonniert und wird an ihre <strong>E-Mail Adresse<\\/strong> versendet!"}',
        error: null,
        __typename: 'WebformResponse',
      },
    },
  };

  initialState = {
    auth: authInitialState,
  };
});

describe('[Component] Webform factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
    expect(queryByTestId('webform-factory-closed-wrapper')).toBeNull();
  });

  it('Should render the form if the form does not have a restiricted status and the user is not logged in', () => {
    const props = {
      id: '185959',
      anchorId: 'webform-anchor',
      webform:
        '{"items":[{"items":[{"type":"textfield","title":"name","multiple":true,"fieldName":"name"}]},{"items":[{"type":"webform_actions","title":"Submit button(s)","fieldName":"actions"}]}],"webform_id":"webform_hz_by_nz","restrictionValue":"public","restrictionMessage":""}',
      __typename: 'InputFormParagraph',
    };

    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'RestrictedWebformComponent' implicitly has an 'any' type. */}
        <RestrictedWebformComponent {...props} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
    expect(queryByTestId('webform-factory-closed-wrapper')).toBeNull();
  });

  it('Should render an alert with the info messge from props if the form has a restiricted status and the user is not logged in', () => {
    const props = {
      id: '185959',
      anchorId: 'webform-anchor',
      webform:
        '{"items":[{"items":[{"type":"textfield","title":"name","multiple":true,"fieldName":"name"}]},{"items":[{"type":"webform_actions","title":"Submit button(s)","fieldName":"actions"}]}],"webform_id":"webform_hz_by_nz","restrictionValue":"private","restrictionMessage":"Bitte <strong>anmelden<\\/strong> um das Formular zu sehen."}',
      __typename: 'InputFormParagraph',
    };
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.initialAuthRequest = true;

    const { container, queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'RestrictedWebformComponent' implicitly has an 'any' type. */}
        <RestrictedWebformComponent {...props} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
    expect(queryByTestId('webform-factory-closed-wrapper')).toBeNull();
  });

  it('Should render an alert with the default messge from props if the form has a restiricted status and the user is not logged in', () => {
    const props = {
      id: '185959',
      anchorId: 'webform-anchor',
      webform:
        '{"items":[{"items":[{"type":"textfield","title":"name","multiple":true,"fieldName":"name"}]},{"items":[{"type":"webform_actions","title":"Submit button(s)","fieldName":"actions"}]}],"webform_id":"webform_hz_by_nz","restrictionValue":"private","restrictionMessage":""}',
      __typename: 'InputFormParagraph',
    };

    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'RestrictedWebformComponent' implicitly has an 'any' type. */}
        <RestrictedWebformComponent {...props} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render the form if the form has a restiricted status and the user is logged in', () => {
    const RestrictedWebformComponentUserLoggedIn = componentFactory({
      LoadingSpinner: () => <div>loading...</div>,
      /* @ts-ignore TODO: TS7031 ->  Binding element 'message' implicitly has an 'any' type. */
      RestrictionForm: ({ message }) => (
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
      ),
      /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
      ...componentFactoryOptions,
    });

    const props = {
      id: '185959',
      anchorId: 'webform-anchor',
      webform:
        '{"items":[{"items":[{"type":"textfield","title":"name","multiple":true,"fieldName":"name"}]},{"items":[{"type":"webform_actions","title":"Submit button(s)","fieldName":"actions"}]}],"webform_id":"webform_hz_by_nz","restrictionValue":"private","restrictionMessage":"Bitte <strong>anmelden<\\/strong> um das Formular zu sehen."}',
      __typename: 'InputFormParagraph',
      data: null,
      values: null,
      mutate: () => {
        return null;
      },
    };

    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.initialAuthRequest = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
    initialState.auth.isAuthenticated = true;

    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2322 ->  Type '{ id */}
        <RestrictedWebformComponentUserLoggedIn {...props} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  // TODO: continue here, find solution to test the handleSubmit function

  it('Should display success message', async () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    const formElement = container.querySelector('form');

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLFormElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.submit(formElement);

    await expect(container).toMatchSnapshot();
  });

  it('Should display closed form message', async () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.webform =
      '{"webformClosedMessage":"Das Formular wurde geschlossen."}';

    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(queryByTestId('webform-factory-closed-wrapper')).not.toBeNull();
  });
});
