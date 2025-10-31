const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');


pokemon.post('/', (req, res) => {
  return res.status(200).send(req.body);
});

pokemon.get('/',async (req, res) => {
    const pkmn=await db.query("SELECT * FROM pokemon");
    return res.status(200).json(pkmn);
});

// Busqueda por ID
pokemon.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id-1); // convierto el parámetro a número
    if (id >= 0 && id <= 722){
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id="+id+";");
        return res.status(200).json(pkmn);
    }
    return res.status(404).send("El pokémon no se encuentró :(");
});

// Busqueda por nombre (name)
pokemon.get('/name/:name', async (req, res) => {
  const name = req.params.name;
    // validar con regex
    if (!/^[A-Za-z]+$/.test(name)) {
        return res.status(400).send("El nombre no es válido");
    } 

    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';");
    if(pkmn.length > 0) {
        return res.status(200).json(pkmn);
    }
    return res.status(404).send("El pokémon no se encontró");
});


module.exports = pokemon;