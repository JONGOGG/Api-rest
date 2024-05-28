const {Router} = require ("express");
const controllerVinos = require("../Controllers/ControllerVinos.js")
const router = Router();



// Routes
router.get('/vinos', controllerVinos.mostratTodo)
router.post('/vinos', controllerVinos.insertarVino)
router.delete('/vinos/:id', controllerVinos.borrarVino);
router.put('/vinos/:id', controllerVinos.actualizarVino);

module.exports=router