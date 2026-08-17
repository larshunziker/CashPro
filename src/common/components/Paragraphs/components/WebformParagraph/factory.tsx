import React, { Component, ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-google-recaptcha'. '/Users/bhs/code/work/rasch-stack/node_modules/r */
import ReCAPTCHA from 'react-google-recaptcha';
import { connect } from 'react-redux';
import crypto from 'crypto-hash';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-transition-group'. '/Users/bhs/code/work/rasch-stack/node_modules/r */
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import authStateSelector from '../../../../../shared/selectors/authStateSelector';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import { HIDE_PLACEHOLDER_FROM_OPTIONS_DESKTOP_ONLY } from '../../../../../shared/constants/selectField';
import {
  TRACKING_CLASS_PARAGRAPH,
  TRACKING_CLASS_WEBFORM_PARAGRAPH,
} from '../../../../../shared/constants/tracking';
import { RC_EMAIL } from '../../../Auth0Provider/constants';
import { WebformFactoryOptions, WebformProps } from './typings';

type WebformPropsInner = WebformProps & {
  isAuthenticated: boolean;
  initialAuthRequest: boolean;
  authState: AuthState;
};

type WebformState = {
  loading: boolean;
  submitError: string;
  submitted: boolean;
  submitSuccessTitle: string;
  submitDefaultSuccessMessage: string;
  token: string;
  uploadedFiles?: File[];
};

/**
 * address fields are grouped by title
 * so <address_field_title>.zip_code: '' or <address_field_title>.country: ''
 * needs to be converted into
 * <address_field_title>: {
 *    country: '',
 *    zip_code: '',
 * }
 */
const updateAddressFieldValues = (
  values: Record<string, any>,
  inputType: string,
) => {
  const newValues = {};
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
  newValues[inputType] = {};
  Object.entries(values).forEach(([fieldName, value]) => {
    if (fieldName.startsWith(inputType)) {
      const subField = fieldName.split('.').pop();
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
      newValues[inputType][subField] = value;
    } else {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'. */
      newValues[fieldName] = value;
    }
  });
  return newValues;
};

const ANCHOR_ID = 'webform-anchor';
const DEFAULT_MARGIN = 150; // this makes sure webforms are not overlapped by headers and navi

const WebformFactory = ({
  Icon,
  SubmitButton,
  InputField,
  BirthdayField,
  MultiField,
  SelectField,
  FileField,
  AddressFieldsWrapper,
  ErrorMessage,
  LoadingSpinner = null,
  RestrictionForm = null,
  IconTypes,
  successCallToAction,
  errorCallToAction,
  defaultErrorMessage,
  defaultSuccessTitle,
  defaultSuccessMessage,
  restrictionFormLoginMessage = 'Bitte melden Sie sich an, um dieses Formular auszufüllen.',
  appCaptchaMessage = 'Bitte bestätigen Sie zuerst das Captcha.',
  appErrorPanelHeaderMesssage = 'Bitte versuchen Sie es nochmals',
  reCaptchaKey = '',
  withErrorIcon = false,
  styles,
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Function'. */
  UserProfileData = null,
}: WebformFactoryOptions) => {
  class Webform extends Component<WebformPropsInner, WebformState> {
    formFields: FieldComponentProps[];
    webformParagraph: WebformParagraph;
    isRecaptchaEnabled: boolean;
    uniqueTimestamp: string;
    mapTokensCustom?: Function;

    constructor(props: WebformPropsInner) {
      super(props);

      this.formFields = [];
      this.webformParagraph = JSON.parse(props.webform);

      this.handleSubmit = this.handleSubmit.bind(this);
      this.mapTokens = this.mapTokens.bind(this);
      this.handleEmailBlur = this.handleEmailBlur.bind(this);

      this.uniqueTimestamp =
        Date.now() + '' + Math.floor((1 + Math.random()) * 0x10000);
      this.isRecaptchaEnabled =
        !!this.webformParagraph?.reCaptchaEnabled && !!reCaptchaKey;
    }

    state: any = {
      loading: false,
      submitError: '',
      submitted: false,
      submitSuccessTitle: '',
      submitDefaultSuccessMessage: '',
      token: '',
      uploadedFiles: null,
    };

    mapTokens = (field: Record<string, any>) => {
      if (
        (field.value === '[current-page]' ||
          field.default_value === '[current-page]') &&
        window &&
        window.location
      ) {
        return window.location.pathname;
      }

      if (
        (field.value === '[current-page:url]' ||
          field.default_value === '[current-page:url]') &&
        window &&
        window.location
      ) {
        return window.location.href;
      }

      // check if custom mapTokens are delivered to the factory
      if (this.props.mapTokensCustom) {
        return this.props.mapTokensCustom(field);
      }

      return field.value || field.default_value;
    };

    scrollToTopWebform = () => {
      const webformElement: HTMLElement | null =
        document &&
        document.getElementById(
          `${ANCHOR_ID}-${this.webformParagraph.webform_id}`,
        );

      // @ts-ignore
      if (global && global.scrollTo && webformElement) {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        // @ts-ignore
        global.scrollTo({
          left: 0,
          top:
            webformElement.getBoundingClientRect().top +
            scrollTop -
            DEFAULT_MARGIN,
          behavior: 'smooth',
        });
      }
    };

    beforeUnloadListener = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      return (event.returnValue =
        'Website verlassen? Deine Änderungen werden eventuell nicht gespeichert.');
    };

    addBeforeUnloadListener = () => {
      if (global && global.addEventListener) {
        global.addEventListener('beforeunload', this.beforeUnloadListener, {
          capture: true,
        });
      }
    };

    removeBeforeUnloadListener = () => {
      /* @ts-ignore TODO: TS2774 ->  This condition will always return true since this function is always defined. Did you mean to call it instead? */
      if (global && global.addEventListener) {
        global.removeEventListener('beforeunload', this.beforeUnloadListener, {
          capture: true,
        });
      }
    };

    handleEmailBlur = (email: string) => {
      if (email) {
        crypto.sha256(email.trim().toLocaleLowerCase()).then((hash) => {
          let rc_email = localStorage.getItem(RC_EMAIL);
          let parsedRcEmail;
          if (rc_email) {
            if (typeof rc_email === 'string') {
              rc_email = JSON.stringify({ oneId: rc_email, source: 'onelog' });
            }

            parsedRcEmail = JSON.parse(rc_email);
          }

          if (!rc_email || parsedRcEmail?.source !== 'onelog') {
            localStorage.setItem(
              RC_EMAIL,
              JSON.stringify({ oneId: hash, source: 'webform' }),
            );
          }
        });
      }
    };

    /* @ts-ignore TODO: TS7006 ->  Parameter 'values' implicitly has an 'any' type. */
    handleSubmit = (values): void => {
      const { submitted, loading } = this.state;
      const { webform, mutate } = this.props;

      if (submitted || loading || !webform) {
        return;
      }

      // replace tokens in hidden fields and add them to the result
      this.webformParagraph.items &&
        this.webformParagraph.items.map((webformFieldset: WebformFieldset) => {
          webformFieldset.items &&
            webformFieldset.items.map((inputField: WebformField) => {
              if (inputField.type === 'hidden') {
                values[inputField.fieldName] = this.mapTokens(inputField);
              } else if (inputField.type === 'ras_address_autocomplete') {
                values = updateAddressFieldValues(values, inputField.fieldName);
              }
            });
        });

      // send mutation
      this.addBeforeUnloadListener();

      this.setState({ loading: true });
      mutate({
        variables: {
          input: JSON.stringify(values),
          webformId: this.webformParagraph.webform_id,
        },
      })
        .then(async ({ data }: WebformPropsInner): Promise<void> => {
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'void'. */
          if (!data) return null;
          const { saveWebform } = data;

          if (saveWebform && saveWebform.error && saveWebform.error !== null) {
            this.setState({
              submitError: defaultErrorMessage as string,
              submitted: false,
              loading: false,
            });

            // eslint-disable-next-line no-console
            console.error(
              'there was an error sending the query',
              saveWebform.error,
              saveWebform.status,
            );
            return;
          }

          // perform on success callback when mutation went through so we can handle the success in each field
          await Promise.all(
            this.formFields.map(async (formField) => {
              if (typeof formField.successCallback === 'function') {
                return await formField.successCallback();
              }
            }),
          );

          this.setState({
            submitError: '',
            loading: false,
          });

          if (saveWebform && saveWebform.message) {
            const successMessage: any = JSON.parse(saveWebform.message || '');
            if (
              (successMessage && successMessage.title !== '') ||
              (successMessage && successMessage.message !== '')
            ) {
              this.setState({
                submitSuccessTitle: successMessage.title || '',
                submitDefaultSuccessMessage: successMessage.message || '',
              });
            }
          }

          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'form_submission',
              webform_id: this.webformParagraph.webform_id,
            },
          });

          this.setState({
            submitted: true,
          });
          return;
        })
        .catch((error: any): void => {
          this.setState({
            loading: false,
            submitError: defaultErrorMessage as string,
            submitted: false,
          });

          console.error('there was an error sending the query', error); // eslint-disable-line no-console
          return;
        })
        .finally(() => {
          this.scrollToTopWebform();
          this.removeBeforeUnloadListener();
        });
    };

    // validates the form (all registered fields within this form)
    validateForm(event: Event): void {
      event.preventDefault();

      const isCaptchaSolved = !!this.state.token;

      // run all field validation callback functions
      const errors: Array<boolean> = this.formFields
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        .map((formField: FieldComponentProps): boolean => formField.validate())
        .filter((result: boolean): boolean => !result);

      // is recaptcha activated and solved
      if (this.isRecaptchaEnabled && !isCaptchaSolved) {
        errors.push(true);

        this.setState({
          submitError: appCaptchaMessage as string,
        });
      }

      if (errors.length) {
        this.scrollToTopWebform();
        return;
      }

      const values = {};
      // get the values of all registered fields within this form
      this.formFields.forEach((formField: FieldComponentProps): void => {
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{}'. */
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        return (values[formField.getId()] = formField.getValue());
      });

      this.handleSubmit(values);
    }

    registerField(formField: FieldComponentProps): void {
      const formFieldExists = this.formFields.some(
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        (f) => f.getId() === formField.getId(),
      );
      if (formFieldExists) {
        /* swap out form field event handlers, used when components are replaced by another component
         * eg AddressField, Selects can be replaced with Inputs for the same field id
         */
        this.formFields = this.formFields.filter(
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
          (f) => f.getId() !== formField.getId(),
        );
      }
      this.formFields.push(formField);
    }

    /* webform fieldset are non-functional atm because the return is not assembled according to the structure we receive from CMS */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
    renderFieldset = (fieldset: WebformFieldset, index): ReactElement => (
      <div key={`webform-fieldset-${fieldset.title || index}`}>
        {fieldset.title && (
          <h2 className={styles.SubTitle}>{fieldset.title}</h2>
        )}
        {fieldset.items &&
          Array.isArray(fieldset.items) &&
          fieldset.items.map(this.renderFieldWithCssTransition)}
      </div>
    );

    // wrap inputfield with a css transition
    renderFieldWithCssTransition = (field: WebformField): ReactElement | null =>
      /* @ts-ignore TODO: TS2322 ->  Type 'false | Element' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>> | null'. */
      field.type !== 'hidden' && (
        <TestFragment
          data-testid="webform-factory-csstransition-wrapper"
          key={`webform-transition-${field.type}-${field.fieldName}-${field.title}`}
        >
          <CSSTransition
            classNames={{
              appear: styles.ToggleFormAppear,
              appearActive: styles.ToggleFormAppearActive,
              enter: styles.ToggleFormAppear,
              enterActive: styles.ToggleFormAppearActive,
              exit: styles.ToggleFormLeave,
              exitActive: styles.ToggleFormLeaveActive,
            }}
            appear
            timeout={600}
          >
            {this.renderField(field)}
          </CSSTransition>
        </TestFragment>
      );

    /* @ts-ignore TODO: TS7006 ->  Parameter 'token' implicitly has an 'any' type. */
    onRecaptchaVerify = (token) => {
      this.setState({ token: token, submitError: '' });
    };

    // render inputfields according to their type
    renderField = (field: WebformField): ReactElement => {
      const elementKey = `webform-field-${field.type}-${field.fieldName}-${field.title}`;

      let elementAutocomplete = null;

      if (typeof field.autocomplete === 'undefined') {
        elementAutocomplete = 'on';
      } else if (field.autocomplete.length) {
        elementAutocomplete = field.autocomplete;
      }

      switch (field.type) {
        case 'select':
          return (
            <TestFragment
              data-testid="webform-factory-selectfield-wrapper"
              key={elementKey}
            >
              <SelectField
                errorMessage={field.required_error || ''}
                hidePlaceholderFromOptions={
                  HIDE_PLACEHOLDER_FROM_OPTIONS_DESKTOP_ONLY
                }
                id={field.fieldName}
                label={field.empty_option || field.placeholder || field.title}
                options={field.options || []}
                register={this.registerField.bind(this)}
                required={field.required || false}
                withErrorIcon={withErrorIcon}
                helperText={field.help}
                disabled={this.state.loading || Boolean(field.disabled)}
                autocomplete={elementAutocomplete}
              />
            </TestFragment>
          );
        case 'ras_file_upload':
          return (
            <TestFragment
              data-testid="webform-factory-file-wrapper"
              key={elementKey}
            >
              {/* @ts-ignore TODO: TS2604 ->  JSX element type 'FileField' does not have any construct or call signatures. */}
              <FileField
                webformId={this.webformParagraph.webform_id}
                fieldName={field.fieldName}
                uniqueTimestamp={this.uniqueTimestamp}
                register={this.registerField.bind(this)}
                id={field.fieldName}
                title={field.title}
                description={field.description}
                required={field.required || false}
                fileLimit={field.multiple === true ? 0 : field.multiple}
                maxFileSize={field.max_filesize || null}
                allowedExtensions={field.file_extensions}
                disabled={Boolean(field.disabled)}
              />
            </TestFragment>
          );
        case 'checkbox':
          return (
            <TestFragment
              data-testid="webform-factory-checkbox-wrapper"
              key={elementKey}
            >
              <InputField
                errorMessage={field.required_error || ''}
                id={field.fieldName}
                label={field.description || field.title}
                register={this.registerField.bind(this)}
                required={field.required || false}
                type="checkbox"
                helperText={field.help}
                disabled={this.state.loading || Boolean(field.disabled)}
              />
            </TestFragment>
          );
        case 'checkboxes':
        case 'radios':
          return (
            <div
              data-testid="webform-factory-checkboxes-radio-wrapper"
              key={elementKey}
            >
              <MultiField
                errorMessage={field.required_error || ''}
                id={field.fieldName}
                options={field.options || []}
                label={field.description || field.title}
                register={this.registerField.bind(this)}
                required={field.required || false}
                type={field.type}
                withErrorIcon={withErrorIcon}
                helperText={field.help}
                disabled={Boolean(field.disabled)}
              />
            </div>
          );
        case 'textfield':
        case 'textarea':
        case 'email':
        case 'number':
        case 'date':
        case 'tel':
          return (
            <TestFragment
              data-testid="webform-factory-inputfield-wrapper"
              key={elementKey}
            >
              <InputField
                animatedLabel
                errorMessage={field.required_error || ''}
                disabled={this.state.loading || Boolean(field.disabled)}
                id={field.fieldName}
                label={field.placeholder || field.title}
                maxlength={field.maxlength}
                pattern={field.pattern}
                required={field.required ? field.required : false}
                register={this.registerField.bind(this)}
                type={field.type}
                dateMin={field.date_date_min}
                dateMax={field.date_date_max}
                withErrorIcon={withErrorIcon}
                helperText={field.help}
                rows={field.rows}
                readonly={Boolean(field.readonly)}
                autocomplete={elementAutocomplete}
                handleBlur={field.type === 'email' && this.handleEmailBlur}
              />
            </TestFragment>
          );
        case 'ras_birthday':
          /* @ts-ignore TODO: TS2322 ->  Type 'Element | undefined' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
          return (
            BirthdayField && (
              <TestFragment
                data-testid="webform-factory-datefield-wrapper"
                key={elementKey}
              >
                <BirthdayField
                  errorMessage={field.required_error || ''}
                  id={field.fieldName}
                  label={field.placeholder || field.title}
                  pattern={field.pattern}
                  required={field.required ? field.required : false}
                  register={this.registerField.bind(this)}
                  withErrorIcon={withErrorIcon}
                  helperText={field.help}
                  disabled={this.state.loading || Boolean(field.disabled)}
                  autocomplete={elementAutocomplete}
                />
              </TestFragment>
            )
          );
        case 'webform_markup':
        case 'processed_text':
          return (
            <div
              className={styles.RichTextWrapper}
              dangerouslySetInnerHTML={{
                // @ts-ignore
                __html: field.markup || field.text,
              }}
            />
          );
        case 'ras_address_autocomplete':
          return (
            /* @ts-ignore TODO: TS2604 ->  JSX element type 'AddressFieldsWrapper' does not have any construct or call signatures. */
            <AddressFieldsWrapper
              id={field.fieldName}
              required={field.required}
              register={this.registerField.bind(this)}
              withErrorIcon={withErrorIcon}
              disabled={this.state.loading || Boolean(field.disabled)}
            />
          );
        case 'webform_actions':
          if (this.state.submitted) {
            return <></>;
          }
          return (
            <>
              {this.isRecaptchaEnabled && (
                <div className={styles.RecaptchaWrapper}>
                  <ReCAPTCHA
                    sitekey={reCaptchaKey}
                    onChange={this.onRecaptchaVerify}
                  />
                </div>
              )}
              <div
                data-testid="webform-factory-submitbutton-wrapper"
                key={elementKey}
                className={styles.ButtonWrapper}
              >
                <SubmitButton loading={this.state.loading}>
                  {field.submit__label || field.title || 'Senden'}
                </SubmitButton>
              </div>
            </>
          );
        default:
          return (
            <ErrorMessage
              key={`webform-error`}
              msg={`Webform: No Type for ${field.type}`}
            />
          );
      }
    };

    render() {
      const {
        loading,
        submitted,
        submitError,
        submitSuccessTitle,
        submitDefaultSuccessMessage,
      } = this.state;
      const {
        anchorId,
        isAuthenticated = false,
        initialAuthRequest,
        authState,
      } = this.props;

      // if the webform is closed render a webformclosed message
      if (this.webformParagraph?.webformClosedMessage) {
        return (
          <div
            data-testid="webform-factory-closed-wrapper"
            className={styles.ClosedContainer}
          >
            {Icon && IconTypes?.errorIconType && (
              <Icon
                type={IconTypes.errorIconType}
                addClass={styles.ClosedIcon}
              />
            )}
            <p
              className={styles.ClosedMessage}
              dangerouslySetInnerHTML={{
                __html: this.webformParagraph?.webformClosedMessage,
              }}
            />
          </div>
        );
      }

      // don't render restricted webforms if there is no RestrictionForm available (publication like SI without a login)
      if (
        this.webformParagraph?.restrictionValue === 'private' &&
        !RestrictionForm
      ) {
        return null;
      }

      // render a loading spinner on SSR (hydration phase) until the Auth0 checks are ready on the client
      if (
        !initialAuthRequest &&
        this.webformParagraph?.restrictionValue === 'private' &&
        RestrictionForm
      ) {
        /* @ts-ignore TODO: TS2604 ->  JSX element type 'LoadingSpinner' does not have any construct or call signatures. */
        return <LoadingSpinner />;
      }

      // private form - needs login
      const notLoggedInPrivateForm =
        this.webformParagraph?.restrictionValue === 'private' &&
        RestrictionForm &&
        !isAuthenticated &&
        !submitted &&
        !loading;

      // private form - needs mandatory address-fields
      const insufficientData =
        this.webformParagraph?.restrictionValue === 'private' &&
        RestrictionForm &&
        isAuthenticated &&
        ['webform_gp_mandatory', 'webform_gp_optional'].includes(
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
          this.webformParagraph?.oneLogLoginCase,
        ) &&
        authState &&
        (!authState.address ||
          !authState.address.addressLine1 ||
          !authState.address.zipCode);

      const showRestrictionForm = notLoggedInPrivateForm || insufficientData;

      // show login form if restrictionValue === "private", the user isn't logged in, for form wasn't sumbitted and isn't in loading state
      if (showRestrictionForm) {
        return (
          <div className={styles.RestrictionFormWrapper || ''}>
            <RestrictionForm
              message={
                this.webformParagraph?.restrictionMessage ||
                restrictionFormLoginMessage
              }
              anchorId={anchorId}
              isCommentForm={false}
              webFormId={this.webformParagraph.webform_id}
              oneLogLoginCase={this.webformParagraph.oneLogLoginCase}
            />
          </div>
        );
      }

      return (
        <form
          className={classNames(
            TRACKING_CLASS_PARAGRAPH,
            TRACKING_CLASS_WEBFORM_PARAGRAPH,
            'webforms-form',
            {
              [styles.Loading]: loading,
            },
          )}
          onSubmit={this.validateForm.bind(this)}
          noValidate
          id={`${ANCHOR_ID}-${this.webformParagraph?.webform_id}`}
        >
          {submitError && (
            <CSSTransition
              classNames={{
                appear: styles.ToggleErrorAppear,
                appearActive: styles.ToggleErrorAppearActive,
                enter: styles.ToggleErrorAppear,
                enterActive: styles.ToggleErrorAppearActive,
                exit: styles.ToggleErrorLeave,
                exitActive: styles.ToggleErrorLeaveActive,
              }}
              appear
              timeout={{ exit: 600, enter: 1200 }}
            >
              <>
                <div className={styles.ErrorPanelWrapper}>
                  <div className={styles.ErrorPanelHeader}>
                    {appErrorPanelHeaderMesssage}
                  </div>
                  <div className={styles.ErrorPanelContent}>
                    {Icon && IconTypes?.errorIconType && (
                      <Icon
                        type={IconTypes.errorIconType}
                        addClass={styles.ErrorIcon}
                      />
                    )}
                    {submitError}
                  </div>
                </div>
                {errorCallToAction}
              </>
            </CSSTransition>
          )}
          {!submitted &&
            this.webformParagraph &&
            this.webformParagraph.items &&
            Array.isArray(this.webformParagraph.items) &&
            this.webformParagraph.items.map(this.renderFieldset)}
          {!submitError &&
            submitted &&
            !submitSuccessTitle &&
            !submitDefaultSuccessMessage && (
              <div className={styles.SuccessWrapper}>
                {Icon && IconTypes?.successIconType && (
                  <Icon
                    type={IconTypes.successIconType}
                    addClass={styles.SuccessIcon}
                  />
                )}
                <div className={styles.SuccessContent}>
                  <span className={styles.SuccessTitle}>
                    {defaultSuccessTitle || 'Herzlichen Dank'}
                  </span>
                  <span className={styles.SuccessMessage}>
                    {defaultSuccessMessage || 'Besten Dank für Ihre Teilnahme.'}
                  </span>
                </div>
                {successCallToAction}
              </div>
            )}
          {!submitError &&
            submitted &&
            (submitSuccessTitle || submitDefaultSuccessMessage) && (
              <div className={styles.SuccessWrapper}>
                {Icon && IconTypes?.successIconType && (
                  <Icon
                    type={IconTypes.successIconType}
                    addClass={styles.SuccessIcon}
                  />
                )}

                <div className={styles.SuccessContent}>
                  {submitSuccessTitle && (
                    <span className={styles.SuccessTitle}>
                      {submitSuccessTitle}
                    </span>
                  )}
                  {submitDefaultSuccessMessage && (
                    <span
                      className={styles.SuccessMessage}
                      dangerouslySetInnerHTML={{
                        __html: submitDefaultSuccessMessage,
                      }}
                    />
                  )}
                </div>
                {successCallToAction}
              </div>
            )}
          {!submitted &&
            ['webform_gp_mandatory', 'webform_gp_optional'].includes(
              /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
              this.webformParagraph?.oneLogLoginCase,
            ) &&
            UserProfileData && <UserProfileData />}
        </form>
      );
    }

    shouldComponentUpdate(
      nextProps: WebformPropsInner,
      nextState: WebformState,
    ) {
      return (
        this.state.loading !== nextState.loading ||
        this.state.submitError !== nextState.submitError ||
        this.state.submitted !== nextState.submitted ||
        this.props.isAuthenticated !== nextProps.isAuthenticated ||
        this.props.initialAuthRequest !== nextProps.initialAuthRequest ||
        this.state.token !== nextState.token
      );
    }
  }

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    isAuthenticated: authStateSelector(state).isAuthenticated,
    initialAuthRequest: authStateSelector(state).initialAuthRequest,
    authState: authStateSelector(state),
  });

  return connect(mapStateToProps)(Webform);
};

export default WebformFactory;
