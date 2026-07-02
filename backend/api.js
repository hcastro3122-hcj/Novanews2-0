import Parser from "rss-parser";

const parser = new Parser();

const FEEDS = [
  "https://www.billboard.com/feed/",
  "https://www.rollingstone.com/music/music-news/feed/",
  "https://pitchfork.com/feed/rss"
];

export default async function handler(req, res) {
  try {
    let items = [];

    for (const url of FEEDS) {
      const feed = await parser.parseURL(url);

      const mapped = feed.items.map(i => ({
        title: i.title,
        link: i.link,
        date: i.pubDate,
        source: feed.title,
        category: categorize(i.title)
      }));

      items.push(...mapped);
    }

    items.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(items.slice(0, 30));

  } catch (e) {
    res.status(200).json([
      {
        title: "Nova News activo",
        link: "#",
        date: new Date().toISOString(),
        source: "system",
        category: "music"
      }
    ]);
  }
}

function categorize(t) {
  t = t.toLowerCase();

  if (
    t.includes("album") ||
    t.includes("tour") ||
    t.includes("concert") ||
    t.includes("release")
  ) return "music";

  if (
    t.includes("movie") ||
    t.includes("film") ||
    t.includes("celebrity")
  ) return "entertainment";

  return "music";
}