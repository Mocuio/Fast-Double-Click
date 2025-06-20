const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const JsonController = require('./JsonManage/JsonController'); // ← Caminho correto

const app = express();
const port = 3001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

const jsonController = new JsonController('info.json');

// Endpoint para pegar todos os itens
app.get('/get', (req, res) => {
  jsonController.readItems((items) => {
    res.json(items);
  });
});

// Endpoint para adicionar um novo item
app.post('/post', (req, res) => {
  const newItem = req.body;
  jsonController.addItem(newItem, (updatedItems) => {
    res.json(updatedItems);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
