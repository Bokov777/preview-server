module.exports = (req, res) => {
  const query = req.query || {};
  const id = query.id || '';
  const title = id ? `📰 #${id}` : '📰 Новости';
  const url = 'https://t.me/web_news_web';
  
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="Новости со всего мира">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary">
  <meta http-equiv="refresh" content="0;url=${url}">
  <title>${title}</title>
</head>
<body>
  <h1>${title}</h1>
  <p>Читайте новости на @web_news_web</p>
  <p>ID: ${id}</p>
</body>
</html>`);
};
