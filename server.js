const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const path = require('path');
app.use(express.static('public'));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.listen(PORT,()=>{
    console.log(`listening on the port ${PORT}`);
})