'use strict';

const conexion = require('./Conection');

//crear usuario
const addUser = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO usuarios SET ?`, user, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//login
const login = (user, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM usuarios WHERE correo = ${conexion.escape(user.correo)} AND clave = ${conexion.escape(user.clave)}`, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//usuairo por id
const getUserById = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT id_usuario, nombre_completo, nombre_usuario, avatar, banner, correo  FROM usuarios WHERE id_usuario = ${conexion.escape(id)}`,(err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

module.exports = 
    {
        addUser,
        login,
        getUserById
    }