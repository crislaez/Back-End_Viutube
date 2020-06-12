'use strict'

const conexion = require('./Conection');

const addVideo = (video, callback) => {
    // conexion.connect();
    if(conexion){
        conexion.query(`INSERT INTO videos SET ? `,video, (err, res) => {
            if(err){
                console.log(err.code);
            }else{
                callback(null, res);
            }
        })
    }
    // conexion.end();
}

module.exports = 
    {
        addVideo
    }