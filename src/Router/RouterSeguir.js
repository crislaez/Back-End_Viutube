'use strict';

require('dotenv').config();

const authFunction = require('../Middleware/AuthToken');
const Database = require('../Database/querySeguir');

function endPointFollow(router){

    //authFunction el validador del token
    //seguir ruta -> http://localhost:3001/api/addFollow
    router.post('/addFollow',authFunction,(req, res) => {
        let follow = 
            {
                id_seguir:'',
                id_usuario_seguido:req.body.id_usuario_seguido,
                id_usuario_seguidor:req.body.id_usuario_seguidor
            }

        Database.addFollow(follow, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message:`Error al ingresar el seguimiento`});
            
            res.status(200).json({success:true, data:data})
        })
    });

    //authFunction el validador del token
    //dejar de seguir ruta -> http://localhost:3001/api/removeFollow/:id/:id2
    router.delete('/removeFollow/:id/:id2',authFunction, (req, res) => {
        let follow = 
            {
                id_usuario_seguido:req.params.id,
                id_usuario_seguidor:req.params.id2
            }

        Database.removeFollow(follow, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message:`Error al ingresar el seguimiento`});
            
            res.status(200).json({success:true, data:data});
        })
    });

    //comprobar si 2 usuarios se siguen ruta -> http://localhost:3001/api/checkFollow/:id/:id2
    router.get('/checkFollow/:id/:id2', (req, res) => {
        let follow = 
            {
                id_usuario_seguido:req.params.id,
                id_usuario_seguidor:req.params.id2
            }

        Database.checkFollow(follow, (err, data) => {
            if(err) return res.status(500).json({message: `Error al realizar la peticion:${err}`});
            if(!data) return res.status(404).json({message: `Error al comprobar el seguimiento`});

            res.status(200).json({success:true, data:data});
        })
    });

     //conseguir todos los usuarios que se suige ruta -> http://localhost:3001/api/getFollowByIdUser/:id
     router.get('/getFollowByIdUser/:id', (req, res) => {
         let id = req.params.id;

         Database.getFollowByIdUser(id, (err, data) => {
             if(err) return res.status(500).json({message: `Error al realizar la peticion:${err}`});
             if(!data) return res.status(404).json({message: `Error al comprobar el seguimiento`});

             res.status(200).json({success:true, data:data});
         })
     });

}

module.exports = endPointFollow;

