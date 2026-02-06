import dotenv from "dotenv";
import createServer from "./createServer.js";
import colors from "colors";

dotenv.config();

export default function server() {
  const host = process.env.HOST || "0.0.0.0";
  const port = process.env.PORT || 8080;
  createServer({
    originBlacklist: [],
    originWhitelist: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : [],
    requireHeader: [],
    removeHeaders: [
      "cookie",
      "cookie2",
      "x-request-start",
      "x-request-id",
      "via",
      "connect-time",
      "total-route-time",
    ],
    redirectSameOrigin: true,
    httpProxyOptions: {
      xfwd: false,
    },
  }).listen(port, host, function () {
    console.log(colors.green("Server running on ") + colors.blue(`Fly.io`));
  });
}
