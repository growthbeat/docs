---
categories: 'sdk'
date: 2015-11-12T14:32:58+09:00
description: 'Growthbeat iOS の API について説明します'
draft: false
title: Growthbeat iOS API
---

Version 1.2.7

# Growthbeat API

## Growthbeatインスタンスの取得

Growthbeatインスタンスを取得します。

```objc
+ (instancetype)sharedInstance;
```

## 初期化

Growthbeatの初期化を行います。初期化では以下の処理が行われます。

- デバイス登録、認証
- Growth Push、Growth Analytics、Growth Messageの初期化（Growth Linkは別途初期化が必要）
- 基本情報の送信

```objc
- (void)initializeWithApplicationId:(NSString *)applicationId credentialId:(NSString *)credentialId;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |

```objc
- (void)initializeWithApplicationId:(NSString *)applicationId credentialId:(NSString *)credentialId adInfoEnable:(BOOL)adInfoEnable;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |
|adInfoEnabled| 広告情報の送信設定。`YES`: 送信する `NO`:送信しない |

## 起動イベントの送信

アプリケーションの起動イベントを送信します。

```objc
- (void)start;
```

## 終了イベントの送信

アプリケーションの起動イベントを送信します。

```objc
- (void)stop;
```

## ログの停止

Growthbeat SDKからのログ出力を全て停止します。
デフォルトでは、ログ出力がおこなわれます。

```objc
- (void) setLoggerSilent:(BOOL silent);
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|silent| ログ出力を行うか。`YES`: ログ出力しない `NO`:ログ出力をする |

## GrowthbeatユニークIDを取得する

SDK初期化時に作成される、GrowthbeatのユニークIDを取得できます。

```objc
- (void)getClient:(void(^)(GBClient *client))callback;
```

## IntentHandlerを追加する。

```
[[GrowthbeatCore sharedInstance] addIntentHandler:[[GBCustomIntentHandler alloc] initWithBlock:^BOOL(GBCustomIntent *customIntent) {
        NSDictionary *extra = customIntent.extra;
        NSLog(@"extra: %@", extra);
        return YES;
}]];
```

# Growth Analytics API

## Growth Analyticsインスタンスの取得

Growth Analyticsインスタンスを取得します。

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

### タグの送信

```objc
- (void)tag:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|フォーマット:`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` <br/> `YOUR_APPLICATION_ID`: ApplicationID<br/>  `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください|

### タグと任意の値を送信

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

## Growth Pushインスタンスの取得

Growth Pushインスタンスを取得します。

```objc
+ (instancetype)sharedInstance;
```

## デバイストークンの取得・送信

### デバイストークンの取得

```objc
- (void)requestDeviceTokenWithEnvironment:(GPEnvironment)newEnvironment;
```

このメソッドを実行すると、アプリ初回起動時に、プッシュ通知の許可ダイアログが表示されます。

### デバイストークンの送信

```objc
- (void)setDeviceToken:(id)deviceToken;
```

AppDelegateクラス

`- (void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken`

のメソッドで上記を必ず実装してください。

## プッシュ通知の有効・無効を判定

```objc
- (BOOL)enableNotification;
```

## 基本タグの送信

Device, OS, Language, Time Zone, Version, Buildが含まれます。

```objc
- (void)setDeviceTags;
```

## イベントの送信（Push専用）

### イベントの送信（Push専用）

```objc
- (void)trackEvent:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

### イベントと任意の値の送信（Push専用）

```objc
- (void)trackEvent:(NSString *)name value:(NSString *)value;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|

## タグの送信（Push専用）

### タグの送信（Push専用）

```objc
- (void)setTag:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

### タグと任意の値の送信（Push専用）

```objc
- (void)setTag:(NSString *)name value:(NSString *)value;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|

## バッチクリア

配信時に、バッチにチェックマークを付けた場合、バッチをクリアするためのメソッドです。
iOSのみ利用できます。

```objc
- (void)clearBadge;
```

# Growth Message API

## Growth Messageインスタンスの取得

Growth Messageインスタンスを取得します。

```objc
+ (instancetype)sharedInstance;
```

# Growth Link API


## Growth Linkインスタンスの取得

Growth Linkインスタンスを取得します。

```objc
+ (instancetype)sharedInstance;
```

## Growth Linkの初期化

Growthbeatへデバイス登録・認証を行います。

```objc
- (void)initializeWithApplicationId:(NSString *)applicationId APPLICATION_ID:(NSString *)credentialId;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |
