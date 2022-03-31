const {Router} = require("express");
const router=Router();
const userController=require('../controller/userController.js');
const auth = require("../utils/auth.js");

//user
router.get('/logoff',auth.disableCache,auth.isLogged,userController.logoff);
//cadastrar
router.post('/cadastrar',userController.cadastrar);
router.post('/login',userController.login);
//detalhes
router.get('/gerenciar',auth.disableCache,auth.isLogged,auth.isAdmin,userController.getUsersManager)
router.get('/me',auth.disableCache,auth.isLogged,userController.getUserPerfilSelf)
router.get('/:id',auth.disableCache,auth.isLogged,userController.getUserPerfil);
//remover
router.get('/delete/:id',auth.disableCache,auth.isLogged,auth.isAdmin,userController.deletar);
module.exports=router;