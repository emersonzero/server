import express from "express";

import cors from "cors";

import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const app = express();

// Middleware que diz ao Express para aceitar requisições com corpo no formato JSON
app.use(express.json());

app.use(cors());

// Rota POST para criar um novo usuário
app.post("/users", async (req, res) => {
  // Cria o usuário no banco usando os dados enviados no corpo da requisição
  await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  res.status(201).json(req.body);
});

// Rota GET para buscar usuários
app.get("/users", async (req, res) => {
  let users = [];

  // Se houver query string (ex: ?name=João), filtra pelo nome
  if (req.query) {
    users = await prisma.user.findMany({
      where: {
        name: req.query.name, // busca usuários com o nome informado
        email: req.query.email,
        age: req.query.age,
      },
    });
  } else {
    // Se não houver filtro, retorna todos os usuários
    users = await prisma.user.findMany();
  }

  // Retorna a lista de usuários
  res.status(200).json(users);
});

// Rota DELETE para remover um usuário por ID
app.delete("/users/:id/", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id, // ID passado na URL
    },
  });

  // Retorna mensagem de sucesso após deletar
  res.status(201).json({ message: "User deleted successfully!" });
});

// Rota PUT para atualizar os dados de um usuário
app.put("/users/:id", async (req, res, next) => {
  await prisma.user.update({
    where: {
      id: req.params.id, // ID do usuário que será atualizado
    },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });

  // Retorna os novos dados do usuário após a atualização
  res.status(201).json(req.body);
});

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});

//node  --watch server.js
//npx prisma studio
