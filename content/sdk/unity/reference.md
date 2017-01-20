---
categories: 'sdk'
date: 2017-01-06T14:32:58+09:00
description: 'Growthbeat Unity の API について説明します'
draft: false
title: Growthbeat Unity API
---

Version 2.0.4

# Growthbeat API

## Growthbeatインスタンスの取得

Growthbeatインスタンスを取得します。

```cs
public static Growthbeat GetInstance ()
```

## ログの停止

Growthbeat SDKからのログ出力を全て停止します。
デフォルトでは、ログ出力がおこなわれます。

```cs
public void SetLoggerSilent (bool silent)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|silent| ログ出力を行うか。`YES`: ログ出力しない `NO`:ログ出力をする |


## ハンドラ

### 処理をしないハンドラ

```cs
IntentHandler.GetInstance ().AddNoopIntentHandler ();
```

### ブラウザを開くハンドラ

```cs
IntentHandler.GetInstance ().AddUrlIntentHandler ();
```

### カスタムハンドラ

```cs
IntentHandler.GetInstance ().AddCustomIntentHandler ("GameObjectName", "MethodName");
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|GameObjectName| コールバックをするメソッドが存在するゲームオブジェクト |
|MethodName| コールバックをするメソッド |

例.)

```cs
public class GrowthbeatComponent : MonoBehaviour
{

    void Awake ()
    {
        IntentHandler.GetInstance ().AddCustomIntentHandler ("GrowthbeatComponent", "HandleCustomIntent");
    }

    void HandleCustomIntent(string extra) {
        Debug.Log("Enter HandleCustomIntent");
        Debug.Log(extra);
    }

}
```

extraはJSON型の文字列が戻ってきます。

# Growth Push API

## Growth Pushインスタンスの取得

Growth Pushインスタンスを取得します。

```cs
public static GrowthPush GetInstance ()
```

## 初期化
GrowthbeatおよびGrowth Pushの初期化を行います。初期化では以下の処理が行われます。

- デバイス登録、認証
- Growth Pushの初期化
- 基本情報の送信

```cs
public void Initialize (string applicationId, string credentialId, Environment environment)
```

広告情報を保持しない場合

```cs
public void Initialize (string applicationId, string credentialId, Environment environment, bool adInfoEnable)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |
|environment| 開発用: `Environment.development` 本番用: `Environment.production`　|
|adInfoEnabled| 広告情報の送信設定。`true`: 送信する `false`:送信しない |

## デバイストークンの取得・送信

### デバイストークンの取得

```cs
public void RequestDeviceToken (string senderId)
```

|項目名|詳細|
|:--|:--|
| senderId | Android の SenderId * iOSのみの場合は、引数なし |

### デバイストークンの送信 (iOSのみ)

```cs
public void SetDeviceToken (string deviceToken)
```

### デバイストークン取得 (Androidのみ)

```cs
public string GetDeviceToken ()
```

## イベントの送信

### イベントの送信

```cs
public void TrackEvent(string name)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

### イベントと任意の値の送信

```cs
public void TrackEvent (string name, string value)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|


### イベントと任意の値の送信
メッセージ表示のコールバックを、ゲームオブジェクトの指定メソッドへ戻します。  
コールバックには、uuid の文字列が返ります。

```cs
public void TrackEvent (string name, string value, string gameObjectName, string methodName)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|
|gameObjectName|コールバックするゲームオブジェクト|
|methodName|コールバックするメソッド名|

### ポップアップメッセージ表示

```cs
public void RenderMessage (string uuid);
```

|項目名|詳細|
|:--|:--|
|uuid|TrackEvent時のコールバックされた文字列|

## タグの送信

### タグの送信

```cs
public void SetTag (string name)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

### タグと任意の値の送信

```cs
public void SetTag (string name, string value)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|

## バッチクリア (iOSのみ)

配信時に、バッチにチェックマークを付けた場合、バッチをクリアするためのメソッドです。
iOSのみ利用できます。

```cs
public void ClearBadge ();
```

<!--
# Growth Link API

## Growth Link初期化

Growth Linkを初期化します。

applicationId, credentialIdは、Growthbeatの初期化時に利用したものと同じものを利用してください。

```cs
GrowthLink.GetInstance().Initialize (applicationId, credentialId);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId|アプリケーションID|
|credentialId|クリデンシャルID|
-->
