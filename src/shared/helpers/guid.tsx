export default (): string => {
  const getRandomNumber = (): string =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  return (
    getRandomNumber() +
    getRandomNumber() +
    '-' +
    getRandomNumber() +
    '-' +
    getRandomNumber() +
    '-' +
    getRandomNumber() +
    '-' +
    getRandomNumber() +
    getRandomNumber() +
    getRandomNumber()
  );
};
