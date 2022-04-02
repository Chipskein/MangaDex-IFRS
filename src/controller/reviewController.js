const fileService=require('../utils/fileService');
const {customAlphabet }=require('nanoid');
const nanoid=customAlphabet('1234567890',8);
class reviewController{
    static async listFromUser(req,res){
        const {id} =req.params;
        const database=fileService.Read();
        const mangas=database.mangas;
        const userReviews=[];
        mangas.forEach(manga=>{
            const tmp=manga.reviews.filter(review=>review.user.id==id)
            tmp.forEach(review=>{
                review.manga=manga.id;
                review.manganame=manga.name;
            })            
            userReviews.push(...tmp);
        })
        userReviews.sort((a,b)=>{return new Date(b.updated)- new Date(a.updated)});
        res.render('reviews.ejs',{user:req.session.user,reviews:userReviews});
    }
    static async add_review(req,res){
        const {mangaid,userid,review}=req.body
        const database=fileService.Read();
        const manga=database.mangas.find(manga=> manga.id==mangaid);
        const user=database.users.find(user=>user.id==userid);
        if(user&&manga){
            const reviewInterface={
                id:nanoid(),
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
    static async mostrar_editar(req,res){
        const {mangaid,id}=req.params;
        const database=fileService.Read();
        const manga=database.mangas.filter(m=>m.id==mangaid)[0];
        const review = manga.reviews.filter(f => f.id == id)[0];
        res.render('review-editar.ejs',{user:req.session.user,manga:manga,review:review})
    }
    static async editar(req,res){
        const {mangaid,id}=req.params;
        const { txt }=req.body;
        const user=req.session.user;
        const database=fileService.Read();
        const manga=database.mangas.filter(m=>m.id==mangaid)[0];
        const reviewIdx = manga.reviews.findIndex(f => f.id == id);
        manga.reviews[reviewIdx].text=txt;
        manga.reviews[reviewIdx].updated=new Date();
        fileService.Write(database);
        res.redirect(`/review/${user.id}`);
    }
    static async deletar(req,res){
        const {mangaid,id}=req.params;
        const database=fileService.Read();
        const manga=database.mangas.filter(m=>m.id==mangaid)[0];
        const reviewIdx = manga.reviews.findIndex(f => f.id == id);
        manga.reviews.splice(reviewIdx, 1);
        fileService.Write(database);
        return res.redirect(`/review/${req.session.user.id}`);
    }
   
}
module.exports=reviewController;