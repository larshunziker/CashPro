import { BASE_URL } from "../config";
import type {
  ListPageResponse,
} from "../types/listPage";
import type {
  NewsArticleResponse,
} from "../types/newsArticle";

async function getLandingPage(
  limit: number,
  offset: number,
): Promise<ListPageResponse | null> {
  try {
    const body = {
      query: `{
        environment(publication: CASH) {
          routeByPath(path: "news/alle") {
            object {
              ... on LandingPage {
                grid(limit: ${limit}, offset: ${offset}, sort: "LandingPageGridSortDate") {
                  count
                  edges {
                    node {
                      __typename
                      changeDate
                      publicationDate
                        preferredUri
                      channel {
                        title
                      }
                      publication
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    };
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`,
      );
    }
    const json = await response.json();
    if (typeof json === "object" && json !== null && "errors" in json) {
      throw new Error(
        `GraphQL errors: ${JSON.stringify((json as any).errors)}`,
      );
    }
    return json as ListPageResponse;
  } catch (err) {
    console.error("Error fetching landing page:", err);
    return null;
  }
}


async function fetchNewsArticle(
  path: string,
): Promise<NewsArticleResponse | null> {
  console.log("Fetching article:", path);
  try {
    const body = {
      query: `{
          environment(publication: CASH) {
            routeByPath(path: "${path.slice(1)}") {
              object {
                ... on Article {
                  title
                  shortTitle
                  publicationDate
                  publication
                  gcid
                  preferredUri
                  id
                  lead
                  body {
                    ... on TextParagraph {
                      text
                    }
                  }
                  channel {
                    title
                  }
                  authors {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                  teaserImage {
                    ... on ImageParagraph {
                      caption
                      image {
                        file {
                          relativeOriginPath
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }`,
    };
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(
        `Request failed with status ${response.status}: ${response.statusText}`,
      );
    }
    const json = await response.json();
    if (typeof json === "object" && json !== null && "errors" in json) {
      throw new Error(
        `GraphQL errors: ${JSON.stringify((json as any).errors)}`,
      );
    }
    return json as NewsArticleResponse;
  } catch (err) {
    console.error("Error fetching news article:", err);
    return null;
  }
}

export {
  getLandingPage,
  fetchNewsArticle,
}