const connectToDevTools =
  __CLIENT__ &&
  (__DEVELOPMENT__ ||
    (document?.cookie && document.cookie.indexOf('RASCHDEBUG') !== -1));

export default connectToDevTools;
