export default function handler(req, res) {
  const { id } = req.query;
  const title = "📰 Новость";
  const summary = "Краткая выжимка на русском языке";
  const url = "https://t.me/web_news_web";
  
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${summary}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <meta http-equiv="refresh" content="0;url=${url}">
</head>
<body>
  <p><a href="${url}">${title}</a></p>
  <p>${summary} (ID: ${id})</p>
</body>
</html>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600");
  res.status(200).send(html);
}
