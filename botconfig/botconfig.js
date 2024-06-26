const TelegramBot = require("node-telegram-bot-api");

let botInstance;

const getBotInstance = () => {
  if (!botInstance) {
    if (process.env.NODE_ENV === "production") {
      botInstance = new TelegramBot(process.env.BOT_TOKEN);
      botInstance.setWebHook(`${process.env.URL}/bot${process.env.BOT_TOKEN}`);
      console.log("bot running on production");
      console.log("webhook set");
    } else {
      botInstance = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
      console.log("bot running on development");
    }
  }
  return botInstance;
};

module.exports = { getBotInstance };
