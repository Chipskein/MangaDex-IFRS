const fileService=require('../config/fileService');
const { hashSync,compareSync,genSaltSync } = require('bcrypt');
class UserController{
    static cadastrar(req,res){
        const {email,password,image}=req.body;
        const database=fileService.Read();
        let lastid=database.users.length+1;
        const salt=genSaltSync(10);
        const hashPassword=hashSync(password,salt);
        const user={
            id:lastid,
            role:"user",
            email:email,
            password:hashPassword,
            image:image,
            created:new Date(),
            updated:new Date()
        }
        database.users.push(user);
        fileService.Write(database);
        res.redirect('/');
    }
    static login(req,res){
        const database=fileService.Read();
        const {email,password}=req.body;
        const users=database.users;
        const user=users.find(user=>user.email==email)
        const passed=compareSync(password,user.password);
        if(passed){
            delete(user.password);
            req.session.user=user;
            res.redirect('/');
        }
    }
}
module.exports=UserController;