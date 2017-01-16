---
categories: 'sdk'
date: 2016-06-29T14:32:58+09:00
description: 'Growthbeat iOS の API について説明します'
draft: false
title: Growthbeat iOS API
---

Version 2.0.4

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

## IntentHandlerを追加する。

```objc
[[Growthbeat sharedInstance] addIntentHandler:[[GBCustomIntentHandler alloc] initWithBlock:^BOOL(GBCustomIntent *customIntent) {
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
- Growth Pushの初期化
- 基本情報の送信

```objc
- (void)initializeWithApplicationId:(NSString *)applicationId credentialId:(NSString *)credentialId environment:(GPEnvironment)environment;
```

広告情報を保持しない場合

```objc
- (void)initializeWithApplicationId:(NSString *)applicationId credentialId:(NSString *)credentialId environment:(GPEnvironment)environment adInfoEnable:(BOOL)adInfoEnable;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|applicationId| アプリケーションID |
|credentialId| クレデンシャルキー |
|environment| 開発用: `Environment.development` 本番用: `Environment.production`　|
|adInfoEnable | NOの場合、Growth Pushに広告IDを渡しません |

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

AppDelegateクラスの didRegisterForRemoteNotificationsWithDeviceToken に必ず実装してください。

```objc
- (void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken`
```

## プッシュ通知の有効・無効を判定

```objc
- (BOOL)enableNotification;
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
- (void)trackEvent:(NSString *)name value:(NSString *)value showMessage:(void (^)(void(^renderMessage)()))showMessageHandler failure:(void (^)(NSString *detail))failureHandler;
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|
|messageHander|メッセージ表示準備完了時のコールバック|
|failureHandler|メッセージ処理中にエラーが発生した場合のコールバック|

### ポップアップメッセージ表示

```objc
[[GrowthPush sharedInstance] trackEvent:@"Launch" value:nil showMessage:^(void(^renderMessage)()){
    // コールすることでメッセージが表示されます。
    renderMessage();
} failure:^(NSString * detail) {
    // detailはエラーメッセージが返ってきます。
}];
```

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

<!--
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
-->
