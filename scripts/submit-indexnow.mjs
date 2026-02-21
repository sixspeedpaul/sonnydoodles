#!/usr/bin/env node

const DEFAULT_HOST = process.env.INDEXNOW_HOST || "www.sonnydoodles.com";
const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "54bb180f2d54c9f46767bd867f4f6565";
const SITEMAP_URL =
  process.env.SITEMAP_URL || `https://${DEFAULT_HOST}/sitemap.xml`;
const INDEXNOW_ENDPOINT =
  process.env.INDEXNOW_ENDPOINT || "https://api.indexnow.org/indexnow";

const MAX_RETRIES = Number(process.env.INDEXNOW_RETRIES ?? 8);
const RETRY_DELAY_MS = Number(process.env.INDEXNOW_RETRY_DELAY_MS ?? 7500);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractUrlsFromSitemap(xml) {
  const urls = [];
  const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);

  for (const match of matches) {
    const candidate = match[1]?.trim();
    if (!candidate) {
      continue;
    }
    try {
      const parsed = new URL(candidate);
      if (parsed.protocol === "http:" || parsed.protocol === "https:") {
        urls.push(parsed.toString());
      }
    } catch {
      // Ignore malformed URLs in sitemap.
    }
  }

  return Array.from(new Set(urls));
}

function normalizeCliUrls(values) {
  const urls = [];

  for (const value of values) {
    const candidate = value.trim();
    if (!candidate) {
      continue;
    }

    try {
      const parsed = new URL(candidate);
      urls.push(parsed.toString());
    } catch {
      console.warn(`Skipping invalid URL from CLI: ${candidate}`);
    }
  }

  return Array.from(new Set(urls));
}

async function fetchTextWithRetry(url) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "sonnydoodles-indexnow-submit/1.0" },
      });
      if (response.ok) {
        return await response.text();
      }

      console.warn(
        `Attempt ${attempt}/${MAX_RETRIES}: ${url} returned ${response.status}`
      );
    } catch (error) {
      console.warn(
        `Attempt ${attempt}/${MAX_RETRIES}: failed to fetch ${url}: ${error.message}`
      );
    }

    if (attempt < MAX_RETRIES) {
      await sleep(RETRY_DELAY_MS);
    }
  }

  throw new Error(`Failed to fetch ${url} after ${MAX_RETRIES} attempts`);
}

async function submitIndexNow(host, key, urls) {
  const keyLocation = `https://${host}/${key}.txt`;
  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls,
  };

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "User-Agent": "sonnydoodles-indexnow-submit/1.0",
    },
    body: JSON.stringify(payload),
  });

  const body = (await response.text()).trim();
  if (!response.ok) {
    throw new Error(
      `IndexNow submit failed with status ${response.status}${body ? `: ${body}` : ""}`
    );
  }

  console.log(`IndexNow submit accepted (${response.status})`);
  if (body) {
    console.log(body);
  }
}

async function main() {
  const cliUrls = normalizeCliUrls(process.argv.slice(2));
  let urls = cliUrls;

  if (urls.length === 0) {
    const sitemapXml = await fetchTextWithRetry(SITEMAP_URL);
    urls = extractUrlsFromSitemap(sitemapXml);
  }

  if (urls.length === 0) {
    throw new Error("No URLs found to submit.");
  }

  const hostMismatch = urls.filter((url) => new URL(url).host !== DEFAULT_HOST);
  if (hostMismatch.length > 0) {
    console.warn(
      `Warning: ${hostMismatch.length} URLs are outside host ${DEFAULT_HOST} and may be ignored by IndexNow.`
    );
  }

  console.log(`Submitting ${urls.length} URL(s) for host ${DEFAULT_HOST}`);
  await submitIndexNow(DEFAULT_HOST, INDEXNOW_KEY, urls);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
