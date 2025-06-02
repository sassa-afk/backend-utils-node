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
    !secure ||
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
      .json({ mesage: `Erro na execução do processo ${err.message}` });
  }
});



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

const Telegraf = require ('Telegraf');
const telegram = new Telegraf () ;

app.post( "/telegram/sendTel_1" , async (req , res ) =>{

  const { token , msg , telefone } =  req.body ; 

  if( !token || !msg || !telefone){
    return res.json ({ mesage : 'Parametros invalidos'});
  }

  try{
    telegram.sendMsg1(token , msg , telefone) ;
    return res.status(200).json( mesage : telegram.log );
  }catch(er){
    return res.status(500).json(mesage : er );

  }

});

app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});
