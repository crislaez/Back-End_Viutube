'use strict';

require('dotenv').config();
const authFunction = require('../Middleware/AuthToken');
const Database = require('../Database/queryNomegusta');

function endPopintNomegusta(router){
    
    //authFunction el validador del token
    //crear likes ruta -> http://localhost:3001/api/addDislike
    router.post('/addDislike',authFunction,(req, res) => {
        let dislike = 
            {
                id_nomegusta:'',
                id_usuario:req.body.id_usuario,
                id_video:req.body.id_video
            }

        Database.addDislike(dislike, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({message:`Error al ingresar el dislike`})
            
            res.status(200).json({success:true, data:data});
        })
    });

    //authFunction el validador del token
    //quitar dislike ruta -> http://localhost:3001/api/removeDislike/:id/:id2
    router.delete('/removeDislike/:id/:id2',authFunction, (req, res) => {
        let dislike = 
            {
                id_usuario:req.params.id,
                id_video:req.params.id2
            }

        Database.removeDislike(dislike, (err, data) => {
            if(err) return res.status(500).json({message: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).josn({message: `Error al borrar el dislike`});

            res.status(200).json({success:true, data:data})
        })
    });

    //comprobar dislike ruta -> http://localhost:3001/api/addDislike/:id/:id2
    router.get('/checkDislike/:id/:id2', (req, res) => {
        let dislike = 
            {
                id_usuario:req.params.id,
                id_video:req.params.id2
            }

        Database.checkDislike(dislike, (err, data) => {
            if(err) return res.status(500).json({message: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).josn({message: `Error al comprobar el dislike`});

            res.status(200).json({success:true, data:data})
        })
    });

    //cantidad dislike ruta -> http://localhost:3001/api/countDislikeByIDVideo/:id
    router.get('/countDislikeByIdVideo/:id', (req, res) => {
        let id = req.params.id;

        Database.countDislikeByIdVideo(id, (err, data) => {
            if(err) return res.status(500).json({message: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).josn({message: `Error al comprobar los dislike`});

            res.status(200).json({success:true, data:data})
        })
    });


}

module.exports = endPopintNomegusta;