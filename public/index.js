require("dotenv").config();


const Default = require("./Default");
const def = new Default() ; 

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
    def.logs( false , "Solicitação de envio de email parametros invalidos") ; // <--------- LOG
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

    def.logs( true , `${retorno.log}`) ; // <--------- LOG
    return res.status(200).json({ mesage: retorno.log });
  } 
  catch (err) {
    def.logs( false , `Error ao enviar email : ${err.message}`) ; // <--------- LOG
    return res
      .status(500)
      .json({ mesage: `Erro na execução do processo ${ err.message}` });
  }
});


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

app.post("/google/calender/newToken" , async ( req , res ) =>{

  const { client_id , client_secret  } = req.body ; 
  
  if( !client_id || !client_secret ){
    def.logs( false , ` Solicitãção token novo token google calender com parametros invalidos`) ; // <--------- LOG
    return res.status(400).json( { mesage : "Parametros invalidos" });
  }

  try{

    const nwToken = await calender.newToken( client_id , client_secret );

    def.logs( true , ` Solicitação de newTokenCalender realizado com sucesso`) ; // <--------- LOG
    return res.status(200).json( {mesage : nwToken.authURL , data : `${ nwToken.data }`});


  }catch(er){

    def.logs( false , ` Erro na solicitação da api  newTokenCalender ${ er.message }`) ; // <--------- LOG
    return res.status(500).json( { mesage : `Erro ao gerar token  ${er} ` });
  }
});

app.get("/google/calender/lsCaleder" , async ( req , res ) => {
  const {token} = req.query ;
  
  if(!token){
    def.logs( false , ` Solicitãção ver calendario google do calender com parametros nulos `) ; // <--------- LOG
  }


  const reposta = await calender.MyCalenders( token);

  return res.json({ mesage : reposta })
}) ;

app.post("/google/calender/newEvent" , async ( req , res ) => {

  const { token , local , descricao , dataStart  , dataEnd , mailMeu , mailConvidado , tempMin , tempMax } = req.body ;
  if(!token || !local || !descricao || !dataStart  || !dataEnd || !mailMeu || !mailConvidado || !tempMin || !tempMax){
    return res.status(401).json({ mesage : 'Parametros obrigatorio invalidos ou nulo ' });
  };

  const retorno = await calender.newEvent ( token , local , descricao , dataStart  , dataEnd , mailMeu , mailConvidado , tempMin , tempMax );
  
  return res.status(200).json({  mesage : retorno.log }) ;


});

app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});
