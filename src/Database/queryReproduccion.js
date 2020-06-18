'use strict';

 const conexion = require('./Conection');
 
 //crear reproduccion
 const addReproduction = (rep, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO reproduccion SET ?`, rep,(err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
 }

 //contar reproducciones por video
 const getReproductionByIdVideo = (id, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`SELECT COUNT(*) AS files FROM reproduccion WHERE id_video = ${conexion.escape(id)}`, (err, res) => {
            if(err){
                console.log(err.code);
                callback(err, res);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
 }
 
 module.exports = 
    {
        addReproduction,
        getReproductionByIdVideo
    }