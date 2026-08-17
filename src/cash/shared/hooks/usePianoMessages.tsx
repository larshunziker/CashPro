import { useEffect, useRef, useCallback } from 'react';

export const usePiano = () => {
  /* 
    This hook is used to send data a piano template. Add the code below in your piano template 
    to receive/handle the data sent using this hook.

    <div custom-script>
      window.addEventListener(
        "message",
        (checkMessages = function (event) {
          let data = event.data;
          try {
            data = JSON.parse(data);
          } catch {}

          if (!data?.message) {
            return;
          } else {
            window.removeEventListener("message", checkMessages);
          }

          // Add your code here
        })
      );
    </div>
  */
  const tId = useRef('');
  const msg = useRef('');

  /* @ts-ignore TODO: TS7006 ->  Parameter 'message' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'templateId' implicitly has an 'any' type. */
  const prepareMessage = (message, templateId) => {
    tId.current = templateId;
    msg.current = message;
  };

  const sendMessage = useCallback(() => {
    const templateDiv = document.querySelectorAll(
      `div[class*="${tId.current}"]`,
    );

    templateDiv.forEach((div) => {
      const iframe = div.getElementsByTagName('iframe')[0];

      if (!iframe) {
        return;
      }
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      iframe.contentWindow.postMessage({ message: msg.current }, '*');
    });
  }, []);

  useEffect(() => {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    const checkIsLoaded = (event) => {
      let data;
      try {
        data = JSON.parse(event.data);
      } catch (e) {
        data = null;
      }

      // Listening to the piano template loaded event
      if (data?.event === 'loaded') {
        sendMessage();
      }
    };

    window.addEventListener('message', checkIsLoaded);

    return () => {
      window.removeEventListener('message', checkIsLoaded);
    };
  }, [sendMessage, msg]);

  return { prepareMessage };
};
