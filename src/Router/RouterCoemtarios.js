'use strict';

require('dotenv').config();

const authFunction = require('../Middleware/AuthToken');
const Database = require('../Database/queryComentarios');

function endPointComentarios(router){

    //authFunction el validador del token
    //crear comentario ruta -> http://localhost:3001/api/addComent
    router.post('/addComent',authFunction, (req, res) => {
        let coment = 
            {
                id_comentario:'',
                id_video:req.body.id_video,
                id_usuario:req.body.id_usuario,
                fecha_comentario:req.body.fecha_comentario,
                texto_comentario:req.body.texto_comentario
            }

        Database.addComent(coment, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message:`Error al ingresar el comentario`});

            res.status(200).json({success:true, data:data});
        })
    });

    //mostrar comentarios por video ruta -> http://localhost:3001/api/getAllComentByIdVideo/:id
    router.get('/getAllComentByIdVideo/:id', (req, res) => {
        let id = req.params.id;

        Database.getAllComentByIdVideo(id, (err, data) => {
            res.status(200).json({success:true, data:data})
        })
    });
    
}

module.exports = endPointComentarios;
