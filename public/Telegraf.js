const { Telegraf } = require('telegraf');
const Default = require('./Default');

const def = new Default();

class TelegramService {
  async sendMsg1(token, msg, chatId) {
    try {
      const bot = new Telegraf(token);

      await bot.telegram.sendMessage(chatId, msg);

      const logMsg = `Mensagem enviada para: ${chatId} às ${def.dateFormat()}`;
      console.log(logMsg);

      return { log: logMsg };
    } catch (err) {
      const errorMsg = `Erro ao enviar mensagem: ${err.message} às ${def.dateFormat()}`;
      console.error(errorMsg);

      return { log: errorMsg };
    }
  }
}

module.exports = TelegramService;
