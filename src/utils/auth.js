const fileService=require('./fileService');
module.exports={
    isLogged:async (req,res,next)=>{
        try{    
            const session=req.session;
            if(session.user!=null){
                const database=fileService.Read();
                const findUser=database.users.find(user=>session.user.id==user.id);
                if(findUser) next()
                else throw Error('500 | Usuario Inesxistente');
            }
            else throw Error('401 | Você não está logado')
        }
        catch(err){    
            res.render('error.ejs',{error:err})
        }
    },
    isAdmin:async (req,res,next)=>{
        try{
           const user=req.session.user
           if(user.role=='admin') next();
           else throw Error('401 | Você não tem Autorização') 
        }
        catch(err){
            res.render('error.ejs',{error:err})
        }
    }
}