'use strict';

require('dotenv').config();

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({uploadDir: __dirname + '/../Video'}) /// ./Video es pa carpeta donde se subira la foto

const Database = require('../Database/queryVideos');

function endPointVideo(router){

    //crear videos ruta -> http://localhost:3001/api/addVideo
    router.post('/addVideo',multipartMiddleware, (req, res) => {
        let aux = req.files.video.path.split('\\');
        
        let video = 
            {
                id_video:'',
                id_usuario:req.body.id_usuario,
                titulo_video:req.body.titulo_video,
                descripcion_video:req.body.descripcion_video,
                video:process.env.RUTA+'/Video/'+aux[8],
                fecha_video:req.body.fecha_video
            }

        Database.addVideo(video, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message:`Error al ingresar el video`});

            res.status(200).json({success:true, data:data})
        })
    });

    //videos por id usuario ruta -> http://localhost:3001/api/getVideosByIdUser
    router.get('/getVideosByIdUser/:id', (req, res) => {
        let id = req.params.id;

        Database.getVideosByIdUser(id, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message:`Error al mostrar los video`});

            res.status(200).json({success:true, data:data});
        })
    });

    //videos por id video ruta -> http://localhost:3001/api/getVideoByIdVideo/:id
    router.get('/getVideoByIdVideo/:id', (req, res) => {
        let id = req.params.id;

        Database.getVideoByIdVideo(id, (err, data) => {
            if(err) return res.status(500).json({message:`Error al realizar la peticion: ${err}`});
            if(!data) return res.status(404).json({message:`Error al mostrar los video`});

            res.status(200).json({success:true, data:data});
        })
    });
}

module.exports = endPointVideo;