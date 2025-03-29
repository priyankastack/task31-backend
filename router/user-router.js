const express=require('express');
const router=express.Router();
const {registration,login,users}=require('../controller/controller');
const authmiddelware =require('../middleware/auth-middleware');


router.route('/register').post(registration);
router.route('/login').post(login);
router.route('/users').get( authmiddelware,users);





module.exports=router;