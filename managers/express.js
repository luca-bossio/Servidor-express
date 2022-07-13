const fs = require("fs");

const path = "carpeta/productos.json"

class contenedor {

    getAll = async () => {
        try {
            if (fs.existsSync(path)) {
                let fileData = await fs.promises.readFile(path, 'utf-8');
                let productos = JSON.parse(fileData)
                return productos;
            } else {
                return [];
            }
        } catch (err) {
            console.log("El error es:" + err)
        };
    }

    save = async (producto) => {
        try {
            let productos = await this.getAll();
            if (productos.length === 0) {
                producto.id = 1;
                productos.push(producto);
                await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'));
            } else {
                producto.id = productos[productos.length - 1].id + 1;
                console.log("Fue agregado con el siguiente id:" + producto.id)
                productos.push(producto);
                await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'));
            }
        } catch (err) {
            console.log("Cannot write file: " + err)
        }

    }

    getById = async (id) => {
        try {
            let productos = await this.getAll();
            if (id - 1 < productos.length) {
                console.log(productos[[id - 1]])
            } else {
                console.log(null)
            }

        } catch (err) {
            console.log("getById =>" + err)
        }
    }

    deletById = async (id) => {
        try {
            let productos = await this.getAll();
            if (id - 1 < productos.length) {
                productos.splice(id - 1, 1)
                await fs.promises.writeFile(path, JSON.stringify(productos, null, '\t'));
            } else {
                console.log(null)
            }

        } catch (err) {
            console.log("getById =>" + err)
        }
    }

    deletAll = async () => {
        try {
            await fs.promises.writeFile(path, "[]");
        } catch (err) {
            console.log(err)
        }
    }


}

module.exports = contenedor;