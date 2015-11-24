---
categories: 'sdk'
date: 2015-05-19T23:50:00+09:00
description: 'Growthbeat API ついて説明します'
draft: false
title: Growthbeat API Gudeliene
---

# 概要

Growthbeat ではサーバー API を用意しております。Growthbeat プラットフォームに蓄積されたデータを管理画面外からも取得することが可能となっております。

## APIを使用する前に

API を利用するには Growthbeat への会員登録が必要となります。

# リクエスト

APIとの全ての通信にはHTTPSプロトコルを利用します。

|利用サービス|アクセス先ホスト|
|:---:|:---:|
|Growthbeat|api.growthbeat.com|
|Growth Analytics|api.analytics.growthbeat.com|
|Growth Message|api.message.growthbeat.com|
|Growth Push|api.growthpush.com|

# パラメータ
API へのリクエストには、GET、POST、PUT、DELETE の4種類のHTTPメソッドを利用します。多くのAPIへのリクエストにはパラメータを含められますが、GETリクエストにパラメータを含める場合にはURIクエリを利用し、それ以外の場合にはリクエストボディを利用します。

# 利用制限
TODO: カスタムセグメントクエリの制限について

# ステータスコード
200、201、204、400、401、403、404、500の8種類のステータスコードを利用します。エラーが起きた場合にはその他のステータスコードの中から適切なものを返します。

# データ形式
APIとのデータの送受信にはJSONを利用します。JSONをリクエストボディに含める場合、リクエストのContent-Typeヘッダに `application/json` を指定し、リクエストヘッダーは `application/x-www-form-urlencoded` で送信してください。
GETリクエストにバラメータを含める場合にはURIクエリを利用します。日時を表現する場合には、[ISO 8601形式](https://ja.wikipedia.org/wiki/ISO_8601) の文字列を利用します。


**例**

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/accounts/akfbW0ewZ4IAGLtZ?credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
    "name":"Subaccount for Growthbeat",
    "id":"akfbW0ewZ4IAGLtZ",
    "created":"2014-06-26T06:44:56+0000"
}
```

# エラーレスポンス

エラーが発生した場合、エラーを表現するオブジェクトを含んだエラーレスポンスが返却されます。

## Growth beat API

エラーの内容を説明するmessageプロパティと、エラーの種類を表すcodeプロパティで構成されます。

```
{
    "code": 8003,
    "message": "Unauthorized."
}
```

## Growth Push API

エラーの内容を説明するmessageプロパティと、エラーの種類を表すstatusプロパティで構成されます。

```
{
	"status":400,
	"message":"Invalid request."
}
```

# 認証認可

GETリクエスト以外のAPIを利用するには、API キーをリクエストに含める必要があります。

## Growth beat API

API キーの取得方法は [こちら](http://support.growthbeat.com/manual/growthbeat/#apiキーの確認) を参照してください。


## Notification API

TODO: Growth Push管理画面のシークレットキーの説明
