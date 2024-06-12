const { getBotInstance } = require("../botconfig/botconfig");
const crypto = require("crypto");
const bot = getBotInstance();

let adminsetValue = false;
let admin_set_dragon_card;
let admin_set_tiger_card;

const type_of_card = ["♦️", "♥️", "♠️", "♣️"];
const dragonTiger = async (msg) => {
  console.log("game command received");
  const chatId = msg.chat.id;
  if (msg.chat.type === "group" || msg.chat.type === "supergroup") {
    console.log("command from admin for game");

    const data = await bot.getChatAdministrators(chatId);
    const adminIds = data
      .filter((admin) => !admin.user.is_bot)
      .map((admin) => admin.user.id);

    if (adminIds.includes(msg.from.id)) {
      const dragon_card = adminsetValue
        ? admin_set_dragon_card
        : crypto.randomInt(1, 14);
      const tiger_card = adminsetValue
        ? admin_set_tiger_card
        : crypto.randomInt(1, 14);
      const dragon_card_type =
        type_of_card[crypto.randomInt(type_of_card.length)];
      const tiger_card_type =
        type_of_card[crypto.randomInt(type_of_card.length)];

      const winner = checkWinner(
        dragon_card,
        tiger_card,
        dragon_card_type,
        tiger_card_type
      );

      const dragon_actual_Card = getActualCard(dragon_card);
      const tiger_actual_Card = getActualCard(tiger_card);

      const style = { parse_mode: "HTML" };

      await bot.sendMessage(
        chatId,
        `<b> Dragon card: ${dragon_actual_Card} ${dragon_card_type} </b>`,
        style
      );
      await bot.sendMessage(
        chatId,
        `<b> Tiger card: ${tiger_actual_Card} ${tiger_card_type} </b>`,
        style
      );
      bot.sendMessage(chatId, `<b> Winner: 🥇 ${winner} wins 🥇 </b>`, style);
      adminsetValue = false;
    }
  }
};

const setValuesByAdmin = async (msg) => {
  if (msg.chat.type === "private" || msg.from.id === 7189486591) {
    adminsetValue = true;
    const extract_data = msg.text.split(" ");
    const extract_card = extract_data[1];
    const [dragon, tiger] = extract_card.split(",");
    admin_set_dragon_card = +dragon;
    admin_set_tiger_card = +tiger;
    const style = { parse_mode: "HTML" };
    bot.sendMessage(
      msg.chat.id,
      `<b> values set to \n Dragon:${admin_set_dragon_card} \n Tiger:${admin_set_tiger_card} </b>`,
      style
    );
  }
};

const checkWinner = (
  dragon_card,
  tiger_card,
  dragon_card_type,
  tiger_card_type
) => {
  if (dragon_card === tiger_card && dragon_card_type === tiger_card_type) {
    return "Suited Tie";
  } else if (dragon_card === tiger_card) {
    return "Tie";
  } else if (dragon_card > tiger_card) {
    return "Dragon";
  } else {
    return "Tiger";
  }
};

const getActualCard = (card) => {
  switch (card) {
    case 1:
      return "A";
    case 11:
      return "J";
    case 12:
      return "Q";
    case 13:
      return "K";
    default:
      return card;
  }
};

module.exports = { dragonTiger, setValuesByAdmin };
