---
categories: 'sdk'
date: 2015-05-19T14:32:58+09:00
description: 'Growthbeat API について説明します'
draft: false
title: Growthbeat API
---

# Growthbeat API

# Account API

Growthbeatでは、APIやSDKの認証のために必要となる対象をAccountを表しています。

## Accountレスポンス

|キー|値|
|---|---|
|id|アカウントID|
|name|アカウント名|
|created|アカウント作成日|

## アカウント取得

アカウントの取得

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/accounts/{accountId}|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:GetAccount|

### 例

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
## アカウントリストの取得

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/accounts|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|id|アカウントID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:GetAccount|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/accounts?id=akfbW0ewZ4IAGLtZ&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
    {
        "name": "Root",
        "id": "OrSP1ttjq3h1htZ4",
        "created": "2014-10-01T07:19:57+0000"
    },
    {
        "name": "Permitter",
        "id": "OrSR3rZuXbiVxhAk",
        "created": "2014-10-01T07:28:01+0000"
    },
    {
        "name": "Growthbeat",
        "id": "OrSS8ZMyFQ3UmmV4",
        "created": "2014-10-01T07:32:17+0000"
    },
    {
        "name": "GrowthPush master account",
        "id": "OrT7YwUo9DenXqVd",
        "created": "2014-10-01T19:16:50+0000"
    },
    ...(略)
		}
	]
```

## 新規アカウント作成

作成したアカウントに指定したアクション権限を付与します

### リクエスト

|キー|値|
|---|---|
|Method|POST|
|URL|https://api.growthbeat.com/1/accounts|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|name|アカウント名|空の文字列|
|credentialId|認証用秘密ID||

### 必要な権限

リソース内のaccountIdはアカウントのクレデンシャル用

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:CreateAccount|

### 例

```
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.growthbeat.com/1/accounts' -d 'name=Account for production' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"Account for production",
	"id":"Wcgc1MjCoj4eHhnh",
	"created":"2014-08-21T15:26:31+0000"
}
```

## アカウント更新

### リクエスト

|キー|値|
|---|---|
|Method|POST|
|URL|https://api.growthbeat.com/1/accounts/{accountId}|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|name|アカウント名|空の文字列|
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:UpdateAccount|

### 例

```
curl -X PUT -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'http://api.growthbeat.local:8085/1/accounts/PD27QThig5d8olR6' -d 'name=update name' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"update name",
	"id":"PD27QThig5d8olR6",
	"created":"2015-05-18T11:02:19+0000"
}
```

# Application API

アプリケーションに、端末やトラッキングデータなどの様々なデータが蓄積されます。

基本的には、iOS / Androidのプラットホーム全て１つのアプリケーションとして使うことが可能です。

## Applicationレスポンス

|キー|値|
|---|---|
|id|アプリケーションID|
|name|アプリケーション名|
|created|作成日|

## アプリケーションの取得

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/applications/{applicationId}|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:Growthbeat:GetApplication|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/applications/LBYtXQ26k6pHRZZB?credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"Default app",
	"id":"LBYtXQ26k6pHRZZB",
	"created":"2014-06-26T06:44:55+0000"
}
```

## アプリケーション一覧

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/applications|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|accountId|アカウントID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:ListApplication|


### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/applications/?accountId='L6rmAwrpJvMjowGu'&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
    {"name":"Default app","id":"LBYtXQ26k6pHRZZB","created":"2014-06-26T06:44:55+0000"},
    {"name":"Default app","id":"x8CkiXLSyZ61FOcG","created":"2014-06-26T06:44:56+0000"}
]
```

## アプリケーションの作成

### リクエスト

|キー|値|
|---|---|
|Method|POST|
|URL|https://api.growthbeat.com/1/applications|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|name|アカウント名||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application|Action:Growthbeat:CreateApplication|


### 例

```
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.growthbeat.com/1/applications' -d 'name=Account for production' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"Account for production",
	"id":"57ztw5jLJKqm3zlV",
	"created":"2014-08-26T02:23:08+0000"
}
```

## アプリケーションの更新

### リクエスト

|キー|値|
|---|---|
|Method|PUT|
|URL|https://api.growthbeat.com/1/applications/{applicationId}|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|name|アプリケーション名||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:Growthbeat:UpdateApplication|


### 例

```
curl -X PUT 'https://api.growthbeat.com/1/applications/LBYtXQ26k6pHRZZB' -d 'name=Account for production' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"Account for production",
	"id":"LBYtXQ26k6pHRZZB",
	"created":"2014-06-26T06:44:55+0000"
}
```

# Client API

端末を表します。

## Clientレスポンス

|キー|値|
|---|---|
|id|クライアントID|
|application|アプリケーション|
|created|クライアント作成日|

## クライアント取得
### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/clients/{clientId}|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:Growthbeat:GetClient|


### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/clients/5FCgfMiXq8r2goLj?credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"id":"5FCgfMiXq8r2goLj",
	"created":"2014-06-26T06:46:16+0000",
	"application":{
		"name":"My365",
		"id":"dy6VlRMnN3juhW9L",
		"created":"2014-06-26T06:46:02+0000"
	}
}
```

## クライアント一覧取得

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/clients|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|applicationId|アプリケーションID||
|clientId|クライアントID||
|order|ソート順|ascending|
|limit|一回の取得上限数|100|
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:Growthbeat:ListClient|


### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/clients?applicationId=dy6VlRMnN3juhW9L&clientId=5FCgfMiXq2goLj&order=ascending&limit=100&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{"id":"5FCgfMiXq8r2goLj","created":"2014-06-26T06:46:16+0000","application":{"name":"My365","id":"dy6VlRMnN3juhW9L","created":"2014-06-26T06:46:02+0000"}},
	{"id":"a0sSoL0ZWfucxHma","created":"2014-06-26T06:46:17+0000","application":{"name":"My365","id":"dy6VlRMnN3juhW9L","created":"2014-06-26T06:46:02+0000"}}

]
```

## クライアント作成

### リクエスト

|キー|値|
|---|---|
|Method|POST|
|URL|https://api.growthbeat.com/1/clients|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|applicationId|アプリケーションID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:Growthbeat:CreateClient|


### 例

```
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.growthbeat.com/1/clients' -d 'applicationId=LBYtXQ26k6pHRZZB' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"id":"sp0vUsS9vxAehlHc",
	"created":"2014-08-26T07:34:38+0000",
	"application":{
		"name":"Account for production",
		"id":"LBYtXQ26k6pHRZZB",
		"created":"2014-06-26T06:44:55+0000"
	}
}
```

# Connection API

Growthbeat各サービスの利用を許可しているかを表します。

## Connectionレスポンス

|キー|値|
|---|---|
|id|コネクションID|
|account|コネクション用アカウント|
|service|コネクション用サービス|
|childAccount|connectionの子アカウント|
|created|コネクション作成日|

# Consumption API

リクエスト数を表します。

## Cpnsumptionレスポンス

|キー|値|
|---|---|
|count|1度のリクエストに対するカウント|
|account|コンサンプションアカウント|
|action|コンサンプションのアクション|
|created|コンサンプション作成日|

## コンサンプションの作成

### リクエスト

|キー|値|
|---|---|
|Method|POST|
|URL|https://api.growthbeat.com/1/consumptions|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|accountId|アカウントID||
|actionId|アクションID||
|count|||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Service:{serviceId}|Action:Growthbeat:CreateConsumption|


### 例

```
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.growthbeat.com/1/consumptions' -d 'accountId=akfbW0ewZ4IAGLtZ' -d 'actionId=Action:Growthbeat:GetAccount' -d 'count=1' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"created":"2014-08-26T10:03:37+0000",
	"count":1,
	"account":{
		"name":"Subaccount for Growthbeat",
		"id":"akfbW0ewZ4IAGLtZ",
		"created":"2014-06-26T06:44:56+0000"
	},
	"action":{
		"name":"GetAccount",
		"id":"Action:Growthbeat:GetAccount",
		"created":"2014-05-29T04:39:40+0000"
	}
}
```

# Credential API

認証用の鍵となります。複数生成することができます。

## Credentialレスポンス

|キー|値|
|---|---|
|id|クレデンシャルID|
|account|クレデンシャル用アカウント|
|created|作成時刻|

## クレデンシャルの取得

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/credentials/{credentialId}|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:GetCredential|


### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/credentials/nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY?credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"id":"nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY",
	"created":"2014-05-27T06:17:05+0000",
	"account":{
		"name":"Root Account",
		"id":"L6rmAwrpJvMjowGu",
		"created":"2014-05-27T06:15:19+0000"
	}
}
```

## クレデンシャル一覧

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/credentials|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|accountId|アカウントID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:ListCredential|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/credentials?accountId='L6rmAwrpJvMjowGu'&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{
		"id":"nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY",
		"created":"2014-05-27T06:17:05+0000",
		"account":{
			"name":"Root Account",
			"id":"L6rmAwrpJvMjowGu",
			"created":"2014-05-27T06:15:19+0000"
		}
	}
]
```

## クレデンシャルの作成

### リクエスト

|キー|値|
|---|---|
|Method|POST|
|URL|https://api.growthbeat.com/1/credentials|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|accountId|アカウントID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:CreateCredential|

### 例

```
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.growthbeat.com/1/credentials' -d 'accountId=L6rmAwrpJvMjowGu' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"id":"qrsshfX9sItzaSQJ7T0js9sUYQkkKexJ",
	"created":"2014-08-26T12:32:13+0000",
	"account":{
		"name":"Root Account",
		"id":"L6rmAwrpJvMjowGu",
		"created":"2014-05-27T06:15:19+0000"
	}
}
```

## クレデンシャルの取得

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/credentials|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|sessionId|セッションID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Service:{serviceId}|Action:Growthbeat:GetCredential|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/credentials?sessionId=30630PW1HIIy8pcdkPzuJzAxDzbxG4rv&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{
		"id":"3wr8sYcxZweD5ohp6vzfRiQKQilxhlhH",
		"created":"2014-06-26T06:44:55+0000",
		"account":{
			"name":"Subaccount for Growthbeat",
			"id":"xoCKaD10WHqoRLNw",
			"created":"2014-06-26T06:44:55+0000"
		}
	}
]
```

# Permission API

権限を表します。特定のアプリケーションまたはアカウントに、実行権限を付与したり削除することが可能です。

## Permissionレスポンス

|キー|値|
|---|---|
|account|権限を付与したアカウント|
|targetAccount|権限を付与されたアカウント|
|resource|対象リソース|
|action|対象実行|
|created|作成日時|

## パーミッション一覧

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/permissions|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|accountId|アカウントID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:ListPermission|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/permissions?accountId=L6rmAwrpJvMjowGu&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{
		"created":"2014-05-27T13:36:25+0000",
		"account":{
			"name":"Root Account",
			"id":"L6rmAwrpJvMjowGu",
			"created":"2014-05-27T06:15:19+0000"
		},
		"targetAccount":{
			"name":"Growthbeat Master Account",
			"id":"qRkucFch8owN2PWs",
			"created":"2014-06-01T02:23:46+0000"
		},
		"resource":{
			"name":"Resource",
			"id":"Resource",
			"created":"2014-06-01T01:22:29+0000"
		},

	　（中略）
	　
	}
]
```


## パーミッション一覧

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/permissions|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|targetAccountId|ターゲットアカウントID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{targetAccountId}|Action:Growthbeat:ListPermission|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/permissions?targetAccountId=L6rmAwrpJvMjowGu&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{
		"created":"2014-05-27T13:36:25+0000",
		"account":null,
		"targetAccount":{
			"name":"Root Account",
			"id":"L6rmAwrpJvMjowGu",
			"created":"2014-05-27T06:15:19+0000"
		},
		"resource":{
			"name":"Resource",
			"id":"Resource",
			"created":"2014-06-01T01:22:29+0000"
		},

	　（中略）

	}
]
```

## パーミッション一覧

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/permissions|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|accountId|付与元アカウントID|
|targetAccountId|付与先アカウントID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:ListPermission|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/permissions?accountId=DFhnn09qoQQiG1YX&targetAccountId=qRkucFch8owN2PWs&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{
		"created":"2014-05-27T13:36:25+0000",
		"account":{
			"name":"Default Permission Account",
			"id":"DFhnn09qoQQiG1YX",
			"created":"2014-06-01T02:23:46+0000"
		},
		"targetAccount":{
			"name":"Growthbeat Master Account",
			"id":"qRkucFch8owN2PWs",
			"created":"2014-06-01T02:23:46+0000"
		},
		"resource":{
			"name":"Resource",
			"id":"Resource",
			"created":"2014-06-01T01:22:29+0000"
		},
		"action":{
			"name":"Action",
			"id":"Action",
			"created":"2014-06-01T01:15:44+0000"
		}
	}
]
```

## パーミッション作成

### リクエスト

|キー|値|
|---|---|
|Method|POST|
|URL|https://api.growthbeat.com/1/permissions|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|accountId|付与元アカウントID||
|targetAccountId|付与先アカウントID||
|resourceId|対象リソースID||
|actionId|対象アクションID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:CreatePermission|

### 例

```
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.growthbeat.com/1/permissions' -d 'accountId=L6rmAwrpJvMjowGu' -d 'targetAccountId=qRkucFch8owN2PWs' -d 'resourceId=Resource:Growthbeat:Account:L6rmAwrpJvMjowGu' -d 'actionId=Action:Growthbeat:GetAccount' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"created":"2014-08-26T14:12:25+0000",
	"account":{
		"name":"Root Account",
		"id":"L6rmAwrpJvMjowGu",
		"created":"2014-05-27T06:15:19+0000"
	},
	"targetAccount":{
		"name":"Growthbeat Master Account",
		"id":"qRkucFch8owN2PWs",
		"created":"2014-06-01T02:23:46+0000"
	},
	"resource":{
		"name":"L6rmAwrpJvMjowGu",
		"id":"Resource:Growthbeat:Account:L6rmAwrpJvMjowGu",
		"created":"2014-05-29T04:39:40+0000"
	},
	"action":{
		"name":"GetAccount",
		"id":"Action:Growthbeat:GetAccount",
		"created":"2014-05-29T04:39:40+0000"
	}
}
```

## パーミッション削除

### リクエスト

|キー|値|
|---|---|
|Method|DELETE|
|URL|https://api.growthbeat.com/1/permissions|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|accountId|付与元アカウントID||
|targetAccountId|付与先アカウントID||
|resourceId|対象リソースID||
|actionId|対象アクションID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:DeletePermission|

### 例

```
curl -i -X DELETE -H 'Accept: application/json' 'https://api.growthbeat.com/1/permissions?accountId=L6rmAwrpJvMjowGu&targetAccountId=knpjsN0ectt634v0&resourceId=Resource&actionId=Action:GrowthPush&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
HTTP/1.1 204 No Content
Server: Apache-Coyote/1.1
Date: Tue, 26 Aug 2014 14:48:28 GMT
```

## パーミッション権限の有無取得

### リクエスト

|キー|値|
|---|---|
|Method|POST|
|URL|https://api.growthbeat.com/1/authorize|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|resourceId|対象リソースID||
|actionId|対象アクションID||
|credentialId|認証用秘密ID||

### 必要な権限

権限の確認となるためなし。

### 例

```
curl -i -X POST -H 'Accept: application/json' 'https://api.growthbeat.com/1/authorize' -d 'resourceId=Resource' -d 'actionId=Action:Growthbeat' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Content-Type: application/json;charset=UTF-8
Transfer-Encoding: chunked
Date: Tue, 26 Aug 2014 15:46:26 GMT

true
```

# Plan API

Growthbeatのプランを取得することができます。

## Planレスポンス

|キー|値|
|---|---|
|id|Plan ID|
|name|プラン名|
|capacity|リクエスト数上限|
|price|価格|
|grade|プランのグレード|
|opened|プランの公開状況|
|created|プラン作成日|

## プラン取得

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/plans|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|accountId|アカウントID||
|credentialId|認証用秘密ID||

### 必要な権限

権限なしで実行できます。

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/plans?accountId=L6rmAwrpJvMjowGu&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"Enterprise 1T",
	"id":"swEwwZYLiqlXY1Z4",
	"created":"2014-07-15T05:43:35+0000",
	"price":0,
	"grade":"large",
	"opened":false,
	"capacity":10000000000000
}
```

# Session API

管理画面にて、認証が許可されたときに、期限付きで発行される認証IDを表します。

## Sessionレスポンス

|キー|値|
|---|---|
|id|アカウントID|
|created|セッション作成時間|
|account|アカウント|
|service|サービス|

## セッションの取得

セッションIDからセッションを取得

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/sessions/{sessionId}|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:GetSession|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/sessions/8pE0v2AngPUibjlf5Nw3OHdHkFc7DJGt?credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"id":"8pE0v2AngPUibjlf5Nw3OHdHkFc7DJGt",
	"created":"2014-09-28T22:05:48+0000",
	"account":{
		"id":"6qt4K7DNIzKFEtRF",
		"created":"2014-06-26T06:44:55+0000",
		"name":"SIROK"
	},
	"service":{
		"icon":null,
		"banner":null,
		"logo":null,
		"namespace":"Growthbeat",
		"domain":"growthbeat.local",
		"id":"wTvYPtGWuyKKMvyy",
		"created":"2014-06-01T02:32:50+0000",
		"name":"Growthbeat",
		"url":"http://growthbeat.local:8085/",
		"account":null
	}
}
```

# User API

Growthbeat各サービスの管理画面にログインできるユーザーを表します。

##  Userレスポンス

|キー|値|
|---|---|
|mail|メールアドレス|
|thumbnail|ユーザーアイコンURL|
|name|ユーザー名
|company|会社名|
|phone|電話番号|
|account|アカウント|
|created|ユーザー作成時間|

## ユーザー取得

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/users|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|accountId|アカウントID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:GetUser|

### 例

```
curl -i -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/users?accountId=L6rmAwrpJvMjowGu&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Content-Length: 0
Date: Tue, 26 Aug 2014 15:43:07 GMT
```
## ユーザー一覧取得

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.growthbeat.com/1/users|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|accountId|アカウントID||
|applicationId|アプリケーションID||
|credentialId|認証用秘密ID||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Account:{accountId}|Action:Growthbeat:GetUser|

### 例

```
curl -i -X GET -H 'Accept: application/json' 'https://api.growthbeat.com/1/users?accountId=L6rmAwrpJvMjowGu&applicationId= OrT9IvW8OfjT3l8v&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{
		"created":"2014-08-26T15:52:17+0000",
		"subscription":true,
		"mail":"hogehoge@co.jp",
		"company":"bar",
		"phone":"0120-123-456",
		"thumbnail":"http://www.gravatar.com/avatar/3c69f10a57b6634a8d6edcb36d7ba521.jpg?d=identicon",
		"account":{
			"name":"foo",
			"id":"4J84zhZGEkOQjCKf",
			"created":"2014-08-26T15:52:17+0000"
		}
	},
	{
		"created":"2014-08-26T15:52:17+0000",
		"subscription":true,
		"mail":"hogehoge@co.jp",
		"company":"bar",
		"phone":"0120-123-456",
		"thumbnail":"http://www.gravatar.com/avatar/3c69f10a57b6634a8d6edcb36d7ba521.jpg?d=identicon",
		"account":{
			"name":"foo",
			"id":"4J84zhZGEkOQjCKf",
			"created":"2014-08-26T15:52:17+0000"
		}
	},
	...(略)
	}
]
```

## ユーザー作成

### リクエスト

|キー|値|
|---|---|
|Method|POST|
|URL|https://api.growthbeat.com/1/users|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|mail|メールアドレス||
|password|パスワード||
|name|ユーザー名|空文字|
|company|会社名|空文字|
|phone|電話番号|空文字|
|credentialId|認証用秘密ID||

### 必要な権限

ユーザー作成のための必要な権限はありません。

### 例

```
curl -X POST -H 'Accept: application/json' 'https://api.growthbeat.com/1/users' -d 'mail=hogehoge@co.jp' -d 'password=hogehoge' -d 'name=foo' -d 'company=bar' -d 'phone=0120-123-456' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"created":"2014-08-26T15:52:17+0000",
	"subscription":true,
	"mail":"hogehoge@co.jp",
	"company":"bar",
	"phone":"0120-123-456",
	"thumbnail":"http://www.gravatar.com/avatar/3c69f10a57b6634a8d6edcb36d7ba521.jpg?d=identicon",
	"account":{
		"name":"foo",
		"id":"4J84zhZGEkOQjCKf",
		"created":"2014-08-26T15:52:17+0000"
	}
}
```

# Growth Analytics API

# ClientEvents API

クライアントのトラッキングイベントについてのAPIです。

## ClientEventレスポンス

|キー|値|
|---|---|
|id|ID|
|clientId|クライアントID|
|eventId|イベントID|
|properties|データのプロパティ|
|created|トラッキング作成時刻|

### クライアント毎のイベント一覧取得

クライアントが持つイベントリスト取得をします。

### リクエスト

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.analytics.growthbeat.com/1/client_events|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|clientId|クライアントID||
|eventId|イベントID||
|begin|範囲時間の開始時刻||
|end|範囲時間の終了時刻||
|exclusiveId|このID以降の取得|(オプション)|
|order|ソート|ascending|
|limit|１回の取得の件数上限|100|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:ListClientEvent|

### curl例

```
curl -X GET -H 'Accept: application/json' 'https://api.analytics.growthbeat.com/1/client_events?clientId=Oy1FwLQJXXQWRrxo&eventId=Event:LBYtXQ26k6pHRZZB:Custom:Win&begin=2015-03-01T00%3A00%3A00%2B0000&end=2015-04-01T00%3A00%3A00%2B0000&exclusiveId=P6Ouhbk6kmLgJRVZ&order=ascending&limit=5&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{"properties":{"opponent":"user_P6ODrb1HBZeIu0Oq"},"id":"P6OulcA0txE16of4","created":"2015-03-09T03:14:08+0000","clientId":"Oy1FwLQJXXQWRrxo","eventId":"Event:LBYtXQ26k6pHRZZB:Custom:Win"},
	{"properties":{"opponent":"CPU"},"id":"P6OuojrNioIwSRPu","created":"2015-03-09T03:14:20+0000","clientId":"Oy1FwLQJXXQWRrxo","eventId":"Event:LBYtXQ26k6pHRZZB:Custom:Win"},
	{"properties":{"opponent":"CPU"},"id":"P6Ouqa5odJ8phyOe","created":"2015-03-09T03:14:27+0000","clientId":"Oy1FwLQJXXQWRrxo","eventId":"Event:LBYtXQ26k6pHRZZB:Custom:Win"},
	{"properties":{"opponent":"user_P6ODl6a7EqFl4Xxm"},"id":"P6Ouszpyh4hD7wrp","created":"2015-03-09T03:14:36+0000","clientId":"Oy1FwLQJXXQWRrxo","eventId":"Event:LBYtXQ26k6pHRZZB:Custom:Win"},
	{"properties":{"opponent":"CPU"},"id":"P6OuueeeQ9QEgDrB","created":"2015-03-09T03:14:42+0000","clientId":"Oy1FwLQJXXQWRrxo","eventId":"Event:LBYtXQ26k6pHRZZB:Custom:Win"}
]
```

## クライアントにイベントトラッキングを作成

クライアントにイベントトラッキングを作成します。

|キー|値|
|---|---|
|Method|POST|
|URL|https://api.analytics.growthbeat.com/1/client_events|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|デフォルト|
|---|---|---|
|clientId|クライアントID||
|eventId|イベントID||
|properties|プロパティのキー|(optional)|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:CreateClientEvent|

### 例

```
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.analytics.growthbeat.com/1/client_events' -d 'clientId=Oy1FwLQJXXQWRrxo' -d 'eventId=Event:LBYtXQ26k6pHRZZB:Custom:Win' -d 'properties[opponent]=CPU' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

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

# ClientSegments API

クライアントのセグメントについてのAPIです。

## ClientSegmentレスポンス

|キー|値|
|---|---|
|clientId|クライアントID|
|segmentId|セグメントID|

## クライアントのセグメントを取得

クライアントIDとセグメントIDに紐づくデータを返します。

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.analytics.growthbeat.com/1/client_segments|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|clientId|クライアントID||
|segmentId|セグメントID||
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:GetClientSegment|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.analytics.growthbeat.com/1/client_segments?clientId=Oy1FwLQJXXQWRrxo&segmentId=Segment:LBYtXQ26k6pHRZZB:Default:All&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"clientId":"Oy1FwLQJXXQWRrxo",
	"segmentId":"Segment:LBYtXQ26k6pHRZZB:Default:All"
}
```

# ClientTags API

クライアントが持つタグについてのAPIです。

## ClientTagレスポンス

|キー|値|
|---|---|
|clientId|クライアントID|
|tagId|タグID|
|value|タグの値|
|updated|更新日時|

## クライアントのタグ作成・更新

タグを作成・更新します。

|キー|値|
|---|---|
|Method|POST|
|URL|https://api.analytics.growthbeat.com/1/client_tags|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|clientId|クライアントID||
|tagId|タグID||
|value|タグの値||
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:CreateClientTag|

### 例

```
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.analytics.growthbeat.com/1/client_tags' -d 'clientId=Oy1FwLQJXXQWRrxo' -d 'tagId=Tag:LBYtXQ26k6pHRZZB:Default:Level' -d 'value=15' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"value":"15",
	"updated":"2015-03-02T03:44:18+0000",
	"tagId":"Tag:LBYtXQ26k6pHRZZB:Default:Level",
	"clientId":"Oy1FwLQJXXQWRrxo"
}
```

## タグIDに紐づく一覧を取得

タグIDに紐づく、クライアントタグを取得します。セグメントを指定することでクライアントを抽出したデータを取得することも可能です。

### パラメーター

|キー|値|デフォルト値|
|----|--|---------|
|tagId|タグID||
|segmentQuery|セグメントクエリ|(オプション)|

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:ListClientTag|

### 例

```
curl -X POST -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.analytics.growthbeat.com/1/client_tags' -d 'tagId=Tag:LBYtXQ26k6pHRZZB:Default:AdvertisingId' -d 'segmentQuery=' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
```

# DataPoint API

集計された値を表します。

## DataPointレスポンス

|キー|値|
|---|---|
|category|値のカテゴリ(日付や特定のキーが入る)|
|value|該当カテゴリの集計された値|

## データポイント一覧を取得

クエリと指定時間、間隔で集計された値を返します

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.analytics.growthbeat.com/1/data_points|

### パラメーター

|キー|値|Default|
|---|---|---|
|dataPointQuery|データポイントクエリ||
|credentialId|認証のためのAPIキー||

### 必要な権限

データポイント内に含まれた、タグ・イベント・セグメントの使用に権限が必要となる場合があります。

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.analytics.growthbeat.com/1/data_points?dataPointQuery=%7B%22type%22%3A%22metric%22%2C%22begin%22%3A%7B%22type%22%3A%22absolute%22%2C%22time%22%3A%222015-01-01T00%3A00%3A00%2B0000%22%7D%2C%22end%22%3A%7B%22type%22%3A%22absolute%22%2C%22time%22%3A%222015-01-10T00%3A00%3A00%2B0000%22%7D%2C%22period%22%3A86400000%2C%22metricQuery%22%3A%7B%22type%22%3A%22metric%22%2C%22direction%22%3A%22up%22%2C%22metricId%22%3A%22Metric%3ALBYtXQ26k6pHRZZB%3ADefault%3AActiveUser%22%7D%7D&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{"value":421.0,"category":"2015-01-01T09:00:00+0000"},
	{"value":420.0,"category":"2015-01-02T09:00:00+0000"},
	{"value":399.0,"category":"2015-01-03T09:00:00+0000"},
	{"value":408.0,"category":"2015-01-04T09:00:00+0000"},
	{"value":418.0,"category":"2015-01-05T09:00:00+0000"},
	{"value":424.0,"category":"2015-01-06T09:00:00+0000"},
	{"value":416.0,"category":"2015-01-07T09:00:00+0000"},
	{"value":398.0,"category":"2015-01-08T09:00:00+0000"},
	{"value":393.0,"category":"2015-01-09T09:00:00+0000"}
]
```

# Events API

トラッキングデータのラベルを表します。

## Eventレスポンス

|キー|値|
|---|---|
|id|イベントID|
|name|イベント名|
|description|イベント説明文|
|created|作成日時|

## イベントを取得

イベントIDから特定のイベントを取得します。

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.analytics.growthbeat.com/1/events/{eventId}|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:GetEvent|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.analytics.growthbeat.com/1/events/Event:LBYtXQ26k6pHRZZB:Default:Open?credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"Open",
	"id":"Event:LBYtXQ26k6pHRZZB:Default:Open",
	"created":"2015-01-22T05:27:27+0000",
	"description":"Open the app"
}
```

## イベント一覧を取得

イベントの一覧を取得します。

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.analytics.growthbeat.com/1/events|

### パラメーター

|キー|値|Default|
|---|---|---|
|parentEventId|親イベントID||
|order|ソート|ascending|
|page|ページ番号|1|
|limit|1回の取得上限|100|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:ListEvent|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.analytics.growthbeat.com/1/events?parentEventId=Event:LBYtXQ26k6pHRZZB&order=ascending&page=1&limit=5&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{"name":"Custom","id":"Event:LBYtXQ26k6pHRZZB:Custom","created":"2015-01-22T05:27:27+0000","description":"Custom"},
	{"name":"Quest","id":"Event:LBYtXQ26k6pHRZZB:Custom:Questo","created":"2015-01-22T05:27:27+0000","description":"Quest"},
	{"name":"Default","id":"Event:LBYtXQ26k6pHRZZB:Default","created":"2015-01-22T05:27:27+0000","description":"Default"},
	{"name":"Close","id":"Event:LBYtXQ26k6pHRZZB:Default:Close","created":"2015-01-22T05:27:27+0000","description":"Close the app"},
	{"name":"Install","id":"Event:LBYtXQ26k6pHRZZB:Default:Install","created":"2015-01-22T05:27:27+0000","description":"Install the app"}
]
```

## イベントを更新

新しくイベントを作成するまたは、存在する場合イベントを更新します。

|キー|値|
|---|---|
|Method|PUT|
|URL|https://api.analytics.growthbeat.com/1/events/{eventId}|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|name|イベント名|(空文字列)|
|description|イベント説明文|(空文字列)|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:UpdateEvent|

### 例

```
curl -X PUT -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.analytics.growthbeat.com/1/events/Event:LBYtXQ26k6pHRZZB:Custom:Win' -d 'name=Win' -d 'description=Win the battle' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"Win",
	"id":"Event:LBYtXQ26k6pHRZZB:Custom:Win",
	"created":"2015-03-02T00:35:16+0000",
	"description":"Win the battle"
}
```

## イベントを削除

イベントを削除します。

|キー|値|
|---|---|
|Method|DELETE|
|URL|https://api.analytics.growthbeat.com/1/events/{eventId}|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|Default|
|---|---|---|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:DeleteEvent|

### 例

```
curl -X DELETE -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.analytics.growthbeat.com/1/events/Event:LBYtXQ26k6pHRZZB:Custom:Win' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

# Metrics API

トラッキングイベントやセグメントを組み合わせた指標として利用できます。

## Metricレスポンス

|キー|値|
|---|---|
|id|メトリックID|
|name|メトリック名|
|description|メトリック説明文|
|query|メトリッククエリ|
|color|メトリックカラーコード|
|created|作成日時|

## メトリックを取得

メトリックIDから特定のメトリックを取得します。

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.analytics.growthbeat.com/1/metrics/{metricId}|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:GetMetric|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.analytics.growthbeat.com/1/metrics/Metric:LBYtXQ26k6pHRZZB:Default:ActiveUser?credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"ActiveUser",
	"id":"Metric:LBYtXQ26k6pHRZZB:Default:ActiveUser",
	"query":{
		"type":"event",
		"direction":"up",
		"eventId":"Event:LBYtXQ26k6pHRZZB:Default:Open",
		"calculationQuery":{"type":"unique"},
		"filterQuery":{"type":"time","begin":{"type":"relative","origin":"begin","time":0},"end":{"type":"relative","origin":"end","time":0}}
	},
	"description":"The unique user",
	"created":"2015-01-22T05:27:27+0000",
	"color":null
}
```

## メトリック一覧を取得

メトリック一覧を取得します。

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.analytics.growthbeat.com/1/metrics|

### パラメーター

|キー|値|Default|
|---|---|---|
|parentMetricId|親メトリックID||
|order|ソート順|ascending|
|page|ページ番号|1|
|limit|1回の取得上限数|100|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:ListMetric|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.analytics.growthbeat.com/1/metrics?parentMetricId=Metric:LBYtXQ26k6pHRZZB&order=ascending&page=1&limit=5&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{"name":"Custom","id":"Metric:LBYtXQ26k6pHRZZB:Custom","query":null,"created":"2015-01-22T05:27:27+0000","description":"Custom","color":null},
	{"name":"TutorialCompleted","id":"Metric:LBYtXQ26k6pHRZZB:Custom:TutorialCompleted","query":null,"created":"2015-02-11T07:54:36+0000","description":"Unique users who completed tutorial","color":null},
	{"name":"Default","id":"Metric:LBYtXQ26k6pHRZZB:Default","query":null,"created":"2015-01-22T05:27:27+0000","description":"Default","color":null},
	{"name":"ARPPU","id":"Metric:LBYtXQ26k6pHRZZB:Default:ARPPU","query":null,"created":"2015-01-22T05:27:37+0000","description":"Average revenue per pay user","color":null},
	{"name":"ARPU","id":"Metric:LBYtXQ26k6pHRZZB:Default:ARPU","query":null,"created":"2015-01-22T05:27:37+0000","description":"Average revenue per user","color":null}
]
```

## メトリックの更新

メトリック新規作成、または存在する場合は更新します。

|キー|値|
|---|---|
|Method|PUT|
|URL|https://api.analytics.growthbeat.com/1/metrics/{metricId}|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|Default|
|---|---|---|
|name|メトリック名|(空文字列)|
|description|メトリック説明文|(空文字列)|
|query|メトリッククエリ||
|color|メトリックカラーコード|(オプション)|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:UpdateMetric|

### 例

```
curl -X PUT -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.analytics.growthbeat.com/1/metrics/Metric:LBYtXQ26k6pHRZZB:Custom:Install' -d 'name=Install' -d 'description=Install users count' -d 'query={"type":"event","direction":"up","eventId":"Event:LBYtXQ26k6pHRZZB:Default:Install","calculationQuery":{"type":"count"},"filterQuery":null}' -d 'color=0' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"Install",
	"id":"Metric:LBYtXQ26k6pHRZZB:Custom:Install",
	"query":{
		"type":"event",
		"direction":"up",
		"eventId":"Event:LBYtXQ26k6pHRZZB:Default:Install",
		"calculationQuery":{"type":"count"},
		"filterQuery":null
	},
	"description":"Install users count",
	"created":"2015-03-02T04:07:16+0000",
	"color":0
}
```

## メトリックの削除

メトリックの削除

|キー|値|
|---|---|
|Method|DELETE|
|URL|https://api.analytics.growthbeat.com/1/metrics/{metricId}|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|Default|
|---|---|---|
|credentialId|Credential ID for authentication||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:DeleteMetric|

### 例

```
curl -X DELETE -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.analytics.growthbeat.com/1/metrics/Metric:LBYtXQ26k6pHRZZB:Custom:Install' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

# Segments API

タグやトラッキングイベントを組み合わせ、対象となるクライアントを抽出できます。

## Segment

|キー|値|
|---|---|
|id|セグメントID|
|name|セグメント名|
|description|セグメント説明文|
|query|セグメントクエリ|
|created|作成日|

## セグメント取得

セグメントIDから特定のセグメントを取得します。

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.analytics.growthbeat.com/1/segments/{segmentId}|

### パラメーター

|キー|値|Default|
|---|---|---|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:GetSegment|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.analytics.growthbeat.com/1/segments/Segment:LBYtXQ26k6pHRZZB:Default:All?credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"All",
	"id":"Segment:LBYtXQ26k6pHRZZB:Default:All",
	"query":{
		"type":"application",
		"note":null,
		"applicationId":"LBYtXQ26k6pHRZZB"
	},
	"created":"2015-01-22T05:28:31+0000",
	"description":"All users"
}
```

## セグメント一覧を取得

セグメント一覧を取得します。

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.analytics.growthbeat.com/1/segments|

### パラメーター

|キー|値|Default|
|---|---|---|
|parentSegmentId|親セグメントID||
|order|ソート|ascending|
|page|ページ番号|1|
|limit|１回の取得上限数|100|
|credentialId|認証のためのAPI||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:ListSegment|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.analytics.growthbeat.com/1/segments?parentSegmentId=Segment:LBYtXQ26k6pHRZZB&order=ascending&page=1&limit=5&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{"name":"Custom","id":"Segment:LBYtXQ26k6pHRZZB:Custom","query":null,"created":"2015-01-22T05:27:27+0000","description":"Custom"},
	{"name":"HeavyUser","id":"Segment:LBYtXQ26k6pHRZZB:Custom:HeavyUser","query":null,"created":"2015-02-11T12:18:12+0000","description":"Heavy users"},
	{"name":"Default","id":"Segment:LBYtXQ26k6pHRZZB:Default","query":null,"created":"2015-01-22T05:27:27+0000","description":"Default"},
	{"name":"All","id":"Segment:LBYtXQ26k6pHRZZB:Default:All","query":null,"created":"2015-01-22T05:28:31+0000","description":"All users"},
	{"name":"ContinuosOpenUser","id":"Segment:LBYtXQ26k6pHRZZB:Default:ContinuosOpenUser","query":null,"created":"2015-01-22T05:28:54+0000","description":"Users who open the app continuously."}
]
```

## セグメントを更新

セグメントを新規作成または、存在する場合は更新します。

|キー|値|
|---|---|
|Method|PUT|
|URL|https://api.analytics.growthbeat.com/1/segments/{segmentId}|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|Default|
|---|---|---|
|name|セグメント名|(Empty string)|
|description|セグメント説明文|(Empty string)|
|query|セグメントクエリ||
|credentialId|認証のためのAPI||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:UpdateSegment|

### 例

```
curl -X PUT -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.analytics.growthbeat.com/1/segments/Segment:LBYtXQ26k6pHRZZB:Custom:Level5OrMore' -d 'name=Level 5 or more' -d 'description=The users whose level is more than 5' -d 'query={"type":"tag","tagId":"Tag:LBYtXQ26k6pHRZZB:Default:Level","operator":"greater_equal","value":"5"}' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"Level 5 or more",
	"id":"Segment:LBYtXQ26k6pHRZZB:Custom:Level5OrMore",
	"query":{
		"type":"tag",
		"note":null,
		"tagId":"Tag:LBYtXQ26k6pHRZZB:Default:Level",
		"operator":"greater_equal",
		"value":"5"
	},
	"description":"The users whose level is more than 5",
	"created":"2015-03-02T03:58:40+0000"
}
```

## セグメントを削除

セグメントを削除します。

|キー|値|
|---|---|
|Method|DELETE|
|URL|https://api.analytics.growthbeat.com/1/segments/{segmentId}|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|Default|
|---|---|---|
|credentialId|認証のためのAPI||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:DeleteSegment|

### 例

```
curl -X DELETE -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.analytics.growthbeat.com/1/segments/Segment:LBYtXQ26k6pHRZZB:Custom:Level5OrMore' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

# Tags API

属性情報のラベルを表します。

## Tag

|キー|値|
|---|---|
|id|タグID|
|name|タグ名|
|description|タグ説明文|
|created|作成日時|

## タグを取得

タグIDから特定のタグを取得します。

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.analytics.growthbeat.com/1/tags/{tagId}|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:GetTag|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.analytics.growthbeat.com/1/tags/Tag:LBYtXQ26k6pHRZZB:Default:Level?credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"Level",
	"id":"Tag:LBYtXQ26k6pHRZZB:Default:Level",
	"created":"2015-01-22T05:27:27+0000",
	"description":"Level of the user"
}
```

## タグ一覧を取得

タグ一覧を取得します。

|キー|値|
|---|---|
|Method|GET|
|URL|https://api.analytics.growthbeat.com/1/tags|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|parentTagId|親タグID||
|order|ソート順|ascending|
|page|ページ番号|1|
|limit|1回の取得上限|100|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:ListTag|

### 例

```
curl -X GET -H 'Accept: application/json' 'https://api.analytics.growthbeat.com/1/tags?parentTagId=Tag:LBYtXQ26k6pHRZZB&order=ascending&page=1&limit=5&credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
[
	{"name":"Custom","id":"Tag:LBYtXQ26k6pHRZZB:Custom","created":"2015-01-22T05:27:27+0000","description":"Custom"},
	{"name":"Gender","id":"Tag:LBYtXQ26k6pHRZZB:Custom:Gender","created":"2015-02-11T08:07:01+0000","description":"Gender"},
	{"name":"Default","id":"Tag:LBYtXQ26k6pHRZZB:Default","created":"2015-01-22T05:27:27+0000","description":"Default"},
	{"name":"FrindCount","id":"Tag:LBYtXQ26k6pHRZZB:Default:FriendCount","created":"2015-01-22T05:27:27+0000","description":"The number of friends"},
	{"name":"Level","id":"Tag:LBYtXQ26k6pHRZZB:Default:Level","created":"2015-01-22T05:27:27+0000","description":"Level"}
]
```

## タグを更新

タグを新規作成、または存在する場合更新をします。

|キー|値|
|---|---|
|Method|PUT|
|URL|https://api.analytics.growthbeat.com/1/tags/{tagId}|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|デフォルト値|
|---|---|---|
|name|タグ名|(空文字列)|
|description|タグ説明文|(空文字列)|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:UpdateTag|

### 例

```
curl -X PUT -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.analytics.growthbeat.com/1/tags/Tag:LBYtXQ26k6pHRZZB:Custom:CurrentStage' -d 'name=Crrent stage' -d 'description=The stage user is currently playing' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```

```
{
	"name":"Crrent stage",
	"id":"Tag:LBYtXQ26k6pHRZZB:Custom:CurrentStage",
	"created":"2015-03-02T00:45:48+0000",
	"description":"The stage user is currently playing"
}
```

## タグを削除

タグを削除します。

|キー|値|
|---|---|
|Method|DELETE|
|URL|https://api.analytics.growthbeat.com/1/tags/{tagId}|
|Content-Type|application/x-www-form-urlencoded|

### パラメーター

|キー|値|Default|
|---|---|---|
|credentialId|認証のためのAPIキー||

### 必要な権限

|Resource|Action|
|---|---|
|Resource:Growthbeat:Application:{applicationId}|Action:GrowthAnalytics:DeleteTag|

### 例

```
curl -X DELETE -H 'Accept: application/json' -H 'Content-Type: application/x-www-form-urlencoded' 'https://api.analytics.growthbeat.com/1/tags/Tag:LBYtXQ26k6pHRZZB:Custom:CurrentStage' -d 'credentialId=nMdZa0PfT1rmxHEh4MTnpfG6ncxtiTgY'
```
# 備考

[リリースノート](http://support.growthbeat.com/sdk/ios/release/)もご参照ください。
