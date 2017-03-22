var request = require('request');
var cheerio = require('cheerio');
var Parse = require('parse/node');
Parse.serverURL = 'http://cademeupet.herokuapp.com/parse';
Parse.applicationId = 'cademeupet';

var headers = {
   'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
   'Content-Type' : 'application/x-www-form-urlencoded'
}


var url = 'http://euamomeusanimais.com.br/principais-racas-de-coelhos-brasil/';

request({url:url, headers: headers}, function(error, response, body){
    if (!error){
        var arr = [];
        var $ = cheerio.load(body.replace(/<!--|-->/g, ''))
        $('.thecontent h3').each(function(i, elem) {
            arr.push(elem.children[0].data);
        });

        console.log(arr);

    } else {
        console.log("We’ve encountered an error: " + error);
    }
})