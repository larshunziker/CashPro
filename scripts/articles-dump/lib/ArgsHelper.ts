import { parseArgs } from "node:util";

const getArgs = () => {
  const { values } = parseArgs({
    args: Bun.argv,
    options: {
      offset: {
        type: "string",
        default: "0",
      },
      urls: {
        type: "boolean",
      },
      articles: {
        type: "boolean",
      },
      export: {
        type: "boolean",
      },
      reset: {
        type: "boolean",
      },
      help: {
        type: "boolean",
      },
    },
    strict: true,
    allowPositionals: true,
  });

  return values;
}

function outputHelp() {
  console.log("Tool to load all news pages from cash.ch");
  console.log("Available commands:");
  console.log("--urls (collects all new article urls)");
  console.log("--offset (number of pages offset)");
  console.log("--articles (fetches all article data)");
  console.log("--export (exports the articles in a output.json file)");
  console.log("--reset (removes the db)");
  console.log("--help");
}

export {
  getArgs,
  outputHelp,
};