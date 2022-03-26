const {Router} = require("express");
const router=Router();
const userController=require('../controller/userController.js');
const auth = require("../utils/auth.js");

//user
router.get('/logoff',auth.isLogged,userController.logoff);
//cadastrar
router.post('/cadastrar',userController.cadastrar);
router.post('/login',userController.login);
//detalhes
router.get('/me',auth.isLogged,userController.getUserPerfilSelf)
router.get('/:id',auth.isLogged,userController.getUserPerfil);


//admin
//list
//router.get('/',userController.listar);//admin
//pesquisar
//router.post('/',userController.pesquisar);
//remover
//router.get('/delete/:id',userController.deletar);


module.exports=router;