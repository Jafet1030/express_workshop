const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');

app.get('/', (req, res) => {
  res.status(200);
  res.send('Bienvenido al Pokedex');
});

app.get('/pokemon/all', (req, res) => {
  res.status(200);
  res.send(pokemon);
});

app.get('/pokemon/:id', (req, res) => {
  const id = req.params.id - 1;
  if (id >= 0 && id < pokemon.length) {
    res.status(200);
    return res.send(pokemon[req.params.id - 1]);
  }else {
    res.status(404);
    res.send('No se encontró el pokemon');
  }
});

app.get('/pokemon/:name', (req, res) => {
  const name = req.params.name;
  for(i = 0; i < pokemon.length; i++) {
    if (pokemon[i].name == name) {
      res.status(200);
      res.send(pokemon[i]);
    }
  }
  res.status(404);
  res.send('No se encontró el pokemon');
});



app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});