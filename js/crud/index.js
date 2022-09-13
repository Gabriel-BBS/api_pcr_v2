const { json } = require('body-parser');
const mysql=require('mysql');

class ClassCrud{

    constructor()
    {
        this.sql=mysql.createPool({
            user: "b83967e24f0613",
            password:"5ed36278",
            host: "us-cdbr-east-06.cleardb.net",
            database: "heroku_edb8033e0c9551b",
            multipleStatements: true
        });
    }
    catalogo(req,res){
        this.sql.getConnection(function(err,connection){
            connection.query(
                "SELECT * FROM deposito WHERE quant>=5 and nome='spray' ORDER BY quant DESC;SELECT * FROM deposito WHERE quant>=5 and nome='pigmento';SELECT * FROM deposito WHERE quant>=3 and nome= 'tinta' and tipo not like 'piso%' ORDER BY quant DESC; SELECT * FROM deposito WHERE quant>=3 and nome='trincha' or nome like 'rolo%' or nome='fita crepe' or nome='extensor'",function(err,results,fields){
                connection.release();
                res.render('catalogo',{data1:results[0],data2:results[1],data3:results[2],data4:results[3]});
            });
        });
    }

    logged(req,res)
    {
        this.sql.getConnection(function(err,connection){
            let username = req.body.login;
            let password = req.body.sen;
            // Ensure the input fields exists and are not empty
            if (username && password) {
                connection.query('SELECT * FROM adim WHERE log = ? AND sen = ?', [username, password], function(error, results, fields) {
                    connection.release();
                    if (error) throw error;
                    if (results.length > 0) {
                        res.redirect('/index');
                    } else {
                        res.send('Incorrect Username and/or Password!');
                    }			
                    res.end();
                });
            } else {
                res.send('Please enter Username and Password!');
                res.end();
            }
        });
    }
    
    createMat(req,res)
    {
        this.sql.getConnection(function(err,connection){
           
            connection.query("INSERT INTO deposito VALUES (?,?,?,?,?,?);",[req.body.ID_mat,req.body.nome,req.body.tipo,req.body.cor,req.body.und,req.body.quant],(error)=>{
            if(error){
                connection.release();
                throw error;

            }else{
                connection.release();
                res.render('controllerFormMat',{msg:"Dado de " +req.body.nome+" inserido com sucesso!"});
            }})
        });
    }
    selectArt(req,res){
        this.sql.getConnection(function(err,connection){
            connection.query("SELECT * FROM artista", function(error, results, fields) {
                connection.release();
                res.render('select',{data:results})
            });

    })};
    createArt(req,res)
    {
        this.sql.getConnection(function(err,connection){
            connection.query("INSERT INTO artista (nome,local,painel) VALUES (?,?,?)",[req.body.art_nome,req.body.art_local,req.body.art_painel],(error)=>
            {
            if(error){
                connection.release();
                throw error;
            }else{
                connection.release();
                res.render('controllerForm',{msg:"Dados de "+req.body.art_nome+" foram adicionados com sucesso"});
            }
            });
            
        });
    }
    search(req,res){
        this.sql.getConnection(function(err,connection){
            let sql = "";
            let list = [];

            if(req.body.nome && req.body.cor){
                sql = "SELECT * FROM deposito WHERE deposito.nome LIKE ? and deposito.cor LIKE ? order by quant desc";
                list.push(req.body.nome+"%",req.body.cor+"%");
            }else if(!req.body.nome && !req.body.cor && req.body.unidade){
                sql = "SELECT * FROM deposito WHERE  und=? order by quant desc";
                list.push(req.body.unidade);
            }else if(req.body.nome && !req.body.cor && !req.body.unidade){
                sql = "SELECT * FROM deposito WHERE nome=? order by quant desc";
                list.push(req.body.nome);
            }else if(req.body.cor && req.body.unidade){
                sql = "SELECT * FROM deposito WHERE cor=? and und=? quant desc";
                list.push(req.body.cor,req.body.unidade);
            }else if(!req.body.nome && req.body.cor && !req.body.unidade){
                sql = "SELECT * FROM deposito WHERE  deposito.cor like ? order by quant desc";
                list.push(req.body.cor+"%");
            }
            connection.query(sql,list,function(error, results, fields){
                connection.release();
                res.render('select',{data:results});
                
            });
            list = []; 
        });
    }
    delete(req,res)
    {
        this.sql.getConnection(function(err,connection){
            connection.query("DELETE FROM deposito WHERE ID_mat=?",[req.params.ID_mat]);
            connection.release();
            res.render('deletar');
        });
    }

    update(req,res,controller=null)
    {
        if(controller==null){
            this.sql.getConnection(function(err,connection){
                connection.query("select * from deposito where ID_mat=?",[req.params.ID_mat],function(err,results,fields){
                    connection.release();
                    res.render('update',{ID_mat:req.params.ID_mat,nome:results[0].nome,tipo:results[0].tipo,cor:results[0].cor,und:results[0].und,quant:results[0].quant});
                });
            });
        }else{
            this.sql.getConnection(function(err,connection){
                connection.query("update deposito set nome=?,tipo=?,cor=?,und=?,quant=? where ID_mat=?",[req.body.nome,req.body.tipo,req.body.cor,req.body.und,req.body.quant,req.body.ID_mat]);
                connection.release();
                res.render('controllerUpdate');
            });
        }
    }
}
module.exports=ClassCrud;