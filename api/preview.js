export default function handler(req, res) {
  const url = new URL(req.url, "https://preview.vercel.app");
  const id = url.searchParams.get("id") || "";
  const title = "📰 Новость";
  const summary = "Краткая выжимка на русском языке";
  const articleUrl = "https://t.me/web_news_web";
  
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${summary}">
  <meta property="og:url" content="${articleUrl}">
  <meta property="og:type" content="article">
  <meta http-equiv="refresh" content="0;url=${articleUrl}">
</head>
<body>OK</body>
</html>`;
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(html);
}
