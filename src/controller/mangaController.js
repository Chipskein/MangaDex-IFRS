const fileService=require('../utils/fileService');
class mangaController{
    static async listar(req,res){
        const database=fileService.Read();
        let mangas=database.mangas;
        const filters={...req.query};
        if(filters.data_checkbox=='on') mangas=mangas.filter(manga=>new Date(manga.updated)<=new Date(filters.data2)&&new Date(manga.updated)>=new Date(filters.data1));
        if(filters.reviews_checkbox=='on') mangas=mangas.filter(manga=>manga.reviews.length<=filters.reviews2&&manga.reviews.length>=filters.reviews1);
        res.render('listar.ejs',{gerenciar:false,user:req.session.user,mangas:mangas});
    }
    static async mostrar_cadastrar(req,res){
        return res.render('cadastrar-manga.ejs');
    }
    static async cadastrar(req,res){
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
    static async pesquisar(req,res){
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
    static async detalhar(req,res){
        const { id }=req.params;
        let manga=false;
        const database=fileService.Read();
        database.mangas.forEach(data=>{
            if (data.id==id){
                data.reviews.reverse();
                manga=data;
            }
        })
        if(manga!=false) return res.render('detalhar.ejs',{user:req.session.user,manga:manga});
        else return res.redirect('/manga');
    }
    static async deletar(req,res){
        const { id } = req.params;
        const database=fileService.Read();
        const mangaIdx = database.mangas.findIndex(f => f.id == id);
        database.mangas.splice(mangaIdx, 1);
        fileService.Write(database);
        return res.redirect('/manga');
    }
    static async editar(req,res){
        const { id } = req.params;
        const {manganame,mangaimage,sinopse}=req.body;
        const database=fileService.Read();
        const manga_to_change=database.mangas.filter(f=> f.id==id)[0]
        if(manganame) manga_to_change.name=manganame
        if(mangaimage) manga_to_change.image=mangaimage
        if(sinopse) manga_to_change.sinopse=sinopse
        fileService.Write(database);
        res.redirect(`/manga/${id}`);
    }
    static async mostrar_editar(req,res){
        const { id } = req.params;
        const database=fileService.Read();
        const manga = database.mangas.filter(f => f.id == id)[0];
        res.render('manga_mostrar_editar.ejs',{manga:manga,user:req.session.user});
    }
    static async add_review(req,res){
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
    static async gerenciar_mangas(req,res){
        const database=fileService.Read();
        const mangas=database.mangas;
        const user=req.session.user
        res.render('listar.ejs',{gerenciar:true,user:req.session.user,mangas})
    }
}
module.exports=mangaController;