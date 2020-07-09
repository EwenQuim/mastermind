var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fn = require('./mastermind-game');

var app = express();

var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))


/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.listTries) == 'undefined') {
        req.session.listTries = [];
        req.session.guess = fn.gen_string(4);
    }
    next();
})

/* On affiche la todolist et le formulaire */
.get('/m', function(req, res) { 
    res.render('mastermind.ejs', {listTries: req.session.listTries, to_guess: req.session.guess});
})

/* On ajoute un élément à la todolist */
.post('/m/try/', urlencodedParser, function(req, res) {
    console.log("\nA honest try below !");
    if (req.body.newtry != '') {
        req.session.listTries.push([req.body.newtry, fn.response(req.body.newtry, req.session.guess)]);
    }
    res.redirect('/m');
})


/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/m');
})

.listen(8080);