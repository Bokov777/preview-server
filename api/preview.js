module.exports = (req, res) => {
  res.status(200).send(`<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8">
<meta property="og:title" content="Тестовое превью">
<meta property="og:description" content="Проверка работы Vercel">
<meta property="og:url" content="https://t.me/web_news_web">
<meta property="og:type" content="article">
<meta http-equiv="refresh" content="0;url=https://t.me/web_news_web">
<title>Тест</title>
</head><body>OK</body></html>`);
};
