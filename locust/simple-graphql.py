from locust import HttpLocust, TaskSet, task
import os
import json
import gqlqueries

HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json",
}

def routeByPath(path):
  return {
    "operationName": "RouteByPath",
    "variables": {
      "path": path,
      "additionalPublications": ["SV"],
      "branchOffset": 0,
      "branchPageSize": 13,
      "dossierOffset": 0,
      "dossierPageSize": 24,
      "keywordsOffset": 0,
      "keywordsPageSize": 30,
      "landingPageGridOffset": 0,
      "landingPageGridPageSize": 14,
      "organizationLimit": 13,
      "organizationOffset": 0,
      "organizationSortBy": "Date",
      "organizationSortOrder": "Descending",
      "personLimit": 13,
      "personOffset": 0,
      "personSortBy": "Date",
      "personSortOrder": "Descending",
      "publication": "HZ",
      "rankingOffset": 0,
      "rankingPageSize": 21,
      "sponsorLimit": 13,
      "sponsorOffset": 0,
      "sponsorSortBy": "Date",
      "sponsorSortOrder": "Descending",
    },
    "query": gqlqueries.routeByPath(),
  }

class SimpleLoadBehavior(TaskSet):
  @task(1)
  def home(self):
    with self.client.post(
      "/graphql",
      name="home",
      headers=HEADERS,
      data=json.dumps(routeByPath("home-hz")),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['routeByPath']['object']['nid'] is not None and type(data['data']['environment']['routeByPath']['object']['nid']) is str:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def article(self):
    with self.client.post(
      "/graphql",
      name="article",
      headers=HEADERS,
      data=json.dumps(routeByPath("unternehmen\/klaus-dieter-koch-ueber-markenfuehrung-kleines-land-grosse-marken")),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['routeByPath']['object']['nid'] is not None and type(data['data']['environment']['routeByPath']['object']['nid']) is str:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def autocomplete(self):
    data = {
      "operationName": "Autocomplete",
      "variables": {
        "publication": "HZ",
        "additionalPublications": ["SV"],
        "contentTypes": ["Article", "LandingPage", "NativeAdvertising"],
        "char":"gr*",
        "filter":"Article",
        "pageSize":5
      },
      "query": gqlqueries.autocomplete()
    }
    with self.client.post(
      "/graphql",
      name="autocomplete",
      headers=HEADERS,
      data=json.dumps(data),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['globalSearch']['edges'] is not None and len(data['data']['environment']['globalSearch']['edges']) > 0:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  
  @task(1)
  def search(self):
    data = {
      "operationName": "Search",
      "variables": {
        "query": "salmane*",
        "pageSize": 6,
        "sort": "Relevance",
        "contentTypes": ["Article", "LandingPage", "NativeAdvertising"],
        "publication": "HZ",
        "additionalPublications": ["SV"] },
      "query": gqlqueries.search()
    }
    with self.client.post(
      "/graphql",
      name="search",
      headers=HEADERS,
      data=json.dumps(data),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['globalSearch']['edges'] is not None and len(data['data']['environment']['globalSearch']['edges']) > 0:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def onmeda(self):
    data = {
      "operationName": "Onmeda",
      "variables": {"char": "M", "category": "Krankheit", "publication": "BEO"},
      "query": gqlqueries.onmeda()
    }
    with self.client.post(
      "/graphql",
      name="onmeda",
      headers=HEADERS,
      data=json.dumps(data),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['onmedaByChar']['edges'] is not None and len(data['data']['environment']['onmedaByChar']['edges']) > 0:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def comment(self):
    data = {
      "operationName": "Comment",
      "variables": { "limit": 4, "id": "bm9kZToxNjM1MQ==", "offset": 0, "sort": "Descending" },
      "query": gqlqueries.comment()
    }
    with self.client.post(
      "/graphql",
      name="comment",
      headers=HEADERS,
      data=json.dumps(data),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['commentsById']['edges'] is not None and len(data['data']['commentsById']['edges']) > 0:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def keyword_listing(self):
    data = {
      "operationName": "KeywordListing",
      "variables": { "searchString": "K", "publication": "HZ" },
      "query": gqlqueries.keyword_listing()
    }
    with self.client.post(
      "/graphql",
      name="keyword_listing",
      headers=HEADERS,
      data=json.dumps(data),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['keywordsByChar']['edges'] is not None and len(data['data']['environment']['keywordsByChar']['edges']) > 0:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def videos_page(self):
    data = {
      "operationName": "VideosPage",
      "variables": { 
        "channelType": ["VideoBlog"],
        "contentTypes": ["Video"],
        "limit": 8,
        "offset": 4,
        "overviewPageVisibility": ["Videos"],
        "path": "videos",
        "publication": "SI",
        "query": "*",
        "sort": "PublicationDate",
        "vid": "channels_schweizer_illustrierte",
        "videoStageLimit": 4,
        "videoStageOffset": 0,
       },
      "query": gqlqueries.videos_page()
    }
    with self.client.post(
      "/graphql",
      name="videos_page",
      headers=HEADERS,
      data=json.dumps(data),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['routeByPath']['object']['id'] is not None and len(data['data']['environment']['routeByPath']['object']['id']) > 0:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def latest_search(self):
    data = {
      "operationName": "LatestSearch",
      "variables": {
        "contentTypes": ["Article","ImageGallery","Video"],
        "limit": 180,
        "pageSize": 180,
        "path": "latest",
        "publication": "SI",
        "query": "*",
        "sort": "PublicationDate"
      },
      "query": gqlqueries.latest_search()
    }
    with self.client.post(
      "/graphql",
      name="latest_search",
      headers=HEADERS,
      data=json.dumps(data),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['routeByPath']['object']['id'] is not None and len(data['data']['environment']['routeByPath']['object']['id']) > 0:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def router_route_by_path(self):
    data = {
      "operationName": "RouterRouteByPath",
      "variables": {
        "entityQueueLimit": 18,
        "landingPageGridOffset": 0,
        "landingPageGridSize": 12,
        "overviewPageOffset": 0,
        "overviewPageSize": 19,
        "path": "home-si",
        "publication": "SI",
      },
      "query": gqlqueries.router_route_by_path()
    }
    with self.client.post(
      "/graphql",
      name="router_route_by_path",
      headers=HEADERS,
      data=json.dumps(data),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['routeByPath']['object']['id'] is not None and len(data['data']['environment']['routeByPath']['object']['id']) > 0:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def get_landing_page(self):
    data = {
      "operationName": "getLandingPage",
      "variables": {
        "additionalPublications": ["SV"],
        "landingPageGridOffset": 0,
        "landingPageGridPageSize": 13,
        "path": "home-hz",
        "publication": "HZ",
      },
      "query": gqlqueries.get_landing_page()
    }
    with self.client.post(
      "/graphql",
      name="get_landing_page",
      headers=HEADERS,
      data=json.dumps(data),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['routeByPath']['object']['id'] is not None and len(data['data']['environment']['routeByPath']['object']['id']) > 0:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def related_to_content(self):
    data = {
      "operationName": "RelatedToContent",
      "variables": {
        "query": "Familie Safra*",
        "pageSize": 9,
        "filter": "Article",
        "offset": 0,
        "sort": "Date"
      },
      "query": gqlqueries.related_to_content()
    }
    with self.client.post(
      "/graphql",
      name="related_to_content",
      headers=HEADERS,
      data=json.dumps(data),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['globalSearch']['edges'] is not None and len(data['data']['environment']['globalSearch']['edges']) > 0:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def sponsors_route_by_path(self):
    data = {
      "operationName": "SponsorsRouteByPath",
      "variables": {
        "path": "brandreport",
        "publication": "HZ",
        "additionalPublications": ["SV"]
      },
      "query": gqlqueries.sponsors_route_by_path()
    }
    with self.client.post(
      "/graphql",
      name="sponsors_route_by_path",
      headers=HEADERS,
      data=json.dumps(data),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['routeByPath']['object']['id'] is not None and len(data['data']['environment']['routeByPath']['object']['id']) > 0:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def unternehmen(self):
    with self.client.post(
      "/graphql",
      name="unternehmen",
      headers=HEADERS,
      data=json.dumps(routeByPath("unternehmen")),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['routeByPath']['object']['nid'] is not None and type(data['data']['environment']['routeByPath']['object']['nid']) is str:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def keywords(self):
    data = {
      "operationName": "KeywordListing",
      "variables": {"searchString": "A", "publication": "HZ"},
      "query": gqlqueries.keywords()
    }
    with self.client.post("/graphql", name="keywords", headers=HEADERS, data=json.dumps(data), catch_response=True) as response:
      data = response.json()
      print(data)
      if hasattr(data, 'error') or hasattr(data, 'errors'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['keywordsByChar']['edges'] is not None and len(data['data']['environment']['keywordsByChar']['edges']) > 0:
          response.success()
        else:
          response.failure("Could not find keywordsByChar > edges or edges < 1")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")

  @task(1)
  def keyword_detail(self):
    with self.client.post(
      "/graphql",
      name="keyword_detail",
      headers=HEADERS,
      data=json.dumps(routeByPath("stichworte/a/test")),
      catch_response=True
    ) as response:
      data = response.json()
      if hasattr(data, 'error'):
        response.failure(f"Error: {data['error']}")
      try:
        if data['data']['environment']['routeByPath']['object']['tid'] is not None and type(data['data']['environment']['routeByPath']['object']['tid']) is str:
          response.success()
        else:
          response.failure("Could not find a nid")
      except (TypeError, KeyError):
        response.failure(f"Response not valid, got {data}")


class WebsiteUser(HttpLocust):
  task_set = SimpleLoadBehavior
  min_wait = 500
  max_wait = 5000
