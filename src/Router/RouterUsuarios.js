'use strict';

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: __dirname + '/../Video'}) /// ./Video es pa carpeta donde se subira la foto

const Database = require('../Database/queryUsuario');

function endPointUsuarios(router){

    //crear usuarios ruta -> http://localhost:3001/api/addUser
    router.post('/addUser',multipartMiddleware, (req, res) => {
        let aux = req.files.avatar.path.split('\\');
        let aux2 = req.files.banner.path.split('\\');

        let user = 
            {
                id_usuario:'',
                nombre_completo:req.body.nombre_completo,
                nombre_usuario:req.body.nombre_usuario,
                fecha:req.body.fecha,
                avatar:'http://localhost:3001/Video/'+aux[8],
                banner:'http://localhost:3001/Video/'+aux2[8],
                correo:req.body.correo,
                clave:req.body.clave,
            };
           
        Database.addUser(user, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message:`Error al ingresar usuario`});

            res.status(200).json({success:true, data:data});
        })
    });

    //login ruta -> http://localhost:3001/api/login
    router.post('/login', (req, res) => {
        let user = 
            {
                correo:req.body.correo,
                clave:req.body.clave
            }

        Database.login(user, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message:`Error al devolver el usuario usuario`});

            res.status(200).json({success:true, data:data});
        })
    });

    //usuario por id ruta -> http://localhost:3001/api/getUserById/:id
    router.get('/getUserById/:id',(req, res) => {
        let id = req.params.id;

        Database.getUserById(id, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message:`Error al ingresar usuario`});

            res.status(200).json({success:true, data:data});
        })
    });
}

module.exports = endPointUsuarios;