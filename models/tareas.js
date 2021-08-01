const { v4: uuidv4 } = require('uuid');
const Tarea = require('./tarea');
const colors = require('colors');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    constructor(desc) {
        this._listado = {};
    }

    borrarTarea(id = ''){
        if (this._listado[id]) delete this._listado[id];
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, index) => {
            const {desc, completadoEn} = tarea;
            const numeroTarea = completadoEn ? colors.green(index + 1) : colors.red(index + 1);
            const completado = completadoEn ? 'Completado'.green : 'No completado'.red;
            console.log(numeroTarea, desc, completado);
        });
    }

    listarPendientesCompletadas(completadas = true) {
        console.log();
        this.listadoArr.forEach((tarea, index) => {
            const {desc, completadoEn} = tarea;
            const numeroTarea = completadoEn ? colors.green(index + 1) : colors.red(index + 1);
            const completado = completadoEn ? 'Completado'.green : 'No completado'.red;
            if (completadas && completado === 'Completado'.green) console.log(numeroTarea, desc, completado, completadoEn);
            if (!completadas && completado === 'No completado'.red) console.log(numeroTarea, desc, completado);
        });
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}

module.exports = Tareas;