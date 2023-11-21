const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const pool = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: "admin",
  database: "resolvasuavoz",
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

// app.post("/resolvasuavoz/solicitacoes", async (req, res) => {
//   const { nome, email, assunto, mensagem, urlImagem } = req.body;

//   const novaSolicitacao =
//     "INSERT INTO solicitacoes (nome, email, assunto, mensagem, urlImg) VALUES (?, ?, ?, ?, ?)";

//   const connection = await pool.getConnection();
//   await connection.beginTransaction();
//   try {
//     await connection.execute(novaSolicitacao, [
//       nome,
//       email,
//       assunto,
//       mensagem,
//       urlImagem,
//     ]);

//     // Commit da transação se tudo estiver OK
//     await connection.commit();
//     res.status(201).json({ success: "Solicitação criada com sucesso" });
//   } catch (error) {
//     // Rollback da transação em caso de erro
//     await connection.rollback();
//     console.error("Error executing query", error);
//     res.status(500).json({ error: "Erro no servidor interno" });
//   } finally {
//     // Certificar-se de liberar a conexão
//     connection.release();
//   }
// });

app.listen(port, () => {
  console.log(`Servidor iniciado: http://localhost:${port}/`);
});
