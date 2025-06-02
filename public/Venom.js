const venom = require('venom-bot');
const def = new Default(); // Supondo que exista uma classe Default com método dateFormat()

class Venom {

	async startSessaoVenom() {
		try {
			// Define o client como atributo da instância
			this.client = await venom.create({
				session: 'session-name',
			});

			const device = await this.client.getHostDevice();

			console.log('Conexão ativa no Venom');
			return {
				log: `Sessão ativa às ${def.dateFormat()} | Número: ${device.wid}`
			};

		} catch (err) {
			console.error(`Erro ao iniciar sessão: ${err}`);
			return {
				log: `Erro ao iniciar a sessão: ${err}`
			};
		}
	}

	async sendMesageVenom(numero, mensagem) {
		if (!this.client) {
			console.log('Não há sessão aberta');
			return {
				log: `Não há sessão ativa em ${def.dateFormat()}`
			};
		}

		try {
			await this.client.sendText(`${numero}@c.us`, mensagem);

			const device = await this.client.getHostDevice();

			console.log(`Mensagem enviada com sucesso às ${def.dateFormat()} | De: ${device.wid} | Para: ${numero}`);
			return {
				log: `Mensagem enviada com sucesso às ${def.dateFormat()} | De: ${device.wid} | Para: ${numero}`
			};

		} catch (er) {
			console.log('Erro: ', er);
			return {
				log: `Erro ao enviar mensagem em ${def.dateFormat()}: ${er}`
			};
		}
	}
}

exports.modulo = Venom;
