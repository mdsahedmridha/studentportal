export default async function handler(req, res) {
  const origin = "https://studentportalc.ai.studio";

  const targetUrl =
    origin +
    req.url;

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : req.body,
      redirect: "manual",
    });

    const headers = {};

    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const location = response.headers.get("location");

    if (location) {
      try {
        const redirectUrl = new URL(location);

        if (redirectUrl.hostname === "studentportalc.ai.studio") {
          redirectUrl.hostname = req.headers.host.split(":")[0];

          headers["location"] = redirectUrl.toString();
        }
      } catch (e) {}
    }

    const body = await response.arrayBuffer();

    res.status(response.status);

   
