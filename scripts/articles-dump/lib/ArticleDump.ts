import { setTimeout } from "node:timers/promises"
import { Database } from "bun:sqlite";
import type {
  ListPageResponse,
  TeaserWithUrl,
} from "../types/listPage";
import { getAllTeasers, getNewsArticleByUri, hasFetchedAllNewPages, pushNewsArticleToDB, pushTeaserToDB } from "./Db";
import { DELAY_API_CALL, PAGE_SIZE, PUBLICATION_URL } from "../config";
import { fetchNewsArticle, getLandingPage } from "./CashApi";


function getTeasersFromListPage(page: ListPageResponse): TeaserWithUrl[] {
  return page.data.environment.routeByPath.object.grid.edges.map((edge) => ({
    url: `${PUBLICATION_URL}${edge.node.preferredUri}`,
    __typename: edge.node.__typename,
    changeDate: edge.node.changeDate,
    publicationDate: edge.node.publicationDate,
    publication: edge.node.publication,
    preferredUri: edge.node.preferredUri,
    channel: { ...edge.node.channel },
  }));
}

async function collectArticles(db: Database) {
  const teasers = getAllTeasers(db);
  
  let counter = 0;
  for (const teaser of teasers) {
    console.log("Fetching article number: ", counter++);

    const cachedArticle = getNewsArticleByUri(db, teaser.preferredUri);
    if (cachedArticle) {
      console.log("Returning cached article:", teaser.preferredUri);
      pushNewsArticleToDB(db, cachedArticle);
      continue;
    }

    const newsPage = await fetchNewsArticle(teaser.preferredUri);
    if (newsPage) {
      pushNewsArticleToDB(db, newsPage);
    }

    await setTimeout(DELAY_API_CALL); // give prod time to settle
  }
}

async function loadPageAndSave(
  db: Database,
  limit: number,
  offset: number,
): Promise<boolean> {
  const data = await getLandingPage(limit, offset);
  if (data) {
    const teasers = getTeasersFromListPage(data);
    const fetchedAllNewPages = hasFetchedAllNewPages(db, teasers);
    pushTeaserToDB(db, teasers);

    if (fetchedAllNewPages) {
      console.log("Fetched all new pages");
      return false;
    }
  }
  return true;
}

async function collectArticleUrls(db: Database, startOffset: number, offsetLimit: number) {
  let i = 0;
  let offset = 0;
  
  do {
    console.log(`Loading page ${i + 1}`);
    offset = i * PAGE_SIZE + startOffset;

    const result = await loadPageAndSave(db, PAGE_SIZE, offset);
    if (!result) {
      return;
    }

    ++i;
    await setTimeout(DELAY_API_CALL); // give prod time to settle
  } while (offset <= offsetLimit)
}

export {
  collectArticles,
  collectArticleUrls,
}