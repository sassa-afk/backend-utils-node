require("dotenv").config();


const express = require("express");
const lermail = require("nodemailer");

const app = express();
app.use(express.json());

// --------------------------------------------------------
const Mail = require("./Mail");
const objMail = new Mail();
// --------------------------------------------------------
app.get("/mail/enviar", async (req, res) => {
  return res.json({ mesage: `ola mundo ` });
});

app.post("/mail/sendMain", async (req, res) => {
  const { hst, port, secure, user, pass, mailTo, titulo, msgHTML, msgText } =
    req.body;

  if (
    !hst ||
    !port ||
    !user ||
    !pass ||
    !mailTo ||
    !titulo ||
    !msgHTML ||
    !msgText
  ) {
    return res
      .status(500)
      .json({ mesage: "Parametros invalidos / imcompletos" });
  }

  try {
    const retorno = await objMail.sendMailLerSimple(
      hst,
      port,
      secure,
      user,
      pass,
      mailTo,
      titulo,
      msgHTML,
      msgText
    );
    return res.status(200).json({ mesage: retorno.log });
  } catch (err) {
    return res
      .status(500)
      .json({ mesage: `Erro na execução do processo ${ err.message}` });
  }
});


// -----------------------------------------------------------------------------

// const Wapp = require ("./Venom"); // <---
// const objVenom = new Wapp(); // <---

// app.post("/wapp/auth" , async (req , res )=>{

//  try{
//     const reposta = await objVenom.startSessaoVenom(); 
//     return res.status(200).json({mesage : reposta.log }); 
//   }catch( er ){

//     return res.status(500).json({ mesage : `Erro : ${er}`}) ;
//  }  
   


// });


// -----------------------------------------------------------------------------

const TelegramService = require('./Telegraf'); // nome do arquivo
const telegram = new TelegramService();

app.post("/telegram/sendTel_1", async (req, res) => {
  const { token, msg, telefone } = req.body;

  if (!token || !msg || !telefone) {
    return res.status(400).json({ message: 'Parâmetros inválidos' });
  }

  try {
    const resposta = await telegram.sendMsg1(token, msg, telefone);
    return res.status(200).json({ message: resposta.log });
  } catch (err) {
    return res.status(500).json({ message: `Erro no servidor: ${err}` });
  }
});

// -----------------------------------------------------------------------------

const Calender = require('./Calender');
const calender = new Calender();

app.post("/google/newToken" , async ( req , res ) =>{

  const { client_id , client_secret  } = req.body ; 
  
  if( !client_id || !client_secret ){
    return res.status(400).json( { mesage : "Parametros invalidos" });
  }

  try{

    const nwToken = await calender.newToken( client_id , client_secret );

    console.log(`tolken ok gerado ${ nwToken.data }`);
    return res.status(200).json( {mesage : 'new Token' , data : `${ nwToken.data }`});


  }catch(er){
    console.error(er)
    return res.status(500).json( { mesage : `Erro ao gerar token  ${er} ` });
  }

});



app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});
