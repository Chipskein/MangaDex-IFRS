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
router.get('/gerenciar'/*,auth.isLogged,auth.isAdmin*/,userController.getUsersManager)
router.get('/me',auth.isLogged,userController.getUserPerfilSelf)
router.get('/:id',auth.isLogged,userController.getUserPerfil);

//admin
//list
//router.get('/',auth.isLogged,auth.isAdmin,userController.listar);//admin
//pesquisar
//router.post('/',auth.isLogged,auth.isAdmin,userController.pesquisar);
//remover
//router.get('/delete/:id',auth.isLogged,auth.isAdmin,userController.deletar);


module.exports=router;