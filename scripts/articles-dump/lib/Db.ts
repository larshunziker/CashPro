import { Database, Statement } from "bun:sqlite";
import { DB_FILE, PUBLICATION_URL } from "../config";
import type {
  TeaserWithUrl,
  TeaserWithUrlFromDB,
} from "../types/listPage";
import type {
  NewsArticleFromDB,
  NewsArticleResponse,
} from "../types/newsArticle";

const getDatabase = () => new Database(DB_FILE, { create: true });

const initDB = (db: Database) => {
  const query = db.query(`
    CREATE TABLE IF NOT EXISTS teasers (
      url TEXT PRIMARY KEY,
      typename TEXT,
      changeDate TEXT,
      publicationDate TEXT,
      channelTitle TEXT,
      publication TEXT,
      preferredUri TEXT
    )
  `);
  query.run();

  const query2 = db.query(`
    CREATE TABLE IF NOT EXISTS newsArticles (
      preferredUri TEXT PRIMARY KEY,
      title TEXT,
      shortTitle TEXT,
      publicationDate TEXT,
      publication TEXT,
      gcid TEXT,
      lead TEXT,
      bodyText TEXT,
      channelTitle TEXT,
      authors TEXT,
      teaserImagePath TEXT,
      caption TEXT
    )
  `);
  query2.run();
}

function hasFetchedAllNewPages(db: Database, teasers: TeaserWithUrl[]): boolean {
  const stmt = db.prepare("SELECT 1 FROM teasers WHERE url = ?");

  const countAlreadyExistingUrl = teasers.filter((item) =>
    checkIfTeaserExists(stmt, item),
  ).length;

  stmt.finalize();

  //TODO?: 10
  return countAlreadyExistingUrl > 10;
}

function checkIfTeaserExists(stmt: Statement, teaser: TeaserWithUrl): boolean {
  return !!stmt.get(teaser.url);
}

function pushTeaserToDB(db: Database, teasers: TeaserWithUrl[]) {
  const stmt = db.prepare(
    "INSERT OR IGNORE INTO teasers (url, typename, changeDate, publicationDate, channelTitle, publication, preferredUri) VALUES (?, ?, ?, ?, ?, ?, ?)",
  );
  for (const item of teasers) {
    stmt.run(
      item.url,
      item.__typename,
      item.changeDate,
      item.publicationDate,
      item.channel.title,
      item.publication,
      item.preferredUri,
    );
  }
  stmt.finalize();
}

function getAllTeasers(db: Database): TeaserWithUrl[] {
  const stmt = db.prepare(
    "SELECT * FROM teasers ORDER BY publicationDate DESC",
  );
  const rows = stmt.all() as TeaserWithUrlFromDB[];
  stmt.finalize();
  return rows.map((row) => ({
    url: row.url,
    __typename: row.typename,
    changeDate: row.changeDate,
    publicationDate: row.publicationDate,
    publication: row.publication,
    preferredUri: row.preferredUri,
    channel: { title: row.channelTitle },
  }));
}

function getNewsArticleByUri(db: Database, preferredUri: string): NewsArticleResponse | null {
  const stmt = db.prepare("SELECT * FROM newsArticles WHERE preferredUri = ?");
  const row = stmt.get(preferredUri) as NewsArticleFromDB | undefined;
  stmt.finalize();
  if (!row) {
    return null;
  }
  const authors = {
    edges: row.authors.split(",").map((author) => {
      return { node: { name: author } };
    }),
  };

  return {
    data: {
      environment: {
        routeByPath: {
          object: {
            preferredUri: row.preferredUri,
            lead: row.lead,
            body: row.bodyText.split("\n").map((text) => ({ text })),
            channel: { title: row.channelTitle },
            authors: authors,
            teaserImage: {
              image: { file: { relativeOriginPath: row.teaserImagePath } },
            },
            title: row.title,
            gcid: row.gcid,
            publicationDate: row.publicationDate,
            publication: row.publication,
          },
        },
      },
    },
  };
}

function pushNewsArticleToDB(db: Database, article: NewsArticleResponse) {
  const obj = article.data.environment.routeByPath.object;
  if (!obj) {
    console.warn("Failed to get object attribute of a routeByPath", article.data.environment.routeByPath);
    return;
  }

  const authors = obj.authors?.edges
    .map((edge) => edge.node.name)
    .join(", ") || "";
  const bodyText = Array.isArray(obj.body)
    ? obj.body.map((b) => b.text).join("")
    : "";
  const stmt = db.prepare(
    "INSERT OR REPLACE INTO newsArticles (preferredUri, lead, bodyText, title, shortTitle, gcid, publicationDate, publication, channelTitle, authors, teaserImagePath, caption) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  );
  stmt.run(
    obj.preferredUri,
    obj.lead,
    bodyText,
    obj.title,
    obj.shortTitle || "",
    obj.gcid,
    obj.publicationDate,
    obj.publication,
    obj.channel.title,
    authors,
    obj.teaserImage?.image?.file?.relativeOriginPath || "",
    obj.teaserImage?.caption || "",
  );
  stmt.finalize();
}

function getAllArticles(db: Database): NewsArticleFromDB[] {
  const stmt = db.prepare(
    "SELECT * FROM newsArticles ORDER BY publicationDate DESC",
  );
  const rows = stmt.all() as NewsArticleFromDB[];
  stmt.finalize();
  return rows.map((row) => {
    const preferredUri = PUBLICATION_URL + row.preferredUri;
    const teaserImagePath = PUBLICATION_URL + row.teaserImagePath;
    return { ...row, preferredUri, teaserImagePath };
  });
}

export {
  getAllArticles,
  getAllTeasers,
  getDatabase,
  getNewsArticleByUri,
  hasFetchedAllNewPages,
  initDB,
  pushNewsArticleToDB,
  pushTeaserToDB,
}