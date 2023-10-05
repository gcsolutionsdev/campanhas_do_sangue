import * as fs from "node:fs";
import path from "node:path";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

const __dirname = process.cwd();
const contentDir = path.join(__dirname, "src", "content");

const collectionNames = fs.readdirSync(contentDir).filter((item) => {
  const itemPath = path.join(contentDir, item);
  const stats = fs.statSync(itemPath);
  return stats.isDirectory();
});

export async function GET(context) {
  const allPosts = [];

  for (const collectionName of collectionNames) {
    const posts = await getCollection(collectionName);
    allPosts.push(...posts);
  }

  const rssFeed = rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: allPosts.map((post) => ({
      ...post.data,
      link: `/campanhas_do_sangue/${post.collection}/${post.slug}/`,
    })),
  });

  return rssFeed;
}
