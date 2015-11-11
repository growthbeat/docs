---
categories: 'sdk'
date: 2015-09-14T14:32:58+09:00
description: 'Growthbeat iOS の API について説明します'
draft: false
title: Growthbeat iOS API
---

# Growthbeat API

## Growthbeatインスタンスを取得

```objc
+ (instancetype)sharedInstance;
```

## 初期化

Growthbeatへデバイス登録・認証を行います。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

```objc
- (void)initializeWithApplicationId:(NSString *)initialApplicationId credentialId:(NSString *)initialCredentialId;
```

# Growth Analytics API

取得したい情報を、任意の場所に実装してください。送信されたデータは、Growth Analytics管理画面をご覧ください。

## Growth Analyticsインスタンスを取得

```objc
+ (instancetype)sharedInstance;
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

```objc
- (void)setBasicTags;
```

## 特定のイベントを送信

### 起動イベント

ユーザーの起動イベントを送信します。セッション時間の計測を開始するために必要なメソッドです。

```objc
- (void)open;
```

### 終了イベント

アプリの終了イベントを送信します。セッション時間の計測を停止します。

```objc
- (void)close;
```

### 購入イベント

課金時にメソッドを呼び、課金額、アイテムのカテゴリなどを送信することができます。

```objc
- (void)purchase:(int)price setCategory:(NSString *)category setProduct:(NSString *)product;
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

```objc
- (void)setUserId:(NSString *)userId;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|userId| 任意のユニークなユーザー名|

### 名前タグ

アプリのユーザー名を送信します。

```objc
- (void)setName:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name| 任意のユーザー名 |

### 年齢タグ

アプリのユーザーの年齢を送信します。

```objc
- (void)setAge:(int)age;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|age| ユーザーの年齢 |

### 性別タグ

変数は、GAGenderを用いてどちらか性別を送信してください。

```objc
- (void)setGender:(GAGender)gender;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|gender| 男性: `GAGenderMale` 女性: `GAGenderFemale` |

### レベルタグ

アプリのユーザーのレベルを送信します。

```objc
- (void)setLevel:(int)level;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|level| ユーザーのレベル |

### 開発用タグ

開発用のフラグををつけます。

```objc
- (void)setDevelopment:(BOOL)development;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|development| 開発用の場合は `YES` |

### 乱数タグ

乱数を端末の情報として紐付けます。

```objc
- (void)setRandom;
```

## カスタムイベント送信

### イベントの送信

```objc
- (void)track:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name| フォーマット:`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID <br/> `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|


### イベント名と任意のMapの送信


```objc
- (void)track:(NSString *)name properties:(NSDictionary *)properties;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID <br/> `CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|properties|カスタムイベントに持たせる任意のMap|


### イベント名とイベント取得回数オプションの送信

```objc
- (void)track:(NSString *)name option:(GATrackOption)option;
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

```objc
- (void)track:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option;
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

### タグ名の送信

```objc
- (void)tag:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|

### タグ名と任意のvalueを送信

```objc
- (void)tag:(NSString *)name value:(NSString *)value;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name| フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|value|カスタムタグに持たせる任意のValue|


## フルカスタマイズなイベントの送信
特定のネームスペース、イベントIDを設定していただくことが可能です。

```objc
- (void)track:(NSString *)_namespace name:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option completion:(void(^)(GAClientEvent * clientEvent))completion;
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

```objc
- (void)tag:(NSString *)_namespace name:(NSString *)name value:(NSString *)value completion:(void(^)(GAClientTag * clientTag))completion;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|_namespace|ネームスペース|
|name|フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|
|value|タグに持たせる任意のValue|
|completion|タグ作成後のコールバック|


# Growth Push API

## Growth pushインスタンスを取得

```objc
+ (instancetype)sharedInstance;
```

## 初期設定

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)

XCodeプロジェクトのBuild Setting > Provisioning Profileの設定をしてください。誤った設定方法となりますと、デバイストークンの取得ができません。

## デバイストークンの取得・送信

**デバイストークンの取得**

```objc
- (void)requestDeviceTokenWithEnvironment:(GPEnvironment)newEnvironment;
```

**デバイストークンの送信**

```objc
- (void)setDeviceToken:(NSData *)deviceToken;
```

## イベントの取得

***こちらのメソッドは、Growth Pushが、Growth Analyticsに統合されました段階で削除予定となっております。これまでGrowth Push SDKをご利用しておりました方は、Growth Analyticsのイベント・タグの送信にお乗り換えくださいませ。***


### イベント名の送信

```objc
- (void)trackEvent:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

### イベント名と任意の値の送信

```objc
- (void)trackEvent:(NSString *)name value:(NSString *)value;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|

## タグの取得

***こちらのメソッドは、Growth Pushが、Growth Analyticsに統合されました段階で削除予定となっております。これまでGrowth Push SDKをご利用しておりました方は、Growth Analyticsのイベント・タグの送信にお乗り換えくださいませ。***


### タグ名の送信

```objc
- (void)setTag:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

### タグと任意のタグ名の送信

```objc
- (void)setTag:(NSString *)name value:(NSString *)value;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|


# Growth Message API

## Growth Messageインスタンスを取得

```objc
+ (instancetype)sharedInstance;
```

## メッセージを表示するViewを指定

メッセージ配信設定で、設定したイベントを、任意の箇所で、Growth Analyticsのtrackメソッドを呼び出し、イベントを送信します。この呼び出し箇所が、メッセージの表示箇所になります。

<a href="#growth-analytics-api">Growth Analyticsの実装方法</a> を参照してください。

# Growth Link API


## Growth Linkインスタンスを取得

```objc
+ (instancetype)sharedInstance;
```

## 初期設定

Growthbeatへデバイス登録・認証を行います。

```objc
- (void)initializeWithApplicationId:(NSString *)initialApplicationId APPLICATION_ID:(NSString *)CREDENTIAL_ID;
```
