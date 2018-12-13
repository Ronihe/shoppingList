// why should i name it index.js

const express = require('express');
var morgan = require('morgan');
const app = express();

let shopList = [
  {
    name: 'Orange',
    price: 5
  },
  {
    name: 'apple',
    price: 6
  }
];

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // what does it mean?

// check id error for '/items/:id' it is not error handler
app.use('/items/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  console.log(id, shopList.length);
  if (id > shopList.length) {
    let err = new Error('it is not created yet');
    err.status = 404;
    console.log(err);
    return next(err); // will add later
  } else {
    return next();
  }
});

app.get('/items', function(req, res, next) {
  return res.json(shopList);
});
// morgan.get('/items', function(req, res, next) {
//   return res.json(shopList);
// });
app.post('/items/', function(req, res, next) {
  // the body is json, double quotes
  let newItem = req.body;
  console.log(newItem);
  shopList.push(newItem);
  return res.send(shopList);
});

app.get('/items/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  return res.json(shopList[id]);
});

// PATCH /items/:id, this route should modify a single item’s name and/or price.
app.patch('/items/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  let patchItem = req.body;
  shopList[id] = patchItem;
  return res.json(shopList[id]);
});
// Delete/items/:id, this route should modify a single item’s name and/or price.

app.delete('/items/:id', function(req, res, next) {
  let id = parseInt(req.params.id);
  let splicedItem = shopList.splice(id, 1);
  return res.json(splicedItem);
});

//error handling

app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});

app.listen(3000, function() {
  console.log('Server is listening on port 3000');
});
