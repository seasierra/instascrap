import querystring from "querystring";
import { ScrapeConfig, ScrapflyClient } from "scrapfly-sdk";

const INSTAGRAM_APP_ID = "936619743392459"; // This is the public app ID for instagram.com
const SCRAPFLY_KEY = "scp-live-2c054792f3a64ec5b32d57c4c76b62a2";

const client = new ScrapflyClient({
  key: SCRAPFLY_KEY,
  max_concurrency: 10,
});

const BASE_CONFIG = {
  asp: true,
  country: "CA",
  headers: {
    "x-ig-app-id": INSTAGRAM_APP_ID,
  },
};

const scrape = (config) =>
  client
    .scrape(new ScrapeConfig({ ...BASE_CONFIG, ...config }))
    .then((r) => JSON.parse(r.result.content));

export const getUser = (user) =>
  scrape({
    url: `https://i.instagram.com/api/v1/users/web_profile_info/?username=${user}`,
  }).then((d) => d.data.user);

export const getPost = (shortcode) => {
  const variables = {
    shortcode: shortcode,
    child_comment_count: 20,
    fetch_comment_count: 100,
    parent_comment_count: 24,
    has_threaded_comments: true,
  };

  const url =
    "https://www.instagram.com/graphql/query/?query_hash=b3055c01b4b222b8a47dc12b090e4e64&variables=";

  const query = querystring.escape(JSON.stringify(variables));

  return scrape({ url: url + query }).then((d) => d.data.post);
};
