const express = require('express');
const app = express();
const port = 3000;
const userRouter = require("./api/users/user.router")
const adminRouter = require("./admin/admin.router")

app.get('/', (req, res) => {
  res.send('<h1>College Bus Tracking App</h1> <h4>Message: Success</h4> <p>Version 1.1</p>');
})



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