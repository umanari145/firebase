
const functions = require('firebase-functions');
const firebase = require('firebase');
const config = require('./config.js');
const Sugar = require('sugar');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const DBUtil = require('./lib/DBUtil.js');

firebase.initializeApp(config.firebaseConfig);
const database = firebase.database();
const db_util = new DBUtil(database);

const cors = require('cors')({origin: true});
app.use(cors);

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

  res.status(200).json({result: 'ok',res:data});
});

//一覧取得
app.get('/:jname', (req, res) => {

  let jname = req.params.jname;

  db_util.getData().then((data) => {

    let res_data = {
       'res':'',
       'data':null
    };

    if (data) {
      res_data['res'] = true;
      res_data['data'] = data;
    } else {
      res_data['res'] = false;
      res_data['data'] = null;
    }

    res.header('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json(res_data);

  });

});

//個別編集
app.put('/:jname/:hash_key', (req, res) => {

  let jname = req.params.jname;
  let hash_key = req.params.hash_key;

  let data = req.body;
  database.ref(jname).child(hash_key).update(data)

  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json({result: 'ok',res:data});
});

//削除
app.delete('/:jname/', (req, res) => {
  let jname = req.params.jname;
  let hash_keys = req.body;
  //console.table(hash_keys);
  hash_keys.forEach((hash_key,i) => {
    //console.log(hash_key);
    database.ref(jname).child(hash_key).remove();
  })
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.status(200).json({result: 'delete '});
});


/*
  nodeサーバーを使用する場合
 */
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});


//exports.v1 = functions.https.onRequest(app);
