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
}

module.exports = Default;