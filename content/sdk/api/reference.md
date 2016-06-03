---
categories: 'sdk'
date: 2016-03-25T14:32:58+09:00
description: 'Growthbeat API について説明します'
draft: false
title: Growthbeat API
---

# Growth Push API

## Clients

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
| Body | applicationId | Int | アプリケーションID |
|| code | String | デバイスのコード |
|| created | String | 作成日 |
|| environment | String | development/production |
|| growthbeatApplicationId | String | Grwothbeat アプリケーションID |
|| growthbeatClientId | String | Growthbeat デバイスID |
|| id | Int | デバイスID |
|| os | String | ios/android |
|| status | String | デバイスステータス |
|| token | String | デバイストークン |


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
| Body | applicationId | Int | アプリケーションID |
|| automationId | Int | 自動配信ID |
|| created | String | 作成日 |
|| id | Int | プッシュ通知ID |
|| segment | Collection | セグメントオブジェクト |
|| segmentId | Int | セグメントID |
|| speed | Int | 配信間隔 |
|| status | String | 配信のステータス |
|| tagId | Int | タグID |
|| trials | Collection | 通知内容オブジェクト |

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

プッシュ通知通知を作成します。

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
|| query | String | queryオブジェクト |
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
| Body | tagId | String | タグID |
|| id | Int | タグID |
|| applicationId | String | Growthbeat アプリケーションID |
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

### Get TagClient by Tag ID

タグID指定でTagClientを取得します。タグに紐づくデバイスを取得する場合に使用します。

**GET:** https://api.growthpush.com/3/tags

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| tagId | Int | YES ||| タグID |
| limit | Int | NO | 100 || 最大取得数 |
| exclusiveClientId | Int | NO || オフセットデバイスID |

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
| Body | tagId | String | タグID |
|| clientId | Int | デバイスID |
|| value | String | タグ値 |

```
[
  {
    "tagId": TAG_ID,
    "clientId": CLIENT_ID,
    "value": "TAG_VALUE"
  }
]
```

### Get TagClient by Client ID

Growthbeat デバイスID指定でTagClientを取得します。デバイスに紐づくタグを取得する場合に使用します。

**GET:** https://api.growthpush.com/3/tags

**Request**

| Name | Type | Required | Default | Options | Notes |
|:--|:--|:--|:--|:--|:--|
| credentialId | String | YES ||| [Growthbeat クレデンシャルID](http://faq.growthbeat.com/article/130-growthbeat-id) |
| clientId | Int | YES ||| Growthbeat デバイスID |
| limit | Int | NO | 100 || 最大取得数 |
| exclusiveTagId | Int | NO || オフセットタグID |

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
| Body | tagId | String | タグID |
|| clientId | Int | デバイスID |
|| value | String | タグ値 |

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
| Body | tagId | String | タグID |
|| clientId | Int | デバイスID |
|| value | String | タグ値 |


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
| Body | tagId | String | タグID |
|| clientId | Int | デバイスID |
|| value | String | タグ値 |


```
{
  "tagId": TAG_ID,
  "clientId": CLIENT_ID,
  "value": "TAG_VALUE"
}
```

# Growth Analytics API

## Segments

### Get Segment

**GET：** https://api.analytics.growthbeat.com/1/segments/${SEGMENT_ID}

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|segmentId|String|YES|||セグメントID|

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    https://api.analytics.growthbeat.com/1/segments/${SEGMENT_ID}
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | created | String | 作成日 |
|| description | String | セグメントの説明 |
|| name | String | セグメント名 |
|| id | String | セグメントID |
|| size | Int | セグメント対象Client数 |
|| query | String | queryオブジェクト |


```
{
    "created": "2015-11-20T08:41:25+0000",
    "description": "",
    "name": "SEGMENT_NAME",
    "id": "SEGMENT_ID",
    "size": 14255,
    "query": {
        "type": "and",
        "note": null,
        "segmentQueries": [
            {
                "type": "and",
                "note": "customSegment",
                "segmentQueries": [
                    {
                        "type": "tag",
                        "note": null,
                        "tagId": "TAG_ID",
                        "operator": "equal",
                        "value": "0"
                    },
                    ...
                ]
            }
        ]
    }
}
```

### Update Segment

**PUT：** https://api.analytics.growthbeat.com/1/segments/${SEGMENT_ID}

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|segmentId|String|YES|||セグメントID|
|name|String|YES|||セグメント名|
|description|String|YES|||セグメントの説明|
|query|String|NO|null||queryオブジェクト|

```
curl -X PUT \
    -H 'Accept: application/json' \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "name=${SEGMENT_NAME}" \
    --data-urlencode "description=${SEGMENT_DESCRIPTION}" \
    https://api.analytics.growthbeat.com/1/segments/${SEGMENT_ID}
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | created | String | 作成日 |
| | description | String | セグメントの説明 |
| | name | String | セグメント名 |
| | id | String | セグメントID |
| | size | Int | セグメント対象Client数 |
| | query | String | queryオブジェクト |

```
{
    "created": "2015-11-09T10:58:38+0000",
    "description": "${SEGMENT_DESCRIPTION}",
    "name": "${SEGMENT_NAME}",
    "id": "SEGMENT_ID",
    "size": 1,
    "query": null
}
```



## Tags

### Get Tag

**GET：** https://api.analytics.growthbeat.com/1/tags/${TAG_ID}

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|tagId|String|YES|||タグID|

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    https://api.analytics.growthbeat.com/1/tags/${TAG_ID}
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | created | String | 作成日 |
| | description | String | タグ説明 |
| | name | String | タグ名 |
| | id | String | タグID |

```
{
    "created": "2015-07-16T07:24:58+0000",
    "description": "タグの説明",
    "name": "タグ名",
    "id": "Tag:applicationId:Default:tagName"
}
```

### Update Tag

**PUT：** https://api.analytics.growthbeat.com/1/tags/${TAG_ID}

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|name|String|YES|||タグ名|
|description|String|YES|||タグ説明|

```
curl -X PUT \
    -H 'Accept: application/json' \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data-urlencode "name=${TAG_NAME}" \
    --data-urlencode "description=${TAG_DESCRIPTION}" \
    https://api.analytics.growthbeat.com/1/tags/${TAG_ID}
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | created | String | 作成日 |
| | description | String | タグ説明 |
| | name | String | タグ名 |
| | id | String | タグID |

```
{
    "created": "2015-07-16T07:24:58+0000",
    "description": "TAG_DESCRIPTION",
    "name": "TAG_NAME",
    "id": "Tag:applicationId:Default:tagName"
}
```

## ClientTag

### GET ClientTag

**GET** https://api.analytics.growthbeat.com/1/client_tags/

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|tagId|String|YES|||タグID|
|exclusiveId|String|NO|||このID以降の取得|
|segmentQuery|String|NO|||セグメント|
|order|Order|NO||ascending|ソート|ascending or desending|
|limit|int|NO||１回の取得の件数上限|INT最大値|

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data-urlencode "tagId=${TAG_ID}" \
    --data-urlencode "segmentQuery=${SEGMENT_QUERY}" \
    --data-urlencode "exclusiveId=${EXCLUSIVEID}" \
    --data "order=${ORDER}" \
    --data "limit=${LIMIT}" \
    https://api.analytics.growthbeat.com/1/client_tags
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | clientId | String | 端末ID |
| | tagId | String | タグID |
| | updated | String | 更新日 |
| | value | String | タグ値 |

```
[
    {
        "clientId":"PIfOb4HJ4B6gz18f",
        "tagId":"Tag:PIaD6TaVt7wvKwao:Default:AdvertisingID",
        "updated":"2015-07-17T04:39:33+0000",
        "value":"7E9354C1-AB0A-4EB7-AD38-13D22BBE1CD2"
    },
    {
        "clientId":"PIfObLDXgq2Pp13t",
        "tagId":"Tag:PIaD6TaVt7wvKwao:Default:AdvertisingID",
        "updated":"2015-07-17T06:28:10+0000",
        "value":"7E9354C1-AB0A-4EB7-AD38-13D22BBE1CD2"
    },
    {
        "clientId":"PIfOlNbuo0xQ0Nyi",
        "tagId":"Tag:PIaD6TaVt7wvKwao:Default:AdvertisingID",
        "updated":"2015-07-17T04:40:12+0000",
        "value":"7E9354C1-AB0A-4EB7-AD38-13D22BBE1CD2"
    }
]
```

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|clientId|String|YES|||端末ID|

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "clientId=${CLIENT_ID}" \
    https://api.analytics.growthbeat.com/1/client_tags
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | clientId | String | 端末ID |
| | tagId | String | タグID |
| | updated | String | 更新日 |
| | value | String | タグ値 |

```
[
    {
        clientId: "PIfOb4HJ4B6gz18f",
        tagId: "Tag:PIaD6TaVt7wvKwao:Default:OS",
        updated: "2015-07-17T04:39:33+0000",
        value: "iOS 8.4"
    },
    {
        clientId: "PIfOb4HJ4B6gz18f",
        tagId: "Tag:PIaD6TaVt7wvKwao:Default:TrackingEnabled",
        updated: "2015-07-17T04:39:33+0000",
        value: "true"
    },
    {
        clientId: "PIfOb4HJ4B6gz18f",
        tagId: "Tag:PIaD6TaVt7wvKwao:Default:TimeZoneOffset",
        updated: "2015-07-17T04:39:33+0000",
        value: "9"
    },
    {
        clientId: "PIfOb4HJ4B6gz18f",
        tagId: "Tag:PIaD6TaVt7wvKwao:Default:AppVersion",
        updated: "2015-07-17T04:39:33+0000",
        value: "1.0"
    },
    {
        clientId: "PIfOb4HJ4B6gz18f",
        tagId: "Tag:PIaD6TaVt7wvKwao:Default:TimeZone",
        updated: "2015-07-17T04:39:33+0000",
        value: "Asia/Tokyo"
    },
    {
        clientId: "PIfOb4HJ4B6gz18f",
        tagId: "Tag:PIaD6TaVt7wvKwao:Default:AdvertisingID",
        updated: "2015-07-17T04:39:33+0000",
        value: "7E9354C1-AB0A-4EB7-AD38-13D22BBE1CD2"
    },
    {
        clientId: "PIfOb4HJ4B6gz18f",
        tagId: "Tag:PIaD6TaVt7wvKwao:Default:DeviceModel",
        updated: "2015-07-17T04:39:33+0000",
        value: "iPhone Simulator"
    },
    {
        clientId: "PIfOb4HJ4B6gz18f",
        tagId: "Tag:PIaD6TaVt7wvKwao:Default:Language",
        updated: "2015-07-17T04:39:33+0000",
        value: "en"
    }
]
```

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|clientId|String|YES|||端末ID|
|tagId|String|YES|||タグID|

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "clientId=${CLIENT_ID}" \
    --data-urlencode "tagId=${TAG_ID}" \
    https://api.analytics.growthbeat.com/1/client_tags
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | clientId | String | 端末ID |
| | tagId | String | タグID |
| | updated | String | 更新日 |
| | value | String | タグ値 |

```
{
    clientId: "PIfOb4HJ4B6gz18f",
    tagId: "Tag:PIaD6TaVt7wvKwao:Default:DeviceModel",
    updated: "2015-07-17T04:39:33+0000",
    value: "iPhone Simulator"
}
```

### POST ClientTag

**POST** https://api.analytics.growthbeat.com/1/client_tags/

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|tagId|String|YES|||タグID|
|clientId|String|YES|||端末ID|

```
curl -X POST \
    -H 'Accept: application/json' \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data-urlencode "tagId=${TAG_ID}" \
    --data "clientId=${CLIENT_ID}" \
    --data-urlencode "value=${VALUE}" \
    https://api.analytics.growthbeat.com/1/client_tags
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | clientId | String | 端末ID |
| | tagId | String | タグID |
| | updated | String | 更新日 |
| | value | String | タグ値 |

```
{
    "value":"15",
    "updated":"2015-03-02T03:44:18+0000",
    "tagId":"Tag:LBYtXQ26k6pHRZZB:Default:Level",
    "clientId":"Oy1FwLQJXXQWRrxo"
}
```

## Events

### Get Event

**GET：** https://api.analytics.growthbeat.com/1/events/${EVENT_ID}

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|eventId|String|YES|||イベントID|

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.analytics.growthbeat.com/1/events/${EVENT_ID}
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | created | String | 作成日 |
| | description | String | イベント説明 |
| | name | String | イベント名 |
| | id | String | イベントID |

```
{
  "created": "2015-07-16T07:24:57+0000",
  "description": "",
  "name": "アプリ起動",
  "id": "Event:applicationId:Default:eventName"
}
```

### List Events

**GET：** https://api.analytics.growthbeat.com/1/events/

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|parentEventId|String|YES|||親イベントID|
|ascending|String|YES|||ascending/descending|
|page|String|NO|1||ページ数|
|limit|String|NO|100||リミット|

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "credentialId=${CREDENTIAL_ID}" \
  --data-urlencode "parentEventId=Event:${YOUR_APPLICATION_ID}:Default" \
  --data "ascending=ascending" \
  https://api.analytics.growthbeat.com/1/events/
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | created | String | 作成日 |
| | description | String | イベント説明 |
| | name | String | イベント名 |
| | id | String | イベントID |

```
[
  {
    "created": "2015-07-16T07:24:57+0000",
    "description": "",
    "name": "アプリ終了",
    "id": "Event:applicationId:Default:Close"
  },
  ...
]
```

### Update Event

**PUT：** https://api.analytics.growthbeat.com/1/events/${EVENT_ID}

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|name|String|YES|||イベント名|
|eventId|String|YES|||イベントID|

```
curl -X PUT \
  -H 'Accept: application/json' \
  --data "credentialId=${CREDENTIAL_ID}" \
  --data-urlencode "name=displayName" \
  https://api.analytics.growthbeat.com/1/events/${EVENT_ID}
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | created | String | 作成日 |
| | description | String | イベント説明 |
| | name | String | イベント名 |
| | id | String | イベントID |

```
{
  "created": "2015-07-16T07:24:57+0000",
  "description": "",
  "name": "displayName",
  "id": "Event:applicationId:Default:Open"
}
```

<!--
### Delete Event

**DELETE** https://api.analytics.growthbeat.com/1/events/${EVENT_ID}

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|eventId|String|YES|||イベントID|

```
curl -X DELETE \
    -H 'Accept: application/json' \
    --data "credentialId=${CREDENTIAL_ID}" \
    https://api.analytics.growthbeat.com/1/events/${EVENT_ID}
```
-->

## ClientEvent

### GET ClientEvent

**GET** https://api.analytics.growthbeat.com/1/client_events/

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|eventId|String|YES|||イベントID|
|begin|String|YES|||範囲時間の開始時刻 (YYYY-MM-DDThh:mm:ss+0000) ||
|end|String|YES|||範囲時間の終了時刻 (YYYY-MM-DDThh:mm:ss+0000) ||
|exclusiveId|String|NO|||このID以降の取得|
|filterQuery|String|NO|||抽出オプション|
|order|Order|NO||ascending|ソート|ascending or desending|
|limit|int|NO|100|１回の取得の件数上限|100が上限|

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data-urlencode "eventId=${EVENT_ID}" \
    --data-urlencode "begin=${BEGIN}" \
    --data-urlencode "end=${END}" \
    --data "exclusiveId=${EXCLUSIVEID}" \
    --data "order=${ORDER}" \
    --data "limit=${LIMIT}" \
    https://api.analytics.growthbeat.com/1/client_events
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | id | String | ClientEventId |
| | eventId | String | イベントID |
| | clientId | String | 端末ID |
| | properties | Map | トラックプロパティ |
| | created | String | 作成日 |

```
[
    {
        "properties":{
            "opponent":"CPU"
        },
        "id":"P5iQN7NLW8iY7W5t",
        "created":"2015-03-02T00:56:14+0000",
        "eventId":"Event:${YOUR_APPLICATION_ID}:Custom:Win",
        "clientId":"zaqsxcderfv"
    },
    {
        "properties":{
            "opponent":"CPU"
        },
        "id":"P5iQN7NLW8iY7W5t",
        "created":"2015-03-02T00:56:14+0000",
        "eventId":"Event:${YOUR_APPLICATION_ID}B:Custom:Win",
        "clientId":"zaqsxcderfv"
    },
    {
        "properties":{
            "opponent":"CPU"
        },
        "id":"P5iQN7NLW8iY7W5t",
        "created":"2015-03-02T00:56:14+0000",
        "eventId":"Event:${YOUR_APPLICATION_ID}:Custom:Win",
        "clientId":"zaqsxcderfv"
    }
]
```

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|eventId|String|YES|||イベントID|
|clientId|String|YES|||端末ID|
|begin|String|YES|||範囲時間の開始時刻 (YYYY-MM-DDThh:mm:ss+0000) ||
|end|String|YES|||範囲時間の終了時刻 (YYYY-MM-DDThh:mm:ss+0000) ||
|exclusiveId|String|NO|||このID以降の取得|
|order|Order|NO||ascending|ソート|ascending or desending|
|limit|int|NO|100|１回の取得の件数上限|100が上限|

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data-urlencode "eventId=${EVENT_ID}" \
    --data "clientId=${CLIENT_ID}" \
    --data-urlencode "begin=${BEGIN}" \
    --data-urlencode "end=${END}" \
    --data "exclusiveId=${EXCLUSIVEID}" \
    --data "order=${ORDER}" \
    --data "limit=${LIMIT}" \
    https://api.analytics.growthbeat.com/1/client_events
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | id | String | ClientEventId |
| | eventId | String | イベントID |
| | clientId | String | 端末ID |
| | properties | Map | トラックプロパティ |
| | created | String | 作成日 |

```
[
    {
        clientId: "PWYkCJIQvTGn4FGE",
        eventId: "Event:PIaD6TaVt7wvKwao:Default:Install",
        created: "2015-12-11T12:05:46+0000",
        properties:
        {
            "name": "AppName"
        },
        id: "PWYkCSu2T2ILC3ua"
    }
]
```

### POST ClientEvent

**POST** https://api.analytics.growthbeat.com/1/client_events/

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|eventId|String|YES|||イベントID|
|clientId|String|YES|||タグID|
|properties|String|YES|||トラッキングプロパティ|

```
curl -X POST \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data-urlencode "eventId=${EVENT_ID}" \
    --data "clientId=${CLIENT_ID}" \
    --data-urlencode "value=${VALUE}" \
    --data "properties=${PROPERTIES}" \
    https://api.analytics.growthbeat.com/1/client_tags
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | id | String | ClientEventId |
| | eventId | String | イベントID |
| | clientId | String | 端末ID |
| | properties | Map | トラックプロパティ |
| | created | String | 作成日 |

```
{
    "properties":{
        "opponent":"CPU"
    },
    "id":"P5iQN7NLW8iY7W5t",
    "created":"2015-03-02T00:56:14+0000",
    "eventId":"Event:LBYtXQ26k6pHRZZB:Custom:Win",
    "clientId":"Oy1FwLQJXXQWRrxo"
}
```

# Growthbeat API

## Accounts

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
| Body | icon | Boolean | アプリケーションのアイコン有無 |
|| created | String | 作成日 |
|| name | String | アカウント名 |
|| id | String | アカウントID |

```
{
    icon: false,
    created: "2014-10-02T02:20:03+0000",
    name: "NAME",
    id: "ACCOUNT_ID"
}
```

## Applications

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
| Body | name | String | アプリケーション名 |
|| id | String | Growthbeat アプリケーションID |
|| created | String | 作成日 |

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
| Body | created | String | 作成日 |
|| id | String | Growthbeat アプリケーションID |
|| name | String | アプリケーション名 |

```
[
    {
        "created": "2014-06-26T06:44:55+0000",
        "id": "APPLICATION_ID",
        "name": "APPLICATION_NAME"
    },
    ...
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
| Body | name | String | アプリケーション名 |
|| id | String | Growthbeat アプリケーションID |
|| created | String | 作成日 |

```
{
    "name":"APPLICATION_NAME",
    "id":"APPLICATION_ID",
    "created":"2014-08-26T02:23:08+0000"
}
```


## Credentials

### Get Credential

クレデンシャルを取得します。

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
| Body | id | String | Growthbeat クレデンシャルID |
|| created | String | 作成日 |
|| account | Collection | アカウントオブジェクト |

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
