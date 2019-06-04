const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

const port = process.env.port || 3000;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = now + " : " + req.method + " " + req.url;
    fs.appendFileSync('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });
    // res.render('waiting.hbs');
    // setTimeout(() => { next(); }, 3000);
    next();
});

hbs.registerHelper('getCurrentYear', () => { return new Date().getFullYear(); })

app.get('/', (req, res) => {
    // res.send("Hello agein express");
    res.render('home.hbs', { title: "Sample Html" });
})


app.listen(port, () => {
    console.log("server run on port 3000");
});