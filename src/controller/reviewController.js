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
    static async editar(req,res){
        res.status(200).json("editar");
    }
    static async deletar(req,res){
        res.status(200).json("deletar");
    }
   
}
module.exports=reviewController;