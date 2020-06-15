'use strict';

const conexion = require('./Conection');

//dar nomegusta
const addDislike = (dislike, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO nomegusta SET ? `,dislike, (err, res) => {
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

//quitar dislike
const removeDislike = (dislike, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`DELETE FROM nomegusta WHERE id_usuario = ${conexion.escape(dislike.id_usuario)} AND id_video = ${conexion.escape(dislike.id_video)}`, (err, res) => {
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

//comprobar dislike
const checkDislike = (dislike, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM nomegusta WHERE id_usuario = ${conexion.escape(dislike.id_usuario)} AND id_video = ${conexion.escape(dislike.id_video)}`, (err, res) => {
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

//contar dislike
const countDislikeByIdVideo = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT COUNT(*) AS files FROM nomegusta WHERE id_video = ${conexion.escape(id)}`, (err, res) => {
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
        addDislike,
        removeDislike,
        checkDislike,
        countDislikeByIdVideo
    }