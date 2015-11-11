---
categories: 'sdk'
date: 2015-09-27T23:47:00+09:00
description: 'Growthbeat iOS の導入方法について説明します'
draft: false
title: Growthbeat iOS Gudeliene
---

# 共通初期設定

## SDK導入

Growthbeat SDKで、Growthbeat全てのサービスの機能が利用できます。

### CocoaPodsを使用して導入する場合

Podfileに下記を記述し、pod installを実行してください。

```
pod 'Growthbeat'
```

### 手動でSDKを配置して導入する場合

<a href="/sdk">最新版iOS SDK ダウンロードページ</a>

ダウンロードしたファイルを解凍し、そのフォルダの中の **Growthbeat.framework** をプロジェクトへ組み込みます。
任意のXcodeプロジェクトを開き、Growthbeat.frameworkをインポートしてください。

Growthbeat.frameworkのインポートの方法は2つあります。
```
1. Xcodeプロジェクトに、Growthbeat.frameworkをドラッグアンドドロップする
2. Bulid Phases -> Link Binary With Librariesの+ボタンを押し、Add Other...からGrowthbeat.frameworkを選択する
```

Growthbeatのimport文を記述します。
```
#import <Growthbeat/Growthbeat.h>
```

### 依存について

Growthbeat.frameworkは、下記Frameworkが必須となります。

- Foundation.framework
- UIKit.framework
- CoreGraphics.framework
- SystemConfiguration.framework
- AdSupport.framework
- CFNetwork.framework

## Growthbeatの初期化

Growthbeatへデバイス登録・認証を行います。初期化の中に、端末の基本情報の送信、広告IDの取得が行われます。

```objc
[[Growthbeat sharedInstance] initializeWithApplicationId:@"YOUR_APLICATION_ID" credentialId:@"YOUR_CREDENTIAL_ID"];
```

Growth Push SDKからの乗り換え方法は[APIリファレンス](./sdk/ios/reference/)を参照


# プッシュ通知（Grwoth Push）

Growth Push管理画面、[iOSプッシュ通知証明書作成方法](http://growthhack.sirok.co.jp/growthpush/ios-p12/)にて、各OSごとに証明書の設定を行ってください。

## デバイストークンを取得・送信をする

Growthhbeat#initializeWithApplicationIdの後に下記を呼び出す

```objc
[[GrowthPush sharedInstance] requestDeviceTokenWithEnvironment:kGrowthPushEnvironment];
```

ApplicationDelegateにて下記を追加

```objc
- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    [[GrowthPush sharedInstance] setDeviceToken:deviceToken];
}
```

# 分析（Growth Anlytics）

あらかじめ特定のタグやイベントを送信するためのメソッドを用意しております。
[Growthbeatの初期化](#growthbeatの初期化) の時点で下記データがGrowth Anlyticsに送信されます。
デフォルトで用意のあるタグ・イベント一覧は <a href="/sdk/ios/reference/">APIリファレンス</a> を参照してください。

* デバイスモデル
* OS
* 言語
* タイムゾーン
* UTCとタイムゾーンの差分

## タグ（ユーザー属性）の送信

**タグとは**

ユーザーの属性を示す情報の送信をします。一般的には ユーザーID/性別/年齢 等の情報を送信します。

```objc
- (void)track:(NSString *)name;
- (void)track:(NSString *)name properties:(NSDictionary *)properties;
- (void)track:(NSString *)name option:(GATrackOption)option;
- (void)track:(NSString *)name properties:(NSDictionary *)properties option:(GATrackOption)option;
```

詳しくは、APIリファレンスを参照してください。

<a href="/sdk/ios/reference/">APIリファレンス</a>

## イベント（行動ログ）の送信

**イベントとは？**

ユーザーの行動ログを示す情報の送信をします。一般的には 起動/ログイン/課金 等の情報を送信します。

```objc
- (void)tag:(NSString *)name;
- (void)tag:(NSString *)name value:(NSString *)value;
```

詳しくは、<a href="/sdk/ios/reference/">APIリファレンス</a>を参照してください。


# アプリ内メッセージ（Growth Message）

## メッセージを表示する

メッセージを表示したい場所にGrowth Analyticsのタグを設定してください。

```objc
[[GrowthAnalytics sharedInstance] track:@"CUSTOM_EVENT_ID"];
```

詳しくは、<a href="/sdk/ios/reference/">APIリファレンス</a>を参照してください。

# ディープリンク（Growth Link）

## 初期設定

Growthbeat.frameworkを導入した上で、Growthbeat SDK内の `source/GrowthLink` に含まれる **GrowthLink.framework** を導入します。任意のXcodeプロジェクトを開き、Growthbeat.frameworkをインポートしてください。

Growthbeat.frameworkのインポートの方法は2つあります。

```
1. Xcodeプロジェクトに、GrowthLink.frameworkをドラッグアンドドロップする。
2. Bulid Phases -> Link Binary With Librariesの+ボタンを押し、Add Other...からGrowthLink.frameworkを選択。
```

GrowthLinkのimport文を記述します。

```objc
#import <GrowthLink/GrowthLink.h>
```

## 初期化処理

Growthbeatの初期化処理の後に、Growth Linkの初期化処理を呼び出す

```objc
[[GrowthLink sharedInstance] initializeWithApplicationId:@"APPLICATION_ID" credentialId:@"CREDENTIAL_ID"];
```

カスタムURLスキームでアプリを起動できるように、Info.plistを設定する。

URL起動の処理で、handleOpenUrl:urlメソッドを呼び出す

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

SDK導入について、ご不明な点などございます場合は、Growthbeat[お問い合わせフォーム](https://growthbeat.com/inquiry)からお問い合わせください。また [リリースノート](http://support.growthbeat.com/sdk/ios/release/)もご参照ください
