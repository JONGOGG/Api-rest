const conection = require('../Configuracion/Conexion')

const mostratTodo = async (req, res) => {
    try {
        const [result, fields] = await conection.query('SELECT * FROM Vinos')
        return res.status(200).send({
            message: "Listado de vinos",
            data: result
        })
    } catch (error) {
        return res.status(400).send({
            message: "error de Listado de vinos",
            data: result
        })
    }
}

const insertarVino = async (req, res) => {
    const { nombre, descripcion, existencia, precio, provedor } = req.body;

    if (!nombre || !descripcion || !existencia || !precio || !provedor) {
        return res.status(400).send({
            message: "Inserta todos los datos",
        });
    }

    try {
        const query = 'INSERT INTO Vinos (nombre, descripcion, existencia, precio, provedor) VALUES (?, ?, ?, ?, ?)';
        const values = [nombre, descripcion, existencia, precio, provedor];
        const [result, fields] = await conection.query(query, values);

        return res.status(200).send({
            message: "Vino insertado con éxito",
            data: { id: result.insertId, nombre, descripcion, existencia, precio, provedor },
        });
    } catch (error) {
        return res.status(404).send({
            message: "Error al insertar el vino",
            error: error.message,
        });
    }
};

const borrarVino = async (req, res) => {
    const { id } = req.params;

    // Condición if para verificar que el campo id sea obligatorio
    if (!id) {
        return res.status(400).send({
            message: "Proporciona el ID del vino a borrar",
        });
    }

    try {
        const query = 'DELETE FROM Vinos WHERE id = ?';
        const [result, fields] = await conection.query(query, [id]);

        // Verificar si algún registro fue afectado (si se borró algún vino)
        if (result.affectedRows === 0) {
            return res.status(404).send({
                message: "Vino no encontrado",
            });
        }

        return res.status(202).send({
            message: "Vino borrado con éxito",
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error al borrar el vino",
            error: error.message,
        });
    }
};

const actualizarVino = async (req, res) => {
    const { nombre, descripcion, precio, existencia, provedor } = req.body;
    const { id } = req.params;

    // Condición if para verificar que todos los campos sean obligatorios
    if (!id) {
        return res.status(400).send({
            message: "Proporciona el ID del vino a actualizar",
        });
    }

    if (!nombre || !descripcion || !precio || !existencia || !provedor) {
        return res.status(400).send({
            message: "Inserta todos los datos del vino",
        });
    }

    const query = 'UPDATE Vinos SET nombre = ?, descripcion = ?, precio = ?, existencia = ?, provedor = ? WHERE id = ?;';

    try {
        const [result] = await conection.query(query, [nombre, descripcion, precio, existencia, provedor, id]);

        if (result.affectedRows === 0) {
            return res.status(404).send({
                message: "Vino no encontrado",
            });
        }

        return res.status(200).send({
            message: "Vino actualizado correctamente",
            data: result
        });
    } catch (error) {
        return res.status(500).send({
            message: "Error al actualizar el vino",
            error: error.message
        });
    }
};

module.exports = {
    actualizarVino,
};


module.exports = {
    mostratTodo,
    insertarVino,
    borrarVino,
    actualizarVino
}