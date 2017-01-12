---
categories: 'sdk'
date: 2016-09-02T10:00:00+09:00
description: 'Growthbeat API ついて説明します'
draft: false
title: Growthbeat API Gudeliene
---

# 概要

Growthbeat ではサーバー API を用意しております。Growthbeat プラットフォームに蓄積されたデータを管理画面外からも取得することが可能となっております。

## APIを使用する前に

API を利用するには Growthbeat への会員登録が必要となります。API を使用するにはアカウントに紐付いている API キーの使用が必須となります。API キーの取得方法は [こちら](http://support.growthbeat.com/manual/growthbeat/#クレデンシャルキーの確認) を参照してください。

# リクエスト

APIとの全ての通信にはHTTPSプロトコルを利用します。

|利用サービス|アクセス先ホスト|
|:---:|:---:|
|Growthbeat|api.growthbeat.com|
|Growth Push|api.growthpush.com|


# 利用制限

API を使用すると API ごとにリクエスト数が加算されます。ご契約のリクエスト数、現在のリクエスト数に応じて使用する API を考慮してください。月のAPIの上限を超えますと APIに てデータが取得できなくなりますのでご了承ください。現在の使用リクエスト数は [こちら](https://growthbeat.com/mypage/request) を参照してください。

# データ形式

APIとのデータの送受信にはJSONを利用します。JSONをリクエストボディに含める場合、リクエストのContent-Typeヘッダに `application/json` を指定し、リクエストヘッダーは `application/x-www-form-urlencoded` で送信してください。
GETリクエストにバラメータを含める場合にはURIクエリを利用します。

正常なレスポンスの場合は、リファレンスにあるAPIごとのJSON形式のレスポンスが返ります。エラーレスポンス時には、エラーコード、エラーメッセージのみのJSON形式のレスポンスが返ります。

**正常なレスポンス例**

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "applicationId=GROWTHBEAT_APPLICATION_ID" \
    --data "credentialId=GROWTHBEAT_CREDENTIAL_ID" \
    https://api.growthpush.com/4/clients/GROWTHBEAT_CLIENT_ID | jq .
```

```
{
  "id": "GROWTHBEAT_CLIENT_ID",
  "applicationId": "GROWTHBEAT_APPLICATION_ID",
  "token": "DEVICE_TOKEN",
  "status": "STATUS",
  "os": "OS",
  "environment": "ENVIRONMENT",
  "updated": "2015-02-03 12:34:56",
  "created": "2015-02-03 12:34:56"
}
```

**エラーレスポンス例**

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "applicationId=GROWTHBEAT_APPLICATION_ID" \
    --data "credentialId=GROWTHBEAT_CREDENTIAL_ID" \
    https://api.growthpush.com/4/clients/GROWTHBEAT_CLIENT_ID | jq .
```

```
{
    "status": 400,
    "message": "Invaid credential.",
    "code": 1001
}
```

# APIドキュメント一覧

* ~~[V1 APIドキュメント](https://growthbeat.github.io/api/growthpush/v1/)~~ ※ こちらのAPIは 2016/12/21 に廃止いたしました。
* ~~[V2 APIドキュメント](https://growthbeat.github.io/api/growthpush/v2/)~~ ※ こちらのAPIは 2016/12/21 に廃止いたしました。
* [V3 APIドキュメント](https://growthbeat.github.io/api/growthpush/v3/)
* [V4 APIドキュメント](https://growthbeat.github.io/api/growthpush/v4/)


# 活用例

* [Notifications API 経由で、特定のユーザーに対してPush通知を送る方法](http://faq.growthbeat.com/article/51-notifications-api-push)
