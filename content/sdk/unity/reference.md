---
categories: 'sdk'
date: 2015-11-16T14:32:58+09:00
description: 'Growthbeat Unity の API について説明します'
draft: false
title: Growthbeat Unity API
---

# Growthbeat API

## Growthbeatインスタンスの取得

Growthbeatインスタンスを取得します。


```cs
public static GrowthAnalytics GetInstance ()
```

## 初期化

Growthbeatの初期化を行います。初期化では、デバイス登録、認証、および端末の基本情報の送信が行われます。

```cs
public void Initialize (string applicationId, string credentialId)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |

## 起動イベントの送信

アプリケーションの起動イベントを送信します。

```cs
public void Start ()
```

## 終了イベントの送信

アプリケーションの起動イベントを送信します。

```cs
public void Stop ()
```

## 基本タグの送信

端末の基本情報を送信します。基本情報には以下が含まれます。

- デバイスモデル
- OS
- 言語
- タイムゾーン
- タイムゾーンオフセット
- アプリバージョン
- 広告ID（Android:AdvertisingId, iOS:IDFA）
- 広告利用可否

```cs
public void SetBasicTags ()
```

## 特定のイベントを送信

### 起動イベント

ユーザーの起動イベントを送信します。セッション時間の計測を開始するために必要なメソッドです。

```cs
public void Open ()
```

### 終了イベント

アプリの終了イベントを送信します。セッション時間の計測を停止します。

```cs
public void Close ()
```

### 購入イベント

課金時にメソッドを呼び、課金額、アイテムのカテゴリなどを送信することができます。

```cs
public void Purchase (int price, string category, string product)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|price| 価格 |
|category| 任意のカテゴリ |
|product| 任意のアイテム名|

## 特定のタグを送信

### ユーザーIDタグ

アプリのユニークなユーザーIDを送信します。

```cs
public void SetUserId (string userId)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|userId| 任意のユニークなユーザー名|

### 名前タグ

アプリのユーザー名を送信します。

```cs
public void SetName (string name)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name| 任意のユーザー名 |

### 年齢タグ

アプリのユーザーの年齢を送信します。

```cs
public void SetAge (int age)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|age| ユーザーの年齢 |

### 性別タグ

変数は、GAGenderを用いてどちらか性別を送信してください。

```cs
public void SetGender(Gender gender)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|gender| 男性: `Gender.Male` 女性: `Gender.Female` |

### レベルタグ

アプリのユーザーのレベルを送信します。

```cs
public void SetLevel (int level)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|level| ユーザーのレベル |

### 開発用タグ

開発用のフラグををつけます。

```cs
public void SetDevelopment (bool development)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|development| 開発用の場合は `true` |

### 乱数タグ

乱数を端末の情報として紐付けます。

```cs
public void SetRandom ()
```

## カスタムイベント送信

### イベントの送信

```cs
public void Track (string name)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name| フォーマット:`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID <br/> `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|


### イベント名と任意のMapの送信


```cs
public void Track (string name, Dictionary<string, string> properties)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID <br/> `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|properties|カスタムイベントに持たせる任意のMap|


### イベント名とイベント取得回数オプションの送信

```cs
public void Track (string name, TrackOption option)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID <br/> `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|option|GATrackOptionDefault, GATrackOptionOnce, GATrackOptionCounterのいずれかを指定します。|

**option**

|項目名|詳細|
|:--|:--|
|GATrackOptionDefault|デフォルト値。特に何もしません。|
|GATrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|GATrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|


### イベント名と任意のMapの送信とイベント取得回数オプションの送信

```cs
public void Track (string name, Dictionary<string, string> properties, TrackOption option)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID <br/> `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|properties|カスタムイベントに持たせる任意のMap|
|option|GATrackOptionDefault, GATrackOptionOnce, GATrackOptionCounterのいずれかを指定します。|

**option**

|項目名|詳細|
|:--|:--|
|GATrackOptionDefault|デフォルト値。特に何もしません。|
|GATrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|GATrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

## カスタムタグ送信

### タグの送信

```cs
public void Tag (string name)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|

### タグと任意の値を送信

```cs
public void Tag (string name, string value)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name| フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|value|カスタムタグに持たせる任意のValue|


## フルカスタマイズなイベントの送信
特定のネームスペース、イベントIDを設定していただくことが可能です。

```cs
public void Track (string _namespace, string name, Dictionary<string, string> properties, TrackOption option)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|_namespace|ネームスペース|
|name|フォーマット:`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID <br/> `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|properties|イベントに持たせる任意のMap|
|option|GATrackOptionDefault, GATrackOptionOnce, GATrackOptionCounterのいずれかを指定します。|
|completion|イベント作成後のコールバック|


**option**

|項目名|詳細|
|:--|:--|
|GATrackOptionDefault|デフォルト値。特に何もしません。|
|GATrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|GATrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|


## フルカスタマイズなタグの送信

特定のネームスペース、タグIDを設定していただくことが可能です。

```cs
public void Tag (string _namespace, string name, string value)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|_namespace|ネームスペース|
|name|フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|value|タグに持たせる任意のValue|
|completion|タグ作成後のコールバック|


# Growth Push API

## GrowthPushインスタンスの取得

GrowthPushインスタンスを取得します。

```cs
public static GrowthPush GetInstance ()
```

## デバイストークンの取得・送信

### デバイストークンの取得

```cs
public void RequestDeviceToken (Environment environment)
```

### デバイストークンの送信

```cs
public void SetDeviceToken (string deviceToken)
```

## イベントの送信（Push専用）

***こちらのメソッドは、Growth Pushが、Growth Analyticsに統合されました段階で削除予定となっております。これまでGrowth Push SDKをご利用しておりました方は、Growth Analyticsのイベント・タグの送信にお乗り換えくださいませ。***


### イベントの送信（Push専用）

```cs
public void TrackEvent(string name)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

### イベントと任意の値の送信（Push専用）

```cs
public void TrackEvent (string name, string value)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|

## タグの送信（Push専用）

***こちらのメソッドは、Growth Pushが、Growth Analyticsに統合されました段階で削除予定となっております。これまでGrowth Push SDKをご利用しておりました方は、Growth Analyticsのイベント・タグの送信にお乗り換えくださいませ。***


### タグの送信（Push専用）

```cs
public void SetTag (string name)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

### タグと任意の値の送信（Push専用）

```cs
public void SetTag (string name, string value)
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|


# Growth Message API

## GrowthMessageインスタンスの取得

GrowthMessageインスタンスを取得します。

```cs
public static GrowthMessage GetInstance ()
```

# Growth Link API


## coming soon...
