import React, { useCallback, useEffect, useRef, useState } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module 'react-swipeable-views-core/lib/mod'. '/Users/bhs/code/work/rasch-stack/no */
import mod from 'react-swipeable-views-core/lib/mod';

// based on https://github.com/oliviertassinari/react-swipeable-views/blob/master/packages/react-swipeable-views-utils/src/autoPlay.js
// but created as function component with hoooks and with functionality of stopping autoplay on hover
/* @ts-ignore TODO: TS7006 ->  Parameter 'BaseComponent' implicitly has an 'any' type. */
const Autoplay = (BaseComponent) => {
  const Component = ({
    autoplay = true,
    interval = 5000,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'onChangeIndex' implicitly has an 'any' type. */
    onChangeIndex,
    /* @ts-ignore TODO: TS7031 ->  Binding element 'indexProp' implicitly has an 'any' type. */
    index: indexProp,
    ...props
  }) => {
    const [index, setIndex] = useState(indexProp || 0);
    const intervalIdRef = useRef(null);
    const timer = useRef(null);
    const initialTime = useRef(null);

    useEffect(() => {
      if (indexProp !== index) {
        setIndex(indexProp);
      }
    }, [indexProp, setIndex, index]);

    const handleInterval = useCallback(() => {
      const { children, slideCount } = props;
      const indexLatest = indexProp;
      let indexNew = indexLatest;

      indexNew += 1;

      if (slideCount || children) {
        indexNew = mod(indexNew, slideCount || React.Children.count(children));
      }

      // Is uncontrolled
      if (props.index === undefined) {
        setIndex(indexNew);
      }

      if (onChangeIndex) {
        onChangeIndex(indexNew, indexLatest, { isAutoplayed: true });
      }
    }, [props, onChangeIndex, indexProp]);

    /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'indexLatest' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'meta' implicitly has an 'any' type. */
    const handleChangeIndex = (index, indexLatest, meta) => {
      // Is uncontrolled
      if (props.index === undefined) {
        setIndex(index);
      }

      if (onChangeIndex) {
        onChangeIndex(index, indexLatest, meta);
      }
    };

    /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
    const handleSwitching = (index, type) => {
      timer.current = null;
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      } else if (type === 'end') {
        startInterval();
      }

      if (props.onSwitching) {
        props.onSwitching(index, type);
      }
    };

    const startInterval = useCallback(() => {
      /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
      clearInterval(intervalIdRef.current);

      if (autoplay) {
        /* @ts-ignore TODO: TS2322 ->  Type 'number' is not assignable to type 'null'. */
        initialTime.current = Date.now();
        /* @ts-ignore TODO: TS2322 ->  Type 'Timer' is not assignable to type 'null'. */
        intervalIdRef.current = setInterval(
          handleInterval,
          timer.current ? interval - timer.current : interval,
        );
      }
    }, [handleInterval, interval, autoplay]);

    const handleMouseLeave = () => {
      if (autoplay) {
        startInterval();
      }
    };

    const handleMouseEnter = () => {
      if (autoplay) {
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        timer.current = timer.current + (Date.now() - initialTime.current);
        /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
        clearInterval(intervalIdRef.current);
      }
    };

    useEffect(() => {
      if (autoplay) {
        startInterval();
        return () => {
          timer.current = null;
          initialTime.current = null;
          /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
          clearInterval(intervalIdRef.current);
        };
      }
    }, [autoplay, startInterval, interval]);

    return (
      <BaseComponent
        index={index}
        onChangeIndex={handleChangeIndex}
        onSwitching={handleSwitching}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    );
  };

  return Component;
};

export default Autoplay;
