const fileService=require('../utils/fileService');
const { hashSync,compareSync} = require('bcrypt');
class UserController{
    static cadastrar(req,res){
        const {email,password,image,name}=req.body;
        const database=fileService.Read();
        let lastid=database.users.length+1;
        const hashPassword=hashSync(password,10);
        const user={
            id:lastid,
            role:"user",
            name:name,
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
        if(user&&password){
            const passed=compareSync(password,user.password);
            if(passed){
                req.session.user=user;
                res.redirect('/');
            }
            else{
                console.log("SENHA INVÀLIDA");
            }
        }
        else{
            console.log('user nao encontrado')
            res.redirect('/login.html');
        }
    }
    static logoff(req,res){
        if(req.session.user){
            req.session.user=null;
            req.session.destroy();
            console.log("DESLOGADO")
        }
        res.redirect('/');
    }
}
module.exports=UserController;