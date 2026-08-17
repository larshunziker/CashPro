interface Data {
  [key: string]: any;
}

export const parseJSON = (lines: string[][]): Data[] => {
  const headers = lines[0].map((header: any) => {
    const trimmedHeader = header.trim();
    return trimmedHeader.replace(/ /g, '');
  });

  return lines.slice(1).map((line: string[]) => {
    const values = line.map((value) => value.trim());

    const obj: Data = {};

    headers.forEach((header: string, index: number) => {
      obj[header] = values[index];
    });

    return obj;
  });
};
