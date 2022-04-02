const {Router} = require("express");
const router=Router();
const userController=require('../controller/userController.js');
const auth = require("../utils/auth.js");

router.get('/despromote/:id',auth.disableCache,auth.isLogged,auth.isAdmin,userController.despromote)
router.get('/promote/:id',auth.disableCache,auth.isLogged,auth.isAdmin,userController.promote);
//user
router.get('/logoff',auth.disableCache,auth.isLogged,userController.logoff);
//cadastrar
router.post('/register',auth.disableCache,auth.isNotLogged,userController.cadastrar);
router.post('/login',auth.disableCache,auth.isNotLogged,userController.login);

router.get('/register',auth.disableCache,auth.isNotLogged,userController.mostrar_cadastrar);
router.get('/login',auth.disableCache,auth.isNotLogged,userController.mostrar_login);
//detalhes
router.get('/gerenciar',auth.disableCache,auth.isLogged,auth.isAdmin,userController.getUsersManager)
router.get('/:id',auth.disableCache,auth.isLogged,userController.getUserPerfil);
//remover
router.get('/edit/:id',auth.disableCache,auth.isLogged,userController.mostrar_editar);
router.post('/edit/:id',auth.disableCache,auth.isLogged,userController.editar);
//remover
router.get('/delete/:id',auth.disableCache,auth.isLogged,userController.deletar);
module.exports=router;