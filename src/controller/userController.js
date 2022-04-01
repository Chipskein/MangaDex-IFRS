const fileService=require('../utils/fileService');
const { hashSync,compareSync} = require('bcrypt');
class UserController{
    static async cadastrar(req,res){
        let {email,password,image,name}=req.body;
        const database=fileService.Read();
        let lastid=database.users.length+1;
        const hashPassword=hashSync(password,10);
        if(!image) image='/imgs/woman.png';
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
    static async login(req,res){
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
    static async logoff(req,res){
        if(req.session.user){
            req.session.user=null;
            req.session.destroy();
            console.log("DESLOGADO")
        }
        res.redirect('/');
    }
    static async getUserPerfilSelf(req,res){  
        console.log(req.session.user);
        res.render('perfil.ejs',{user:req.session.user});
    }
    static async getUserPerfil(req,res){
        //res.render('perfil.ejs',{user:req.session.user});
    }
    static async getUsersManager(req,res){
        const database=fileService.Read();
        const users=database.users;
        const userSelf=req.session.user;
        res.render('gerenciar-users.ejs',{users:users,user:userSelf});
    }
    static async deletar(req,res){
        const { id } = req.params;
        const user=req.session.user;
        const database=fileService.Read();
        const userIdx = database.users.findIndex(f => f.id == id);
        database.users.splice(userIdx, 1);
        fileService.Write(database);
        if(user.id==id){
            return res.redirect('/users/logoff');
        }
        return res.redirect('/users/gerenciar');
    }
}
module.exports=UserController;