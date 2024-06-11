import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { production } from "./core/prod";
import { isValidURL } from "./utils";

export const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome to BLANKS RADAR"));
bot.on(message("text"), (ctx) => {
  if (isValidURL(ctx.message.text)) {
    fetch(new URL("localhost:3000/add-sub"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: ctx.message.text,
      }),
    }).then((r) => console.log(r));

    ctx.reply("Subscription added succesfully");
  }
});

export const startVercel = (req, res) => production(req, res, bot);
