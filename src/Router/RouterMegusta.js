'use strict';

require('dotenv').config();
const authFunction = require('../Middleware/AuthToken');
const Databse = require('../Database/queryMegusta');

function endPointMeGusta(router){

    //authFunction el validador del token
    //crear like ruta -> http://localhost:3001/api/addLike
    router.post('/addLike',authFunction,(req, res) => {
        let like = 
            {
                id_megusta:'',
                id_usuario:req.body.id_usuario,
                id_video:req.body.id_video
            }

        Databse.addLike(like, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({message:`Error al ingresar el like`});

            res.status(200).json({success:true, data:data});
        })
    });

    //authFunction el validador del token
    //quitar like ruta -> http://localhost:3001/api/removeLike/:id/:id2
    router.delete('/removeLike/:id/:id2',authFunction,(req, res) => {
        let like = 
            {
                id_usuario:req.params.id,
                id_video:req.params.id2
            }

        Databse.removeLike(like, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({message:`Error al ingresar el like`});

            res.status(200).json({success:true, data:data})
        })
    });

    //comprobar like ruta -> http://localhost:3001/api/checkLike/:id/:id2
    router.get('/checkLike/:id/:id2', (req,res) => {
        let like = 
            {
                id_usuario:req.params.id,
                id_video:req.params.id2
            }
        
        Databse.checkLike(like, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({message:`Error al ingresar el like`});

            res.status(200).json({success:true, data:data})
        })
    });

    //crear videos ruta -> http://localhost:3001/api/countLikeByIdVideo/:id
    router.get('/countLikeByIdVideo/:id', (req, res) => {
        let id = req.params.id;

        Databse.countLikeByIdVideo(id, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({message:`Error al ingresar el like`});

            res.status(200).json({success:true, data:data});
        })
    });


}

module.exports = endPointMeGusta