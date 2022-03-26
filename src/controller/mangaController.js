const fileService=require('../utils/fileService');
class mangaController{
    static listar(req,res){
        const database=fileService.Read();
        return res.render('listar.ejs',{user:req.session.user,mangas:database.mangas});
    }
    static mostrar_cadastrar(req,res){
        return res.render('cadastrar.ejs');
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
            updated:new Date()
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
        return res.render('listar.ejs',{user:req.session.user,mangas:mangas_filter});
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
        console.log(manga);
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
}
module.exports=mangaController;