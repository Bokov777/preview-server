export const config = { runtime: 'edge' };
export default (req) => new Response(
  '<!DOCTYPE html><html lang="ru"><head><meta charset="UTF-8"><meta property="og:title" content="📰"><meta property="og:url" content="https://t.me/web_news_web"><meta property="og:type" content="article"><meta http-equiv="refresh" content="0;url=https://t.me/web_news_web"></head><body>OK</body></html>',
  { headers: { 'content-type': 'text/html; charset=utf-8' } }
);
