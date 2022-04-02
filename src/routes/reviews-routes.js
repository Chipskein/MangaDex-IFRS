const {Router} = require("express");
const router=Router();
const reviewController=require('../controller/reviewController.js');
const auth = require("../utils/auth.js");

router.post('/',auth.isLogged,reviewController.add_review);
router.get('/:id',auth.isLogged,reviewController.listFromUser);
router.get('/delete/:mangaid/:id',auth.isLogged,reviewController.deletar);
router.post('/edit/:mangaid/:id',auth.isLogged,reviewController.editar);
router.get('/edit/:mangaid/:id',auth.isLogged,reviewController.mostrar_editar);
module.exports=router;