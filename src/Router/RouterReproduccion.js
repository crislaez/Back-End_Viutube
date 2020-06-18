'use strict';

const Database = require('../Database/queryReproduccion');

function endpointReproduction(router){

    //crear reproduccion ruta -> http://localhost:3001/api/addReproduction
    router.post('/addReproduction',(req, res) => {
        let rep = 
            {
                id_reporduccion:'',
                id_video:req.body.id_video,
            }

        Database.addReproduction(rep, (err, data) => {
            if(err) return res.status(500).json({message: `Error al realizar la peticion`});
            if(!data) return res.status(404).json({message: `Error al ingresar los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

    //contar reproduccion ruta -> http://localhost:3001/api/getReproductionByIdVideo/:id
    router.get('/getReproductionByIdVideo/:id',(req, res) => {
        let id = req.params.id;

        Database.getReproductionByIdVideo(id, (err, data) => {
            if(err) return res.status(500).json({message: `Error al realizar la peticion`});
            if(!data) return res.status(404).json({message: `Error al ingresar los datos`});

            res.status(200).json({success:true, data:data});
        })
    });

}

module.exports = endpointReproduction;