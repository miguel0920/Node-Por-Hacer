const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let crearTarea = porHacer.crear(argv.descripcion);
        console.log(crearTarea);
        break;
    case 'listar':
        let listarTareas = porHacer.getListado(argv.completado);
        listarTareas.forEach(tareas => {
            console.log('========= Por Hacer ========='.green);
            console.log(tareas.descripcion);
            console.log('Estado: ', tareas.completado);
            console.log('============================='.green);
        });
        break;
    case 'actualizar':
        let actualizarTarea = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizarTarea);
        break;
    case 'borrar':
        let borrarTarea = porHacer.borrar(argv.descripcion);
        console.log(borrarTarea);
        break;
    default:
        console.log(`Acción incorrecta ${comando}`.red);
        break;
}