require("dotenv").config();
const express = require("express");
const server = express();
const port = 3000 || process.env.PORT;

//get bot instance

const { getBotInstance } = require("./botconfig/botconfig");
const bot = getBotInstance();
server.use(express.json());

const {
  Test,
  Game,
  setValuesByAdmin,
  start,
  Help,
  details,
} = require("./controllers/commandHandlers");

server.get("/test", (req, res) => {
  console.log("bot running");
});

server.post(`/bot${process.env.BOT_TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.status(200);
});

server.listen(port, () => {
  console.log("bot up and  runnig sucessfully");
});

bot.onText(/\/test/, Test);
bot.onText(/\/game/, Game);
bot.onText(/\/start/, start);
bot.onText(/\/setvalue/, setValuesByAdmin);
bot.onText(/\/help/, Help);
bot.onText(/\/details/, details);
