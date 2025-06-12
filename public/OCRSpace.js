const Default = require("./Default");


const fs = require('fs');
const axios = require('axios');
const path = require('path');
const FormData = require('form-data');
const mime = require('mime-types');

class OCRSpace extends Default {
	
	 async describle  (token , fileimg  ){
	 	 try{

			const contentType = mime.lookup(imagePath) || 'application/octet-stream';
	 	 	const imagePath = path.resolve(fileimg);
	 	 	const form = new FormData();
	 	 	
	 	 	form.append('apikey', token);
		    form.append('language', 'por');
		    form.append('isOverlayRequired', 'true');
		    form.append('detectOrientation', 'true');
		    form.append('OCREngine', '2');
		    // form.append('file', fs.createReadStream(imagePath) ,
		    // 	{
		    // 	filename: path.basename(imagePath),
        	// 	contentType: 'image/png' 
		    // });
		    form.append('file', fs.createReadStream(imagePath), {
			  filename: path.basename(imagePath),
			  contentType: contentType
			});

		    const retorno = await axios.post(
		    	'https://api.ocr.space/parse/image',
		    	form,
		    	{ 
		    		headers : form.getHeaders()
		    	}
		    );

 			return `At  ${this.dateFormat()} : ${JSON.stringify(retorno.data , null , 2 )}`;

	 	 }catch( er ){
	 	 	return `Àt ${this.dateFormat()} : ${er.message} ` ; 

	 	 }
	 }
}


module.exports  = OCRSpace ; 