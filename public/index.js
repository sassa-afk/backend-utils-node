require("dotenv").config();

const express = require("express");
const lermail = require("nodemailer");


function sendMailLer( hst , port , secure , user , pass , mailTo  , titulo , msgHTML , msgText ){

    const transporter = nodemailer.createTransport({

    	host : hst ,
    	prot : port ,
    	secure : secure ,
    	auth : {
    		user : user,
    		pass : pass,
    	},
	});

	transporter.sendMail({
		from :  titulo ,
		to : mailTo ,
		subject : titulo ,
		html : msgHTML  ,
		text : msgText ,
		// attachments : [
		// 	{
		// 		filename : "meu pdf.pdf",
		// 		path : "caminho"
		// 	}
		// ]

	}).then((resposne) => console.log(`Disparo realizado com sucesso  ${user} : ${resposne.messageId}`))
	.catch((err) => { console.log(`Erro ${err} ao disparar email ${user}`)})
}


const app = express();
app.use(express.json());

app.get("/mail/enviar", async (req, res) => {
   return res.json({ mesage: `ola mundo ${ nome}` });
});

app.post( "/mail/sendMain" , async (req , res ) =>{
	const {  hst , port , secure , user , pass , mailTo  , titulo , msgHTML , msgText } = req.body ; 

	if( !hst || !port || !secure || !user || !pass || !mailTo  || !titulo || !msgHTML || !msgText ){
		return res.status(500).json({ mesage : 'Parametros invalidos / imcompletos'});
	}

	try{
		sendMailLer(hst , port , secure , user , pass , mailTo  , titulo , msgHTML , msgText);
		return res.status(200).json({ mesage : `contaudo enviado com sucesso `})
	}catch(err){
		return res.status(500).json({ mesage : `Erro na execução do processo ${err.message}`});
	}


})

app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});
