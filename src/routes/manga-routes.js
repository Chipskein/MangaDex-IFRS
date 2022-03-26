const {Router} = require("express");
const router=Router();
const auth=require('../utils/auth');
const mangaController=require('../controller/mangaController.js');
//ADMIN || MODERADOR

//cadastrar
router.get('/cadastrar',auth.isLogged,auth.isAdmin,mangaController.mostrar_cadastrar);
//cadastrar
router.post('/cadastrar',auth.isLogged,auth.isAdmin,mangaController.cadastrar);
//remover
router.get('/delete/:id',auth.isLogged,auth.isAdmin,mangaController.deletar);

//NORMAL
//list
router.get('/',mangaController.listar);
//detalhes
router.get('/:id',mangaController.detalhar);
//pesquisar
router.post('/',mangaController.pesquisar);

//add Review
router.post('/review',auth.isLogged,mangaController.add_review);


module.exports=router;