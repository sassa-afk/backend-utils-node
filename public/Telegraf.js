const Telegraf = require('telegraf');
const Default = require('/Default')
const def = new Default() ; 
class Telegraf{




	async sendMsg1 ( token , msg , telefone ) {

		try{
			const bot = new Telegraf ( token );
			await bot.telegram.sendMessage ( telefone , msg) 
			console.log(  `Mesagem send to : ${telefome} at ${def.dateFormat() }` ) ;
 			return { log : `Mesagem send to : ${telefome} at ${def.dateFormat() }`}

		}catch(err){
			console.log(  `Mesagem error : ${err} at ${def.dateFormat() }` ) ; 
			return { log : `Erro at ${def.dateFormat()} , ${err}`}
		}


	}

}


exports.modulos = Telegraf ;
