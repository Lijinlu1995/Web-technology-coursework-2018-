var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data.db');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var crypto = require('crypto');


module.exports = function (app) {
    app.get('/signup',function(req,res){
         res.render('signup');
    });

  app.post('/signup/submitsignup',urlencodedParser, function (req, res) {
        console.log(req.body);
        var username = req.body.userName.trim();
        var password = req.body.password.trim();
        var repassword = req.body.rePassword.trim();
        var email = req.body.email.trim();

        if(password !== repassword || password.length < 6 ||  password.length > 12) {
            console.log("password error");
            res.render("result",
                {'result':"Password Error!",'detail':"Password must between 6 and 12 and repeat same password please! "});
        }
        else{
            checkEmail(email, function(qes) {
            console.log("qes:",qes);
            if(qes) {

            //Use m5 encryption
            var md5 = crypto.createHash('md5');
            var passwordmd5 = md5.update(password).digest('hex');
            console.log("passwordmd5->",passwordmd5);

            //insert into database
            var ps=db.prepare("INSERT INTO user(username,password,email) VALUES (?,?,?)");
            ps.run(username,passwordmd5,email,function(err){
            if(err){
                    console.log(err);
                    res.render("result",
                           {'result':"Error!",'detail':"There is something wrong with our db!"});
            }else{
                     console.log("insert ok");
                     res.render("result",
                           {'result':"Welcome!",'detail':"You have created an account successfully!"});
                 }
            });
            ps.finalize();
            } else {
                console.log("The email has existed");
                res.render("result",
                    {'result':"Sign Up failed!",'detail':"The email has existed!"});
            }
            });
        }
    });


// check whether the email has existed
function checkEmail(Email, callback) {
    console.log("check user name");
    db.serialize(function() {
        var stmt = db.prepare("SELECT * FROM user WHERE email = $email");
        stmt.get({$email:Email},function(err,row){
            if(err) {
                console.log("database error->",err);
                callback(false);
            } else {
                console.log(" row->",row);
                if(row === undefined) {
                    callback(true);
                } else {
                    callback(false);
                }
            }
        });
        stmt.finalize();
    });
}


}

