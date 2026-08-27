export default async function handler(req, res) {
  const incoming = new URL(req.url, "https://upgoon.vercel.app");
  const upstreamPath = incoming.pathname === "/" ? "/modelo-bunker" : incoming.pathname;
  const upstreamUrl = new URL(upstreamPath + incoming.search, "https://up-go-on.hauggusto.chatgpt.site");

  const response = await fetch(upstreamUrl, {
    headers: {
      "user-agent": req.headers["user-agent"] || "UpGoOn-Vercel-Proxy",
      "accept": req.headers.accept || "*/*",
    },
    redirect: "follow",
  });

  const body = Buffer.from(await response.arrayBuffer());
  const contentType = response.headers.get("content-type");
  const cacheControl = response.headers.get("cache-control");

  if (contentType) res.setHeader("content-type", contentType);
  if (cacheControl) res.setHeader("cache-control", cacheControl);
  res.status(response.status).send(body);
}
