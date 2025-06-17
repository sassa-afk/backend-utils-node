const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Retorna todos os usuários
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get("/usuarios", (req, res) => {
  return  res.json({ mesage: `ola mundo ` });
});

// app.get("/mail/enviar", async (req, res) => {
//   return res.json({ mesage: `ola mundo ` });
// });

module.exports = router;
