const fileService=require('../utils/fileService');
const {customAlphabet }=require('nanoid');
const nanoid=customAlphabet('1234567890',8);
class mangaController{
    static async listar(req,res){
        const database=fileService.Read();
        let mangas=database.mangas;
        let { searchText,order }={...req.query};
        let mangas_filter=[];
        if(searchText){
            let regex=new RegExp(`${searchText.toLowerCase()}`);
            database.mangas.forEach(manga=>{
                if(regex.test(manga.name.toLowerCase())){
                    mangas_filter.push(manga);
                }
            })
            mangas=mangas_filter;
        }
        if(!order) order='desc';
        if(order=='desc'){
            mangas=mangas.sort((a,b)=>{return new Date(b.updated)-new Date(a.updated)})
        }
        if(order=='asc'){
            mangas=mangas.sort((a,b)=>{return new Date(a.updated)-new Date(b.updated)})
        }
        res.render('listar.ejs',{gerenciar:false,user:req.session.user,mangas:mangas});
    }
    static async mostrar_cadastrar(req,res){
        return res.render('cadastrar-manga.ejs');
    }
    static async cadastrar(req,res){
        const {manganame,mangaimage,sinopse,genres,authors}=req.body;
        const database=fileService.Read();
        const manga={
            id:nanoid(),
            name:manganame,
            image:mangaimage,
            sinopse:sinopse,
            created:new Date(),
            updated:new Date(),
            genres:genres,
            authors:authors,
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
                data.reviews.sort((a,b)=>{return new Date(b.updated)-new Date(a.updated)})
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
        const {manganame,mangaimage,sinopse,genres,authors}=req.body;
        const database=fileService.Read();
        const manga_to_change=database.mangas.filter(f=> f.id==id)[0]
        if(manganame) manga_to_change.name=manganame
        if(mangaimage) manga_to_change.image=mangaimage
        if(sinopse) manga_to_change.sinopse=sinopse
        if(genres) manga_to_change.genres=genres
        if(authors) manga_to_change.authors=authors
        manga_to_change.updated=new Date();
        fileService.Write(database);
        res.redirect(`/manga/${id}`);
    }
    static async mostrar_editar(req,res){
        const { id } = req.params;
        const database=fileService.Read();
        const manga = database.mangas.filter(f => f.id == id)[0];
        res.render('manga_mostrar_editar.ejs',{manga:manga,user:req.session.user});
    }
    static async gerenciar_mangas(req,res){
        const database=fileService.Read();
        let mangas=database.mangas;
        const user=req.session.user
        let { order }={...req.query};
        if(!order) order='desc';
        if(order=='desc'){
            mangas=mangas.sort((a,b)=>{return new Date(b.updated)-new Date(a.updated)})
        }
        if(order=='asc'){
            mangas=mangas.sort((a,b)=>{return new Date(a.updated)-new Date(b.updated)})
        }
        res.render('listar.ejs',{gerenciar:true,user:req.session.user,mangas})
    }
}
module.exports=mangaController;