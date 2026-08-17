import React, { useEffect, useRef, useState } from 'react';
import InputField from '../../../../../InputField';
import { fetchLocations, fetchTerm } from './helpers';
import Dropdown from '../Dropdown';
import styles from './styles.legacy.css';
import { AutocompleteInputProps } from './typings';

const AutocompleteInput = ({
  values,
  setValues,
  placeholder,
  type,
}: AutocompleteInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isValid, setIsValid] = useState(true);
  const valuesRef = useRef(values);
  const [dropdownValues, setDropdownValues] = useState<string[] | null>(null);

  useEffect(() => {
    valuesRef.current = values;
    const input = inputRef.current;
    const inputCallback = () => {
      setTimeout(async () => {
        const currentValues = valuesRef.current;
        if (currentValues[type]) {
          const fetcher = type === 'term' ? fetchTerm : fetchLocations;
          const data = await fetcher(currentValues[type]);
          setDropdownValues(data);
        } else {
          setDropdownValues(null);
        }
      }, 10);
    };
    const blurCallback = () => {
      setTimeout(() => {
        setDropdownValues(null);
      }, 200);
    };
    input?.addEventListener('input', inputCallback);
    input?.addEventListener('blur', blurCallback);
    return () => {
      input?.removeEventListener('input', inputCallback);
      input?.removeEventListener('blur', blurCallback);
    };
  }, [values, type]);

  return (
    <div className={styles.Wrapper}>
      <InputField
        id={type}
        placeholder={placeholder}
        required
        validate={() => setIsValid(true)}
        values={values}
        defaultValue={values[type]}
        setValues={(values: any) => setValues(values)}
        hasError={!isValid}
        errorMessage="Feld kann nicht leer sein"
        innerRef={inputRef}
        addClass={styles.Input}
      />
      {dropdownValues && (
        <div ref={dropdownRef} className={styles.Dropdown}>
          {dropdownValues?.map((value) => (
            <Dropdown
              key={value}
              value={value}
              onClick={() => {
                setValues({
                  ...values,
                  ...(type === 'location'
                    ? { location: value }
                    : { term: value }),
                });
                inputRef.current?.focus();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;
