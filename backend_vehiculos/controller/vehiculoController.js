// roothpath : manejo de rutas de otros modulos del proyecto
// express : modulo que permite gestionar y lanzar servidores
require('rootpath')();
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var db_vehiculo = require("model/vehiculo.js");
const auth = require("config/auth.js");


// -------------------------------------------------------- 
// --rutas de escucha (endpoint) dispoibles para PERSONAS-- 
// -------------------------------------------------------- 
app.get('/', listar); //R
app.get('/:vehiculo_id', buscarPorVehiculoID);
app.post('/', crear); //C
app.put('/:vehiculo_id', actualizar); //U
app.delete('/:vehiculo_id', borrar); //D 

app.post('/fecha', nuevaFecha);


// -------------------------------------------------------- 
// ---------FUNCIONES UTILIZADAS EN ENDPOINTS ------------- 
// --------------------------------------------------------

// --- GET-------------------------------------------------- 

function listar(req, res) {
    db_vehiculo.listar(function (err, resultado) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(resultado);
        }
    });
}

function buscarPorVehiculoID(req, res) {
    db_vehiculo.buscarPorVehiculoID(req.params.vehiculo_id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
}


// --- POST ----------------------------------------------------- 

function crear(req, res) {
    db_vehiculo.crear(req.body, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

function nuevaFecha(req, res) {
    db_vehiculo.crearFecha(req.body.fecha, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });

}




// --- PUT ----------------------------------------------------- 

function actualizar(req, res) {
    let vehiculo_id = req.params.vehiculo_id;
    db_vehiculo.actualizar(req.body, vehiculo_id, (err, resultado) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(resultado);
        }
    });
}

// --- DELETE ----------------------------------------------------- 

function borrar(req, res) {
    let vehiculo_id = req.params.vehiculo_id;
    db_vehiculo.borrar(vehiculo_id, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (result.detail.affectedRows == 0) {
                res.status(404).send(result.message);
            } else {
                res.send(result);
            }
        }
    });
}


module.exports = app;

