import React, {
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';
import camelCase from 'lodash.camelcase';
import smoothscroll from 'smoothscroll-polyfill';
import { useNavigate } from 'react-router-dom';
import isPhoneNumberValid from '../../../../../../../../../shared/helpers/isPhoneNumberValid';
import scrollToError from '../../../../../../../../../shared/helpers/scrollToError';
import { getServiceUrl } from '../../../../../../../../../shared/helpers/serviceUrl';
import storageAvailable from '../../../../../../../../../shared/helpers/storage';
import { tealiumTrackEvent } from '../../../../../../../../../shared/helpers/tealium';
import { noop } from '../../../../../../../../../shared/helpers/utils';
import authStateSelector from '../../../../../../../../../shared/selectors/authStateSelector';
import { setBookingConfirmation } from '../../../../../../../../../shared/actions/booking';
import { Auth0 } from '../../../../../../../../../common/components/Auth0Provider';
import {
  ERROR_FIELD_CLASSNAME,
  PHONE_FIELD_ID,
  SUBMIT_BOOKING_ERROR_ID,
  defaultErrorMessage,
  errorMessages,
} from './constants';
import { CONFIRMATION } from '../../../BookingFormParagraph/factory/BookingFormParagraph/constants';
import {
  BookingData,
  DocumentCheckFormParagraphFactoryOptions,
  DocumentCheckFormProps,
} from './typings';

const getLocalStorageBookingDataKey = (serviceName: string) =>
  `${serviceName.toLowerCase()}:bookingData`;
const isLocalStorageAvailable = storageAvailable('localStorage');

const scrollToTop = () => {
  global.scrollTo({
    left: 0,
    top: 0,
    behavior: 'smooth',
  });
};

const formFields: FieldComponentProps[] = [];
let attachmentUrl: string;

const DocumentCheckFormParagraphFactory = ({
  displayErrorToast,
  publication,
  styles,
  InputField,
  Button,
  FileField,
  loginText = 'Bitte melden Sie sich an, um Dokumente zu senden',
  LoginForm,
}: DocumentCheckFormParagraphFactoryOptions) => {
  const DocumentCheckFormParagraph = (
    props: DocumentCheckFormProps,
  ): ReactElement => {
    const uniqueTimestamp =
      Date.now() + '' + Math.floor((1 + Math.random()) * 0x10000);
    const isDescriptionMandatory = props.isDescriptionMandatory || false;
    const {
      entry: { bookingForm },
      setBookingConfirmation,
      texts,
    } = props;
    const savedBookingData = useRef<{
      clientData?: any;
      attachmentUrl?: string;
      description?: string;
      hasAttachment?: boolean;
    }>({});
    const localStorageBookingDataKey =
      getLocalStorageBookingDataKey(bookingForm);

    if (isLocalStorageAvailable) {
      try {
        savedBookingData.current = JSON.parse(
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | null' is not assignable to parameter of type 'string'. */
          global.localStorage.getItem(localStorageBookingDataKey),
        );
      } catch (e) {}
    }

    const registerField = (formField: FieldComponentProps): void => {
      formFields.push(formField);
    };

    const [bookingData, setBookingData] = useState<BookingData>(() => ({
      phone: savedBookingData.current?.clientData?.phone || '',
      attachmentUrl: savedBookingData.current?.attachmentUrl || '',
    }));
    const [isLoading, setIsLoading] = useState(false);
    const [isTouched, setIsTouched] = useState(false);
    const [isFileUploadDisabled, setFileUploadDisabled] = useState<boolean>(
      savedBookingData.current?.hasAttachment === false || false,
    );
    const [description, setDescription] = useState<string>(
      savedBookingData.current?.description || '',
    );

    const { isAuthenticated, givenName, familyName, email, gpNumber } =
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
      useSelector((state) => authStateSelector(state));
    const [formErrors, setFormErrors] = useState({
      phone: false,
      attachmentUrl: false,
      description: false,
    });

    const isPhoneValid = useMemo<boolean>(
      () => isPhoneNumberValid(bookingData.phone),
      [bookingData.phone],
    );

    const isDescriptionValid = useMemo<boolean>(
      () => !isDescriptionMandatory || description.trim().length > 0,
      [description, isDescriptionMandatory],
    );

    useEffect(() => {
      setFormErrors({
        phone: !bookingData.phone || !isPhoneValid,
        attachmentUrl: !attachmentUrl && !isFileUploadDisabled,
        description: !isDescriptionValid,
      });
    }, [
      bookingData.phone,
      isDescriptionValid,
      isFileUploadDisabled,
      isPhoneValid,
    ]);

    const navigate = useNavigate();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const isFormInvalid = Object.values(formErrors).some((field) => field); // TODO check validation

    const bookWithFile = useCallback(async () => {
      attachmentUrl =
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        formFields[0]?.getValue().length > 0 ? formFields[0]?.getValue() : null;

      setIsTouched(true);
      if (
        (!attachmentUrl && !isFileUploadDisabled) ||
        !isPhoneValid ||
        !isDescriptionValid
      ) {
        setFormErrors({
          ...formErrors,
          attachmentUrl: !attachmentUrl && !isFileUploadDisabled,
        });

        setTimeout(() => {
          scrollToError('', ERROR_FIELD_CLASSNAME);
        }, 100);
        return;
      }

      try {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        formFields[0].successCallback();
      } catch (e) {
        return;
      }
      const pathName = attachmentUrl
        ? new URL(attachmentUrl).pathname.slice(1)
        : null;

      setIsLoading(true);

      const documentCheckDataSerialized = JSON.stringify({
        service: bookingForm,
        publication: publication,
        clientData: {
          phone: bookingData.phone.replace(/\s/g, ''),
          firstName: `${givenName}`,
          lastName: `${familyName}`,
          email,
          gpNumber,
          userId: Auth0.getUserId(),
        },
        attachmentUrl: pathName,
        hasAttachment: !isFileUploadDisabled,
        description: description,
      });

      if (!isAuthenticated) {
        if (isLocalStorageAvailable) {
          global.localStorage.setItem(
            localStorageBookingDataKey,
            documentCheckDataSerialized,
          );
        }

        Auth0.login();
        return;
      } else {
        savedBookingData.current = {};
        if (isLocalStorageAvailable) {
          global.localStorage.removeItem(localStorageBookingDataKey);
        }
      }

      const hasVoucherCall = await fetch(
        `${getServiceUrl(
          __COMMERCE_SERVICE_ENDPOINT__,
        )}/payments/${publication}/has-voucher/${bookingForm}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        },
      );

      const hasVoucherCallResponse = await hasVoucherCall.json();

      if (!hasVoucherCallResponse?.granted) {
        window.tp.push(['setCustomVariable', 'product', bookingForm]);
        window.tp.experience.execute();
        return;
      }

      const documentCheckCall = await fetch(
        `${getServiceUrl(__COMMERCE_SERVICE_ENDPOINT__)}/advisory-checks/send`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: documentCheckDataSerialized,
        },
      );

      setIsLoading(false);

      switch (documentCheckCall.status) {
        case 201:
          setIsTouched(false);
          scrollToTop();
          setBookingConfirmation({
            phoneNumber: bookingData.phone,
            description: description,
            /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
            attachment:
              !isFileUploadDisabled && pathName
                ? /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
                  decodeURI(pathName.split('/').pop())
                : null,
          });
          tealiumTrackEvent({
            type: 'link',
            payload: {
              event_name: 'document_check_confirmation',
              event_category: 'document_check',
              event_action: 'confirmation',
              event_label: 'advisory-check',
            },
          });
          navigate(global.location.pathname + `?${CONFIRMATION}`, {
            replace: true,
          });

          break;
        default: {
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'ToastLink'. */
          displayErrorToast(defaultErrorMessage, null, SUBMIT_BOOKING_ERROR_ID);
          break;
        }
      }
    }, [
      bookingData.phone,
      email,
      familyName,
      givenName,
      gpNumber,
      isAuthenticated,
      isPhoneValid,
      isDescriptionValid,
      isFileUploadDisabled,
      setBookingConfirmation,
      bookingForm,
      localStorageBookingDataKey,
      description,
      formErrors,
      navigate,
    ]);

    useEffect(() => {
      tealiumTrackEvent({
        payload: {
          cms_page_type: `${camelCase(bookingForm)}BookingForm`,
        },
      });
      smoothscroll.polyfill();
    }, [bookingForm]);

    useEffect(() => {
      if (isAuthenticated && savedBookingData.current) {
        bookWithFile();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    useEffect(() => {
      const checkoutCompleteHandler = () => {
        bookWithFile();
      };

      const experienceExecuteHandler = () => {
        window.tp.push(['setCustomVariable', 'product', '']);
      };

      const checkoutCloseHandler = () => {
        setIsLoading(false);
      };
      const checkoutErrorHandler = () => {
        setIsLoading(false);
      };

      document.addEventListener(
        'RASCH-checkoutComplete',
        checkoutCompleteHandler,
      );
      document.addEventListener(
        'RASCH-experienceExecute',
        experienceExecuteHandler,
      );
      document.addEventListener('RASCH-checkoutClose', checkoutCloseHandler);
      document.addEventListener('RASCH-checkoutError', checkoutErrorHandler);

      return () => {
        document.removeEventListener(
          'RASCH-checkoutComplete',
          checkoutCompleteHandler,
        );
        document.removeEventListener(
          'RASCH-experienceExecute',
          experienceExecuteHandler,
        );
        document.removeEventListener(
          'RASCH-checkoutClose',
          checkoutCloseHandler,
        );
        document.removeEventListener(
          'RASCH-checkoutError',
          checkoutErrorHandler,
        );
      };
    }, [bookWithFile]);

    return (
      <div data-testid="articlepage-wrapper">
        {!isAuthenticated && (
          <div>
            {/* @ts-ignore TODO: TS2604 ->  JSX element type 'LoginForm' does not have any construct or call signatures. */}
            <LoginForm message={loginText} isDefaultLoginCase />
          </div>
        )}
        {isAuthenticated && (
          <div data-testid="articlepage-articleheader-wrapper">
            <>
              <div className={styles.Step}>
                <div className={styles.SubHeadline}>
                  <h2>Telefonnummer</h2>
                </div>
                <p className={styles.Info}>
                  Bitte teilen Sie uns Ihre Telefonnummer für den Rückruf mit.
                  Sie erhalten innerhalb von zwei Werktagen einen
                  Terminvorschlag.
                </p>

                <InputField
                  getId={() => PHONE_FIELD_ID}
                  getValue={() => bookingData.phone}
                  fieldName={PHONE_FIELD_ID}
                  title={PHONE_FIELD_ID}
                  register={null}
                  required={true}
                  value={bookingData.phone}
                  initialValue={bookingData.phone}
                  type="tel"
                  validate={noop}
                  hasError={isTouched && !isPhoneValid}
                  id={PHONE_FIELD_ID}
                  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
                  handleChange={(value) => {
                    setBookingData({ ...bookingData, phone: value });
                  }}
                  animatedLabel
                  label="Telefonnummer"
                  withErrorIcon
                  errorMessage={
                    bookingData.phone
                      ? errorMessages.phoneWrong
                      : errorMessages.phoneEmpty
                  }
                  addClass={classNames(styles.InputWrapper, {
                    [ERROR_FIELD_CLASSNAME]: formErrors.phone,
                  })}
                />
              </div>

              <div>
                <div className={styles.SubHeadline}>
                  <h2>{texts.descriptionSubtitle}</h2>
                </div>
                <p className={styles.Info}>{texts.description}</p>
                <InputField
                  animatedLabel
                  disabled={false}
                  id={'description'}
                  label={'Beschreibung'}
                  maxlength={1024}
                  pattern={null}
                  register={null}
                  type={'textarea'}
                  dateMin={null}
                  dateMax={null}
                  withErrorIcon={null}
                  helperText={null}
                  rows={4}
                  readonly={false}
                  autocomplete={null}
                  /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
                  handleChange={(value) => {
                    setDescription(value);
                  }}
                  required={isDescriptionMandatory}
                  hasError={isTouched && !isDescriptionValid}
                  errorMessage={errorMessages.descriptionEmpty}
                  initialValue={description}
                />
              </div>

              <div>
                <div className={styles.SubHeadline}>
                  <h2>Dokument</h2>
                </div>
              </div>

              <div
                className={classNames({
                  [styles.Disabled]: !isFileUploadDisabled,
                })}
              >
                <p className={styles.Info}>
                  Ringier AG | Ringier Medien Schweiz
                  <br />
                  Beobachter-Beratungszentrum
                  <br />
                  Vertraulich
                  <br />
                  Flurstrasse 55
                  <br />
                  8048 Zürich
                </p>
              </div>

              <div
                className={classNames({
                  [styles.Disabled]: isFileUploadDisabled,
                  [ERROR_FIELD_CLASSNAME]:
                    !isFileUploadDisabled &&
                    isTouched &&
                    formErrors.attachmentUrl,
                })}
              >
                {/* @ts-ignore TODO: TS2604 ->  JSX element type 'FileField' does not have any construct or call signatures. */}
                <FileField
                  webformId={'booking'}
                  fieldName={'booking'}
                  uniqueTimestamp={uniqueTimestamp}
                  register={registerField.bind(this)}
                  id={'bookingId'}
                  title={null}
                  description={
                    'Sie haben die Möglichkeit, das Dokument hochzuladen oder es uns per Post zu übermitteln. Die digitale Übermittlung findet verschlüsselt statt.'
                  }
                  required
                  onFilesUpload={() => {
                    setFormErrors({ ...formErrors, attachmentUrl: false });
                  }}
                  onFileDelete={() => {
                    setFormErrors({ ...formErrors, attachmentUrl: true });
                  }}
                  hasError={
                    !isFileUploadDisabled &&
                    isTouched &&
                    formErrors.attachmentUrl
                  }
                  errorMessage={errorMessages.documentMissing}
                  fileLimit={false}
                  maxFileSize={null}
                  allowedExtensions={'png, pdf, doc, docx, jpg, jpeg'}
                  disabled={isFileUploadDisabled}
                />
              </div>

              <InputField
                errorMessage={'error'}
                id={'id'}
                label={
                  'Ich sende das Dokument per Post an das Beobachter-Beratungszentrum'
                }
                register={null}
                required={false}
                /* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
                handleChange={(value) => {
                  setFileUploadDisabled(value);
                }}
                initialValue={isFileUploadDisabled}
                type="checkbox"
                helperText={null}
                disabled={false}
                addClass={classNames({
                  [ERROR_FIELD_CLASSNAME]: formErrors.attachmentUrl,
                })}
              />

              <div className={styles.ButtonWrapper}>
                <Button
                  loading={isLoading}
                  onClick={bookWithFile}
                  mobileFullWidth
                >
                  Weiter zur Bezahlung
                </Button>
              </div>
            </>
          </div>
        )}
      </div>
    );
  };

  const mapDispatchToProps = {
    setBookingConfirmation,
  };

  return compose<any>(connect(null, mapDispatchToProps))(
    DocumentCheckFormParagraph,
  );
};

export default DocumentCheckFormParagraphFactory;
