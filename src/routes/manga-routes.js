const {Router} = require("express");
const router=Router();
const mangaController=require('../controller/mangaController.js');
//ADMIN || MODERADOR

//cadastrar
router.get('/cadastrar',mangaController.mostrar_cadastrar);
//cadastrar
router.post('/cadastrar',mangaController.cadastrar);
//remover
router.get('/delete/:id',mangaController.deletar);

//NORMAL
//list
router.get('/',mangaController.listar);
//detalhes
router.get('/:id',mangaController.detalhar);
//pesquisar
router.post('/',mangaController.pesquisar);

//add Review
router.post('/review',mangaController.add_review);


module.exports=router;