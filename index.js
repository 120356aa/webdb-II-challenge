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
  try {
    const zoos = await db('zoos');
    res.status(200).json(zoos);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ZOO BY ID
server.get('/api/zoos/:id', async (req, res) => {
  try {
    const zoo = await db('zoos')
      .where({ id: req.params.id })
      .first('name');
    res.status(200).json(zoo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST NEW ZOO
server.post('/api/zoos', async (req, res) => {
  try {
    const [id] = await db('zoos').insert(req.body);
    const zoo = await db('zoos')
      .where({ id })
      .first();
    res.status(201).json(zoo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE ZOO
server.put('/api/zoos/:id', async (req, res) => {
  try {
    const newZoo = await db('zoos')
      .where({ id: req.params.id })
      .update(req.body);

    if (newZoo) {
      const zoo = await db('zoos')
        .where({ id: req.params.id })
        .first();
      res.status(200).json(zoo);
    } else {
      res.status(404).json({message: 'Zoo does not exist'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE ZOO
server.delete('/api/zoos/:id', async (req, res) => {
  try {
    const deleteZoo = await db('zoos')
      .where({ id: req.params.id })
      .del();

    if(deleteZoo) {
      res.status(204).end();
    } else {
      res.status(404).json({message: 'Zoo does not exist'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
