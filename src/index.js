console.clear();
//imports
const express=require('express');
const session=require('express-session');
const app=express();
const port=process.env.PORT || 8080;

//config session
app.use(session({
    secret: 'ajfsahfjsahfjkhafjkhsajkfhasfhjksafhjksafhjksafhjksa',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

//routes
const mangaRoutes=require("./routes/manga-routes.js");
const userRoutes=require("./routes/user-routes.js");
const reviewsRoutes=require("./routes/reviews-routes.js");

//set view engine
app.set('view engine','ejs');
app.set('views','./src/view');

//enable FORM PARSES
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('*', (req, res, next) => {
    console.log(`REQUEST:${new Date().toISOString()} ~ ${req.method} ${req.baseUrl} `);
    next();
})

app.use('/users',userRoutes);
app.use('/manga',mangaRoutes);
app.use('/review',reviewsRoutes);
app.get('/',(req,res)=>res.redirect('/manga'));
app.use('*', (req, res) => res.redirect('/NotFound.html'));

app.listen(port,()=>console.log(`SERVER STARTED ON ${port}`));