require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());

app.get("/mail/enviar", async (req, res) => {
  return res.json({ mesage: "ola mundo" });
});

app.listen(3000, () => {
  console.log("Servidor ativo na porta 3000");
});
