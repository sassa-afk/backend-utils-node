const Default = require("./Default");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const FormData = require("form-data");
 
class OCRSpace extends Default  {
 
  async describle(token, fileimg , extencao ) {
    try {

      const imagePath = path.resolve(fileimg);
		if (!fs.existsSync(imagePath)) {
		  throw new Error(`Arquivo não encontrado em: ${imagePath}`);
		}

		const ext = extencao.toLowerCase();

		const form = new FormData();
		form.append("apikey", token);
		form.append("language", "por");
		form.append("isOverlayRequired", "true");
		form.append("detectOrientation", "true");
		form.append("OCREngine", "2");
		form.append("filetype", ext ); 
		form.append("file", fs.createReadStream(imagePath), {
		  filename: `arquivo.${ext}`,  
		  contentType: `image/${ext}`
		});

       const response = await axios.post("https://api.ocr.space/parse/image", form, {
        headers: form.getHeaders()
      });

      const data = response.data;

       const parsedText = data?.ParsedResults?.[0]?.ParsedText || "Texto não encontrado";

      return {
        status: "sucesso",
        texto: parsedText.trim(),
        raw: data , 
        timestamp: this.dateFormat()
      };

    } catch (er) { 
      return {
        status: "erro",
        message: er.message , 
        timestamp: this.dateFormat()
      };
    }
  }

}

module.exports = OCRSpace;
