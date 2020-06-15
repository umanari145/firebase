# firebase

node.jsからfirebaseへの簡易登録API

## インストール

プロジェクト作成機能があるためグローバルでインストール
```
npm install -g firebase-tools
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
 virtual.local:3000/members/ハッシュキーの値

```

### 削除
```
curl -X DELETE \
virtual.local:3000/members/ハッシュキーの値
```

### 全削除
```
curl -X DELETE \
 virtual.local:3000/members
```

## firebase コマンド

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
/var/www/html # firebase init

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


### デプロイ
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
https://APIパス/v1/〜にアクセスすれば動く


### ローカル開発時


#### API

node内のサーバーを利用

```
npm run serve

```
virtual.local:3000にアクセスできる

```
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

//本番時はfirebaseが動かすため上記のメソッドをコメントアウトし、下記のコメントアウトを外す
//exports.v1 = functions.https.onRequest(app);
```

#### cs,jss watch

自動監視
```
npm run watch-poll
```

#### html

```
cd public
http-server

```
