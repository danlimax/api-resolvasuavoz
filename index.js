const express = require("express");
require("dotenv").config();
const mysql = require("mysql2/promise");
const cors = require("cors");
const pool = mysql.createPool({
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  database: process.env.MYSQLDATABASE,
});
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/resolvasuavoz/solicitacoes", async (req, res) => {
  try {
    const response = await pool.execute(
      "SELECT * FROM solicitacoes ORDER BY id ASC"
    );
    res.status(201).json(response[0]);
    return;
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    return;
  }
});

app.post("/resolvasuavoz/solicitacoes", async (req, res) => {
  const { nome, email, assunto, mensagem, urlImagem } = req.body;
  try {
    const novaSolicitacao = `INSERT INTO solicitacoes (nome, email, assunto, mensagem, urlImagem) VALUES (?, ?, ?, ?, ?)`;
    pool.execute(novaSolicitacao, [nome, email, assunto, mensagem, urlImagem]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
    return;
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado: http://localhost:${port}/`);
});
