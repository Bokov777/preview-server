module.exports = (req, res) => {
  const id = (req.query && req.query.id) || '';
  
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta property="og:title" content="📰 Новости">
  <meta property="og:url" content="https://t.me/web_news_web">
  <meta property="og:type" content="article">
  <meta http-equiv="refresh" content="0;url=https://t.me/web_news_web">
</head>
<body>OK</body>
</html>`;
  
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
};
