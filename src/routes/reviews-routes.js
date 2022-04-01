const {Router} = require("express");
const router=Router();
const reviewController=require('../controller/reviewController.js');
const auth = require("../utils/auth.js");

router.post('/',auth.isLogged,reviewController.add_review);
router.get('/:id',auth.isLogged,reviewController.listFromUser);
router.get('/delete/:id',auth.isLogged,reviewController.deletar);
router.get('/edit/:id',auth.isLogged,reviewController.editar);
module.exports=router;