const { Telegraf } = require('telegraf');  
const Default = require('./Default');  

const def = new Default();

class TelegramService {
  async sendMsg1(token, msg, telefone) {
    try {
      const bot = new Telegraf(token);
      await bot.telegram.sendMessage(telefone, msg);
      console.log(`Mensagem enviada para: ${telefone} às ${def.dateFormat()}`);
      return { log: `Mensagem enviada para: ${telefone} às ${def.dateFormat()}` };
    } catch (err) {
      console.log(`Erro ao enviar mensagem: ${err} às ${def.dateFormat()}`);
      return { log: `Erro às ${def.dateFormat()}, ${err}` };
    }
  }
}

module.exports = TelegramService;
