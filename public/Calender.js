const { google } = require("googleapis");
const Default = require("./Default");
const def = new Default();

class Calender extends Default {

  // async getMethod ( urlParametros , token ){

  // 	try{

// 	  	const response = await fetch(urlParametros , { 
// 	  		method : 'GET' , 
// 	  		headers : { 
// 	  			'Authorization' : 	`Bearer ${token}`,
// 	  			'Content-type' : 'application/json'
// 		  	} 
// 	  	});
// 	  	const data = await response.json();
// 	  	return data ;

// 	  }catch(er){
// 	  	return er.message ;
// 	  }

  // }


  async newToken ( client_id, client_secret ){

  	try{


      	// "https://sendmesage.onrender.com"  
  		const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

  		const oauth2Client = new google.auth.OAuth2(
  			client_id ,
  			client_secret,
  			"https://sendmesage.onrender.com/mail/enviar"
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



  async MyCalenders ( token ) {
  	return this.getMethod( "https://www.googleapis.com/calendar/v3/calendars/primary/events" , token );
  }

  async newEvent ( token , local , descricao , dataStart  , dataEnd , mailMeu , mailConvidado , tempMin , tempMax ){

  	try{

  		const oauth2Client = new google.auth.OAuth2();
  		oauth2Client.setCredentials({ access_token : token });
  		const calender = google.calender({ version : "v3" , auth : oauth2Client });

		const event = {
		  'summary': 'Google I/O 2015',
		  'location': local,
		  'description': descricao,
		  'start': {
		    'dateTime':dataStart ,
		    'timeZone': 'America/São Paulo'
		  },
		  'end': {
		    'dateTime':  dataEnd ,
		    'timeZone': 'America/São Paulo'
		  },
		  'recurrence': [
		    'RRULE:FREQ=DAILY;COUNT=2'
		  ],
		  'attendees': [
		    {'email': mailMeu },
		    {'email': mailConvidado }
		  ],
		  'reminders': {
		    'useDefault': false,
		    'overrides': [
		      {'method': 'email', 'minutes': tempMin * tempMax}, 
		      {'method': 'popup', 'minutes': 10}
		    ]
		  }
		};

		const response = await calender.event.insert({
			calendarId : "primary",
			resource : event ,
		});

		return { log : response.data };

 

  	}catch(er){
  		return { log : er.message };
  	}
  }


}

module.exports = Calender;