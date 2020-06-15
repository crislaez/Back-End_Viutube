'use strict';

const conexion = require('./Conection');

//crear segumiento
const addFollow = (follow, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO seguir SET ?`,follow, (err, res) => {
            if(err){
                console.log(err.code)
                callback(err, res);
             }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//dejas de seguir
const removeFollow = (follow, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`DELETE FROM seguir WHERE id_usuario_seguido = ${conexion.escape(follow.id_usuario_seguido)} AND id_usuario_seguidor = ${conexion.escape(follow.id_usuario_seguidor)}`, (err, res) => {
            if(err){
                console.log(err.code)
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//comprobar si se sigue a un usuario
const checkFollow = (follow, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM seguir WHERE id_usuario_seguido = ${conexion.escape(follow.id_usuario_seguido)} AND id_usuario_seguidor = ${conexion.escape(follow.id_usuario_seguidor)}`, (err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//conseguir todos los usuarios seguidos por seguidor
const getFollowByIdUser = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT seguir.id_seguir, seguir.id_usuario_seguido, seguir.id_usuario_seguidor, usuarios.nombre_usuario, usuarios.avatar FROM seguir INNER JOIN usuarios ON seguir.id_usuario_seguido = usuarios.id_usuario WHERE id_usuario_seguidor = ${conexion.escape(id)}`, (err, res) => {
            if(err){
                console.log(err.code);
                callback(err,res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}


module.exports = 
    {
        addFollow,
        removeFollow,
        checkFollow,
        getFollowByIdUser
    }