---
categories: 'sdk'
date: 2016-03-25T14:32:58+09:00
description: 'Growthbeat API について説明します'
draft: false
title: Growthbeat API
---

# Growth Push API

## Clients

デバイス情報に関するAPI

Client Objectは以下の形式です。Growthbeat デバイスID(String)、デバイスID(Int)は異なるので注意してください。

**Client Object**

| Name | Type | Notes | Example |
|:--|:--|:--|:--|
| growthbeatClientId | String | Growthbeat デバイスID ||
| growthbeatApplicationId | String | Grwothbeat アプリケーションID ||
| token | String | デバイストークン ||
| os | String | ios/android ||
| status | String | デバイスステータス ||
| environment | String | development/production ||
| id | Int | デバイスID ||
| applicationId | Int | アプリケーションID ||
| code | String | デバイスのコード ||
| created | String | 作成日 ||


### Get Client

デバイスを取得します。

**GET：** https://api.growthpush.com/3/clients

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| [Growthbeat アプリケーションID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| token | String |YES ||| デバイストークン |

```bash
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "applicationId=${APPLICATION_ID}" \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "token=${DEVICE_TOKEN}" \
    https://api.growthpush.com/3/clients
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body || Object | Client Object |


```
{
    "applicationId": APPLICATION_ID,
    "code": "DEVICE_CODE",
    "created": "2015-11-24 04:51:43",
    "environment": "development",
    "growthbeatApplicationId": "APPLICATION_ID",
    "growthbeatClientId": "CLIENT_ID",
    "id": DEVICE_ID,
    "os": "ios",
    "status": "active",
    "token": "DEVICE_TOKEN"
}
```

## Notifications

プッシュ通知に関するAPI

Notification Objectは以下の形式です。

**Notification Object**

| Name | Type | Notes | Example |
|:--|:--|:--|:--|
| id | Int | プッシュ通知ID ||
| trials | Collection | 通知内容オブジェクト ||
| applicationId | Int | アプリケーションID ||
| automationId | Int | 自動配信ID ||
| segmentId | Int | セグメントID ||
| segment | Collection | セグメントオブジェクト ||
| tagId | Int | タグID ||
| status | String | 配信のステータス ||
| speed | Int | 配信間隔 ||
| created | String | 作成日 ||

### Get Notifications

プッシュ通知のリストを取得します。

**GET：** https://api.growthpush.com/3/notifications

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| [Growthbeat アプリケーションID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| page | Int | NO | 1 || ページ数 |
| limit | Int | NO | 100 || 最大取得件数 |

```bash
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "applicationId=${APPLICATION_ID}" \
    --data "credentialId=${CREDENTIAL_ID}" \
    https://api.growthpush.com/3/notifications
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body || Collection | Notification Object |

```
[
    {
        "applicationId": APPLICATION_ID,
        "automationId": null,
        "created": "2015-11-24 05:43:07",
        "id": NOTIFICATION_ID,
        "segment": {
            "applicationId": APPLICATION_ID,
            "created": "2015-11-24 05:17:11",
            "id": SEGMENT_ID,
            "invisible": false,
            "modified": "2015-11-24 05:22:25",
            "name": "SEGMENT_NAME",
            "query": "SEGMENT_QUERY",
            "size": 1
        },
        "segmentId": SEGMENT_ID,
        "speed": null,
        "status": "completed",
        "tagId": TAG_ID,
        "trials": [
            {
                "automationTrialId": null,
                "badge": true,
                "extra": "{"growthpush":{"notificationId":NOTIFICATION_ID}}",
                "id": 570617,
                "notificationId": NOTIFICATION_ID,
                "scheduled": "2015-11-24 05:43:00",
                "sound": true,
                "status": "completed",
                "text": "PUSH_TEXT"
            }
        ]
    },
    ....
]
```

### Create Notification

プッシュ通知を作成します。

**POST：** https://api.growthpush.com/3/notifications

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| [Growthbeat アプリケーションID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| text | Int | YES ||| 配信メッセージ |
| query | String | NO ||| 配信対象の絞込クエリ(JSON) [クエリについて](http://faq.growthbeat.com/article/96-notification-api) |
| sound | Boolean | NO |false| true<br>false| Push通知時のサウンドを鳴らすか |
| badge | Boolean | NO |false| true<br>false| プッシュ通知時にバッヂを付与するか |
| extra | String | NO ||| カスタムフイールド(JSON) |
| attachNotificationId | Boolean | NO |false| true<br>false| 通知IDをペイロードに含めるか |
| duration | Int | NO ||| push配信の生存時間(ミリ秒) |

```bash
curl -X POST \
    -H 'Accept: application/json' \
    --data "applicationId=${APPLICATION_ID}" \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data-urlencode "text=${TEXT}" \
    https://api.growthpush.com/3/notifications
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | jobId | String | ランダムに生成された値 |

```
{
    "jobId":"a0f9a40b-f013-4693-a5b1-3baf726fd4f3"
}
```

_セグメントクエリ作成方法については [Notification API クエリ指定方法](http://faq.growthbeat.com/article/96-notification-api) を参照してください_

## Segments

### Create Segment

セグメントを作成します。

**POST:** http://api.growthpush.com/3/segments

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| [Growthbeat アプリケーションID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| name |String | YES ||| セグメント名 |
| query |String | YES ||| クエリ |

```bash
curl -X POST \
    -H 'Accept: application/json' \
    -d "applicationId=${APPLICATION_ID}" \
    -d "credentialId=${CREDENTIAL_ID}" \
    -d "name=${SEGMENT_NAME}" \
    -d "query=${SEGMENT_QUERY}" \
    http://api.growthpush.com/3/segments
```

**Response**

| Response |Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | created | String | 作成日 |
|| id | String | セグメントID |
|| applicationId | Int | アプリケーションID |
|| name | String | セグメント名 |
|| query | String | セグメントクエリ |
|| size | Int | セグメント対象デバイス数 |
|| invisible | Boolean | セグメント状態 |
|| modified | String | 更新日 |
|| created | String | 作成日 |


```
{
    "id": SEGMENT_ID,
    "applicationId": APPLICATION_ID,
    "name": "SEGMENT_ID",
    "query":"SEGMENT_QUERY",
    "size": SEGMENT_SIZE,
    "invisible":false,
    "modified":"2014-08-27 17:27:03",
    "created":"2014-08-27 17:27:03"
}
```

_セグメントクエリ作成方法については [Notification API クエリ指定方法](http://faq.growthbeat.com/article/96-notification-api) を参照してください_

## Tags

### Get Tag

タグを取得します。

**GET:** https://api.growthpush.com/3/tags

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| [Growthbeat アプリケーションID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| credentialId |String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| name | String | YES ||| タグ名 |

```bash
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "applicationId=${APPLICATION_ID}" \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data-urlencode "name=${TAG_NAME}" \
    https://api.growthpush.com/3/tags
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | id | Int | タグID |
|| applicationId | String | アプリケーションID |
|| type | String | タグタイプ（custom, notification, automation） |
|| name | String | タグ名 |
|| invisible | Boolean | タグ状態 |
|| created | String | 作成日 |


```
{
  "id": TAG_ID,
  "applicationId": APPLICATION_ID,
  "type": "custom",
  "name": "TAG_NAME",
  "invisible": false,
  "created": "2015-11-25 05:25:44"
}
```

## TagClients

TagClient Objectは以下の形式です。

**TagClient Object**

| Name | Type | Notes | Example |
|:--|:--|:--|:--|
| tagId | String | タグID ||
| clientId | Int | デバイスID ||
| value | String | タグ値 ||

### Get TagClients by Tag ID

タグID指定でTagClientのリストを取得します。タグに紐づくデバイスを取得する場合に使用します。

**GET:** https://api.growthpush.com/3/tags

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| tagId | Int | YES ||| タグID |
| limit | Int | NO | 100 || 最大取得数 |
| exclusiveClientId | Int | NO ||| オフセットデバイスID |

```bash
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "tagId=${TAG_ID}" \
    https://api.growthpush.com/3/tags
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body || Collection | TagClient Object |


```
[
  {
    "tagId": TAG_ID,
    "clientId": CLIENT_ID,
    "value": "TAG_VALUE"
  }
]
```

### Get TagClients by Client ID

Growthbeat デバイスID指定でTagClientのリストを取得します。デバイスに紐づくタグを取得する場合に使用します。

**GET:** https://api.growthpush.com/3/tags

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| clientId | Int | YES ||| Growthbeat デバイスID |
| limit | Int | NO | 100 || 最大取得数 |
| exclusiveTagId | Int | NO ||| オフセットタグID |

```bash
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "clientId=${CLIENT_ID}" \
    https://api.growthpush.com/3/tags
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body || Collection | TagClient Object |

```
[
  {
    "tagId": TAG_ID,
    "clientId": CLIENT_ID,
    "value": "TAG_VALUE"
  }
]
```

### Create TagClient by Device Token

デバイストークン指定でタグにデバイスを紐付けます。タグが存在しない場合、タグの作成も行われます。

**POST:** http://api.growthpush.com/3/tags

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| [Growthbeat アプリケーションID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| credentialId |String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| token | String | YES||| デバイストークン |
| name | String | YES ||| タグ名 |
| value | String | NO ||| タグ値 |

```bash
curl -X POST \
    -H 'Accept: application/json' \
    -d "applicationId=${APPLICATION_ID}" \
    -d "credentialId=${CREDENTIAL_ID}" \
    -d "token=${DEVICE_TOKEN}" \
    -d "name=${TAG_NAME}" \
    -d "value=${TAG_VALUE}" \
    http://api.growthpush.com/3/tags
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body || Object | TagClient |

```
{
  "tagId": TAG_ID,
  "clientId": CLIENT_ID,
  "value": "TAG_VALUE"
}
```

### Create TagClient by Client ID

Growthbeat デバイスID指定でタグにデバイスを紐付けます。タグが存在しない場合、タグの作成も行われます。

**POST:** http://api.growthpush.com/3/tags

**Request**

| Nam | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| clientId | String | YES ||| Growthbeat デバイスID |
| name | String | YES ||| タグ名 |
| value | String | NO ||| タグ値 |

```bash
curl -X POST \
    -H 'Accept: application/json' \
    -d "credentialId=${CREDENTIAL_ID}" \
    -d "clientId=${CLIENT_ID}" \
    -d "name=${TAG_NAME}" \
    -d "value=${TAG_VALUE}" \
    http://api.growthpush.com/3/tags
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body || Object | TagClient |

```
{
  "tagId": TAG_ID,
  "clientId": CLIENT_ID,
  "value": "TAG_VALUE"
}
```


# Growthbeat API

## Accounts

Account Objectは以下の形式です。

**Account Object**

| Name | Type | Notes | Example |
|:--|:--|:--|:--|
| id | String | アカウントID ||
| name | String | アカウント名 ||
| created | String | 作成日 ||

### Get Account

アカウントを取得します

**GET：** https://api.growthbeat.com/1/accounts/${ACCOUNT_ID}

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| accountId | String | YES ||| アカウントID |
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |


```bash
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    https://api.growthpush.com/1/accounts/${ACCOUNT_ID}
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body || Object | Account Object |

```
{
    created: "2014-10-02T02:20:03+0000",
    name: "NAME",
    id: "ACCOUNT_ID"
}
```

## Applications

Application Objectは以下の形式です。

**Application Object**

| Name | Type | Notes | Example |
|:--|:--|:--|:--|
| id | String | Growthbeat アプリケーションID ||
| name | String | アプリケーション名 ||
| created | String | 作成日 ||

### Get Application

アプリケーションを取得します

**GET：** https://api.growthbeat.com/1/applications/${APPLICATION_ID}

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| [Growthbeat アプリケーションID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |

```bash
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "credentzcialId=${CREDENTIAL_ID}" \
  https://api.growthbeat.com/1/applications/${APPLICATION_ID}
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body || Object | Application Object |

```
{
    "name":"APPLICATION_NAME",
    "id":"APPLICATION_ID",
    "created":"2014-06-26T06:44:55+0000"
}
```

### Get Applications

**GET：** https://api.growthbeat.com/1/applications

アプリケーションのリストを取得します。

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| accountId | String | YES ||| アカウントID |
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |

```bash
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "accountId=${ACCOUNT_ID}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthbeat.com/1/applications
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | | Collection | Application Object |

```
[
    {
        "created": "2014-06-26T06:44:55+0000",
        "id": "APPLICATION_ID",
        "name": "APPLICATION_NAME"
    }
]
```

### Create Application

アプリケーションを作成します。

**POST：** https://api.growthbeat.com/1/applications

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| name | String | YES ||| アプリケーション名 |
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |

```bash
curl -X POST \
  -H 'Accept: application/json' \
  --data "name=${APPLICATION_NAME}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  --data-urlencode "text=${TEXT}" \
  https://api.growthpush.com/3/notifications
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body || Object | Application Object |

```
{
    "name":"APPLICATION_NAME",
    "id":"APPLICATION_ID",
    "created":"2014-08-26T02:23:08+0000"
}
```


## Credentials

Credential Objectは以下の形式です。

**Credential Object**

| Name | Type | Notes | Example |
|:--|:--|:--|:--|
| id | String | Growthbeat クレデンシャルID ||
| created | String | 作成日 ||
| account | Object | Account Object ||

### Get Credentials

クレデンシャルのリストを取得します。

**GET：** https://api.growthbeat.com/1/credentials

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| session | String | YES ||| .growthbeat.com sessionId |
| credentialId | String | YES ||| Growthbeat クレデンシャルID |

```bash
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "sessionId=${SESSION}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthbeat.com/1/credentials
```

**Response**

| Response | Name | Type | Notes |
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body || Collection | Credential Object |

```
[
    {
        "id":"CREDENTIAL",
        "created":"2014-06-26T06:44:55+0000",
        "account":{
            "name":"PARENT_ACCOUNT_NAME",
            "id":"PARENT_ACCOUNT_ID",
            "created":"2014-06-26T06:44:55+0000"
        }
    }
]
```
