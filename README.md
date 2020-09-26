# firebase

node.jsからfirebaseへの簡易登録API

## 参考URL
https://github.com/loveRandy/vue-cli3.0-vueadmin<br>
https://www.maytry.net/start-pwa-by-vue-cli-3/

## ファイル構成
- functions firebaseのAPI
- dist(.gitignore) 成果物 firebase上にデプロイされる成果物
- public 開発時に参照されるファイル(このファイルを参照してdistに運ばれる)
- src js、cssのファイル
- .editorconfig エディタの制御
- babel.config.js トランスパイラの設定などのファイル
- firebase.json firebase上の設定
- database.rules.json firebase上のdataabaseの設定
- storage.rule.json firebase上のstorageサービスの設定


## firebaseインストール

プロジェクト作成機能があるためグローバルでインストール
```
npm install -g firebase firebase-tools 

#functionsの中に firebase adminのインストールが必要
cd functions
npm install
```

## 独自API一覧
node_sample<br>
firebaseでなくnodeで独自作成
ドメインをhttp://virtual.localと設定

### 新規登録
```
curl -X POST \
 -H "Content-Type: application/json" \
 -d '{"name":"yamada", "email":"test"}' \
 virtual.local:3000/members
```

### 一覧取得
```
curl -X GET virtual.local:3000/members | jq
```
jqでみやすい形に。


### 編集
```
curl -X PUT \
 -H "Content-Type: application/json" \
 -d '{"name":"yamada", "email":"test"}' \
 virtual.local:3000/members/ハッシュキー

```

### 削除
```
curl -X DELETE \
 -H "Content-Type: application/json" \
 -d '["aaa","bbb", "ccc"]' \
 virtual.local:3000/members
```

## firebase コマンド
loginはdocker内部でも外でもOKだがconsole単位で行う

```
firebase login
i  Firebase optionally collects CLI usage and error reporting information to help improve our products. Data is collected in accordance with Google's privacy policy (https://policies.google.com/privacy) and is not used to identify you.

? Allow Firebase to collect CLI usage and error reporting information? Yes
i  To change your data collection preference at any time, run `firebase logout` and log in again.

Visit this URL on any device to log in:
https://accounts.google.com/o/oauth2/auth?client_id=******************

Waiting for authentication...

✔  Success! Logged in as umanari145@gmail.com
```
が表示され、無事ログインできる。
一度ログインすると`firebase login`を打っても
```
Already logged in as メールアドレス
```
と表示される

### 初期化
```
cd /var/www/html
firebase init
```
コンソールメッセージ
```

     ######## #### ########  ######## ########     ###     ######  ########
     ##        ##  ##     ## ##       ##     ##  ##   ##  ##       ##
     ######    ##  ########  ######   ########  #########  ######  ######
     ##        ##  ##    ##  ##       ##     ## ##     ##       ## ##
     ##       #### ##     ## ######## ########  ##     ##  ######  ########

You're about to initialize a Firebase project in this directory:

  /var/www/html

Before we get started, keep in mind:

  * You are currently outside your home directory

? Which Firebase CLI features do you want to set up for this folder? Press Space to select features, then Enter to confirm your choices.
Database: Deploy Firebase Realtime Database Rules, Functions: Configure and deploy Cloud Functions, Hosting: Configure and deploy Firebas
e Hosting sites, Storage: Deploy Cloud Storage security rules

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: プロジェクト名-プロジェクトID (プロジェクト名)
i  Using project プロジェクト名-プロジェクトID (プロジェクト名)

=== Database Setup

Firebase Realtime Database Rules allow you to define how your data should be
structured and when your data can be read from and written to.

? What file should be used for Database Rules? database.rules.json
✔  Database Rules for プロジェクト名-プロジェクトID have been downloaded to database.rules.json.
Future modifications to database.rules.json will update Database Rules when you run
firebase deploy.

=== Functions Setup

A functions directory will be created in your project with a Node.js
package pre-configured. Functions can be deployed with firebase deploy.

? What language would you like to use to write Cloud Functions? JavaScript
? Do you want to use ESLint to catch probable bugs and enforce style? No
✔  Wrote functions/package.json
? File functions/index.js already exists. Overwrite? No
i  Skipping write of functions/index.js
✔  Wrote functions/.gitignore
? Do you want to install dependencies with npm now? Yes

> protobufjs@6.9.0 postinstall /var/www/html/functions/node_modules/protobufjs
> node scripts/postinstall

npm notice created a lockfile as package-lock.json. You should commit this file.
added 252 packages from 206 contributors and audited 252 packages in 52.497s

29 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

? What do you want to use as your public directory? public
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
✔  Wrote public/index.html

=== Storage Setup

Firebase Storage Security Rules allow you to define how and when to allow
uploads and downloads. You can keep these rules in your project directory
and publish them with firebase deploy.

? What file should be used for Storage Rules? storage.rules

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
```


### デプロイ(docker内部で作業)
```
cd /var/www/html
firebase deploy
```

コンソールメッセージ
```
=== Deploying to 'プロジェクト名-プロジェクトID'...

i  deploying database, storage, functions, hosting
i  database: checking rules syntax...
✔  database: rules syntax for database プロジェクト名-プロジェクトID is valid
i  firebase.storage: checking storage.rules for compilation errors...
⚠  [W] undefined:undefined - Ruleset uses old version (version [1]). Please update to the latest version (version [2]).
✔  firebase.storage: rules file storage.rules compiled successfully
i  functions: ensuring required API cloudfunctions.googleapis.com is enabled...
✔  functions: required API cloudfunctions.googleapis.com is enabled
i  storage: latest version of storage.rules already up to date, skipping upload...
i  functions: preparing functions directory for uploading...
i  functions: packaged functions (28.29 KB) for uploading
✔  functions: functions folder uploaded successfully
i  hosting[プロジェクト名-プロジェクトID]: beginning deploy...
i  hosting[プロジェクト名-プロジェクトID]: found 1 files in public
✔  hosting[プロジェクト名-プロジェクトID]: file upload complete
i  database: releasing rules...
✔  database: rules for database プロジェクト名-プロジェクトID released successfully
✔  storage: released rules storage.rules to firebase.storage
i  functions: updating Node.js 8 function v1(us-central1)...
✔  functions[v1(us-central1)]: Successful update operation.
i  hosting[プロジェクト名-プロジェクトID]: finalizing version...
✔  hosting[プロジェクト名-プロジェクトID]: version finalized
i  hosting[プロジェクト名-プロジェクトID]: releasing new version...
✔  hosting[プロジェクト名-プロジェクトID]: release complete

✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/プロジェクト名-プロジェクトID/overview
Hosting URL: https://プロジェクト名-プロジェクトID.web.app

```
https://プロジェクト名-プロジェクトID.web.app
にアプリが公開されている

### APIパス
管理画面のFunctionsにドメインがあるので
https://APIパス/v1/ 〜にアクセスすれば動く


### ローカル開発時


#### API(開発時)
*docker内部で作業

```
//この変数で開発ということを判定(dockerに入ってます)
//軌道に非常に時間がかかる(2〜3分弱)
export NODE_ENV=dev
cd /var/www/html
firebase serve --host 0.0.0.0

=== Serving from '/var/www/html'...

⚠  Your requested "node" version "8" doesn't match your global version "14"
i  functions: Watching "/var/www/html/functions" for Cloud Functions...
i  hosting: Serving hosting files from: dist
✔  hosting: Local server: http://0.0.0.0:5000
✔  functions[v1]: http function initialized (http://0.0.0.0:5001/dummy-80371/us-central1/v1).
i  functions: Beginning execution of "v1"
i  functions: Beginning execution of "v1"
・・・・

//http://0.0.0.0:5001/dummy-80371/us-central1/v1/〜
//にアクセスをすることができる

//nodeのサーバー立てなくてもこれでOK
//環境変数で開発時と本番のURLを使い分ける
```

cf.nodeの移動起動のサーバー(nodemon)
```
npm install -g nodemon

nodemon functions/index.js
```

## フロント(vueのプロジェクト作成)

```
 vue create (プロジェクト名:例dummy)
 🎉  Successfully created project dummy.
 👉  Get started with the following commands:

  cd dummy
  npm run serve

  DONE  Compiled successfully in 763ms                                                                                                                                                                       2:41:17 PM


   App running at:
   - Local:   http://localhost:8080/

   It seems you are running Vue CLI inside a container.
   Access the dev server via http://localhost:<your container's external mapped port>/

   Note that the development build is not optimized.
   To create a production build, run npm run build.

```
http://localhost:8080 にアクセスするとvueのファイルが見れる。

package.json,gitignoreに関しては<br>
実際は適当なディレクトリに作り、一段上の階層にファイルを移動し、vueで作ったpackage.jsonやgitignoreなどは手でマージ。

### 通常の開発 vueのhot reload(docker内で作業)

```
npm run serve
```

http://localhost:8080 にアクセスすればOK


cf.簡易サーバー(コンテナ外からでも使える)
```
npm i -g http-server
cd public
http-server
```

#### ビルド

成果物をdistファイルに作成
```
npm run build
```
