const { getBotInstance } = require("../botconfig/botconfig");
const { dragonTiger, setValuesByAdmin } = require("../controllers/dragonTiger");

const bot = getBotInstance();

const Test = async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "bot running ");
};
const style = { parse_mode: "HTML" };

const start = async (msg) => {
  const chatId = msg.chat.id;
  if (msg.chat.type === "private") {
    bot.sendMessage(
      chatId,
      `<i> Hii <b> ${msg.from.first_name}</b> I'm AI powered casino bot. Add me to your group and promote me as admin  /help for help</i>`,
      style
    );
  }
};

const Help = async (msg) => {
  const chatId = msg.chat.id;
  if (
    msg.chat.type === "private" ||
    msg.chat.type === "supergroup" ||
    "group"
  ) {
    bot.sendMessage(
      chatId,
      "Availiable Commands \n 1. /game- To start the game(only in group mode) \n 2. /details for game details ",
      style
    );
  }
};

const details = async (msg) => {
  const style = { parse_mode: "HTML" };
  const message = `
  <b>🐲 Dragon VS Tiger 🐯</b>\n
  Predict whether the Dragon will win, Tiger will win or they will tie.\n\n
  <b>Game Rules</b>\n
  In the Dragon Tiger game, two hands are dealt: one for the Dragon and another for the Tiger. The player bets which will win, or if they will tie.\n
  The winning hand is the hand with the highest ranking card.\n
  If the Dragon and Tiger hands have the same ranking, the round of play is a Tie.\n
  The round ends in a Suited Tie when the Dragon and the Tiger cards are equal in both rank and suit.\n\n
  <b>Card Values</b>\n
  The ranking of cards is, from lowest to highest: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, and K (where A is "1" and K is "13").\n\n
  <b>At the end of the game, winnings are paid as follows:</b>\n
  <b>1. Dragon wins: 1:1</b>\n
  <b>2. Tiger wins: 1:1</b>\n
  <b>3. Tie wins: 8:1</b>\n
  <b>4. Suited Tie wins: 11:1</b>\n\n
  <i>Note: Suited tie is only applicable when the user bets on a tie. If a tie wins without user bet , then half the amount will go to the dealer.</i>
  `;

  bot.sendMessage(msg.chat.id, message, { parse_mode: "HTML" });
};

const Game = async (msg) => {
  dragonTiger(msg);
};

module.exports = { Test, Game, setValuesByAdmin, start, Help, details };
