import { parse, UrlWithParsedQuery } from "url";
import next from "next";
import fs from "fs";
import path from "path";
// import { createServer } from "https";
import http from "http";
import { v4 } from "internal-ip";

const nodeEnv = process.env.NODE_ENV;

const dev = nodeEnv !== "production";

const devPort = parseInt(process.env.DEV_PORT || "5050", 10);
const prodPort = parseInt(process.env.PORT || "3333", 10);

const port = dev ? devPort : prodPort;

const localHostIpAddress = v4.sync();

const productionDomain = process.env.PRODUCTION_DOMAIN;

const domain = dev ? localHostIpAddress : productionDomain;

const prefix = dev ? "http://" : "https://";

const app = next({ dev });
const handle = app.getRequestHandler();

if (!dev) {
  app.prepare().then(() => {
    createServer(certOptions, (req, res) => {
      const parsedUrl: UrlWithParsedQuery = parse(req.url!, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        app.render(req, res, "/b", query);
      } else {
        // handle(req, res, parsedUrl);

        handle(req, res);
      }
    }).listen(port);

    // tslint:disable-next-line:no-console
    console.log(
      `\n🚀 Server listening at ${prefix}${domain}:${port} as ${nodeEnv}\n`
    );
  });
} else {
  app.prepare().then(() => {
    // http
    // .createServer((req, res) => {
    createServer(certOptions, (req, res) => {
      const parsedUrl: UrlWithParsedQuery = parse(req.url!, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        app.render(req, res, "/b", query);
      } else {
        // handle(req, res, parsedUrl);

        handle(req, res);
      }
    }).listen(port);

    // tslint:disable-next-line:no-console
    console.log(
      `\n🚀 Server listening at ${prefix}${domain}:${port} as ${nodeEnv}\n`
    );
  });
}
