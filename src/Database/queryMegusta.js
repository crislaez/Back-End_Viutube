'use strict';

const conexion = require('./Conection');

//dar like a un video
const addLike = (like, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO megusta SET ?`, like, (err, res) => {
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

//quitar like
const removeLike = (like, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`DELETE FROM megusta WHERE id_usuario = ${conexion.escape(like.id_usuario)} AND id_video = ${conexion.escape(like.id_video)}`, (err, res) => {
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

//comprobar like
const checkLike = (like, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM megusta WHERE id_usuario = ${conexion.escape(like.id_usuario)} AND id_video = ${conexion.escape(like.id_video)}`, (err, res) => {
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

//cantidad de like por video
const countLikeByIdVideo = (id,callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT COUNT(*) AS files FROM megusta WHERE id_video = ${conexion.escape(id)}`, (err, res) => {
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


module.exports = 
    {
        addLike,
        removeLike,
        checkLike,
        countLikeByIdVideo
    }