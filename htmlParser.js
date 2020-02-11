const request = require('request');

const url = 'http://www.ferra.ru/ru/techlife/news/';

request(url, function (err, res, body) {
    if (err) throw err;
    console.log(res.statusCode);
    console.log(body);
});