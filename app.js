const express = require('express');
const app = express();
const port = 3000;
const userRouter = require("./api/users/user.router")
const adminRouter = require('./admin/routerAdmin');

const expressLayouts = require('express-ejs-layouts');
const path = require('path');

var session = require('express-session');


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
  res.redirect('/admin');
})




app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));



app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/sunil', function (req, res) {

  return res.status(200).json({
    "Status": "Server Running",
    "message": "Hi ! Welcome to the server , My Boss name is Seraj Alam if you have any query please contact him at +919140327455"
  });
});

app.get('/data', function (req, res) {
  const body = req.body;
  return res.status(200).json({
    "Status": "Server Running",
    "message": "Hi ! Welcome to the server , My Boss name is Seraj Alam if you have any query please contact him at +919140327455",
    'body': body
  });
});

app.use('/admin', adminRouter);

app.use('/api/users', userRouter);
app.get('/products', (req, res) => {
  res.send([
    {
      productId: '101',
      price: 100
    },
    {
      productId: '102',
      price: 150
    }
  ])
})

app.listen(port, () => {
  console.log(`Demo app is up and listening to port: ${port}`);
})