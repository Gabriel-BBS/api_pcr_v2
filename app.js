//imports

const path = require('path');
const cors = require("cors")
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');
const crud = require('crud');
const { response } = require('express');
const app = express();
const urlencodeParser = bodyParser.urlencoded({extended:false});

//conecção com o banco de dados MYSQL
let port = process.env.PORT || 3000;
let cruds=new crud();

//template engine
app.engine('handlebars',handlebars.engine({defaultLayout:'main'}));
app.set('view engine','handlebars');

//Routes and templates

//arquivo login
// app.get("/",function(req,res){res.render('login');});
// app.post("/auth",urlencodeParser,function(req,res){cruds.logged(req,res);});

//teste
app.get("/",function(req,res){cruds.catalogo(req,res);});
//arquivo index
app.get("/index",function(req,res){res.render('index');});
//form pedido
app.get("/",function(req,res){res.render('catalogo');});
//pesquisa
app.get("/pesquisa",function(req,res){res.render('pesquisa');});
app.post("/select",urlencodeParser,function(req,res){cruds.search(req,res);})
// //arquivo inserir
app.get("/inserir",function(req,res){res.render('inserir');});
app.post("/controllerFormMat",urlencodeParser,function(req,res){cruds.createMat(req,res);});
//select artista
app.get("/artista",function(req,res){cruds.selectArt(req,res);});
// create new artista
app.post("/controllerForm",urlencodeParser,function(req,res){cruds.createArt(req,res);});
//arquivo deletar
app.get("/deletar/:ID_mat",function(req,res){cruds.delete(req,res);});
// //arquivo update
app.get("/update/:ID_mat",function(req,res){cruds.update(req,res);});
app.post("/controllerUpdate",urlencodeParser,function(req,res){cruds.update(req,res,'controller');});
//link para arquivo css,js e img

app.use(express.json());
app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use('/img',express.static('img'));
app.use('/css',express.static(path.join(__dirname,"./node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"./node_modules/bootstrap/dist/js")));

//Start server
app.listen(port,function(req,res){
    console.log('Servidor está rodando');
});