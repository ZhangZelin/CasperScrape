var app = require('express')();
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
//var fs = require('fs');
//var shellescape = require('shell-escape');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => { 
    var cmd = "casperjs index.js";
    exec(cmd, {}, function (error, stdout) {
        if(error) {
            res.status(500).send(error);
            //res.send(500, {success: false, message: stdout})
        }
        else{
            res.status(200).send(stdout);

            //res.send(200, {success: true, message: stdout});
        }
        //return res.status(200).send(stdout);
    });    
});
app.post('/', function (req, res) {

    var url = req.body.__url;
    var action = req.body.__action;
    var header = req.body.__header;
    var creds = req.body.__creds;
    delete req.body.__url;
    delete req.body.__action;
    delete req.body.__header;
    delete req.body.__creds;

    creds = JSON.parse(creds);
    creds = JSON.stringify(creds);

    var postData = JSON.stringify(req.body);

    var args = [
        'casperjs',
        './index.js',
        '--web-security=no',
        '--ignore-ssl-errors=true',
        '--ssl-protocol=any',
        url,
        action,
        creds,
        postData
    ];

    var cmd = shellescape(args);

    exec(cmd, function (error, stdout) {
        if(error) console.log(error);
        res.end(stdout);
    });

});

var port_number = process.env.PORT || 3000;

app.listen(port_number, () => console.log(`Listening on ` + port_number));