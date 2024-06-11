import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { development } from "./core/dev.js";
import { production } from "./core/prod.js";
import { isValidURL, post } from "./utils.js";

export const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome to BLANKS RADAR"));
bot.on(message("text"), async (ctx) => {
  if (isValidURL(ctx.message.text)) {
    post("add-sub", { url: ctx.message.text }).catch((e) => console.log(e));

    ctx.reply("Subscription added succesfully");
  }
});

export const startVercel = (req, res) => production(req, res, bot);

process.env.NODE_ENV !== "production" && development(bot);

console.log(process.env.NODE_ENV);
