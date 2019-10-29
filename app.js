const express = require ('express');
const chalk = require('chalk');
const ejs = require('ejs');
const app = express();
const morgan = require('morgan');
const path = require('path');
const debug = require('debug')('app')



app.use(morgan('tiny'));
//app.use(express.static(path.join(__dirname, '/public/')));
app.use(express.static(path.join(__dirname, '/public/')))


app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/fonts')));

app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')))

app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav= [
  {link:'/books', title:'Book'}, 
  {link:'/authors', title:'Author'}
 ];

const bookRouter = require('./src/routes/bookRoutes')(nav);
const adminRouter = require('./src/routes/adminRoutes')(nav);

app.use('/admin', adminRouter);
app.use('/books', bookRouter);

app.get('/', function (req, res){
res.render('index', 
{
  nav: [
        {link:'/books', title:'Books'}, 
        {link:'/authors', title:'Authors'}
       ], 
  title:'Library'
}
);
});

app.listen(3010, ()=>{
  debug(`listenin on ${chalk.green('http://localhost:3010')}`)
})
