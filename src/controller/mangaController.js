const fileService=require('../utils/fileService');
class mangaController{
    static listar(req,res){
        const database=fileService.Read();
        let mangas=database.mangas;
        const filters={...req.query};
        if(filters.data_checkbox=='on') mangas=mangas.filter(manga=>new Date(manga.updated)<=new Date(filters.data2)&&new Date(manga.updated)>=new Date(filters.data1));
        if(filters.reviews_checkbox=='on') mangas=mangas.filter(manga=>manga.reviews.length<=filters.reviews2&&manga.reviews.length>=filters.reviews1);
        res.render('listar.ejs',{gerenciar:false,user:req.session.user,mangas:mangas});
    }
    static mostrar_cadastrar(req,res){
        return res.render('cadastrar-manga.ejs');
    }
    static cadastrar(req,res){
        const {manganame,mangaimage,sinopse}=req.body;
        const database=fileService.Read();
        const id=database.mangas.length+1;
        const manga={
            id:id,
            name:manganame,
            image:mangaimage,
            sinopse:sinopse,
            created:new Date(),
            updated:new Date(),
            qt_view:0,
            reviews:[]
        }
        database.mangas.push(manga);
        fileService.Write(database);
        return res.redirect('/manga');
    }
    static pesquisar(req,res){
        let mangas_filter=[];
        let { searchText }=req.body;
        const database=fileService.Read();
        let regex=new RegExp(`${searchText.toLowerCase()}`);
        database.mangas.forEach(manga=>{
            if(regex.test(manga.name.toLowerCase())){
                mangas_filter.push(manga);
            }
        })
        return res.render('listar.ejs',{gerenciar:false,user:req.session.user,mangas:mangas_filter});
    }
    static detalhar(req,res){
        const { id }=req.params;
        let manga=false;
        const database=fileService.Read();
        database.mangas.forEach(data=>{
            if (data.id==id){
                manga=data;
            }
        })
        console.log(manga.reviews);
        if(manga!=false) return res.render('detalhar.ejs',{user:req.session.user,manga:manga});
        else return res.redirect('/manga');
    }
    static deletar(req,res){
        const { id } = req.params;
        const database=fileService.Read();
        const mangaIdx = database.mangas.findIndex(f => f.id == id);
        database.mangas.splice(mangaIdx, 1);
        fileService.Write(database);
        return res.redirect('/manga');
    }
    static add_review(req,res){
        const {mangaid,userid,review}=req.body
        const database=fileService.Read();
        const manga=database.mangas.find(manga=> manga.id==mangaid);
        const user=database.users.find(user=>user.id==userid);
        const size=manga.reviews.length+1;
        if(user&&manga){
            const reviewInterface={
                id:size,
                text:review,
                created:new Date(),
                updated:new Date(),
                user:user
            };
            manga.reviews.push(reviewInterface);
            fileService.Write(database);
            res.redirect(`/manga/${manga.id}`);
        }
    }
    static gerenciar_mangas(req,res){
        const database=fileService.Read();
        const mangas=database.mangas;
        const user=req.session.user
        res.render('listar.ejs',{gerenciar:true,user:req.session.user,mangas})
    }
}
module.exports=mangaController;