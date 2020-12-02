const express = require('express');
const pokemon = express.Router();
// const pk = require('../pokedex.json').pokemon;

const db = require('../config/database')

pokemon.post("/", async (req, res, next) =>{
    const {pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = "INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query += `VALUES ('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;
        const rows = await db.query(query)

        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message:"Pokemon insertado correctamente"})
        }
        
        return res.status(500).json({code: 500, message:"Ocurrio un error"})
    }
    
    return res.status(500).json({code: 500, message:"Campos incompletos"})
    
});
// / : especificando que es una variable y no un valor estatico 
// importante el orden 

pokemon.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    // const query = `DELETE FROM pokemon WHERE pok_id=${req.params.id}`;
    // const rows = await db.query(query);
    // console.log(query)
    console.log("aquiiiiiii")
    // if(rows.affectedRows == 1){
    //     return res.status(200).json({code: 200, message: "Pokemon borrado correctamente"})
    // }
    return res.status(404).json({code: 404, message: "Pokemon no encontrado"})
});

pokemon.put("/:id([0-9]{1,3})", async (req, res, next) => {
    const {pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience){
        let query = `UPDATE pokemon SET pok_name='${pok_name}', pok_height=${pok_height},`;
        query += `pok_weight=${pok_weight}, pok_base_experience=${pok_base_experience} WHERE pok_id=${req.params.id};`;
        const rows = await db.query(query)

        if(rows.affectedRows == 1){
            return res.status(200).json({code: 200, message:"Pokemon actualizado correctamente"})
        }
        
        return res.status(500).json({code: 500, message:"Ocurrio un error"})
    }
    
    return res.status(500).json({code: 500, message:"Campos incompletos"})   
})

pokemon.patch("/:id([0-9]{1,3})", async (req, res, next) => {

        if(req.body.pok_name){
            let query = `UPDATE pokemon SET pok_name='${req.params.pok_name}' WHERE pok_id=${req.params.id};`;
            const rows = await db.query(query)
    
            if(rows.affectedRows == 1){
                return res.status(200).json({code: 200, message:"Pokemon actualizado correctamente"})
            }
            return res.status(500).json({code: 500, message: "Ocurrio un error"})
        }
        return res.status(500).json({code: 500, message: "Campos incompletos"})
       
})

pokemon.get("/", async (req, res, next) =>{
// req obtemer la variable de la url
    // req.params.name;
    const pkmn = await db.query("SELECT * FROM user")

    return res.status(200).json({code: 200, message: pkmn});
})

pokemon.get('/:id([0-9]{1,3})', async (req, res, next) =>{
    const id = req.params.id;
    if(id >= 1 && id <= 723){
        const pkmn = await db.query("SELECT * FROM pokemon where pok_id =" + id)
        return res.status(200).json({code: 200, message: pkmn});
    } else{
        return res.status(200).send({code: 404, message: "Pokemon no encontrado"})
    }
    
})

pokemon.get('/:name([A-Za-z]+)', async (req, res, next) =>{
    const name = req.params.name
    const pkmname = await db.query("SELECT * FROM pokemon where pok_name = '"+ name +"' ")

    if(pkmname.length > 0){
        return res.status(200).json({code: 200, message: pkmname});
    } else{
        return res.status(200).send({code: 404, message: "Pokemon no encontrado"})
    }

     // condicion ? valor si verdadero : valor si falso 

    // (pkmn.length > 0) ? res.status(200).send(pkmn) : res.status(400).send("Pokemon no encontrado")

} )

// exportas cosas solo una opcion 
module.exports = pokemon;