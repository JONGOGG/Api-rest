const express = require('express');
const  app = express();
const cors = require('cors');  // Permitir de origen cruzado
const port = process.env.PORT || 3000; // Puerto por defecto
const router = require('./routes/RutasVinos');
const morgan = require('morgan');

// Middlewares
app.use(cors());
app.use(express.static('public'));//para utilizar la carpeta publica
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'))


app.use(('/Api'), router); 

app.listen(port, () =>{
    console.log(`El servidor esta corriendo en el puerto ${port}`)
});
