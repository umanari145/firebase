
const functions = require('firebase-functions');
const firebase = require('firebase');
const config = require('./config.js');
const Sugar = require('sugar');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

firebase.initializeApp(config.firebaseConfig);
const database = firebase.database();

app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


const anonymousUser = {
    id: "anon",
    name: "Anonymous",
    avatar: ""
};

const checkUser = (req, res, next) => {
    req.user = anonymousUser;
    if (req.query.auth_token !== undefined) {
        console.log('auth');
        let idToken = req.query.auth_token;
        firebase.auth().verifyIdToken(idToken).then(decodedIdToken => {
            let authUser = {
                id: decodedIdToken.user_id,
                name: decodedIdToken.name,
                avatar: decodedIdToken.picture
            };
            req.user = authUser;
            next();
        }).catch(error => {
            next();
        });
    } else {
        console.log('not auth');
        next();
    };
};

app.use(checkUser);

//新規追加
app.post('/:jname', (req, res) => {

  let jname = req.params.jname;
  let Ref = database.ref(jname);
  let data = req.body;
  Ref.push(data);

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({result: 'ok',res:data});
});

//一覧取得
app.get('/:jname', (req, res) => {

  let jname = req.params.jname;
  database.ref(jname).once('value', (snapshot) => {
    let items = snapshot.val();
    let data = [];

    for(var key in items) {
        let each_item = items[key];
        each_item['key'] = key;
        data.push(each_item);
    }

    res.header('Content-Type', 'application/json; charset=utf-8');

    let res_data = {};
    res_data[jname] = data;
    res.send(res_data);
  });
});

//個別編集
app.put('/:jname/:hash_key', (req, res) => {

  let jname = req.params.jname;
  let hash_key = req.params.hash_key;

  let data = req.body;
  database.ref(jname).child(hash_key).update(data)

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({result: 'ok',res:data});
});

//個別削除
app.delete('/:jname/:hash_key', (req, res) => {
  let jname = req.params.jname;
  let hash_key = req.params.hash_key;
  database.ref(jname).child(hash_key).remove();
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({result: 'delete ', hash_key: hash_key});
});

//全削除
app.delete('/:jname', (req, res) => {
  let jname = req.params.jname;
  database.ref(jname).remove();
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(201).json({result: 'ok all delete'});
});


/*
  nodeサーバーを使用する場合
 */
//app.listen(3000, () => {
//  console.log('Example app listening on port 3000!');
//});

exports.v1 = functions.https.onRequest(app);
