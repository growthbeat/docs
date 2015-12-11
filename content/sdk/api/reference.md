---
categories: 'sdk'
date: 2015-11-27T14:32:58+09:00
description: 'Growthbeat API について説明します'
draft: false
title: Growthbeat API
---

# Growth Push API

## Clients

### Get Client

**GET：** https://api.growthpush.com/3/clients

**Request**

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| アプリケーションID |
| credentialId | String | YES ||| クレデンシャルキー |
| token | String | YES ||| デバイストークン |

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "applicationId=${APPLICATION_ID}" \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "token=${DEVICE_TOKEN}" \
    https://api.growthpush.com/3/clients
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | applicationId | Int | アプリケーションID |
|| code | String | デバイスのコード |
|| created | String | 作成日 |
|| environment | String | development/production |
|| growthbeatApplicationId | String | GrwothbeatのアプリケーションID |
|| growthbeatClientId | String | GrowthbeatのクライアントID |
|| id | Int | デバイスのID |
|| os | String | デバイスのOS |
|| status | String | デバイスのステータス |
|| token | String | デバイスのTOKEN |


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

**GET：** https://api.growthpush.com/3/notifications

**Request**

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| アプリケーションID |
| credentialId | String | YES ||| クレデンシャルキー |
| page | Int | NO | 1 || ページ数 |
| limit | Int | NO | 100 || 最大取得件数 |

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "applicationId=${APPLICATION_ID}" \
    --data "credentialId=${CREDENTIAL_ID}" \
    https://api.growthpush.com/3/notifications
```

**Response**

|Response|Name|Type|Notes|
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

**POST：** https://api.growthpush.com/3/notifications

**Request**

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

```
curl -X POST \
    -H 'Accept: application/json' \
    --data "applicationId=${APPLICATION_ID}" \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data-urlencode "text=${TEXT}" \
    https://api.growthpush.com/3/notifications
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | jobId | String | ランダムに生成された値 |

```
{
    "jobId":"a0f9a40b-f013-4693-a5b1-3baf726fd4f3"
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

<!--
### Get Segment Clients

**GET：** https://api.analytics.growthbeat.com/1/segments/client_ids

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|applicationId|String|YES|||アプリケーションID|
|segmentQuery|String|YES|||queryオブジェクト|
|begin|String|NO|request time||DateTime|
|end|String|NO|request time||DateTime|
|cachable|Boolean|NO|false|true<br>false|キャッシュデータの取得|

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "applicationId=${APPLICATION_ID}" \
    --data "segmentQuery=${QUERY_OBJECT}" \
    https://api.analytics.growthbeat.com/1/segments/client_ids
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body |  | List | クライアントID |

```
["CLIENT_ID_01","CLIENT_ID_02", ...]
```
-->

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
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "name=${SEGMENT_NAME}" \
    --data "description=${SEGMENT_DESCRIPTION}" \
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

<!--
### Update Segment Size

**PUT：** https://api.analytics.growthbeat.com/1/segments/${SEGMENT_ID}/size

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|segmentId|String|YES|||セグメントID|

```
curl -X PUT \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    https://api.analytics.growthbeat.com/1/segments/${SEGMENT_ID}/size
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | created | String | 作成日 |
| | name | String | セグメント名 |
| | id | String | セグメントID |
| | size | Int | セグメント対象Client数 |
| | query | String | queryオブジェクト |
| | description | String | セグメントの説明 |

```
{
    "created": "2015-11-09T10:58:38+0000",
    "name": "Androidのみ",
    "id": "SEGMENT_ID",
    "size": 1,
    "query": {
        "type": "tag",
        "note": null,
        "tagId": "Tag:applicationId:Custom:tagname",
        "operator": "begin_with",
        "value": "Android"
    },
    "description": "SEGMENT_DESCRIPTION"
}
```
-->

<!--

### Delete Segment

**DELETE** https://api.analytics.growthbeat.com/1/segments/${SEGMENT_ID}

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|segmentId|String|YES|||セグメントID|


```
curl -X DELETE \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    https://api.analytics.growthbeat.com/1/segments/${SEGMENT_ID}
```

-->

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
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "name=${TAG_NAME}" \
    --data "description=${TAG_DESCRIPTION}" \
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

<!--
### Delete Tag

**PUT：** https://api.analytics.growthbeat.com/1/tags/${TAG_ID}

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|name|String|YES|||タグ名|
|description|String|YES|||タグ説明|

```
curl -X DELETE \
  -H 'Accept: application/json' \
  -G \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.analytics.growthbeat.com/1/tags/${TAG_ID}
```

-->

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
    --data "tagId=${TAG_ID}" \
    --data "segmentQuery=${SEGMENT_QUERY}" \
    --data "exclusiveId=${EXCLUSIVEID}" \
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
    --data "tagId=${TAG_ID}" \
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
|clientId|String|YES|||タグID|

```
curl -X POST \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "tagId=${TAG_ID}" \
    --data "clientId=${CLIENT_ID}" \
    --data "value=${VALUE}" \
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
  --data "parentEventId=Event%3aapplicationId%3aDefault" \
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
  -G \
  --data "credentialId=${CREDENTIAL_ID}" \
  --data "name=displayName" \
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
    -G \
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
|begin|String|NO|||範囲時間の開始時刻||
|end|String|NO|||範囲時間の終了時刻||
|exclusiveId|String|NO|||このID以降の取得|
|order|Order|NO||ascending|ソート|ascending or desending|
|limit|int|NO|100|１回の取得の件数上限|100が上限|

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "eventId=${EVENT_ID}" \
    --data "begin=${BEGIN}" \
    --data "end=${END}" \
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
        "eventId":"Event:LBYtXQ26k6pHRZZB:Custom:Win",
        "clientId":"Oy1FwLQJXXQWRrxo"
    },
    {
        "properties":{
            "opponent":"CPU"
        },
        "id":"P5iQN7NLW8iY7W5t",
        "created":"2015-03-02T00:56:14+0000",
        "eventId":"Event:LBYtXQ26k6pHRZZB:Custom:Win",
        "clientId":"PIfObLDXgq2Pp13t"
    },
    {
        "properties":{
            "opponent":"CPU"
        },
        "id":"P5iQN7NLW8iY7W5t",
        "created":"2015-03-02T00:56:14+0000",
        "eventId":"Event:LBYtXQ26k6pHRZZB:Custom:Win",
        "clientId":"PIfOlNbuo0xQ0Nyi"
    }
]
```

### POST ClientTag

**POST** https://api.analytics.growthbeat.com/1/client_events/

**Request**

|Name|Type|Required|Default|Options|Notes|
|:---|:---|:---|:---|:---|:---|
|credentialId|String|YES|||クレデンシャルキー|
|tagId|String|YES|||タグID|
|clientId|String|YES|||タグID|

```
curl -X POST \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    --data "tagId=${TAG_ID}" \
    --data "clientId=${CLIENT_ID}" \
    --data "value=${VALUE}" \
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

# Growthbeat API

## Accounts

### Get Accounts

**GET：** https://api.growthbeat.com/1/accounts/${ACCOUNT_ID}

**Request**

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| accountId | String | YES ||| アカウントID |
| credentialId | String | YES ||| クレデンシャルキー |

```
curl -X GET \
    -H 'Accept: application/json' \
    -G \
    --data "credentialId=${CREDENTIAL_ID}" \
    https://api.growthpush.com/1/accounts/${ACCOUNT_ID}
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | icon | Boolean | アプリケーションのアイコン有無 |
|| created | String | 作成日 |
|| name | String | 登録アカウント名 |
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

**GET：** https://api.growthbeat.com/1/applications/${APPLICATION_ID}

**Request**

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| アプリケーションID |
| credentialId | String | YES ||| クレデンシャルキー |

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthbeat.com/1/applications/${APPLICATION_ID}
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | name | String | 登録アプリ名 |
|| id | String | アカウントID |
|| created | String | 作成日 |

```
{
    "name":"APPLICATION_NAME",
    "id":"APPLICATION_ID",
    "created":"2014-06-26T06:44:55+0000"
}
```

### List Application

**GET：** https://api.growthbeat.com/1/applications

**Request**

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| accountId | String | YES ||| アカウントID |
| credentialId | String | YES ||| クレデンシャルキー |

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "accountId=${ACCOUNT_ID}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthbeat.com/1/applications
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | created | String | 作成日 |
|| id | String | アプリケーションID |
|| name | String | 登録アプリ名 |

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

**POST：** https://api.growthbeat.com/1/applications

**Request**

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| name | String | YES ||| アプリケーション名 |
| credentialId | String | YES ||| クレデンシャルキー |

```
curl -X POST \
  -H 'Accept: application/json' \
  --data "name=${APPLICATION_NAME}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  --data-urlencode "text=${TEXT}" \
  https://api.growthpush.com/3/notifications
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | name | String | 登録アプリ名 |
|| id | String | アプリケーションID |
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

**GET：** https://api.growthbeat.com/1/credentials

**Request**

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| session | String | YES ||| .growthbeat.com sessionId |
| credentialId | String | YES ||| クレデンシャルキー |

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "sessionId=${SESSION}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthbeat.com/1/credentials
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | id | String | クレデンシャルキー |
|| created | String | 作成日 |
|| account | Collection | アカウントオブジェクト |

```
[
    {
        "id":"CREDENTIAL",
        "created":"2014-06-26T06:44:55+0000",
        "account":{
            "name":"PEARENT_ACCOUNT_NAME",
            "id":"PEARENT_ACCOUNT_ID",
            "created":"2014-06-26T06:44:55+0000"
        }
    }
]
```


<!--

## Plans

### Get Plan

**GET：** https://api.growthbeat.com/1/plans

**Request**

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| accountId | String | YES ||| アカウントID |
| credentialId | String | YES ||| クレデンシャルキー |

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "accountId=${ACCOUNT_ID}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthbeat.com/1/plans
```

**Response**

|Response|Name|Type|Notes|
|:--|:--|:--|:--|
| Header | Status | Int | 200 |
| Body | name | String | プラン名 |
|| id | String | プランID |
|| created | String | 作成日 |
|| price | Int | 利用価格 |
|| grade | String | アカウントのグレード |
|| opened | Boolean | true/false |
|| capacity | Int | リクエスト上限数 |

```
{
    "name":"PLAN_NAME",
    "id":"PLAN_ID",
    "created":"2014-07-15T05:43:35+0000",
    "price":0,
    "grade":"PLAN_GRADE",
    "opened":false,
    "capacity":10000000000000
}
```
-->
