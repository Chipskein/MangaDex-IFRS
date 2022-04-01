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
    static async getUserPerfil(req,res){
        const {id}=req.params;
        const database=fileService.Read();
        let self=false
        const user=database.users.filter(user=>user.id==id)[0];
        if(req.session.user&&req.session.user.id==user.id) self=true;       
        res.render('perfil.ejs',{self:self,user:user,session_user:req.session.user});
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
    static async editar(req,res){
        const {id}=req.params;
        const {email,name,password,image}=req.body;
        const database=fileService.Read();
        const user=database.users.filter(u=>u.id==id)[0];
        if(email) user.email=email;
        if(name) user.name=name;
        if(image) user.image=image;
        if(password){
            const hashPassword=hashSync(password,10);
            user.password=hashPassword;
        }
        req.session.user=user;
        fileService.Write(database);
        res.redirect(`/users/${id}`);
    }
    static async mostrar_editar(req,res){
        const { id } = req.params;
        const database=fileService.Read();
        const user = database.users.filter(f => f.id == id)[0];
        res.render('user_mostrar_editar.ejs',{user:user});
    }
}
module.exports=UserController;