#!/usr/bin/env node

/**
 * @file   Parse todos
 * @author Steven Wolf <steven.wolf@ringieraxelspringer.ch>
 * @date   2019-11-27
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const regex = /(\/\/|\/\*)[\S\s]{0,8}?(TODO|FIXME):(.*?)\n/g;
const re = new RegExp(regex, 'g');
const filetypes = ['css', '.js', 'jsx', '.ts', 'tsc'];

const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(file => {
    const filepath = dirPath + '/' + file;
    if (fs.statSync(filepath).isDirectory()) {
      arrayOfFiles = getAllFiles(filepath, arrayOfFiles);
    } else {
      if (filetypes.includes(filepath.substr(filepath.length - 3))) {
        arrayOfFiles.push(filepath);
      }
    }
  });

  return arrayOfFiles;
};

let todos = [];

const files = getAllFiles('src');
const total = files.length;
for (let index = 0; index < files.length; index++) {
  const f = files[index];

  const contents = fs.readFileSync(f).toString();

  while ((result = re.exec(contents)) !== null) {
    const toDelimiter = result[0].startsWith('//') ? '\n' : '*/';
    const end = contents.indexOf(toDelimiter, result.index);
    const todo = contents.substring(result.index, end);

    const line = contents.substring(0, result.index).split('\n').length;

    todos.push({
      file: f,
      line: line,
      title: result[2],
      comment: todo
        .split('\n *')
        .map(t => t.trim())
        .join('\n'),
    });
  }

  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write(`Parsing todos, file ${index + 1} of ${total}`);
}

console.log();
console.log(`done, found ${todos.length} todos`);

const template = fs
  .readFileSync(path.resolve(__dirname, 'template.html'))
  .toString();

const htmlContent = template.replace(
  '/* TODO_DATA */',
  `= ${JSON.stringify(todos)}`,
);

http
  .createServer((req, res) => {
    res.write(htmlContent);
    res.end();
  })
  .listen(8080, () => {
    console.log(`Server running on port ${8080}`);
  });
