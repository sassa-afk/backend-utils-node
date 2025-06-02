const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

class WhatsappWeb {
  enviarMsg() {
    const client = new Client({
      authStrategy: new LocalAuth()
    });

    client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    client.on('ready', () => {
      console.log("Cliente lido");
    });

    client.on('message', (msg) => {
      if (msg.body === '!ping') {
        msg.reply('pong');
      }
    });

    client.initialize();
  }
}

module.exports = WhatsappWeb;
