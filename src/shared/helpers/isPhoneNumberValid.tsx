const isPhoneNumberValid = (phoneNumber: string) => {
  phoneNumber = phoneNumber.replace(/\s/g, '');

  // Regex visualisation
  // https://regexper.com/#%5E%28%3F%3A%2800%7C%5C%2B%7B1%2C2%7D%29%2833%7C39%7C41%7C43%7C49%29%28%3F%3A%7C%5C%280%5C%29%29%7C0%29%5B1-9%5D%5Cd%7B8%2C%7D%24
  const regex = /^(?:(00|\+{1,2})(33|39|41|43|49)(?:|\(0\))|0)[1-9]\d{8,}$/;

  return regex.test(phoneNumber);
};

export default isPhoneNumberValid;
