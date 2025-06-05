const { google } = require("googleapis");
const Default = require("./Default");
const def = new Default();

class Calender {


  async newToken ( client_id, client_secret ){

  	try{


      	// "https://sendmesage.onrender.com"  
  		const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

  		const oauth2Client = new google.auth.OAuth2(
  			client_id ,
  			client_secret,
  			"https://sendmesage.onrender.com"
  		);

  		const authURL = oauth2Client.generateAuthUrl({

  			access_type : "online" ,
  			scope : SCOPES ,
  			prompt : "consent" ,

  		});

 
	    return {
	      log: "Link de autenticação gerado com sucesso. Acesse o link, autorize e copie o código da URL de retorno.",
	      authURL,
	      data : `curl -X POST https://oauth2.googleapis.com/token \\
	  -H "Content-Type: application/x-www-form-urlencoded" \\
	  -d "code=COLE_O_CODE_AQUI" \\
	  -d "client_id=${client_id}" \\
	  -d "client_secret=${client_secret}" \\
	  -d "redirect_uri=https://sendmesage.onrender.com/mail/enviar" \\
	  -d "grant_type=authorization_code"`
	    };
	    // return {
	    //   log: `New token ok, at ${def.dateFormat()}`,
	    //   data: authURL
	    // };

 		

  	}catch( er ){
  		return { log: false, data: `Error at ${def.dateFormat()}, ${er.message || er}` };
  	}
  }


  async validToken(token, refresh_token, client_id, client_secret) {
    try {
      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: token });

      const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
      await oauth2.tokeninfo({ access_token: token });

      const novoToken = await this.refreshToken(refresh_token, client_id, client_secret);

      return {
        log: true,
        novo_access_token: novoToken?.log?.access_token,
        expires_in: novoToken?.log?.expiry_date,
      };
    } catch (er) {
      return { log: false, data: `Error at ${def.dateFormat()}, ${er.message || er}` };
    }
  }

  async refreshToken(refresh_token, client_id, client_secret) {
    const oauth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      "https://sendmesage.onrender.com"  
    );

    oauth2Client.setCredentials({ refresh_token });

    try {
      const { credentials } = await oauth2Client.refreshAccessToken();
      return { log: credentials, valid: true };
    } catch (er) {
      return {
        log: `Error at ${def.dateFormat()}, ${er.message || er}`,
        valid: false,
      };
    }
  }




}

module.exports = Calender;