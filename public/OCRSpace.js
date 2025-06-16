const fs = require("fs");
const axios = require("axios");
const path = require("path");
const FormData = require("form-data");
const mime = require("mime-types");

class OCRSpace extends Default {
  // Função auxiliar para formatar data/hora brasileira
  dateFormat() {
    const now = new Date();
    return now.toLocaleString("pt-BR");
  }

  async describle(token, fileimg) {
    try {
      // Resolve caminho absoluto do arquivo
      const imagePath = path.resolve(fileimg);
if (!fs.existsSync(imagePath)) {
  throw new Error(`Arquivo não encontrado em: ${imagePath}`);
}

const form = new FormData();
form.append("apikey", token);
form.append("language", "por");
form.append("isOverlayRequired", "true");
form.append("detectOrientation", "true");
form.append("OCREngine", "2");
form.append("filetype", "png"); // força extensão
form.append("file", fs.createReadStream(imagePath), {
  filename: "arquivo.png", // força nome com extensão
  contentType: "image/png"
});

      // Envia requisição para OCR.Space
      const response = await axios.post("https://api.ocr.space/parse/image", form, {
        headers: form.getHeaders()
      });

      const data = response.data;

      // Extrai texto, se disponível
      const parsedText = data?.ParsedResults?.[0]?.ParsedText || "Texto não encontrado";

      return {
        status: "sucesso",
        texto: parsedText.trim(),
        raw: data, // inclui a resposta completa da API (opcional)
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
