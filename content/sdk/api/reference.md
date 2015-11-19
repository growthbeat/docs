---
categories: 'sdk'
date: 2015-11-19T14:32:58+09:00
description: 'Growthbeat API について説明します'
draft: false
title: Growthbeat API
---

# Growth Push API

## Clients

### Get client

**GET** https://api.growthpush.com/3/clients

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "applicationId=${APPLICATION_ID}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  --data "token=${DEVICE_TOKEN}" \
  https://api.growthpush.com/3/clients
```

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| アプリケーションID |
| credentialId | String | YES ||| クレデンシャルキー |
| token | String | YES ||| デバイストークン |

## Notifications

### Get notifications

**GET** https://api.growthpush.com/3/notifications

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "applicationId=${APPLICATION_ID}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthpush.com/3/notifications
```

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| アプリケーションID |
| credentialId | String | YES ||| クレデンシャルキー |
| page | Int | NO | 1 || ページ数 |
| limit | Int | NO | 100 || 最大取得件数 |

### Create notification

**POST** https://api.growthpush.com/3/notifications

```
curl -X POST \
  -H 'Accept: application/json' \
  --data "applicationId=${APPLICATION_ID}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  --data-urlencode "text=${TEXT}" \
  https://api.growthpush.com/3/notifications
```

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| アプリケーションID |
| credentialId | String | YES ||| クレデンシャルキー |
| text | Int | YES ||| 配信メッセージ |
| query | String | NO ||| 配信対象の絞込クエリ(JSON) |
| sound | Boolean | NO |false| true<br>false| Push通知時のサウンドを鳴らすか |
| badge | Boolean | NO |false| true<br>false| プッシュ通知時にバッヂを付与するか |
| extra | String | NO ||| カスタムフイールド(JSON) |
| attachNotificationId | Boolean | NO |false| true<br>false| 通知IDをペイロードに含めるか |
| duration | Int | NO ||| push配信の生存時間(ミリ秒) |
