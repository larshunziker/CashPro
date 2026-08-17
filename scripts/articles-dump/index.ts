import fs from "node:fs/promises";
import { DB_FILE, OFFSET_LIMIT, PAGE_SIZE, OUTPUT_FILE} from "./config";
import { getArgs, outputHelp } from "./lib/ArgsHelper";
import { getAllArticles, getDatabase, initDB } from "./lib/Db";
import { collectArticles, collectArticleUrls } from "./lib/ArticleDump";

const db = getDatabase();

async function main() {
  const args = getArgs();
  const offset = Number(args.offset) * PAGE_SIZE;

  initDB(db);

  if (args.urls) {
    await collectArticleUrls(db, offset, OFFSET_LIMIT);
    return;
  }

  if (args.articles) {
    await collectArticles(db);
    return;
  }

  if (args.export) {
    const articles = getAllArticles(db);
    await fs.writeFile(OUTPUT_FILE, JSON.stringify(articles));
    return;
  }

  if (args.reset) {
    await fs.unlink(DB_FILE);
    return;
  }

  outputHelp();
}

await main();

