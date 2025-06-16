const Default = require("./Default");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const FormData = require("form-data");
const mime = require("mime-types");

class OCRSpace extends Default {
  async describle(token, fileimg) {
    try {
      // Resolve o caminho absoluto do arquivo
      const imagePath = path.resolve(fileimg);

      // Detecta o tipo MIME baseado na extensão do arquivo
      const contentType = mime.lookup(imagePath) || "application/octet-stream";

      // Cria o formulário para envio
      const form = new FormData();
      form.append("apikey", token);
      form.append("language", "por"); // português
      form.append("isOverlayRequired", "true");
      form.append("detectOrientation", "true");
      form.append("OCREngine", "2");
      form.append("file", fs.createReadStream(imagePath), {
        filename: path.basename(imagePath),
        contentType: contentType
      });

      // Envia para a API do OCR.Space
      const response = await axios.post("https://api.ocr.space/parse/image", form, {
        headers: form.getHeaders()
      });

      const data = response.data;

      // Extrai o texto reconhecido do resultado
      const parsedText = data?.ParsedResults?.[0]?.ParsedText || "Texto não encontrado";

      return {
        status: "sucesso",
        texto: parsedText.trim(),
        raw: data, // opcional: retorna a resposta completa
        timestamp: this.dateFormat()
      };
    } catch (er) {
      return {
        status: "erro",
        message: er.message,
        timestamp: this.dateFormat()
      };
    }
  }
}

module.exports = OCRSpace;
