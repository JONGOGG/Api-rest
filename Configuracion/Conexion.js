const mysql2 = require('mysql2/promise');
// Config
const conection = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'VinosJoan'
});

// Conectar a la base de datos
conection.getConnection().then(event =>{
    console.log('Conectado a la base de datos');
}).catch(err=>{
    console.log('Error al conectar a la base de datos', err);
});

// Exportar la conexión
module.exports = conection;



