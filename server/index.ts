import { createServer } from "http";
import { parse } from "url";
import next from "next";
import internalIp from "internal-ip";

const dev = process.env.NODE_ENV !== "production";

const devPort = parseInt(process.env.DEV_PORT || "5050", 10);
const port = dev ? devPort : parseInt(process.env.PORT || "3000", 10);

const app = next({ dev });
const handle = app.getRequestHandler();

const localHostIpAddress = internalIp.v4.sync();

const host = dev ? localHostIpAddress : null;

const prefix = dev ? "http://" : "https://";

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    const { pathname, query } = parsedUrl;

    if (pathname === "/a") {
      app.render(req, res, "/a", query);
    } else if (pathname === "/b") {
      app.render(req, res, "/b", query);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port);

  // tslint:disable-next-line:no-console
  console.log(
    `\n🚀 Server listening at ${prefix}${host}:${port} as ${
      dev ? "development" : process.env.NODE_ENV
    }\n`
  );
});
