const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3',
  }
}
const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// GET ALL ZOOS
server.get('/api/zoos', async (req, res) => {

});

// GET ZOO BY ID
server.get('/api/zoos/:id', async (req, res) => {

});

// POST NEW ZOO
server.post('/api/zoos', async (req, res) => {

});

// UPDATE ZOO
server.put('/api/zoos/:id', async (req, res) => {

});

// DELETE ZOO
server.delete('/api/zoos/:id', async (req, res) => {

});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
