---
categories: 'sdk'
date: 2015-11-12T14:32:58+09:00
description: 'Growthbeat iOS の API について説明します'
draft: false
title: Growthbeat iOS API
---

Version 2.0.0

[iOS SDK 1.2.7以下](/sdk/ios/reference-1.2.7)のリファレンスはこちら

# Growthbeat API

## Growthbeatインスタンスの取得

Growthbeatインスタンスを取得します。

```objc
+ (instancetype)sharedInstance;
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

```objc
[[GrowthbeatCore sharedInstance] addIntentHandler:[[GBCustomIntentHandler alloc] initWithBlock:^BOOL(GBCustomIntent *customIntent) {
        NSDictionary * extra = customIntent.extra;
        NSLog(@"extra: %@", extra);
        return YES;
}]];
```

# Growth Push API

## GrowthPushインスタンスの取得

GrowthPushインスタンスを取得します。

```objc
+ (instancetype)sharedInstance;
```

## 初期化

GrowthbeatおよびGrowth Pushの初期化を行います。初期化では以下の処理が行われます。

- デバイス登録、認証
- Growth Push、Growth Analytics、Growth Messageの初期化（Growth Linkは別途初期化が必要）
- 基本情報の送信

```objc
- (void)initializeWithApplicationId:(NSString *)applicationId credentialId:(NSString *)credentialId environment:(GPEnvironment)environment;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |
|environment| 開発用: `Environment.development` 本番用: `Environment.production`　|

## デバイストークンの取得・送信

### デバイストークンの取得

```objc
- (void)requestDeviceToken;
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

## イベントの送信

### イベントの送信

```objc
- (void)trackEvent:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

### イベントと任意の値の送信

```objc
- (void)trackEvent:(NSString *)name value:(NSString *)value;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|


### イベントと任意の値の送信

```objc
- (void)trackEvent:(NSString *)name value:(NSString *)value messageHandler:(void (^)(void(^renderMessage)()))messageHandler failureHandler:(void (^)(NSString *detail))failureHandler;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|
|messageHander|メッセージ表示準備完了時のコールバック|
|failureHandler|メッセージ処理中にエラーが発生した場合のコールバック|

## タグの送信

### タグの送信

```objc
- (void)setTag:(NSString *)name;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

### タグと任意の値の送信

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

# Growth Link API

## GrowthLinkインスタンスの取得

GrowthLinkインスタンスを取得します。

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
