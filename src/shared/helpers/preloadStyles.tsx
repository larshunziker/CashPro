const removeDuplicates = (arr: string[]): string[] => {
  return arr.filter((item, index) => arr.indexOf(item) === index);
};

export const addStylesToHeader = (html: string, pattern: string): string => {
  const regexp = new RegExp(pattern, 'g');
  let styles = [...html.matchAll(regexp)].map((match) => match[1]);
  styles = removeDuplicates(styles);
  styles = styles.map(
    (url) => `\t<link rel="preload" as="style" href="${url}">`,
  );
  styles.push('</head>');
  const head = styles.join('\n');
  return html.replace('</head>', head);
};
