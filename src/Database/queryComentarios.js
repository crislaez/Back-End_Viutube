'use strict';

const conexion = require('./Conection');

const addComent = (coment, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO comentarios SET ?`, coment, (err, res) => {
            if(err){
                console.log(err.code);                
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
};

//mostrar comentarios por video
const getAllComentByIdVideo = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT comentarios.id_comentario, comentarios.fecha_comentario, comentarios.texto_comentario, comentarios.id_video, comentarios.id_usuario, usuarios.nombre_usuario, usuarios.avatar FROM comentarios INNER JOIN videos ON comentarios.id_video = videos.id_video INNER JOIN usuarios ON comentarios.id_usuario = usuarios.id_usuario WHERE comentarios.id_video = ${conexion.escape(id)}`, (err, res) => {
            if(err){
                console.log(err.code);                
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
};

module.exports = 
    {
        addComent,
        getAllComentByIdVideo   
    }