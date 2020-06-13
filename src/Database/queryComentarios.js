'use strict';

const conexion = require('./Conection');

const addComent = (coment, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO comentarios SET ?`, coment, (err, res) => {
            if(err){
                console.log(err.code);
                if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
                if(!res) return res.status(404).json({message:`Error al ingresar el comentario`});
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
                console.log(err.code)
                if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
                if(!data) return res.status(404).json({message:`Error al recuperar los comentarios`});
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