const express = require('express');
const cors = require('cors');
const { uuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  // TODO
  return response.json(repositories);
});

app.post('/repositories', (request, response) => {
  // TODO
  const { url, title, techs } = request.body;

  const repository = { id: uuid(), url, title, techs, likes: 0 };
  repositories.push(repository);

  return response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
  // TODO
  const { id } = request.params;
  const { url, title, techs, likes } = request.body;
  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  const repository = { id, url, title, techs, likes };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

app.delete('/repositories/:id', (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  // TODO
  const { id } = request.params;
  const repositoryIndex = repositories.findIndex(repo => repo.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  const { url, title, techs } = repositories[repositoryIndex];
  let { likes } = repositories[repositoryIndex];

  likes++;

  const repository = { id, url, title, techs, likes };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

module.exports = app;
