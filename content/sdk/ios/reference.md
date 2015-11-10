---
categories: 'sdk'
date: 2015-09-14T14:32:58+09:00
description: 'Growthbeat iOS の API について説明します'
draft: false
title: Growthbeat iOS API
---

# 初期化 デバイス登録・認証

Growthbeatへデバイス登録・認証を行います。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

```objc
[[Growthbeat sharedInstance] initializeWithApplicationId:@"YOUR_APLICATION_ID" credentialId:@"YOUR_CREDENTIAL_ID"];
```

# Growth Analytics API

取得したい情報を、任意の場所に実装してください。送信されたデータは、Growth Analytics管理画面をご覧ください。

## 基本情報の送信

端末の基本情報を送信します。

```objc
[[GrowthAnalytics sharedInstance] setBasicTags];
```

- setDeviceModel
- setOs
- setLanguage
- setTimeZone
- setTimeZoneOffset
- setAppVersion
- setAdvertisingId
- setTrackingEnabled


## 特定のイベント・タグを送信

### open event

ユーザーの起動イベントを送信します。セッション時間の計測を開始するために必要なメソッドです。

```objc
- (void)applicationDidBecomeActive:(UIApplication *)application {
    [[GrowthAnalytics sharedInstance] open];
    [[GrowthAnalytics sharedInstance] setBasicTags];
}
```

### close

アプリの終了イベントを送信します。セッション時間の計測を停止します。

```objc
- (void)applicationWillResignActive:(UIApplication *)application {
    [[GrowthAnalytics sharedInstance] close];
}
```

### purchase

課金時にメソッドを呼び、課金額、アイテムのカテゴリなどを送信することができます。

```objc
[[GrowthAnalytics sharedInstance] purchase:price setCategory:@"ITEM_CATEGORY" setProduct:@"ITEM_NAME"];
```

### setUserId

アプリのユニークなユーザーIDを送信します。

```objc
[[GrowthAnalytics sharedInstance] setUserId:@"YOUR_USER_ID"];
```

### setName

アプリのユーザー名を送信します。

```objc
[[GrowthAnalytics sharedInstance] setName:@"YOUR_NAME"];
```

#### setAge

アプリのユーザーの年齢を送信します。

```objc
[[GrowthAnalytics sharedInstance] setAge:age];
```

### setGender

変数は、GAGenderを用いてどちらか性別を送信してください。

**男性**

```objc
[[GrowthAnalytics sharedInstance] setGender:GAGenderMale];
```

**女性**

```
[[GrowthAnalytics sharedInstance] setGender:GAGenderFemale];
```

### setLevel

アプリのユーザーのレベルを送信します。

```objc
[[GrowthAnalytics sharedInstance] setLevel:level];
```

### setDevelopment

開発用のフラグをつける

```objc
[[GrowthAnalytics sharedInstance] setDevelopment:YES]:
```

### setRandom

乱数を端末の情報として紐付けます。

```objc
[[GrowthAnalytics sharedInstance] setRandom];
```

### setAdvertisingId

広告IDを送信します。

```objc
[[Growthbeat sharedInstance] setAdvertisingId];
```

注意：_広告の表示欄がないアプリで利用すると申請時にリジェクトをされる可能性が高いので設定される場合は、十分にご注意ください。_

### setTrackingEnabled

ユーザーが広告IDを利用するのを拒否しているかを送信します。

```objc
[[Growthbeat sharedInstance] setTrackingEnabled];
```

## カスタムイベント・タグを送信

### カスタムイベント
任意のイベントを送信します

**メソッド**

```objc
- (void)track:(NSString *)name;
```

```
- (void)track:(NSString *)name properties:(NSDictionary *)properties;
```

```
- (void)track:(NSString *)name option:(GATrackOption)option;
```

```
- (void)track:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option;
```

**呼び出し**

```objc
[[GrowthAnalytics sharedInstance] track:@"CUSTOM_EVENT_ID"];
```

```
[[GrowthAnalytics sharedInstance] track:@"CUSTOM_EVENT_ID" properties:@{@"key":@"value"}];
```

```
[[GrowthAnalytics sharedInstance] track:@"CUSTOM_EVENT_ID" option:GATrackOptionCounter];
```

```
[[GrowthAnalytics sharedInstance] track:@"CUSTOM_EVENT_ID" properties:@{@"key":@"value"} option:GATrackOptionCounter];
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。`YUR_APPLICATION_ID`: ApplicationIDを指定されます。`CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|properties|カスタムイベントに持たせる任意のMap|
|option|GATrackOptionDefault,GATrackOptionOnce,GATrackOptionCounterのいずれかを指定します。|

**option**

|項目名|詳細|
|:--|:--|
|GATrackOptionDefault|デフォルト値。特に何もしません。|
|GATrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|GATrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|

### カスタムタグ
任意のタグを送信します

**メソッド**

```objc
- (void)tag:(NSString *)name;
```

```
- (void)tag:(NSString *)name value:(NSString *)value;
```

**呼び出し**

```objc
[[GrowthAnalytics sharedInstance] tag:@"CUSTOM_TAG_ID"];
```

```
[[GrowthAnalytics sharedInstance] tag:@"CUSTOM_TAG_ID" value:@"value"];
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` 上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。`YOUR_APPLICATION_ID`: ApplicationIDを指定されます。 `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|value|カスタムタグに持たせる任意のValue|


## フルカスタマイズなイベント・タグの送信
特定のネームスペース、イベントIDを設定していただくことが可能です。下記、イベントID発行例となります。

**メソッド**

```objc
- (void)track:(NSString *)_namespace name:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option completion:(void(^)(GAClientEvent * clientEvent))completion;
```

**呼び出し**

```objc
[[GrowthAnalytics sharedInstance] track:@"NAMESPACE" name:@"EVENT_ID" properties:@{@"key":@"value"} option:GATrackOptionCounter completion:nil];
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|_namespace|ネームスペース|
|name|`Event:<YOUR_APPLICATION_ID>:Custom:<CUSTOM_EVENT_ID>` 上記全文で一意なEventIDと認識されます。大文字小文字は区別されません。`YUR_APPLICATION_ID`: ApplicationIDを指定されます。`CUSTOM_EVENT_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|properties|イベントに持たせる任意のMap|
|option|GATrackOptionDefault,GATrackOptionOnce,GATrackOptionCounterのいずれかを指定します。|
|completion|イベント作成後のコールバック|

**option**

|項目名|詳細|
|:--|:--|
|GATrackOptionDefault|デフォルト値。特に何もしません。|
|GATrackOptionOnce|このオプションを指定した場合、このイベントは最初の1度しか取得されません。（例えば、インストールイベントなどで使用します。）|
|GATrackOptionCounter|このオプションを指定した場合、自動でcounterといプロパティが付与され、イベントを呼び出した回数をインクリメントして保持していきます。|


## フルカスタマイズなタグの送信


特定のネームスペース、タグIDを設定していただくことが可能です。下記、タグID発行例となります。

**メソッド**

```objc
- (void)tag:(NSString *)_namespace name:(NSString *)name value:(NSString *)value completion:(void(^)(GAClientTag * clientTag))completion;
```

**呼び出し**

```objc
[[GrowthAnalytics sharedInstance] tag:@"NAMESPACE" name:@"TAG_ID" value:@"value" completion:nil];
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|_namespace|ネームスペース|
|name|`Tag:<YOUR_APPLICATION_ID>:Custom:<LAST_ID>` 上記全文で一意なTagIDと認識されます。大文字小文字は区別されません。`YOUR_APPLICATION_ID`: ApplicationIDを指定されます。 `LAST_ID`: 英数字[a-zA-Z0-9]で任意の識別子を指定してください。|
|value|タグに持たせる任意のValue|
|completion|タグ作成後のコールバック|


# Growth Push API

## 初期設定

Growth Push管理画面、証明書設定ページにて、各OSごとに証明書の設定を行ってください。

[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)

XCodeプロジェクトのBuild Setting > Provisioning Profileの設定をしてください。誤った設定方法となりますと、デバイストークンの取得ができません。

## デバイストークンを取得・送信をする

1\. Growthhbeat#initializeWithApplicationIdの後に下記を呼び出す

  ```objc
  [[GrowthPush sharedInstance] requestDeviceTokenWithEnvironment:kGrowthPushEnvironment];
  ```

2\. ApplicationDelegateにて下記を追加

```objc
- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [[GrowthPush sharedInstance] setDeviceToken:deviceToken];
}
```

## イベント・タグの取得

***こちらのメソッドは、Growth Pushが、Growth Analyticsに統合されました段階で削除予定となっております。これまでGrowth Push SDKをご利用しておりました方は、Growth Analyticsのイベント・タグの送信にお乗り換えくださいませ。***

### イベントを送信

**イベント名のみの送信**

```objc
- (void)trackEvent:(NSString *)name;
```

```objc
[[GrowthPush sharedInstance] trackEvent:@"EVENT_NAME"];
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|

**イベントと任意の値の送信**

```
- (void)trackEvent:(NSString *)name value:(NSString *)value;
```

```
[[GrowthPush sharedInstance] trackEvent:@"EVENT_NAME" value:@"EVENT_VALUE"];
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|イベント名|
|value|イベントに持たせる値|


### タグを送信

**タグ名のみの送信**

```objc
- (void)setTag:(NSString *)name;
```

```objc
[[GrowthPush sharedInstance] setTag:@"TAG_NAME"];
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|

**タグと任意のタグ名の送信**

```objc
- (void)setTag:(NSString *)name value:(NSString *)value;
```

```objc
[[GrowthPush sharedInstance] setTag:@"TAG_NAME" value:@"TAG_VALUE"];
```

**パラメータ**

|項目名|詳細|
|:--|:--|
|name|タグ名|
|value|タグに持たせる値|


# Growth Message API

## メッセージを表示するViewを指定

メッセージ配信設定で、設定したイベントを、任意の箇所で、Growth Analyticsのtrackメソッドを呼び出し、イベントを送信します。この呼び出し箇所が、メッセージの表示箇所になります。

Growth Analyticsの実装方法を参照してください。

# Growth Link API

## SDKの導入

Growthbeat.frameworkを導入した上で、Growthbeat SDK内の `source/GrowthLink` に含まれる**GrowthLink.framework**を導入します。任意のXcodeプロジェクトを開き、Growthbeat.frameworkをインポートしてください。

1. Growthbeat.frameworkのインポートの方法は2つあります。

- Xcodeプロジェクトに、GrowthLink.frameworkをドラッグアンドドロップする。
- Bulid Phases -> Link Binary With Librariesの+ボタンを押し、Add Other...からGrowthLink.frameworkを選択。

2. GrowthLinkのimport文を記述します。

```objc
#import <GrowthLink/GrowthLink.h>
```

## 初期設定

**Growthbeatへデバイス登録・認証を行います。**

1. Growthbeatの初期化処理の後に、Growth Linkの初期化処理を呼び出す

```objc
[[GrowthLink sharedInstance] initializeWithApplicationId:@"APPLICATION_ID" credentialId:@"CREDENTIAL_ID"];
```

1. カスタムURLスキームでアプリを起動できるように、Info.plistを設定する。

1. URL起動の処理で、handleOpenUrl:urlメソッドを呼び出す

```objc
- (BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
    [[GrowthLink sharedInstance] handleOpenUrl:url];
    return YES;
}
```

## ディープリンクアクションの実装

SDKには、GBIntentHandler (Androidでは、IntentHandler)というプロトコルが定義されており、この実装でディープリンク時のアクションを実装することができます。

たとえば下記のような形で実装できます。

```objc
@interface MyCustomIntentHandler : NSObject <GBIntentHandler>
@end

@implementation MyCustomIntentHandler

- (BOOL)handleIntent:(GBIntent *)intent {

    if (intent.type != GBIntentTypeCustom)
        return false;

    GBCustomIntent \*customIntent = (GBCustomIntent *)intent;
    NSString *action = [customIntent.extra objectForKey:@"action"];
    if(![action isEqualToString:@"open_view"])
        return false;

    NSString *view = [customIntent.extra objectForKey:@"view"];

    // TODO viewに対応する画面を開く処理

    return true;
}

@end
```

こうして定義したクラスを GrowthbeatCore クラスの setIntentHandlers: に設定することで、利用可能となります。

```objc
NSMutableArray *intentHandlers = [NSMutableArray array];
[intentHandlers addObject:[[GBUrlIntentHandler alloc] init]];
[intentHandlers addObject:[[GBNoopIntentHandler alloc] init]];
[intentHandlers addObject:[[MyCustomIntentHandler alloc] init]];
[[GrowthbeatCore sharedInstance] setIntentHandlers:intentHandlers];
```

# Growth Push SDKからの乗り換え方法について

## 前準備

GrowthPushのApplicationIdから、GrowthbeatのApplicationIdに移行されるた
め、[Growthbeat](https://growthbeat.com/)にアクセスして、ApplicationId、SDKキー（CredentialID）を確認します。

## 実装方法

### SDKの初期化

- GrowthPush SDK

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // EasyGrowthPushクラス利用時
    [EasyGrowthPush setApplicationId:kYourApplicationId secret:@"YOU_APP_SECRET" environment:kGrowthPushEnvironment debug:YES];

    // GrowthPushクラス利用時
    [GrowthPush setApplicationId:kYourApplicationId secret:@"YOU_APP_SECRET" environment:kGrowthPushEnvironment debug:YES];
    [GrowthPush requestDeviceToken];
    [GrowthPush setDeviceTags];
}
```

- Growthbeat SDK

```objc
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
	// Growthbeat SDKの初期化
	[[Growthbeat sharedInstance] initializeWithApplicationId:@"YOUR_APPLICATION_ID" credentialId:@"YOUR_CREDENTIAL_ID"];
	// デバイストークンを明示的に要求
	[[GrowthPush sharedInstance] requestDeviceTokenWithEnvironment:kGrowthPushEnvironment];

	// deviceTagの取得
	[[GrowthPush sharedInstance] setDeviceTags];
}
```

### アプリ起動時

- Growthbeat SDK

```objc
- (void)applicationDidBecomeActive:(UIApplication *)application {
	// Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.

	// バッチの削除
	[[GrowthPush sharedInstance] clearBadge];

	// Launchイベントの取得
	[[GrowthPush sharedInstance] trackEvent:@"Launch"];
}
```

### デバイストークンの取得

- Growthbeat SDK

```objc
- (void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
	// デバイストークンをGrowhPushに送信
	[[GrowthPush sharedInstance] setDeviceToken:deviceToken];
}
```

### タグ・イベントの取得

- GrowthPush SDK

```objc
// タグの取得
[GrowthPush setTag:@"TAG_NAME"];
[GrowthPush setTag:@"TAG_NAME" value:@"TAG_VALUE"];
// イベントの取得
[GrowthPush trackEvent:@"EVENT_NAME"];
[GrowthPush trackEvent:@"EVENT_NAME" value:@"EVENT_VALUE"];
```

- Growthbeat SDK

```objc
// タグの取得
[[GrowthPush sharedInstance] setTag:@"TAG_NAME"];
[[GrowthPush sharedInstance] setTag:@"TAG_NAME" value:@"TAG_VALUE"];
// イベントの取得
[[GrowthPush sharedInstance] trackEvent:@"EVENT_NAME"];
[[GrowthPush sharedInstance] trackEvent:@"EVENT_NAME" value:@"EVENT_VALUE"];
```

# 備考

SDK導入について、ご不明な点などございます場合は、Growthbeat[お問い合わせフォーム](https://growthbeat.com/inquiry)からお問い合わせください。また [リリースノート](http://support.growthbeat.com/sdk/ios/release/)もご参照ください。
