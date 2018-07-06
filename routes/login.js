var sqlite3 = require('sqlite3').verbose();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var db = new sqlite3.Database('data.db');
var crypto = require('crypto');

module.exports = function (app) {

app.get('/login',function(req,res){
    res.render('login');
});

//login submit form
app.post('/login/submitlogin',urlencodedParser, function (req, res) {
        console.log(req.body);

        var email = req.body.email.trim();
        var password = req.body.password.trim();

        var md5 = crypto.createHash('md5');
        var passwordmd5 = md5.update(password).digest('hex');
        console.log("passwordmd5->",passwordmd5);

        db.serialize(function() {
            var stmt = db.prepare("SELECT * FROM user WHERE email = $email AND password = $passwordmd5");

            stmt.get({$email:email, $passwordmd5:passwordmd5},function(err,row){
                if(err) {
                    console.log("login err->",err);
                      res.render("result",
                                 {'result':"Error!",'detail':"There is something wrong with our db!"});
                } else {
                    console.log("login row->",row);
                    if(row === undefined) {
                        res.render("result",
                                   {'result':"Error!",'detail':"Your email or password is wrong"});
                    } else {
                        console.log("login ok");


                        console.log("get user name");
                        db.serialize(function() {
                        var stmt_user = db.prepare("SELECT username FROM user WHERE email = $email");
                        stmt_user.get({$email:email},function(err,rowuser){
                        if(err) {
                            console.log("database get user error->",err);
                            res.render("result",
                                       {'result':"Error!",'detail':"There is something wrong with our db!"});
                         } else {
                            if(rowuser === undefined) {
                             console.log("username-> undefined");
                             } else {
                            console.log("login username->"+rowuser.username);

                            res.cookie('username',rowuser.username,{maxAge: 3600});
                            console.log("set cookie");
                            res.render("result",
                                       {'result':"Success",'detail':"You've login"});
                        }
                         }
                       });
                         stmt_user.finalize();
                        });
                    }
                }
            });
            stmt.finalize();
        });

    });

// logout
app.get('/login/logout', function (req, res) {
          res.clearCookie("username");
          res.render("result",{'result':"Success",'detail':"You've log out"});
    });

}




