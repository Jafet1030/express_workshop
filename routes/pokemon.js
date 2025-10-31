const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');


pokemon.post('/', async (req, res) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    
    if(pok_name && pok_height && pok_weight && pok_base_experience) {
        let query = "INSERT INTO pokemon(pok_name, pok_height, pok_weight, pok_base_experience)";
        query += `VALUES ('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience});`;
        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(201).json({code: 201, message: "Pokémon creado exitosamente"});
        }
        return res.status(500).json({code: 500, message: "Error al crear el Pokémon"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});
});

pokemon.get('/',async (req, res) => {
    const pkmn=await db.query("SELECT * FROM pokemon");
    return res.status(200).json({code: 200, message: pkmn});
});

// Busqueda por ID
pokemon.get('/:id', async (req, res, next) => {
    const id = parseInt(req.params.id-1); // convierto el parámetro a número
    if (id >= 0 && id <= 722){
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id="+id+";");
        return res.status(200).json({code: 200, message: pkmn});
    }
    return res.status(404).json({code: 404, message: "El pokémon no se encontró"});
});

// Busqueda por nombre (name)
pokemon.get('/name/:name', async (req, res) => {
  const name = req.params.name;
    // validar con regex
    if (!/^[A-Za-z]+$/.test(name)) {
        return res.status(400).json({code: 400, message: "El nombre no es válido"});
    } 

    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+name+"';");
    if(pkmn.length > 0) {
        return res.status(200).json({code: 200, message: pkmn});
    }
    return res.status(404).json({code: 404, message: "El pokémon no se encontró"});
});


module.exports = pokemon;