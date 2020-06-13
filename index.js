
const firebase = require('firebase');
const config = require('./config.js');
const Sugar = require('sugar');
const express = require('express')
const cors = require('cors')
const app = express()

firebase.initializeApp(config.firebaseConfig);
database = firebase.database();


app.use(cors())

app.get('/create', (req, res) => {
  let memberRef = database.ref('member');

  let data = {
      'email':'hisoka@gmail.com',
      'name':'hisoka'
  };
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({result: 'ok',res:data});
});

app.get('/list', (req, res) => {
  database.ref('member').once('value', (snapshot) => {
    res.header('Content-Type', 'application/json; charset=utf-8');
    res.send({member: data});
  });
});

//個別編集
app.get('/edit/:hash_key', (req, res) => {
  let hash_key = req.params.hash_key;
  //もし存在がなければinsert
  let data = {
      'name':'hogehogeaaaaa minamin',
      'email':'minesoh@gmail.com egashira'
  };

  database.ref('member').child(hash_key).update(data)

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({result: 'ok',res:data});
});

//個別削除
app.get('/delete/:hash_key', (req, res) => {
  let hash_key = req.params.hash_key;
  database.ref('member').child(hash_key).remove();
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({result: 'delete ', hash_key: hash_key});
});

//全削除
app.get('/deleteAll', (req, res) => {
  database.ref('member').remove();
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({result: 'ok all delete'});
});


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
