'use strict'

const conexion = require('./Conection');

// agregar videos 
const addVideo = (video, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO videos SET ? `,video, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

// videos por id usuario
const getVideosByIdUser = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM videos WHERE id_usuario = ${conexion.escape(id)}`, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

//video por id video
const getVideoByIdVideo = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM videos INNER JOIN usuarios ON videos.id_usuario = usuarios.id_usuario WHERE videos.id_video = ${conexion.escape(id)}`, (err, res) => {
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
        addVideo,
        getVideosByIdUser,
        getVideoByIdVideo
    }