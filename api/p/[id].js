// Preview handler for Vercel serverless
// Works standalone — no dependency on main server

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

  const MAIN_SERVER = "http://82.26.151.82:3456";
  let title = "";
  let summary = "";
  let originalUrl = "";

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

  if (!originalUrl) {
    originalUrl = `https://t.me/web_news_web`;
    title = title || "Последние новости";
  }

  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)}</title>
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(summary.slice(0, 200))}">
  <meta property="og:url" content="${escapeHtml(originalUrl)}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(summary.slice(0, 200))}">
  <meta http-equiv="refresh" content="0;url=${escapeHtml(originalUrl)}">
  <script>location.href="${escapeHtml(originalUrl)}"</script>
</head>
<body>
  <p><a href="${escapeHtml(originalUrl)}">${escapeHtml(title)}</a></p>
  <p>${escapeHtml(summary.slice(0, 200))}</p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  return res.status(200).send(html);
}
