const express = require('express');
const app = express();
const {pokemon} = require('./pokedex.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  return res.status(200).send('Bienvenido al Pokedex');
});

app.post('/pokemon', (req, res) => {
  return res.status(200).send(req.body);
});

app.get('/pokemon', (req, res) => {
  return res.status(200).send(pokemon);
});

// Busqueda por ID
app.get('/pokemon/:id', (req, res, next) => {
    const id = parseInt(req.params.id-1); // convierto el parámetro a número
    if (id >= 0 && id <= 150){
        return res.status(200).send(pokemon[req.params.id -1]);
    }
    return res.status(404).send("El pokémon no se encuentró :(");
});

// Busqueda por nombre (name)
app.get('/pokemon/name/:name', (req, res) => {
  const name = req.params.name;
    // validar con regex
    if (!/^[A-Za-z]+$/.test(name)) {
        return res.status(400).send("El nombre no es válido");
    } 
    const pk = pokemon.filter((p) =>{
        return(p.name.toUpperCase() == name.toUpperCase()) && p;
    });
    if(pk.length > 0) {
        return res.status(200).send(pk);
    }
    return res.status(404).send("El pokémon no se encontró");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT || 3000}`);
});