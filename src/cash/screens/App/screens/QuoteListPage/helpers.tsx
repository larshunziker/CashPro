import { replaceAll } from '../../../../../shared/helpers/replaceAll';

export const prepareBody = (body: any, widgetParams: string) => {
  let bodyCopy = JSON.stringify(body);
  bodyCopy = replaceAll(
    bodyCopy,
    '[widgetParams]',
    widgetParams ? widgetParams : '',
  );
  return JSON.parse(bodyCopy);
};

const replaceTokens = ({
  key,
  value = '',
  text,
}: {
  key: string;
  value?: string;
  text: string;
}) => {
  return replaceAll(text, `{${key}}`, value);
};

const replaceAllTokens = (body: any, tokens: Record<string, string>) => {
  if (!body) return body;

  let text = JSON.stringify(body);
  Object.keys(tokens).forEach((key) => {
    text = replaceTokens({
      key,
      value: tokens[key],
      text,
    });
  });
  return JSON.parse(text);
};

const capitalize = (value = '') => {
  return value.charAt(0).toUpperCase() + value.substring(1);
};

export const prepareMetaData = (urlPath: string, data: any) => {
  const [, level1Name, level2Name, ...rest] = urlPath.split('/');
  const listName = rest.pop();

  const updatedData = replaceAllTokens(data, {
    listName: listName ? capitalize(listName?.replace(/-/g, ' ')) : '',
    level1Name: capitalize(level1Name),
    level2Name: capitalize(level2Name),
    siteName: 'CASH',
  });
  return updatedData;
};
