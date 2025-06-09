class Default {
 
	dateFormat() {
	  const date = new Date();
	  const day = String(date.getDate()).padStart(2, "0");
	  const month = String(date.getMonth() + 1).padStart(2, "0"); // meses começam do 0
	  const year = date.getFullYear();
	  const hours = String(date.getHours()).padStart(2, "0");
	  const minutes = String(date.getMinutes()).padStart(2, "0");
	  const seconds = String(date.getSeconds()).padStart(2, "0");

	  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
	}

	logs( tipo , mensagem ){

			if(tipo === true){
				console.log(`At ${ this.dateFormat() } - ${mensagem}`)
			}else{
				console.error(`At ${ this.dateFormat() } - ${mensagem}`)
			}
	}

  async getMethod ( urlParametros , token ){

  	try{

	  	const response = await fetch(urlParametros , { 
	  		method : 'GET' , 
	  		headers : { 
	  			'Authorization' : 	`Bearer ${token}`,
	  			'Content-type' : 'application/json'
		  	} 
	  	});
	  	const data = await response.json();
	  	return data ;

	  }catch(er){
	  	return er.message ;
	  }
  }

  async sendDadosMethod ( urlParametros , token , body , method ){ // pd usar post e path

  	try{

  		const response  = await fetch ( urlParametros {
  			method : method ,
	  		headers : { 
	  			'Authorization' : 	`Bearer ${token}`,
	  			'Content-type' : 'application/json'
		  	} ,
  			body : JSON.stringfy(body) ,
  		});

  		const data = await response.json();
  		return data ;

  	}catch( er ){
  		return er ;
  	}
  }




}

module.exports = Default;