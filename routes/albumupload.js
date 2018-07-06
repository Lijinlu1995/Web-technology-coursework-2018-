module.exports = function (app) {

app.get('/album',function(req,res){
    res.render('album');
});

//upload photos
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storage });

app.post('/album/uploadimg', upload.array('imgfile', 40), function(req, res, next) {
    var files = req.files
    console.log(files)
    if (!files[0]) {
         console.log("upload photo error");
         res.render("result",{'result':"Error!",'detail':"Upload photos error!"});
    } else {
        console.log("upload photo success")
        console.log(files);
        res.render("result",{'result':"Success!",'detail':"You have uploaded a photo!"});
    }
})
}