// Preview handler for Vercel serverless
// Fetches data from main server (or falls back gracefully)

const MAIN_SERVER = "http://82.26.151.82:3456";

function escapeHtml(text) {
  return (text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) {
    return res.status(404).send("Not found");
  }

  let title = "";
  let summary = "";
  let originalUrl = "";
  let image = "https://t.me/i/userpic/320/web_news_web.svg";

  // Try to fetch preview data from main server
  try {
    const response = await fetch(`${MAIN_SERVER}/api/get-preview?id=${encodeURIComponent(id)}`, {
      signal: AbortSignal.timeout(3000)
    });
    if (response.ok) {
      const data = await response.json();
      title = data.title || "";
      summary = data.summary || "";
      originalUrl = data.originalUrl || "";
    }
  } catch {}

  // Fallback: if main server is down, use ID-based fallback
  if (!originalUrl) {
    originalUrl = `https://t.me/web_news_web`;
    title = title || "Новость";
  }

  const cleanTitle = escapeHtml(title);
  const cleanSummary = escapeHtml(summary.slice(0, 200));
  const cleanUrl = escapeHtml(originalUrl);

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>${cleanTitle}</title>
  <meta property="og:title" content="${cleanTitle}">
  <meta property="og:description" content="${cleanSummary}">
  <meta property="og:url" content="${cleanUrl}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${cleanTitle}">
  <meta name="twitter:description" content="${cleanSummary}">
  <meta http-equiv="refresh" content="0;url=${cleanUrl}">
  <script>location.href="${cleanUrl}"</script>
</head>
<body>
  <p><a href="${cleanUrl}">${cleanTitle}</a></p>
  <p>${cleanSummary}</p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  return res.status(200).send(html);
}
