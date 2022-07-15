
const express = require('express');

const chalk = require('chalk');// coloring logs messages 
const debug = require('debug')('app');// debug instead of using console.log but the only diff it will print if we run only in debug mode 
const morgan = require('morgan');

const path = require('path');

const productsRouter = require('./src/routers/productsRouter')
const adminRoute = require('./src/routers/adminRouter')

const app = express();
const PORT= process.env.PORT || 3333;

app.use(morgan('combined'))
//morgan log request +183ms::1 - - [15/Jul/2022:17:18:55 +0000] "GET /favicon.ico HTTP/1.1" 404 150 "http://localhost:3333/" "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36 Edg/103.0.1264.49"

app.use(express.static(path.join(__dirname,'/public/')))


app.set('views','./src/views')
app.set('view engine','ejs') 

// routing 
app.use('/products',productsRouter)
app.use('/admin',adminRoute)

app.get('/Home', (req,res)=>{
    res.render('index')
})

// for render pages 
app.get('/', (req,res)=>{
    res.render('index', {title:"helllooooooooooo :))", arrData:['a','b','c']})
})

app.listen(PORT,()=>{
debug(`listening on port ${chalk.green(PORT)} from debug`)
})
