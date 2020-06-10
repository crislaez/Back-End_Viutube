'use strict';

require('dotenv').config();

const express = require('express');

const endPointUsuarios = require('./Router/RouterUsuarios');

const router = express.Router();

const app = express();
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//ruta par alos videos
app.use('/Video', express.static(__dirname + '/Video', {maxAge:'12h'}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');  //el * se cambiara y se pondra la url permitida
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/api',router);

//endpoint para los usuarios
endPointUsuarios(router);

app.listen(process.env.PORT, () => console.log(`Api rest corriendo en :${process.env.URL}`));