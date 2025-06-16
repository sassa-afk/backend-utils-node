const fs = require("fs");
const axios = require("axios");
const path = require("path");
const FormData = require("form-data");
const mime = require("mime-types");

class OCRSpace {
  // Função auxiliar para formatar data/hora brasileira
  dateFormat() {
    const now = new Date();
    return now.toLocaleString("pt-BR");
  }

  async describle(token, fileimg) {
    try {
      const imagePath = path.resolve(fileimg);

      if (!fs.existsSync(imagePath)) {
        throw new Error(`Arquivo não encontrado em: ${imagePath}`);
      }

      // Detecta extensão e content-type dinamicamente
      const ext = path.extname(imagePath).toLowerCase().replace('.', ''); // ex: 'png', 'jpg', 'pdf'
      const contentType = mime.lookup(ext) || 'application/octet-stream';

      const form = new FormData();
      form.append("apikey", token);
      form.append("language", "por");
      form.append("isOverlayRequired", "true");
      form.append("detectOrientation", "true");
      form.append("OCREngine", "2");

      // Passa a extensão detectada para a API
      form.append("filetype", ext);
      form.append("file", fs.createReadStream(imagePath), {
        filename: path.basename(imagePath),
        contentType: contentType
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
        raw: data, // resposta completa da API
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
