const express = require ('express');
const morgan = require ('morgan');
const exphbs = require ('express-handlebars');
const path = require ('path');
//inicializacion
const app = express ();

//configuraciones
app.set ('port', process.env.port || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultlayout: 'main',
    layoutsDir: path.join(app.get ('views'), 'layouts'),
    partialsDir: path.join(app.get ('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('views engine', '.hbs');

//middleware
app.use (morgan ('dev'));
app.use (express.urlencoded ({extended: false})); //aceptar datos sencillos (string, int...)
app.use (express.json());

//Variables locales
app.use ((req, res, next) =>{
    next();
});

//ruta
app.use (require ('./routes/index'));
app.use (require ('./routes/authentication'));
app.use ('/links',require ('./routes/links'));


//archivos publico
app.use (express.static(path.join(__dirname, 'public')));

//inicio del servidor
app.listen (app.get ('port'), ()=>{
console.log ('Server on port', app.get ('port'));
});
