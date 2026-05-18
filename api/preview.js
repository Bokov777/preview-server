// Preview Server — Vercel Edge Function
export const config = { runtime: 'edge' };

export default function handler(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id') || 'news';
  const title = '📰 Новости';
  const link = 'https://t.me/web_news_web';
  
  const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta property="og:title" content="${title}">
  <meta property="og:url" content="${link}">
  <meta property="og:type" content="article">
  <meta http-equiv="refresh" content="0;url=${link}">
</head>
<body>OK</body>
</html>`;
  
  return new Response(html, {
    headers: { 'content-type': 'text/html; charset=utf-8' }
  });
}
