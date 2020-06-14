# firebase

node.jsからfirebaseへの簡易登録API

## インストール


プロジェクト作成機能があるためグローバルでインストール
```
npm install -g firebase-tools
```

## API一覧

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
