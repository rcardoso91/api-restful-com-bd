const express = require('express');
const apiRouter = express.Router();
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  },
});

const endpoint = '/produtos';

// Middleware de tratamento de erros
apiRouter.use(async (req, res, next) => {
  try {
    await next();
  } catch (error) {
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// Obter todos os produtos
apiRouter.get(endpoint, async (req, res) => {
  const produtos = await knex.select('*').from('produto');
  res.status(200).json(produtos);
});

// Obter um produto por ID
apiRouter.get(`${endpoint}/:id`, async (req, res) => {
  const { id } = req.params;
  const produto = await knex.select('*').from('produto').where('id', id);

  if (produto.length > 0) {
    res.status(200).json(produto[0]);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

// Criar um novo produto
apiRouter.post(endpoint, async (req, res) => {
  const { descricao, valor, marca } = req.body;

  // Validação de entrada
  if (!descricao || !valor) {
    return res.status(400).json({ message: 'Descrição e valor são obrigatórios' });
  }

  const [produto] = await knex('produto').insert({ descricao, valor, marca }).returning('*');
  res.status(201).json(produto);
});

// Atualizar um produto por ID
apiRouter.put(`${endpoint}/:id`, async (req, res) => {
  const { id } = req.params;
  const { descricao, valor, marca } = req.body;

  // Validação de entrada
  if (!descricao || !valor) {
    return res.status(400).json({ message: 'Descrição e valor são obrigatórios' });
  }

  const [produto] = await knex('produto').where('id', id).update({ descricao, valor, marca }).returning('*');

  if (produto) {
    res.status(200).json(produto);
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

// Excluir um produto por ID
apiRouter.delete(`${endpoint}/:id`, async (req, res) => {
  const { id } = req.params;
  const rowsAffected = await knex('produto').where('id', id).del();

  if (rowsAffected > 0) {
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Produto não encontrado' });
  }
});

module.exports = apiRouter;
