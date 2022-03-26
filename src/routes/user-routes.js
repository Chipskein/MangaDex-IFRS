const {Router} = require("express");
const router=Router();
const userController=require('../controller/userController.js');


//user
router.get('/logoff',userController.logoff);
//cadastrar
router.post('/cadastrar',userController.cadastrar);
router.post('/login',userController.login);
//detalhes
//router.get('/:id',userController.detalhar);//qualquer um


//admin
//list
//router.get('/',userController.listar);//admin
//pesquisar
//router.post('/',userController.pesquisar);
//remover
//router.get('/delete/:id',userController.deletar);


module.exports=router;