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

**Request**

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

### Get Notifications

**GET** https://api.growthpush.com/3/notifications

**Request**

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

### Create Notification

**POST** https://api.growthpush.com/3/notifications

**Request**

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


# Growthbeat API

## Accounts

### Get Accounts

**GET** https://api.growthbeat.com/1/accounts/${YOUR_ACCOUNT_ID}

**Request**

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthpush.com/1/accounts/${YOUR_ACCOUNT_ID}
```

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| accountId | String | YES ||| アカウントID |
| credentialId | String | YES ||| クレデンシャルキー |

**Response**

```
{
    icon: null,
    created: "2014-10-02T02:20:03+0000",
    name: "NAME",
    id: "YOUR_ACCOUNT_ID"
}
```


## Applications

### Get Application

**GET** https://api.growthbeat.com/1/applications/${YOUR_APPLICATION_ID}

**Request**

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthbeat.com/1/applications/${YOUR_APPLICATION_ID}
```

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| アプリケーションID |
| credentialId | String | YES ||| クレデンシャルキー |

**Response**

```
{
    "name":"Default app",
    "id":"APPLICATION_ID",
    "created":"2014-06-26T06:44:55+0000"
}
```

### Get Application List

**GET** https://api.growthbeat.com/1/applications

**Request**

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "applicationId=${APPLICATION_ID}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthbeat.com/1/applications
```

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| applicationId | String | YES ||| アプリケーションID |
| credentialId | String | YES ||| クレデンシャルキー |

**Response**

```
[
    {"name":"Default app","id":"APPLICATION_ID","created":"2014-06-26T06:44:55+0000"},
    {"name":"Default app","id":"APPLICATION_ID","created":"2014-06-26T06:44:56+0000"}
]
```


### Create Application

**POST** https://api.growthbeat.com/1/applications

**Request**

```
curl -X POST \
  -H 'Accept: application/json' \
  --data "name=${APPLICATION_NAME}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  --data-urlencode "text=${TEXT}" \
  https://api.growthpush.com/3/notifications
```

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| name | String | YES ||| アプリケーション名 |
| credentialId | String | YES ||| クレデンシャルキー |

**Response**

```
{
    "name":"APPLICATION_NAME",
    "id":"APPLICATION_ID",
    "created":"2014-08-26T02:23:08+0000"
}
```


## Credentials

### Get Credential

**GET** https://api.growthbeat.com/1/credentials

**Request**

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "sessionId=${SESSION}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthbeat.com/1/credentials
```

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| session | String | YES ||| .growthbeat.com sessionId |
| credentialId | String | YES ||| クレデンシャルキー |

**Response**

```
[
    {
        "id":"YOUR_CREDENTIAL",
        "created":"2014-06-26T06:44:55+0000",
        "account":{
            "name":"YOUR_PEARENT_ACCOUNT_NAME",
            "id":"YOUR_PEARENT_ACCOUNT_ID",
            "created":"2014-06-26T06:44:55+0000"
        }
    }
]
```


## Plans

### Get Plan

**GET** https://api.growthbeat.com/1/plans

**Request**

```
curl -X GET \
  -H 'Accept: application/json' \
  -G \
  --data "accountId=${YOUR_ACCOUNT_ID}" \
  --data "credentialId=${CREDENTIAL_ID}" \
  https://api.growthbeat.com/1/plans
```

|Name|Type|Required|Default|Options|Notes|
|:--|:--|:--|:--|:--|:--|
| accountId | String | YES ||| アカウントID |
| credentialId | String | YES ||| クレデンシャルキー |

**Response**

```
{
    "name":"YOUR_PLAN_NAME",
    "id":"PLAN_ID",
    "created":"2014-07-15T05:43:35+0000",
    "price":0,
    "grade":"PLAN_GRADE",
    "opened":false,
    "capacity":10000000000000
}
```
