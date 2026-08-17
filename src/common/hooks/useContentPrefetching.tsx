import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { requestIdleCallback } from '../../shared/helpers/requestIdleCallback';
import { log } from '../../shared/helpers/utils';
import { isTouchDeviceSelector } from '../../shared/selectors/windowStateSelector';

type TaskHandler = (taskData?: Record<string, any>) => void;
type Task = {
  handler: TaskHandler;
  data: Record<string, any>;
};
type GQLQueryObject = {
  operation: string;
  query: any;
  variables: Record<string, any>;
};

const isIntersectionObserverSupported: boolean =
  'IntersectionObserver' in global && __CLIENT__;

const taskList: Task[] = [];
let taskHandle: any = 0;

const runTaskQueue = (deadline: RequestIdleCallbackDeadline): void => {
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    Array.isArray(taskList) &&
    taskList.length
  ) {
    const task = taskList.shift();

    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    task.handler(task.data);
  }

  if (taskList.length) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
  } else {
    taskHandle = 0;
  }
};

const enqueueTask = (
  taskHandler: TaskHandler,
  taskData?: Record<string, any>,
) => {
  Array.isArray(taskList) &&
    taskList.push({
      handler: taskHandler,
      /* @ts-ignore TODO: TS2322 ->  Type 'Record<string, any> | undefined' is not assignable to type 'Record<string, any>'. */
      data: taskData,
    });

  if (!taskHandle) {
    taskHandle = requestIdleCallback(runTaskQueue, { timeout: 1000 });
  }
};

export default (
  enabled: boolean,
  ref: React.MutableRefObject<any>,
  gqlQuery: GQLQueryObject,
) => {
  if (!enabled || __SERVER__) {
    return;
  }
  const isTouchDevice = useSelector(isTouchDeviceSelector);
  const observerRef = useRef(null);

  useEffect(() => {
    const handlePrefetching = () => {
      enqueueTask(() => {
        /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
        if (global?.apolloClient) {
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.apolloClient.query(gqlQuery);
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          detach();
        }
      });
    };

    const detach = () => {
      if (isIntersectionObserverSupported && isTouchDevice) {
        /* @ts-ignore TODO: TS2339 ->  Property 'disconnect' does not exist on type 'never'. */
        observerRef?.current?.disconnect();
      } else {
        ref?.current?.removeEventListener('mouseover', handlePrefetching);
      }
    };

    if (isIntersectionObserverSupported && isTouchDevice) {
      const options = {
        threshold: 1.0,
      };

      /* @ts-ignore TODO: TS2322 ->  Type 'IntersectionObserver' is not assignable to type 'null'. */
      observerRef.current = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }
        handlePrefetching();
      }, options);

      try {
        if (observerRef && observerRef.current && ref && ref.current) {
          /* @ts-ignore TODO: TS2339 ->  Property 'observe' does not exist on type 'never'. */
          observerRef.current.observe(ref.current);
        }
      } catch (error) {
        log(
          'useContentPrefetching',
          `An error occured while trying to observe ${error}`,
          'red',
        );
      }
    } else {
      ref?.current?.addEventListener('mouseover', handlePrefetching);
    }

    // Specify how to clean up after this effect:
    return () => detach();
  }, [isTouchDevice, ref, gqlQuery]);
};
