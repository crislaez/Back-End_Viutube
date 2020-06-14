'use strict'

const conexion = require('./Conection');

// agregar videos 
const addVideo = (video, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO videos SET ? `,video, (err, res) => {
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

// videos por id usuario
const getVideosByIdUser = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM videos WHERE id_usuario = ${conexion.escape(id)}`, (err, res) => {
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

//video por id video
const getVideoByIdVideo = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT * FROM videos INNER JOIN usuarios ON videos.id_usuario = usuarios.id_usuario WHERE videos.id_video = ${conexion.escape(id)}`, (err, res) => {
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

//todos los videos
const getAllVideo = (callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT videos.id_video, videos.id_usuario,videos.titulo_video, videos.descripcion_video, videos.video, videos.fecha_video, usuarios.nombre_usuario, usuarios.avatar FROM videos INNER JOIN usuarios WHERE videos.id_usuario = usuarios.id_usuario ORDER BY videos.id_video DESC`, (err, res) => {
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

//mostrar 10 videos para el AsideLeft
const get10Video = (callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT videos.id_video, videos.id_usuario, videos.titulo_video, videos.descripcion_video, videos.video,videos.fecha_video, usuarios.nombre_usuario, usuarios.avatar FROM videos INNER JOIN usuarios ON videos.id_usuario = usuarios.id_usuario LIMIT 10`, (err, res) => {
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
        addVideo,
        getVideosByIdUser,
        getVideoByIdVideo,
        getAllVideo,
        get10Video
    }