
var express = require("express");
var app = express();
var fs = require("fs");

var validUrl = require('valid-url');
var url = require('url');

app.use(express.cookieParser());

var banned = [];
banUpperCase("./public/", "");


app.use(lower);
app.use(ban);
app.use(restrictUrl);


app.use(function (req, res, next) {
    getFullUrl(req, function (fullUrl) {
        if (validUrl.isUri(fullUrl)) {
            next();
        }
        else {
            console.log('Not a URI->',fullUrl);
            res.render('error', {"message": " This is not a validated URL."});
        }

    });

});


var options = { setHeaders: deliverXHTML };
app.use(express.static(__dirname + '/public',options));


//dynamic page
var hbs = require('express-handlebars').create({
    defaultLayout: 'layout',
    extname: '.hbs'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.get('/result', function(req, res) {
	res.render('result');
});


app.listen(8080, "localhost");
console.log("Visit http://localhost:8080/");



var home = require('./routes/home')(app);
var signup = require('./routes/signup')(app);
var login = require('./routes/login')(app);
var login = require('./routes/albumupload')(app);


// Make the URL lower case.
function lower(req, res, next) {
    req.url = req.url.toLowerCase();
    next();
}

// Forbid access to the URLs in the banned list.
function ban(req, res, next) {
    for (var i=0; i<banned.length; i++) {
        var b = banned[i];
        if (req.url.startsWith(b)) {
            res.status(404).send("Filename not lower case");
            return;
        }
    }
    next();
}
//forbid url with  "./" and "//"
function restrictUrl(req,res,next){
    if(req.url.indexOf("./") !=-1 && req.url.indexOf("//") !=-1){
        res.status(404).send("we reject a URL if it contains /. or /");
        return;
    }

    next();
}

// Called by express.static.  Deliver response as XHTML.
function deliverXHTML(res, path, stat) {
    if (path.endsWith(".html")) {
        res.header("Content-Type", "application/xhtml+xml");
    }
}

// Check a folder for files/subfolders with non-lowercase names.
function banUpperCase(root, folder) {
    var folderBit = 1 << 14;
    var names = fs.readdirSync(root + folder);
    for (var i=0; i<names.length; i++) {
        var name = names[i];
        var file = folder + "/" + name;
        if (name != name.toLowerCase()) banned.push(file.toLowerCase());
        var mode = fs.statSync(root + file).mode;
        if ((mode & folderBit) == 0) continue;
        banUpperCase(root, file);
    }
}

//get url
function getFullUrl(req, callback) {
    callback(url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    }));
}

// catch 404
app.use(function(req, res, next) {
    res.render("result",{'result':"Error 404!",'detail':"The page is not found"});
});

// catch 500
app.use(function (error, req, res, next) {
     res.status(500);
     res.render("result",{'result':"Error 500!",'detail':"Internal Server Error."});
});