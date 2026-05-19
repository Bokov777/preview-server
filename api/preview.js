function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = (req, res) => {
  const rawId = (req.query && req.query.id) || '';
  const id = escapeHtml(rawId);

  const title = id ? `📰 Статья #${id}` : '📰 Новости';
  const description = id ? `Читайте подробности статьи #${id} в нашем канале.` : 'Новости со всего мира в удобном формате.';
  const url = 'https://t.me/web_news_web';
  
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <meta name="twitter:card" content="summary">
  <meta http-equiv="refresh" content="0;url=${url}">
  <title>${title}</title>
</head>
<body>
  <h1>${title}</h1>
  <p>${description}</p>
  <p>Если вы не были перенаправлены автоматически, <a href="${url}">нажмите здесь</a>.</p>
</body>
</html>`;
  
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(html);
};
