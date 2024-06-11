import debug from "debug";
import { startVercel } from "../src/bot.js";

export default async function handle(req, res) {
  try {
    debug(req.url);
    await startVercel(req, res);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Server Error</h1><p>Sorry, there was a problem</p>");
    console.error(e.message);
  }
}
