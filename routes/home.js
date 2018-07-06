var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');


module.exports = function (app) {
app.get('/',function(req,res){
   var ps = db.prepare("SELECT * FROM comments ORDER BY email ASC LIMIT 3;");
    ps.all(function (err, rows) {
          if (err){
          console.log("select comments err->",err);
           res.render("result",
            {'result':"Error!",'detail':"There is something wrong with our db!"});
          }
          else{
           console.log("select comments ok");
           console.log("overall->"+rows.length);
           res.render("home",
           {'comments_content_1':rows[0].comment,'comments_content_2':rows[1].comment,'comments_content_3':rows[2].comment});
          }
    });
    ps.finalize();
   });
   }

