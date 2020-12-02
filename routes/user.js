const express = require('express');
const jwt = require('jsonwebtoken')
const user = express.Router();
const db = require('../config/database')


user.post("/signin", async (req, res, next) => {
    const {user_name, user_lastname, user_phone, user_address, user_mail, user_password} = req.body

    if (user_name && user_mail && user_password && user_lastname && user_phone && user_address) {
        let query = "INSERT INTO user(user_name, user_lastname, user_phone, user_address, user_mail, user_password) ";
        query += `VALUES ('${user_name}', '${user_lastname}' , '${user_phone}' , '${user_address}' , '${user_mail}' , '${user_password}')`;

        const rows =  await db.query(query)

        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Usuario registrado correctamente"})
        }
        return res.status(500).json({code: 500, message:"Ocurrió un error"})    
    }
    return res.status(500).json({code: 500, message:"Campos incompleto"}) 
    
})

user.post("/login", async (req, res, next) => {
    const { user_mail, user_password } = req.body
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}';`;
    const rows = await db.query(query)

    if (user_mail && user_password){
        if(rows.length == 1){
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey")
            return res.status(200).json({code: 200, message: token})
        }else {
            return res.status(200).json({code: 401, message:"Datos incorrectos"})
        }
    }
    return res.status(500).json({code: 500, message:"Campos incompleto"})
    
})

user.get("/", async (req, res, next) => {
    const query = await db.query("SELECT * FROM user")

    return res.status(200).json({code: 200, message: query});
})
user.get("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = await db.query(`SELECT * FROM user WHERE user_id=${req.params.id}`)

    return res.status(200).json({code: 200, message: query});
})

user.get("/:name([A-Za-z]+)", async (req, res, next) => {
    const query = await db.query(`SELECT * FROM user WHERE user_name LIKE '%${req.params.name}%'`)
    

    return res.status(200).json({code: 200, message: query});
})

user.delete("/:id([0-9]{1,3})", async (req, res, next) => {
    const query = await db.query(`DELETE FROM user WHERE user_id=${req.params.id}`)
    if(query.affectedRows == 1){
        return res.status(201).json({code: 201, message: "Usuario eliminado"})
    }
    return res.status(500).json({code: 500, message:"Ocurrió un error"})   

    // return res.status(200).json({code: 200, message: query});
})

user.put("/:id([0-9]{1,3})", async (req, res, next) =>{
    const {user_name, user_lastname, user_phone, user_address, user_mail, user_password} = req.body
    if (user_name && user_mail && user_password && user_lastname && user_phone && user_address) {
        let query = `UPDATE user SET user_name='${user_name}', user_lastname='${user_lastname}', user_phone='${user_phone}',
                     user_address='${user_address}', user_mail='${user_mail}', user_password='${user_password}' WHERE user.user_id=${req.params.id}` ;
        const rows =  await db.query(query)

        if(rows.affectedRows == 1){
            return res.status(201).json({code: 201, message: "Usuario modificado correctamente"})
        }
        return res.status(500).json({code: 500, message:"Ocurrió un error"})    
    }
    return res.status(500).json({code: 500, message:"Campos incompleto"}) 
    
})

module.exports = user;