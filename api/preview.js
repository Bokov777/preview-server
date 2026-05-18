export default (req, res) => {
  const id = req.query.id || '';
  const title = id ? `📰 #${id}` : '📰 Новости';
  const url = 'https://t.me/web_news_web';
  
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta property="og:title" content="${title}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <meta http-equiv="refresh" content="0;url=${url}">
</head>
<body>OK ${id}</body>
</html>`;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
};
