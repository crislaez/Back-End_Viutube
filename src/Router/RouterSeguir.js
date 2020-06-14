'use strict';

require('dotenv').config();

const authFunction = require('../Middleware/AuthToken');
const Database = require('../Database/querySeguir');

function endPointFollow(router){

    //authFunction el validador del token
    //crear videos ruta -> http://localhost:3001/api/addFollow
    router.post('/addFollow',authFunction,(req, res) => {
        let follow = 
            {
                id_seguir:'',
                id_usuario_seguido:req.body.id_usuario_seguido,
                id_usuario_seguidor:req.body.id_usuario_seguidor
            }

        Database.addFollow(follow, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
            if(!res) return res.status(404).json({message:`Error al ingresar el seguimiento`});
            
            res.status(200).json({success:true, data:data})
        })
    })
}

module.exports = endPointFollow;

