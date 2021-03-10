const express = require('express')
const app = express()

var db = require("./config");

db.connect(function(err){ 
   if (err) throw err;

app.get('/api', function (req, res){
    var id = 'AND id LIKE \'%'+req.param('id')+'%\'';
    var bmId = 'AND backmarket_id LIKE \'%'+req.param('backmarket_id')+'%\'';
    var title = 'AND title LIKE \'%'+req.param('title').replace(/ /g, '%')+'%\'';
    var marketplace_cat_id = 'AND marketplace_category_id LIKE \'%'+req.param('marketplace_category_id')+'%\''
    var getDataSQL = `SELECT * FROM backmarket_product WHERE 1 ${id} ${bmId} ${title} ${marketplace_cat_id}`;
    db.query(getDataSQL.replace(/undefined/g, ''), async function(err, result){
        var data = {
            rows : result.length,
            results : result
        }
        res.send(data)
    });
})

app.get('/api/:category', function (req, res){
    var Category = 'AND category_name LIKE \'%'+req.params.category+'%\'';
    var id = 'AND id LIKE \'%'+req.param('id')+'%\'';
    var bmId = 'AND backmarket_id LIKE \'%'+req.param('backmarket_id')+'%\'';
    var title = 'AND title LIKE \'%'+req.param('title').replace(/ /g, '%')+'%\'';
    var marketplace_cat_id = 'AND marketplace_category_id LIKE \'%'+req.param('marketplace_category_id')+'%\''
    var getDataSQL = `SELECT * FROM backmarket_product WHERE 1 ${Category} ${id} ${bmId} ${title} ${marketplace_cat_id}`;
    db.query(getDataSQL.replace(/undefined/g, ''), async function(err, result){
        var data = {
            rows : result.length,
            results : result
        }
        res.send(data)
    });
})

app.listen(6464)
console.log('Server started at http://backmarket.slyman.com/api/')

})