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
//gerencias mangas
router.get('/gerenciar',auth.isLogged,auth.isAdmin,mangaController.gerenciar_mangas);
//editar
router.get('/edit/:id',auth.isLogged,auth.isAdmin,mangaController.mostrar_editar);
//editar
router.post('/edit/:id',auth.isLogged,auth.isAdmin,mangaController.editar);


//NORMAL
//list
router.get('/',mangaController.listar);
//detalhes
router.get('/:id',mangaController.detalhar);


module.exports=router;