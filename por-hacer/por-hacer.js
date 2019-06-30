const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) {
            throw new Error('Error al guardar la tarea: ', err);
        }
    });
};

const cargar = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
};

const getListado = (completado) => {
    cargar();
    if (completado == 'false') {
        let listadoTareas = listadoPorHacer.filter(estado => estado.completado === false);
        console.log(completado);
        return listadoTareas;
    } else {
        let listadoTareas = listadoPorHacer.filter(estado => estado.completado === true);
        console.log(completado);
        return listadoTareas;
    }

};

const crear = (descripcion) => {
    cargar();
    let porHacer = {
        descripcion,
        completado: false
    };
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
};

const actualizar = (descripcion, completado = true) => {
    cargar();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    cargar();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.pop(index);
        guardarDB();
        return true;
    } else {
        return false;
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};