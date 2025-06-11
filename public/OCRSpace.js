const form = new FormData() ;

const fs = require('fs');
const axios = require('axios');

class OCRSpace extends Default {
	
	 async describle  (token , imagePath  ){
	 	 try{

	 	 	const form = new FormData();
	 	 	form.append('apikey', token);
		    form.append('language', 'por');
		    form.append('isOverlayRequired', 'true');
		    form.append('detectOrientation', 'true');
		    form.append('OCREngine', '2');
		    form.append('file', fs.createReadStream(imagePath));

		    const reposta = await axios.post(
		    	'https://api.ocr.space/parse/image',
		    	form,
		    	{ 
		    		headers : form.getHeaders()
		    	}
		    );

		    return `At  ${dateFormat()} : ${JSON.stringify( respostas.data , null , 2 )} `;

	 	 }catch( er ){
	 	 	return `Àt ${dateFormat()} : ${er.message} ` ; 

	 	 }
	 }

}


module.exports  = OCRSpace ; 